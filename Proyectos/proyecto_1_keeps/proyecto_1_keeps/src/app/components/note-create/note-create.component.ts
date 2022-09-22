import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NoteBLL } from 'src/app/bll/NoteBLL';
import { TodoBLL } from 'src/app/bll/TodoBLL';
import { Todo } from 'src/app/models/Todo';
import { DbService } from 'src/app/services/db/db.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
})
export class NoteCreateComponent implements OnInit {
  opened = false;
  type = 'text';

  formText: FormGroup;

  notaBLL = new NoteBLL();
  todoBll = new TodoBLL();

  color: string;

  todosArray: Todo[] = [];

  contentTodo: string;

  titleTodo: string;

  idNote: number;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.formText = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onBodyFocus() {
    this.opened = true;
  }

  onTodo() {
    this.type = 'todo';
  }

  onText() {
    this.type = 'text';
  }

  setColorOption(e) {
    this.color = e.detail.value;
  }

  async guardarTarea() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const todo: Todo = { content: this.contentTodo, checked: false };
    this.todosArray.push(todo);
    this.contentTodo = '';
  }

  async guardarNoteTodo() {
    this.idNote = await this.notaBLL.insert(
      this.db,
      this.titleTodo,
      this.type,
      this.color
    );
    this.todosArray.forEach(todo => {
      this.todoBll.insert(
        this.db,
        todo.content,
        todo.checked,
        this.idNote,
      );
    });

    this.todosArray = [];
    this.opened = false;
    console.log('todo: ' + this.idNote);
  }

  eliminarTarea(indice: number) {
    const confirma = confirm('¿Realmente quiere eliminar la tarea?');
    if (!confirma) {
      return;
    }
    this.todosArray.splice(indice, 1);
  }

  // cambiarEstadoDeTarea(){}

  async onSubmit() {
    if (this.formText.valid) {
      if (this.type === 'text') {
        const notebll = new NoteBLL();
        await notebll.insert(
          this.db,
          this.formText.value.title,
          this.type,
          this.formText.value.description,
          this.color
        );
      }

      this.opened = false;
    } else {
      this.opened = false;
    }
  }
}
