import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { db } from '../client';

interface Dmm5t3Model
  extends Model<
    InferAttributes<Dmm5t3Model>,
    InferCreationAttributes<Dmm5t3Model>
  > {
  id?: number;
  sample: number;
  czas: number;
  napiecie_l1: number;
  napiecie_l2: number;
  napiecie_l3: number;
  napiecie_l12: number;
  napiecie_l23: number;
  napiecie_l31: number;
  prad_l1: number;
  prad_l2: number;
  prad_l3: number;
  czestotliwosc_l1: number;
  czestotliwosc_l2: number;
  czestotliwosc_l3: number;
  moc_czynna_l1: number;
  moc_czynna_l2: number;
  moc_czynna_l3: number;
  calkowita_moc_czynna: number;
  moc_bierna_l1: number;
  moc_bierna_l2: number;
  moc_bierna_l3: number;
  calkowita_moc_bierna: number;
  moc_pozorna_l1: number;
  moc_pozorna_l2: number;
  moc_pozorna_l3: number;
  calkowita_moc_pozorna: number;
  cos_phi_l1: number;
  cos_phi_l2: number;
  cos_phi_l3: number;
  wspolczynnik_mocy_l1: number;
  wspolczynnik_mocy_l2: number;
  wspolczynnik_mocy_l3: number;
  calkowity_wspolczynnik_mocy: number;
  energia_czynna_pobrana_l1: number;
  energia_czynna_pobrana_l2: number;
  energia_czynna_pobrana_l3: number;
  calkowita_energia_czynna_pobrana: number;
  energia_czynna_oddana_l1: number;
  energia_czynna_oddana_l2: number;
  energia_czynna_oddana_l3: number;
  calkowita_energia_czynna_oddana: number;
  energia_indukcyjna_l1: number;
  energia_indukcyjna_l2: number;
  energia_indukcyjna_l3: number;
  calkowita_energia_indukcyjna: number;
  energia_pojemnosciowa_l1: number;
  energia_pojemnosciowa_l2: number;
  energia_pojemnosciowa_l3: number;
  calkowita_energia_pojemnosciowa: number;
  energia_pozorna_l1: number;
  energia_pozorna_l2: number;
  energia_pozorna_l3: number;
  calkowita_energia_pozorna: number;
  thdv_l1: number;
  thdv_l2: number;
  thdv_l3: number;
  thdv_3p: number;
  thdi_l1: number;
  thdi_l2: number;
  thdi_l3: number;
  thdi_3p: number;
}

export const Dmm5t3 = db.define<Dmm5t3Model>(
  'Dmm5t3',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sample: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    czas: {
      type: DataTypes.DATE,
    },
    napiecie_l1: {
      type: DataTypes.REAL,
    },
    napiecie_l2: {
      type: DataTypes.REAL,
    },
    napiecie_l3: {
      type: DataTypes.REAL,
    },
    napiecie_l12: {
      type: DataTypes.REAL,
    },
    napiecie_l23: {
      type: DataTypes.REAL,
    },
    napiecie_l31: {
      type: DataTypes.REAL,
    },
    prad_l1: {
      type: DataTypes.REAL,
    },
    prad_l2: {
      type: DataTypes.REAL,
    },
    prad_l3: {
      type: DataTypes.REAL,
    },
    czestotliwosc_l1: {
      type: DataTypes.REAL,
    },
    czestotliwosc_l2: {
      type: DataTypes.REAL,
    },
    czestotliwosc_l3: {
      type: DataTypes.REAL,
    },
    moc_czynna_l1: {
      type: DataTypes.REAL,
    },
    moc_czynna_l2: {
      type: DataTypes.REAL,
    },
    moc_czynna_l3: {
      type: DataTypes.REAL,
    },
    calkowita_moc_czynna: {
      type: DataTypes.REAL,
    },
    moc_bierna_l1: {
      type: DataTypes.REAL,
    },
    moc_bierna_l2: {
      type: DataTypes.REAL,
    },
    moc_bierna_l3: {
      type: DataTypes.REAL,
    },
    calkowita_moc_bierna: {
      type: DataTypes.REAL,
    },
    moc_pozorna_l1: {
      type: DataTypes.REAL,
    },
    moc_pozorna_l2: {
      type: DataTypes.REAL,
    },
    moc_pozorna_l3: {
      type: DataTypes.REAL,
    },
    calkowita_moc_pozorna: {
      type: DataTypes.REAL,
    },
    cos_phi_l1: {
      type: DataTypes.REAL,
    },
    cos_phi_l2: {
      type: DataTypes.REAL,
    },
    cos_phi_l3: {
      type: DataTypes.REAL,
    },
    wspolczynnik_mocy_l1: {
      type: DataTypes.REAL,
    },
    wspolczynnik_mocy_l2: {
      type: DataTypes.REAL,
    },
    wspolczynnik_mocy_l3: {
      type: DataTypes.REAL,
    },
    calkowity_wspolczynnik_mocy: {
      type: DataTypes.REAL,
    },
    energia_czynna_pobrana_l1: {
      type: DataTypes.REAL,
    },
    energia_czynna_pobrana_l2: {
      type: DataTypes.REAL,
    },
    energia_czynna_pobrana_l3: {
      type: DataTypes.REAL,
    },
    calkowita_energia_czynna_pobrana: {
      type: DataTypes.REAL,
    },
    energia_czynna_oddana_l1: {
      type: DataTypes.REAL,
    },
    energia_czynna_oddana_l2: {
      type: DataTypes.REAL,
    },
    energia_czynna_oddana_l3: {
      type: DataTypes.REAL,
    },
    calkowita_energia_czynna_oddana: {
      type: DataTypes.REAL,
    },
    energia_indukcyjna_l1: {
      type: DataTypes.REAL,
    },
    energia_indukcyjna_l2: {
      type: DataTypes.REAL,
    },
    energia_indukcyjna_l3: {
      type: DataTypes.REAL,
    },
    calkowita_energia_indukcyjna: {
      type: DataTypes.REAL,
    },
    energia_pojemnosciowa_l1: {
      type: DataTypes.REAL,
    },
    energia_pojemnosciowa_l2: {
      type: DataTypes.REAL,
    },
    energia_pojemnosciowa_l3: {
      type: DataTypes.REAL,
    },
    calkowita_energia_pojemnosciowa: {
      type: DataTypes.REAL,
    },
    energia_pozorna_l1: {
      type: DataTypes.REAL,
    },
    energia_pozorna_l2: {
      type: DataTypes.REAL,
    },
    energia_pozorna_l3: {
      type: DataTypes.REAL,
    },
    calkowita_energia_pozorna: {
      type: DataTypes.REAL,
    },
    thdv_l1: {
      type: DataTypes.REAL,
    },
    thdv_l2: {
      type: DataTypes.REAL,
    },
    thdv_l3: {
      type: DataTypes.REAL,
    },
    thdv_3p: {
      type: DataTypes.REAL,
    },
    thdi_l1: {
      type: DataTypes.REAL,
    },
    thdi_l2: {
      type: DataTypes.REAL,
    },
    thdi_l3: {
      type: DataTypes.REAL,
    },
    thdi_3p: {
      type: DataTypes.REAL,
    },
  },
  {
    timestamps: false,
  }
);
