import log from 'electron-log';
import * as sqlite3 from 'sqlite3';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function all(db: sqlite3.Database, query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.all(query, (err: Error, res: any) => {
      if (err) {
        log.error(err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

export async function run(db: sqlite3.Database, query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(query, (err: Error, res: any) => {
      if (err) {
        log.error(err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

export async function prepared(
  db: sqlite3.Database,
  query: string,
  params: any[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(query);
    stmt.run(...params, (err: Error, res: any) => {
      if (err) {
        log.error(err);
        stmt.finalize();
        reject(err);
        return;
      }
      stmt.finalize();
      resolve(res);
    });
  });
}
