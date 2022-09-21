import { Component } from '@angular/core';
import { NoteBLL } from 'src/app/bll/NoteBLL';
import { Note } from 'src/app/models/Note';
import { DbService } from 'src/app/services/db/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];
  notaBLL = new NoteBLL();

  constructor(private db: DbService) {
    this.loadNotas();
  }

  async loadNotas() {
    const notebll = new NoteBLL();
    this.notes = await notebll.selectAll(this.db);
  }
}
