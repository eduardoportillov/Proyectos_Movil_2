import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NoteBLL } from 'src/app/bll/NoteBLL';
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

  color: string;

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
