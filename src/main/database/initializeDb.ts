import log from 'electron-log';
import { initializeDB } from './db';
import {
  createTableDeviceTypes,
  ipcGetDeviceTypes,
  postDeviceTypes,
} from './sql/devicesTypes';
import {
  createTableDbVersion,
  getDbVersion,
  postDbVersion,
} from './sql/dbVersion';
import {
  createTableConnectionTypes,
  ipcGetConnectionTypes,
  postConnectionTypes,
} from './sql/connectionTypes';
import {
  createTableConverters,
  ipcDeleteConverters,
  ipcGetConverters,
  ipcPostConverters,
  postConverters,
} from './sql/converters';

export async function initializeHeadDb(path: string) {
  log.info(`INFO: Initializing head db`);
  const headDb = initializeDB(path);

  await createTableDbVersion(headDb);
  await createTableConnectionTypes(headDb);
  await createTableDeviceTypes(headDb);
  await createTableConverters(headDb);

  const dbVersion = await getDbVersion(headDb);
  if (dbVersion.length === 0) {
    // default values
    await postConnectionTypes(headDb, { type: 'tcp' });
    await postDeviceTypes(headDb, { type: 'dmm-5t-3' });
    await postConverters(headDb, {
      name: 'device-1',
      type: 'tcp',
      address: '192.168.1.8:26',
    });

    await postDbVersion(headDb, { status: true, version: 'v0.1.0' });
    log.info('INFO: Created head db.');
  }

  ipcGetConnectionTypes(headDb);
  ipcGetDeviceTypes(headDb);
  ipcGetConverters(headDb);
  ipcPostConverters(headDb);
  ipcDeleteConverters(headDb);
}
