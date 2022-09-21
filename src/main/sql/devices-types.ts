export const initDeviceTypes = `
  CREATE TABLE IF NOT EXISTS deviceTypes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
  )
`;

export const postDeviceTypes = `
  INSERT INTO deviceTypes VALUES (null, ?)
`;

export const getDeviceTypes = `
  SELECT * FROM deviceTypes
`;
