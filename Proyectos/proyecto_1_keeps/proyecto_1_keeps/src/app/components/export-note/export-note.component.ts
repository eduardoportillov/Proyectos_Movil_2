import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db/db.service';
import { HttpNoteService } from 'src/app/services/http/http-note.service';
import { NoteBLL } from 'src/app/bll/NoteBLL';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-export-note',
  templateUrl: './export-note.component.html',
  styleUrls: ['./export-note.component.scss'],
})
export class ExportNoteComponent implements OnInit {
  @Input() notes: Note[];
  nroNotas: number;

  constructor(private api: HttpNoteService) {}

  ngOnInit() {
    this.fetchPostCountNote();
  }

  fetchPostCountNote() {
    this.api.postCountNote(this.notes).subscribe((data) => {
      this.nroNotas = data;
    });
  }
}
