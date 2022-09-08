import { Persona } from '../models/Persona';
import { DbService } from '../services/db.service';

export class PersonaBLL {
  async insert(
    db: DbService,
    nombres: string,
    apellido: string,
    edad: number,
    fechaNacimiento: string
  ) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `INSERT INTO personas (nombres, apellidos, edad, fecha_nacimiento) VALUES (?,?,?,?)`;

    return await db.database
      .executeSql(sqlText, [nombres, apellido, edad, fechaNacimiento])
      .catch((e) => console.log(`Error en el insert`, e));
  }

  async selectAll(db: DbService) {
    if (!db.database) {
      await db.createDb();
    }
    // eslint-disable-next-line max-len
    const sqlText = `SELECT * FROM personas`;
    const personas: Persona[] = [];

    await db.database
      .executeSql(sqlText, [])
      .then((res) => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const row = res.rows.item(i);
            personas.push(row);
          }
        }
      })
      .catch((e) => console.log(`Error en el selectAll`, e));

      return personas;
  }

  async selectById(db: DbService, id: number) {
    if (!db.database) {
      await db.createDb();
    }
    // eslint-disable-next-line max-len
    const sqlText = `SELECT * FROM personas where id = ?;`;
    let persona: Persona;

    await db.database
      .executeSql(sqlText, [id])
      .then((res) => {
        if (res.rows.length === 1) {
            persona = res.rows.item(0);
        }
      })
      .catch((e) => console.log(`Error en el selectById`, e));

      return persona;
  }
}
