import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
})
export class NoteCreateComponent implements OnInit {
  public oppened = false;
  public displayAssignee = false;

  constructor() {}

  ngOnInit() {}

  autoResizeBody(ta: any) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  onBodyFocus() {
    this.oppened = true;
  }

  toggleAssignee() {
    this.displayAssignee = !this.displayAssignee;
  }

  async onSubmit(f: NgForm) {}
}
