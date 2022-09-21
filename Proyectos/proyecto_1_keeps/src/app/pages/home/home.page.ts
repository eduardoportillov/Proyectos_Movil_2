import { Component, OnInit } from '@angular/core';
import { NoteBLL } from 'src/app/bll/NoteBLL';
import { Note } from 'src/app/models/Note';
import { DbService } from 'src/app/services/db/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Note[] = [];
  notaBLL = new NoteBLL();

  constructor(private db: DbService) {
    // this.notaBLL.insert(this.db, 'Prueba', 'text', 'Esta es una prueba');
  }

  ngOnInit(){
    this.loadNotas();
  }

  doRefresh(event) {
    this.loadNotas();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async loadNotas() {
    const notebll = new NoteBLL();
    this.notes = await notebll.selectAll(this.db);
  }

  async delete(id: number) {
    const notebll = new NoteBLL();
    await notebll.delete(this.db, id);
    this.loadNotas();
  }
}
