import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  constructor() {}

  ngOnInit() {}
}
