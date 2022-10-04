import { tcp as modbusTcp } from 'modbus-stream';

export class Dmm5t3 {
  constructor(options) {
    this.options = options;
    this.connection = false;
  }

  connect = async () => {
    try {
      this.connection = await this.getConn(this.options);
    } catch (err) {
      console.log(err.message);
    }
    return this.connection;
  };

  read = async () => {
    if (!this.connection) return new Error('No connection!');
    let response = {};
    try {
      response = await this.dmmRead(
        this.connection,
        4000,
        88,
        this.dmm5t3Parser
      );
    } catch (err) {
      console.log(err.message);
    }
    return response;
  };

  close = () => {
    this.connection.close();
    this.connection = false;
    return true;
  };

  dmmRead = async (connection, address, quantity, parser, timeout = 500) => {
    return new Promise((resolve, reject) => {
      const autoReject = setTimeout(() => {
        return reject(new Error('Timeout'));
      }, timeout);

      connection.readInputRegisters({ address, quantity }, (err, data) => {
        clearTimeout(autoReject);

        if (err) {
          return reject(err);
        }

        if (data?.response?.data === undefined) {
          return reject(new Error('Bad response'));
        }

        const registers = data?.response?.data.reduce((prev, curr, index) => {
          prev[4000 + index] = curr;
          return prev;
        }, {});

        return resolve(parser(registers));
      });
    });
  };

  getConn = async (tcp) => {
    return new Promise((resolve, reject) => {
      modbusTcp.connect(
        tcp.port,
        tcp.ip,
        {
          debug: null,
          unitId: tcp.unitId,
        },
        (err, connection) => {
          if (err) reject(err);
          resolve(connection);
        }
      );
    });
  };

  // dmmDateParser = (arr) => {
  //   return new Date(arr[5], arr[4] - 1, arr[3], arr[0], arr[1], arr[2]);
  // };
  //
  // dmm5t3Parser2 = (arrayOfBuffers) => {
  //   // remove one unused register
  //   const clearArr = arrayOfBuffers.filter((_, index) => index !== 12);
  //
  //   // buffer to decimal
  //   const firstArr = clearArr.slice(0, 39);
  //   const secondArr = clearArr
  //     .slice(39, 79)
  //     .reduce((prev, curr, index, arr) => {
  //       if (index % 2 === 0) prev.push([curr, arr[index + 1]]);
  //       return prev;
  //     }, []);
  //   const thirdArr = clearArr.slice(79);
  //   const arrPrepared = [...firstArr, ...secondArr, ...thirdArr];
  //   const arrDecimal = arrPrepared.map((buffer) => {
  //     return Array.isArray(buffer)
  //       ? Buffer.concat(buffer).readUInt32BE(0)
  //       : buffer.readUInt16BE(0);
  //   });
  //
  //   // decimal to date
  //   const arrDecimalWithDate = [
  //     ...arrDecimal.slice(0, 33),
  //     this.dmmDateParser(arrDecimal.slice(33, 39)),
  //     ...arrDecimal.slice(39),
  //   ];
  //
  //   const CT = arrDecimalWithDate[0];
  //   const VT = arrDecimalWithDate[1] * 0.1;
  //
  //   const calc = [
  //     CT,
  //     Math.round(VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[2] * VT * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[3] * VT * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[4] * VT * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[5] * VT * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[6] * VT * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[7] * VT * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[8] * CT * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[9] * CT * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[10] * CT * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[11] * 0.01 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[12] * 0.01 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[13] * 0.01 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[14] * CT * VT),
  //     Math.round(arrDecimalWithDate[15] * CT * VT),
  //     Math.round(arrDecimalWithDate[16] * CT * VT),
  //     Math.round(arrDecimalWithDate[17] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[18] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[19] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[20] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[21] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[22] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[23] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[24] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[25] * CT * VT * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[26] * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[27] * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[28] * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[29] * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[30] * 0.001 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[31] * 0.001 * 1000) / 1000,
  //     arrDecimalWithDate[32],
  //     arrDecimalWithDate[33],
  //     arrDecimalWithDate[34],
  //     arrDecimalWithDate[35],
  //     arrDecimalWithDate[36],
  //     arrDecimalWithDate[37],
  //     arrDecimalWithDate[38],
  //     arrDecimalWithDate[39],
  //     arrDecimalWithDate[40],
  //     arrDecimalWithDate[41],
  //     arrDecimalWithDate[42],
  //     arrDecimalWithDate[43],
  //     arrDecimalWithDate[44],
  //     arrDecimalWithDate[45],
  //     arrDecimalWithDate[46],
  //     arrDecimalWithDate[47],
  //     arrDecimalWithDate[48],
  //     arrDecimalWithDate[49],
  //     arrDecimalWithDate[50],
  //     arrDecimalWithDate[51],
  //     arrDecimalWithDate[52],
  //     arrDecimalWithDate[53],
  //     Math.round(arrDecimalWithDate[54] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[55] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[56] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[57] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[58] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[59] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[60] * 0.1 * 1000) / 1000,
  //     Math.round(arrDecimalWithDate[61] * 0.1 * 1000) / 1000,
  //   ];
  //
  //   return calc;
  // };

