import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import * as sqlite3Wrapper from '../sqlite3Wrapper';

export async function createTableDeviceTypes(db: sqlite3.Database) {
  const SQL = `
    CREATE TABLE IF NOT EXISTS device_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL
    )
  `;

  return sqlite3Wrapper.run(db, SQL);
}

export type DeviceType = {
  id?: number;
  type: string;
};

export async function postDeviceTypes(
  db: sqlite3.Database,
  values: DeviceType
) {
  const { type } = values;

  const SQL = `
    INSERT INTO device_types VALUES (null, ?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [type]);
}

export async function getDeviceTypes(db: sqlite3.Database) {
  const SQL = `
    SELECT * FROM device_types
  `;

  return sqlite3Wrapper.all(db, SQL);
}

export function ipcGetDeviceTypes(db: sqlite3.Database) {
  ipcMain.on('get-device-types', async (event) => {
    try {
      const rows = await getDeviceTypes(db);
      const data = rows.map(({ id, type }: DeviceType) => {
        return { id, value: type, label: type };
      });
      event.reply('get-device-types', data);
    } catch {
      event.reply('error', {
        err: 'Cannot get device types',
      });
    }
  });
}
