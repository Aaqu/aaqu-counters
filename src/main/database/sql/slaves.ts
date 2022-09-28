import sqlite3 from 'sqlite3';
import { ipcMain } from 'electron';
import * as sqlite3Wrapper from '../sqlite3Wrapper';

export async function createTableSlaves(db: sqlite3.Database) {
  const SQL = `
    CREATE TABLE IF NOT EXISTS slaves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      address TEXT NOT NULL UNIQUE,
      converter TEXT NOT NULL
    )
  `;

  return sqlite3Wrapper.run(db, SQL);
}

export type Slaves = {
  id?: number;
  name: string;
  type: string;
  address: string;
  converter: string;
};

export async function postSlaves(db: sqlite3.Database, values: Slaves) {
  const { name, type, address, converter } = values;

  const SQL = `
    INSERT INTO slaves VALUES (null, ?, ?, ?, ?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [name, type, address, converter]);
}

export async function getSlaves(db: sqlite3.Database) {
  const SQL = `
    SELECT * FROM slaves
  `;

  return sqlite3Wrapper.all(db, SQL);
}

export async function deleteSlaves(
  db: sqlite3.Database,
  values: { id: number }
) {
  const { id } = values;
  const SQL = `
    DELETE FROM slaves WHERE id = (?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [id]);
}

export function ipcGetSlaves(db: sqlite3.Database) {
  ipcMain.on('get-slaves', async (event) => {
    try {
      const rows = await getSlaves(db);
      event.reply('get-slaves', rows);
    } catch {
      event.reply('error', {
        err: 'Cannot get slaves',
      });
    }
  });
}

export function ipcPostSlaves(db: sqlite3.Database) {
  ipcMain.on('post-slaves', async (event, arg) => {
    try {
      const { name, type, address, converter } = arg[0];
      await postSlaves(db, { name, type, address, converter });
      event.reply('reload-slaves');
    } catch {
      event.reply('error', {
        err: 'Cannot post slaves',
      });
    }
  });
}

export function ipcDeleteSlaves(db: sqlite3.Database) {
  ipcMain.on('delete-slaves', async (event, arg) => {
    try {
      await deleteSlaves(db, { id: arg[0].id });
      event.reply('reload-slaves');
    } catch {
      event.reply('error', {
        err: 'Cannot post slaves',
      });
    }
  });
}
