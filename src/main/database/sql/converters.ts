import sqlite3 from 'sqlite3';
import { ipcMain } from 'electron';
import * as sqlite3Wrapper from '../sqlite3Wrapper';

export async function createTableConverters(db: sqlite3.Database) {
  const SQL = `
      CREATE TABLE IF NOT EXISTS converters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    address TEXT NOT NULL UNIQUE
  )
  `;

  return sqlite3Wrapper.run(db, SQL);
}

export type Converter = {
  id?: number;
  name: string;
  type: string;
  address: string;
};

export async function postConverters(db: sqlite3.Database, values: Converter) {
  const { name, type, address } = values;

  const SQL = `
    INSERT INTO converters VALUES (null, ?, ?, ?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [name, type, address]);
}

export async function getConverters(db: sqlite3.Database) {
  const SQL = `
    SELECT * FROM converters
  `;

  return sqlite3Wrapper.all(db, SQL);
}

export async function deleteConverters(
  db: sqlite3.Database,
  values: { id: number }
) {
  const { id } = values;
  const SQL = `
    DELETE FROM converters WHERE id = (?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [id]);
}

export function ipcGetConverters(db: sqlite3.Database) {
  ipcMain.on('get-converters', async (event) => {
    try {
      const rows = await getConverters(db);
      event.reply('get-converters', rows);
    } catch {
      event.reply('error', {
        err: 'Cannot get converters',
      });
    }
  });
}

export function ipcPostConverters(db: sqlite3.Database) {
  ipcMain.on('post-converters', async (event, arg) => {
    try {
      const { name, type, address } = arg[0];
      await postConverters(db, { name, type, address });
      event.reply('reload-converters');
    } catch {
      event.reply('error', {
        err: 'Cannot post converters',
      });
    }
  });
}

export function ipcDeleteConverters(db: sqlite3.Database) {
  ipcMain.on('delete-converters', async (event, arg) => {
    try {
      await deleteConverters(db, { id: arg[0].id });
      event.reply('reload-converters');
    } catch {
      event.reply('error', {
        err: 'Cannot post converters',
      });
    }
  });
}
