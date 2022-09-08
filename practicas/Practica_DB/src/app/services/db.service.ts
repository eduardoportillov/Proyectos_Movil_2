import { createNgModule, Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  database: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.createDb();
    });
  }

  async createDb() {
    await this.sqlite
      .create({
        name: 'data.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createTables();
      })
      .catch((e) => console.log(e));
  }

  async createTables() {
    // eslint-disable-next-line max-len
    await this.database
      .executeSql(
        'create table if not exists personas(nombres VARCHAR(32), apellidos TEXT, edad INTEGER, fecha_nacimiento TEXT)',
        []
      )
      .then(() => console.log('Executed SQL'))
      .catch((e) => console.log(e));
  }
}
