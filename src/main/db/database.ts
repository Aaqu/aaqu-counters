import { dialog, ipcMain } from 'electron';
import log from 'electron-log';
import fs from 'fs';
import { fn, col, Sequelize } from 'sequelize';
import { db } from './client';
import { Dmm5t3 } from './models/Dmm5t3';
import { Faun } from './models/Faun';
import { Version } from './models/Version';
import { Converter } from './models/Converter';

export const initDatabase = async () => {
  try {
    await db.sync({ force: true });
    console.log('re-sync done!');

    Converter.hasMany(Faun, {
      foreignKey: 'converterId',
    });
    Faun.belongsTo(Converter);
  } catch (error) {
    console.log(error);
  }

  // const row = Dmm5t3.build({ firstName: 'test', lastName: 'test' });
  // await row.save();

  const versionFaun = await Version.findOne({
    where: { page: 'faun' },
    raw: true,
  });
  if (versionFaun === null) {
    await Version.create({ page: 'faun', version: 'v0.1.0' });
    await Faun.create({
      name: 'device1',
      type: 'D204MB',
      converterId: '1',
      address: 1,
    });
  }

  const versionConverter = await Version.findOne({
    where: { page: 'converter' },
    raw: true,
  });
  if (versionConverter === null) {
    await Version.create({ page: 'converter', version: 'v0.1.0' });
    await Converter.create({ type: 'TCP', address: '192.168.1.7', port: 500 });
  }

  // @TODO find better solution for type error
  ipcMain.on('dmm-chart', async (event, args) => {
    try {
      const sampleData = await Dmm5t3.findAll({
        attributes: [
          'czas',
          'napiecie_l1',
          'napiecie_l2',
          'napiecie_l3',
          'napiecie_l12',
          'napiecie_l23',
          'napiecie_l31',
          'prad_l1',
          'prad_l2',
          'prad_l3',
          'czestotliwosc_l1',
          'czestotliwosc_l2',
          'czestotliwosc_l3',
          'moc_czynna_l1',
          'moc_czynna_l2',
          'moc_czynna_l3',
          'calkowita_moc_czynna',
          'moc_bierna_l1',
          'moc_bierna_l2',
          'moc_bierna_l3',
          'calkowita_moc_bierna',
          'moc_pozorna_l1',
          'moc_pozorna_l2',
          'moc_pozorna_l3',
          'calkowita_moc_pozorna',
          'cos_phi_l1',
          'cos_phi_l2',
          'cos_phi_l3',
          'wspolczynnik_mocy_l1',
          'wspolczynnik_mocy_l2',
          'wspolczynnik_mocy_l3',
          'calkowity_wspolczynnik_mocy',
          'energia_czynna_pobrana_l1',
          'energia_czynna_pobrana_l2',
          'energia_czynna_pobrana_l3',
          'calkowita_energia_czynna_pobrana',
          'energia_czynna_oddana_l1',
          'energia_czynna_oddana_l2',
          'energia_czynna_oddana_l3',
          'calkowita_energia_czynna_oddana',
          'energia_indukcyjna_l1',
          'energia_indukcyjna_l2',
          'energia_indukcyjna_l3',
          'calkowita_energia_indukcyjna',
          'energia_pojemnosciowa_l1',
          'energia_pojemnosciowa_l2',
          'energia_pojemnosciowa_l3',
          'calkowita_energia_pojemnosciowa',
          'energia_pozorna_l1',
          'energia_pozorna_l2',
          'energia_pozorna_l3',
          'calkowita_energia_pozorna',
          'thdv_l1',
          'thdv_l2',
          'thdv_l3',
          'thdv_3p',
          'thdi_l1',
          'thdi_l2',
          'thdi_l3',
          'thdi_3p',
        ],
        where: {
          sample: args[0].sample,
        },
        order: [['id', 'ASC']],
        raw: true,
      });

      const datasets = sampleData.map((row) => Object.values(row));
      const labels = Object.keys(sampleData[0]);
      labels.shift();

      event.reply('dmm-chart', {
        datasets,
        labels,
      });
    } catch (err: any) {
      log.error(err.message);
    }
  });

  ipcMain.on('dmm-samples', async (event) => {
    try {
      const samples = await Dmm5t3.findAll({
        attributes: ['sample'],
        group: ['sample'],
        order: [['sample', 'DESC']],
        raw: true,
      });

      const samplesForOption = samples.map(({ sample }) => {
        return { id: sample, value: sample, label: sample };
      });
      event.reply('dmm-samples', samplesForOption);
    } catch (err: any) {
      log.error(err.message);
    }
  });

  ipcMain.on('dmm-export', async (event, args) => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
      });

      if (result.canceled) {
        event.reply('info', { message: `canceled export` });
        return;
      }

      // TODO replace start and end to promis popup in frontend
      event.reply('info', { message: `start export` });
      const sampleData = await Dmm5t3.findAll({
        attributes: [
          'id',
          'sample',
          // 'czas',
          // TODO find solution to convert timestamp to datetime
          [db.fn('DATE_FORMAT', db.col('czas'), '%Y-%m-%d %H:%i:%s'), 'czas'],
          'napiecie_l1',
          'napiecie_l2',
          'napiecie_l3',
          'napiecie_l12',
          'napiecie_l23',
          'napiecie_l31',
          'prad_l1',
          'prad_l2',
          'prad_l3',
          'czestotliwosc_l1',
          'czestotliwosc_l2',
          'czestotliwosc_l3',
          'moc_czynna_l1',
          'moc_czynna_l2',
          'moc_czynna_l3',
          'calkowita_moc_czynna',
          'moc_bierna_l1',
          'moc_bierna_l2',
          'moc_bierna_l3',
          'calkowita_moc_bierna',
          'moc_pozorna_l1',
          'moc_pozorna_l2',
          'moc_pozorna_l3',
          'calkowita_moc_pozorna',
          'cos_phi_l1',
          'cos_phi_l2',
          'cos_phi_l3',
          'wspolczynnik_mocy_l1',
          'wspolczynnik_mocy_l2',
          'wspolczynnik_mocy_l3',
          'calkowity_wspolczynnik_mocy',
          'energia_czynna_pobrana_l1',
          'energia_czynna_pobrana_l2',
          'energia_czynna_pobrana_l3',
          'calkowita_energia_czynna_pobrana',
          'energia_czynna_oddana_l1',
          'energia_czynna_oddana_l2',
          'energia_czynna_oddana_l3',
          'calkowita_energia_czynna_oddana',
          'energia_indukcyjna_l1',
          'energia_indukcyjna_l2',
          'energia_indukcyjna_l3',
          'calkowita_energia_indukcyjna',
          'energia_pojemnosciowa_l1',
          'energia_pojemnosciowa_l2',
          'energia_pojemnosciowa_l3',
          'calkowita_energia_pojemnosciowa',
          'energia_pozorna_l1',
          'energia_pozorna_l2',
          'energia_pozorna_l3',
          'calkowita_energia_pozorna',
          'thdv_l1',
          'thdv_l2',
          'thdv_l3',
          'thdv_3p',
          'thdi_l1',
          'thdi_l2',
          'thdi_l3',
          'thdi_3p',
        ],
        where: {
          sample: args[0].sample,
        },
        order: [['id', 'ASC']],
        raw: true,
      });
      const labels = Object.keys(sampleData[0]);
      const namesDate = labels.join(',');

      const date = sampleData
        .map((row) => {
          return Object.values(row).join(',');
        })
        .join('\n');

      const fileName = `sample_${args[0].sample}_${+Date.now()}.csv`;
      fs.writeFile(
        `${result.filePaths}/${fileName}`,
        `${namesDate}\n${date}`,
        (err) => {
          if (err) {
            event.reply('error', { message: `cannot save file: ${fileName}` });
            return;
          }
          event.reply('info', { message: `save file: ${fileName}` });
        }
      );
    } catch (err: any) {
      log.error(err.message);
    }
  });

  ipcMain.on('faun-list', async (event) => {
    try {
      const fauns = await Faun.findAll({
        include: [
          {
            model: Converter,
          },
        ],
        attributes: [
          'id',
          'name',
          'type',
          'address',
          [
            db.literal(`converter.address || ':' || converter.port`),
            'converter',
          ],
        ],
        raw: true,
        nest: true,
      });

      console.log(fauns);
      event.reply('faun-list', fauns);
    } catch (err: any) {
      log.error(err.message);
    }
  });
};
