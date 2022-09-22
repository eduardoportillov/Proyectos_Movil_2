import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TodoBLL } from 'src/app/bll/TodoBLL';
import { Note } from 'src/app/models/Note';
import { Todo } from 'src/app/models/Todo';
import { DbService } from 'src/app/services/db/db.service';
import { ExportNoteComponent } from '../export-note/export-note.component';
import { NoteUpdateComponent } from '../note-update/note-update.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note;
  todos: Todo[] = [];

  todoBLL = new TodoBLL();

  color: string;

  constructor(
    private db: DbService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.color = this.note.color;
    if (this.note.type === 'todo') {
      this.loadTodo(this.note.id);
    }
  }

  async onChecked(todo: Todo) {
    const todobll = new TodoBLL();
    await todobll.updateChecked(this.db, todo.id, todo.checked);
    console.log(todo);
  }

  async loadTodo(noteId: number) {
    const todobll = new TodoBLL();
    this.todos = await todobll.selectByNote(this.db, noteId);
    this.todos.forEach((todo) => {
      todo.checked = todo.checked as unknown === 1 ? true : false;
    });
  }

  async mostrarPopEditNote() {
    const popOver = await this.popoverController.create({
      component: NoteUpdateComponent,
      componentProps: { note: this.note },
    });
    await popOver.present();
  }
}
