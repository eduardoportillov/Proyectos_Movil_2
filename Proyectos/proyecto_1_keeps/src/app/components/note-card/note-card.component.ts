import { Component, Input, OnInit } from '@angular/core';
import { TodoBLL } from 'src/app/bll/TodoBLL';
import { Note } from 'src/app/models/Note';
import { Todo } from 'src/app/models/Todo';
import { DbService } from 'src/app/services/db/db.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note;
  todos: Todo[] = [];

  todoBLL = new TodoBLL();

  constructor(private db: DbService) {
  }

  ngOnInit() {
    console.log('debbuger note ' + this.note.title);
    // if (this.note.type === 'todo') {
    //   this.loadTodo(this.note.id);
    // }
  }

  async loadTodo(noteId: number) {
    const todobll = new TodoBLL();
    this.todos = await todobll.selectByNote(this.db, noteId);
  }

  onClick() {
    // this.noteUpdateDialogService.showDialog(this.note);
    console.log('clicked');
  }
}
