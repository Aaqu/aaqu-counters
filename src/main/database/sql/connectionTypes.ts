import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import * as sqlite3Wrapper from '../sqlite3Wrapper';

export async function createTableConnectionTypes(db: sqlite3.Database) {
  const SQL = `
    CREATE TABLE IF NOT EXISTS connection_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
  )
  `;

  return sqlite3Wrapper.run(db, SQL);
}

export type ConnectionType = {
  id?: number;
  type: string;
};

export async function postConnectionTypes(
  db: sqlite3.Database,
  values: ConnectionType
) {
  const { type } = values;

  const SQL = `
    INSERT INTO connection_types VALUES (null, ?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [type]);
}

export async function getConnectionTypes(db: sqlite3.Database) {
  const SQL = `
    SELECT * FROM connection_types
  `;

  return sqlite3Wrapper.all(db, SQL);
}

export function ipcGetConnectionTypes(db: sqlite3.Database) {
  ipcMain.on('get-connection-types', async (event) => {
    try {
      const rows = await getConnectionTypes(db);
      const data = rows.map(({ id, type }: ConnectionType) => {
        return { id, value: type, label: type };
      });
      event.reply('get-connection-types', data);
    } catch {
      event.reply('error', {
        err: 'Cannot get connection types',
      });
    }
  });
}