  dmm5t3Parser = (registers) => {
    const CT = registers['4000'].readUInt16BE(0);
    const VT = registers['4001'].readUInt16BE(0) * 0.1;
    console.log(registers['4016']);
    console.log(registers['4017']);
    console.log(registers['4016']);
    const clear = [
      CT,
      Math.round(VT * 1000) / 1000,
      Math.round(registers['4002'].readUInt16BE(0) * VT * 0.1 * 1000) / 1000,
      Math.round(registers['4003'].readUInt16BE(0) * VT * 0.1 * 1000) / 1000,
      Math.round(registers['4004'].readUInt16BE(0) * VT * 0.1 * 1000) / 1000,
      Math.round(registers['4005'].readUInt16BE(0) * VT * 0.1 * 1000) / 1000,
      Math.round(registers['4006'].readUInt16BE(0) * VT * 0.1 * 1000) / 1000,
      Math.round(registers['4007'].readUInt16BE(0) * VT * 0.1 * 1000) / 1000,
      Math.round(registers['4008'].readUInt16BE(0) * CT * 0.001 * 1000) / 1000,
      Math.round(registers['4009'].readUInt16BE(0) * CT * 0.001 * 1000) / 1000,
      Math.round(registers['4010'].readUInt16BE(0) * CT * 0.001 * 1000) / 1000,
      Math.round(registers['4012'].readUInt16BE(0) * 0.01 * 1000) / 1000,
      Math.round(registers['4013'].readUInt16BE(0) * 0.01 * 1000) / 1000,
      Math.round(registers['4014'].readUInt16BE(0) * 0.01 * 1000) / 1000,
      Math.round(registers['4015'].readUInt16BE(0) * CT * VT),
      Math.round(registers['4016'].readUInt16BE(0) * CT * VT),
      Math.round(registers['4017'].readUInt16BE(0) * CT * VT),
      Math.round(registers['4018'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4019'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4020'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4021'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4022'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4023'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4024'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4025'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4026'].readUInt16BE(0) * CT * VT * 1000) / 1000,
      Math.round(registers['4027'].readInt16BE(0) * 0.001 * 1000) / 1000,
      Math.round(registers['4028'].readInt16BE(0) * 0.001 * 1000) / 1000,
      Math.round(registers['4029'].readInt16BE(0) * 0.001 * 1000) / 1000,
      Math.round(registers['4030'].readInt16BE(0) * 0.001 * 1000) / 1000,
      Math.round(registers['4031'].readInt16BE(0) * 0.001 * 1000) / 1000,
      Math.round(registers['4032'].readInt16BE(0) * 0.001 * 1000) / 1000,
      Math.round(registers['4033'].readInt16BE(0) * 0.001 * 1000) / 1000,
      new Date(
        registers['4039'].readUInt16BE(0),
        registers['4038'].readUInt16BE(0) - 1,
        registers['4037'].readUInt16BE(0),
        registers['4034'].readUInt16BE(0),
        registers['4035'].readUInt16BE(0),
        registers['4036'].readUInt16BE(0)
      ),
      Buffer.concat([registers['4040'], registers['4041']]).readUInt32BE(0),
      Buffer.concat([registers['4042'], registers['4043']]).readUInt32BE(0),
      Buffer.concat([registers['4044'], registers['4045']]).readUInt32BE(0),
      Buffer.concat([registers['4046'], registers['4047']]).readUInt32BE(0),
      Buffer.concat([registers['4048'], registers['4049']]).readUInt32BE(0),
      Buffer.concat([registers['4050'], registers['4051']]).readUInt32BE(0),
      Buffer.concat([registers['4052'], registers['4053']]).readUInt32BE(0),
      Buffer.concat([registers['4054'], registers['4055']]).readUInt32BE(0),
      Buffer.concat([registers['4056'], registers['4057']]).readUInt32BE(0),
      Buffer.concat([registers['4058'], registers['4059']]).readUInt32BE(0),
      Buffer.concat([registers['4060'], registers['4061']]).readUInt32BE(0),
      Buffer.concat([registers['4062'], registers['4063']]).readUInt32BE(0),
      Buffer.concat([registers['4064'], registers['4065']]).readUInt32BE(0),
      Buffer.concat([registers['4066'], registers['4067']]).readUInt32BE(0),
      Buffer.concat([registers['4068'], registers['4069']]).readUInt32BE(0),
      Buffer.concat([registers['4070'], registers['4071']]).readUInt32BE(0),
      Buffer.concat([registers['4072'], registers['4073']]).readUInt32BE(0),
      Buffer.concat([registers['4074'], registers['4075']]).readUInt32BE(0),
      Buffer.concat([registers['4076'], registers['4077']]).readUInt32BE(0),
      Buffer.concat([registers['4078'], registers['4079']]).readUInt32BE(0),
      Math.round(registers['4080'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4081'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4082'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4083'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4084'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4085'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4086'].readUInt16BE(0) * 0.1 * 1000) / 1000,
      Math.round(registers['4087'].readUInt16BE(0) * 0.1 * 1000) / 1000,
    ];

    return clear;
  };
}

// test
// (async () => {
//   if (await test.connect()) {
//     setInterval(async () => {
//       const start = +Date.now();
//       const response = await test.read();
//       console.log({
//         stop: `${+Date.now() - start}ms`,
//         response: response,
//       });
//     }, 1000);
//   }
// })();
