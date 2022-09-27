import sqlite3 from 'sqlite3';
import log from 'electron-log';

export function initializeDB(path: string): sqlite3.Database {
  const sqlite = sqlite3.verbose();
  const db = new sqlite.Database(path);
  return db;
}

export function closeDB(db: sqlite3.Database) {
  log.info('INFO: closing DB');
  db.close();
}
