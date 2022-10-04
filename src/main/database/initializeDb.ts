import log from 'electron-log';
import { dialog, ipcMain } from 'electron';
import fs from 'fs';
import { initializeDB } from './db';
import {
  createTableDbVersion,
  getDbVersion,
  postDbVersion,
} from './sql/dbVersion';
import {
  createTableDmm5t3,
  getDmm5t3,
  getDmm5t3Names,
  postDmm5t3,
} from './sql/dmm-5t-3';
import { Dmm5t3 } from '../slaves/dmm-5t-3';
// import {
//   createTableDeviceTypes,
//   ipcGetDeviceTypes,
//   postDeviceTypes,
// } from './sql/devicesTypes';
// import {
//   createTableConnectionTypes,
//   ipcGetConnectionTypes,
//   postConnectionTypes,
// } from './sql/connectionTypes';
// import {
//   createTableConverters,
//   ipcDeleteConverters,
//   ipcGetConverters,
//   ipcPostConverters,
//   postConverters,
// } from './sql/converters';
// import {
//   createTableSlaves,
//   ipcDeleteSlaves,
//   ipcGetSlaves,
//   ipcPostSlaves,
// } from './sql/slaves';

export async function initializeHeadDb(path: string) {
  log.info(`INFO: Initializing head db`);
  const headDb = initializeDB(path);

  await createTableDbVersion(headDb);
  await createTableDmm5t3(headDb);
  // await createTableConnectionTypes(headDb);
  // await createTableDeviceTypes(headDb);
  // await createTableConverters(headDb);
  // await createTableSlaves(headDb);

  const dbVersion = await getDbVersion(headDb);
  if (dbVersion.length === 0) {
    // default values
    // await postConnectionTypes(headDb, { type: 'tcp' });
    // await postDeviceTypes(headDb, { type: 'dmm-5t-3' });
    // await postConverters(headDb, {
    //   name: 'device-1',
    //   type: 'tcp',
    //   address: '192.168.1.8:26',
    // });

    await postDbVersion(headDb, { status: true, version: 'v0.1.0' });
    log.info('INFO: Created head db.');
  }

  let interval: string | number | NodeJS.Timer | undefined;
  let device: Dmm5t3 | undefined;

  ipcMain.on('dmm-start', async (event, args) => {
    try {
      console.log(device === undefined);
      if (device === undefined) {
        device = new Dmm5t3({
          ip: args[0].converter.split(':')[0],
          port: Number(args[0].converter.split(':')[1]),
          unitId: Number(args[0].address),
        });

        console.log(await device.connect());
      } else if (interval === undefined) {
        event.reply('info', {
          message: 'resume reading',
        });
      }

      if (interval === undefined) {
        interval = setInterval(async () => {
          const start = +Date.now();
          const response = await device.read();
          console.log({
            stop: `${+Date.now() - start}ms`,
            response: response[33],
          });
          event.reply('dmm-read', response);
          await postDmm5t3(headDb, [args[0].sample, ...response]);
        }, 1000);
      } else {
        event.reply('error', {
          message: 'is reading',
        });
      }
    } catch {
      event.reply('error', {
        err: 'Cannot start interval reda',
      });
    }
  });

  ipcMain.on('dmm-stop', (event) => {
    console.log('stop');
    clearInterval(interval);
    interval = undefined;
  });

  ipcMain.on('dmm-export', async (event, args) => {
    console.log('export');

    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
    });
    console.log(result);
    if (!result.canceled) {
      event.reply('info', { message: `start export` });
      const names = await getDmm5t3Names(headDb);
      const namesDate = names
        .reduce((prev, curr) => {
          prev.push(curr.name);
          return prev;
        }, [])
        .join(',');

      const response = await getDmm5t3(headDb, { sample: args[0].sample });
      const date = response
        .reduce((prev, curr) => {
          prev.push(Object.values(curr).join(','));
          return prev;
        }, [])
        .join('\n');

      // console.log();
      const fileName = `sample_${args[0].sample}_${+Date.now()}.csv`;
      fs.writeFile(
        `${result.filePaths}\\${fileName}`,
        `${namesDate}\n${date}`,
        (err) => {
          if (err) {
            event.reply('error', { message: `cannot save file: ${fileName}` });
            return;
          }
          event.reply('info', { message: `save file: ${fileName}` });
        }
      );
    } else {
      event.reply('info', { message: `canceled export` });
    }
  });

  // ipcDmmStart(headDb, interval);
  // ipcDmmStop(headDb, interval);
  // ipcGetConnectionTypes(headDb);
  // ipcGetDeviceTypes(headDb);
  // ipcGetConverters(headDb);
  // ipcPostConverters(headDb);
  // ipcDeleteConverters(headDb);
  // ipcGetSlaves(headDb);
  // ipcPostSlaves(headDb);
  // ipcDeleteSlaves(headDb);
}
