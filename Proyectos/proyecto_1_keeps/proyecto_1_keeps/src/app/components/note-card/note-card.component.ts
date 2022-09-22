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

  color: string;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.color = this.note.color;
    if (this.note.type === 'todo') {
      this.loadTodo(this.note.id);
    }
  }

  async onChecked(todo: Todo) {
    const todobll = new TodoBLL();
    if (todo.checked === true) {
      await todobll.updateChecked(this.db, todo.id, false);
    } else {
      await todobll.updateChecked(this.db, todo.id, true);
    }
  }

  async loadTodo(noteId: number) {
    const todobll = new TodoBLL();
    this.todos = await todobll.selectByNote(this.db, noteId);
  }

  onClick(id: number) {
    // this.noteUpdateDialogService.showDialog(this.note);
  }
}
