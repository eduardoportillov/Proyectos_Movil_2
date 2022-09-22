import { Note } from '../models/Note';
import { DbService } from '../services/db/db.service';

export class NoteBLL {
  async insert(
    db: DbService,
    title: string,
    type: string,
    description?: string,
    color?: string
  ) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `INSERT INTO notes(title, description, type, color) VALUES (?,?,?,?)`;
    let insertId: number;
    await db.database
      .executeSql(sqlText, [title, description, type, color])
      .then((res) => (insertId = res.insertId))
      .catch((e) => console.log(`Error en el insert`, e));

    return insertId;
  }

  async selectAll(db: DbService) {
    if (!db.database) {
      await db.createDb();
    }
    // eslint-disable-next-line max-len
    const sqlText = `SELECT * FROM notes;`;
    const notes: Note[] = [];

    await db.database
      .executeSql(sqlText, [])
      .then((res) => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const row = res.rows.item(i);
            notes.push(row);
          }
        }
        console.log('Executed SQL: SELECT * FROM notes');
      })
      .catch((e) => console.log(`Error en el selectAll`, e));

    return notes;
  }

  async selectById(db: DbService, id: number) {
    if (!db.database) {
      await db.createDb();
    }
    // eslint-disable-next-line max-len
    const sqlText = `SELECT * FROM notes where id = ?;`;
    let note: Note;

    await db.database
      .executeSql(sqlText, [id])
      .then((res) => {
        if (res.rows.length === 1) {
          note = res.rows.item(0);
        }
      })
      .catch((e) => console.log(`Error en el selectById`, e));

    return note;
  }

  async delete(db: DbService, id: number) {
    if (!db.database) {
      await db.createDb();
    }
    // eslint-disable-next-line max-len
    const sqlText = `DELETE FROM notes where id = ?;`;
    let responseDB: any;

    await db.database
      .executeSql(sqlText, [id])
      .then((res) => {
        responseDB = res;
        console.log(`Note deleted`, res);
      })
      .catch((e) => console.log(`Error al Eliminar`, e));

    return responseDB;
  }

  async update(
    db: DbService,
    id: number,
    title: string,
    description?: string,
    color?: string
  ) {
    if (!db.database) {
      await db.createDb();
    }
    // eslint-disable-next-line max-len
    const sqlText = `update notes set title = ?, description= ?, color= ? WHERE id = ?;`;
    let responseDB: any;

    await db.database
      .executeSql(sqlText, [title, description, color, id])
      .then((res) => {
        responseDB = res;
        console.log(`Note deleted`, res);
      })
      .catch((e) => console.log(`Error al Actualizar`, e));

    return responseDB;
  }
}
