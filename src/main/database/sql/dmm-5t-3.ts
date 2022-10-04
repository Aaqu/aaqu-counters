import sqlite3 from 'sqlite3';
import * as sqlite3Wrapper from '../sqlite3Wrapper';
import { preparedAll } from '../sqlite3Wrapper';

export async function createTableDmm5t3(db: sqlite3.Database) {
  const SQL = `
    CREATE TABLE IF NOT EXISTS dmm5t3 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sample INTEGER NOT NULL,
      przekladnia_pradowa REAL,
      przekladnia_napieciowa REAL,
      napiecie_l1 REAL,
      napiecie_l2 REAL,
      napiecie_l3 REAL,
      napiecie_l12 REAL,
      napiecie_l23 REAL,
      napiecie_l31 REAL,
      prad_l1 REAL,
      prad_l2 REAL,
      prad_l3 REAL,
      czestotliwosc_l1 REAL,
      czestotliwosc_l2 REAL,
      czestotliwosc_l3 REAL,
      moc_czynna_l1 REAL,
      moc_czynna_l2 REAL,
      moc_czynna_l3 REAL,
      calkowita_moc_czynna REAL,
      moc_bierna_l1 REAL,
      moc_bierna_l2 REAL,
      moc_bierna_l3 REAL,
      calkowita_moc_bierna REAL,
      moc_pozorna_l1 REAL,
      moc_pozorna_l2 REAL,
      moc_pozorna_l3 REAL,
      calkowita_moc_pozorna REAL,
      cos_phi_l1 REAL,
      cos_phi_l2 REAL,
      cos_phi_l3 REAL,
      wspolczynnik_mocy_l1 REAL,
      wspolczynnik_mocy_l2 REAL,
      wspolczynnik_mocy_l3 REAL,
      calkowity_wspolczynnik_mocy REAL,
      czas DATETIME,
      energia_czynna_pobrana_l1 REAL,
      energia_czynna_pobrana_l2 REAL,
      energia_czynna_pobrana_l3 REAL,
      calkowita_energia_czynna_pobrana REAL,
      energia_czynna_oddana_l1 REAL,
      energia_czynna_oddana_l2 REAL,
      energia_czynna_oddana_l3 REAL,
      calkowita_energia_czynna_oddana REAL,
      energia_indukcyjna_l1 REAL,
      energia_indukcyjna_l2 REAL,
      energia_indukcyjna_l3 REAL,
      calkowita_energia_indukcyjna REAL,
      energia_pojemnosciowa_l1 REAL,
      energia_pojemnosciowa_l2 REAL,
      energia_pojemnosciowa_l3 REAL,
      calkowita_energia_pojemnosciowa REAL,
      energia_pozorna_l1 REAL,
      energia_pozorna_l2 REAL,
      energia_pozorna_l3 REAL,
      calkowita_energia_pozorna REAL,
      thdv_l1 REAL,
      thdv_l2 REAL,
      thdv_l3 REAL,
      thdv_3p REAL,
      thdi_l1 REAL,
      thdi_l2 REAL,
      thdi_l3 REAL,
      thdi_3p REAL
    )
  `;

  return sqlite3Wrapper.run(db, SQL);
}

export async function postDmm5t3(db: sqlite3.Database, values: any[]) {
  const SQL = `
    INSERT INTO dmm5t3 VALUES (
    null, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?
    )
  `;

  return sqlite3Wrapper.prepared(db, SQL, values);
}

export async function getDmm5t3(
  db: sqlite3.Database,
  values: { sample: number }
) {
  const { sample } = values;
  const SQL = `
    SELECT 
      id,
      sample,
      przekladnia_pradowa,
      przekladnia_napieciowa,
      napiecie_l1,
      napiecie_l2,
      napiecie_l3,
      napiecie_l12,
      napiecie_l23,
      napiecie_l31,
      prad_l1,
      prad_l2,
      prad_l3,
      czestotliwosc_l1,
      czestotliwosc_l2,
      czestotliwosc_l3,
      moc_czynna_l1,
      moc_czynna_l2,
      moc_czynna_l3,
      calkowita_moc_czynna,
      moc_bierna_l1,
      moc_bierna_l2,
      moc_bierna_l3,
      calkowita_moc_bierna,
      moc_pozorna_l1,
      moc_pozorna_l2,
      moc_pozorna_l3,
      calkowita_moc_pozorna,
      cos_phi_l1,
      cos_phi_l2,
      cos_phi_l3,
      wspolczynnik_mocy_l1,
      wspolczynnik_mocy_l2,
      wspolczynnik_mocy_l3,
      calkowity_wspolczynnik_mocy,
      datetime(czas / 1000, 'unixepoch', 'localtime') AS czas,
      energia_czynna_pobrana_l1,
      energia_czynna_pobrana_l2,
      energia_czynna_pobrana_l3,
      calkowita_energia_czynna_pobrana,
      energia_czynna_oddana_l1,
      energia_czynna_oddana_l2,
      energia_czynna_oddana_l3,
      calkowita_energia_czynna_oddana,
      energia_indukcyjna_l1,
      energia_indukcyjna_l2,
      energia_indukcyjna_l3,
      calkowita_energia_indukcyjna,
      energia_pojemnosciowa_l1,
      energia_pojemnosciowa_l2,
      energia_pojemnosciowa_l3,
      calkowita_energia_pojemnosciowa,
      energia_pozorna_l1,
      energia_pozorna_l2,
      energia_pozorna_l3,
      calkowita_energia_pozorna,
      thdv_l1,
      thdv_l2,
      thdv_l3,
      thdv_3p,
      thdi_l1,
      thdi_l2,
      thdi_l3,
      thdi_3p
    FROM dmm5t3 
    WHERE sample = ? 
    ORDER BY id
  `;

  return sqlite3Wrapper.preparedAll(db, SQL, [sample]);
}

export async function getDmm5t3Names(db: sqlite3.Database) {
  const SQL = `
    SELECT name FROM pragma_table_info('dmm5t3')
  `;

  return sqlite3Wrapper.all(db, SQL);
}

// export function ipcDmmStart(db: sqlite3.Database, interval: any) {
//
// }
//
// export function ipcDmmStop(db: sqlite3.Database, interval: any) {
//
// }
