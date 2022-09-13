export const initConverters = `
  CREATE TABLE converters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    address TEXT NOT NULL UNIQUE
  )
`;

export const postConverters = `
  INSERT INTO converters VALUES (null, ?, ?, ?)
`;

export const getConverters = `
  SELECT * FROM converters
`;

export const deleteConverters = `
  DELETE FROM converters WHERE id = (?)
`;
