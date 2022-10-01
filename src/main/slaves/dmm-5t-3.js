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

        return resolve(parser(data?.response?.data));
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

  dmmDateParser = (arr) => {
    return new Date(arr[5], arr[4] - 1, arr[3], arr[0], arr[1], arr[2]);
  };

  dmm5t3Parser = (arrayOfBuffers) => {
    // remove one unused register
    const clearArr = arrayOfBuffers.filter((_, index) => index !== 12);

    // buffer to decimal
    const firstArr = clearArr.slice(0, 39);
    const secondArr = clearArr
      .slice(39, 79)
      .reduce((prev, curr, index, arr) => {
        if (index % 2 === 0) prev.push([curr, arr[index + 1]]);
        return prev;
      }, []);
    const thirdArr = clearArr.slice(79);
    const arrPrepared = [...firstArr, ...secondArr, ...thirdArr];
    const arrDecimal = arrPrepared.map((buffer) => {
      return Array.isArray(buffer)
        ? Buffer.concat(buffer).readUInt32BE(0)
        : buffer.readUInt16BE(0);
    });

    // decimal to date
    const arrDecimalWithDate = [
      ...arrDecimal.slice(0, 33),
      this.dmmDateParser(arrDecimal.slice(33, 39)),
      ...arrDecimal.slice(39),
    ];

    return arrDecimalWithDate;
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
