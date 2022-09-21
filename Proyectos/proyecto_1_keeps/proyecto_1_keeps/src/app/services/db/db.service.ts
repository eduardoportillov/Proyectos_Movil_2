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
        name: 'note.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createTables();
      })
      .catch((e) => console.log('createDb():' + 'title:' +e.title + ' Message: ' + e.message));
  }

  async createTables() {
    await this.database
      .executeSql(
        // eslint-disable-next-line max-len
        'create table if not exists notes(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, type TEXT NOT NULL, color TEXT)',
        []
      )
      .then(() => console.log('Executed SQL: create table notes'))
      .catch((e) => console.log('Create notes error:' + 'title:' +e.title + ' Message: ' + e.message));

      await this.database
      .executeSql(
        // eslint-disable-next-line max-len
        'create table if not exists todos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, checked BOOLEAN NOT NULL, note_id INTEGER, CONSTRAINT fk_notes foreign key(note_id) references note(id) ON DELETE CASCADE)',
        []
      )
      .then(() => console.log('Executed SQL: create table todos'))
      .catch((e) => console.log('Create todos error:' + 'title:' +e.title + ' Message: ' + e.message));

  }
}
