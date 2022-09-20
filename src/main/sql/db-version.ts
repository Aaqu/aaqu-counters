export const initDbVersion = `
  CREATE TABLE IF NOT EXISTS db_version (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    initialization INTEGER NOT NULL,
    version TEXT NOT NULL
  )
`;

export const postDbVersion = `
  INSERT INTO db_version VALUES (null, ?, ?)
`;

export const getDbVersion = `
  SELECT * FROM db_version
`;
