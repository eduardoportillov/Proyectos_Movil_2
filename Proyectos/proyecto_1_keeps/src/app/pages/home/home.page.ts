import { Component, OnInit } from '@angular/core';
import { NoteBLL } from 'src/app/bll/NoteBLL';
import { TodoBLL } from 'src/app/bll/TodoBLL';
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
  todoBLL = new TodoBLL();

  textoBuscar= '';

  constructor(private db: DbService) {
    // this.notaBLL.insert(this.db, 'Prueba text', 'texto', 'este es una nota de texto');
    // this.notaBLL.insert(this.db, 'Prueba Todo', 'todo');
    // this.todoBLL.insert(this.db, '1 todo', false, 17);
    // this.todoBLL.insert(this.db, '2 todo', false, 17);
    // this.todoBLL.insert(this.db, '3 todo', false, 17);
    // this.todoBLL.insert(this.db, '5 todo', true, 17);
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

  onSearch(event) {
    this.textoBuscar = event.detail.value;
  }
}
