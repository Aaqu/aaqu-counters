import sqlite3 from 'sqlite3';
import * as sqlite3Wrapper from '../sqlite3Wrapper';

export async function createTableDbVersion(db: sqlite3.Database) {
  const SQL = `
    CREATE TABLE IF NOT EXISTS db_version (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status INTEGER NOT NULL,
      version TEXT NOT NULL
    )
  `;

  return sqlite3Wrapper.run(db, SQL);
}

export type DbVersion = {
  id?: number;
  status: boolean;
  version: string;
};

export async function postDbVersion(db: sqlite3.Database, values: DbVersion) {
  const { status, version } = values;
  const SQL = `
    INSERT INTO db_version VALUES (null, ?, ?)
  `;

  return sqlite3Wrapper.prepared(db, SQL, [status, version]);
}

export async function getDbVersion(db: sqlite3.Database) {
  const SQL = `
    SELECT * FROM db_version
  `;
  return sqlite3Wrapper.all(db, SQL);
}
