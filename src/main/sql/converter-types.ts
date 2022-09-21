export const initConnectionTypes = `
  CREATE TABLE IF NOT EXISTS ConnectionTypes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
  )
`;

export const postConnectionTypes = `
  INSERT INTO ConnectionTypes VALUES (null, ?)
`;

export const getConnectionTypes = `
  SELECT * FROM ConnectionTypes
`;
