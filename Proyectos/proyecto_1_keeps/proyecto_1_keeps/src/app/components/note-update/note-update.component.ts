import { Component, OnInit, Input } from '@angular/core';
import { NoteBLL } from 'src/app/bll/NoteBLL';
import { Note } from 'src/app/models/Note';
import { DbService } from 'src/app/services/db/db.service';

@Component({
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.scss'],
})
export class NoteUpdateComponent implements OnInit {
  @Input() note: Note;
  title;
  description;
  color;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.color = this.note.color;
  }

  async onSubmit() {
    console.log(this.title, this.description, this.color);
    const notebll = new NoteBLL();
    await notebll.update(
      this.db,
      this.note.id,
      this.title,
      this.description,
      this.color
    );
  }

  setColorOption($event) {
    this.color = $event.target.value;
  }
}
