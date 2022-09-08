import { Component } from '@angular/core';
import { PersonaBLL } from 'src/app/bll/PersonaBLL';
import { Persona } from 'src/app/models/Persona';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  personas: Persona[];
  personaBLL = new PersonaBLL();

  constructor(private db: DbService) {
    this.personaBLL.insert(db, 'Juan', 'Perez', 25, '1995-01-01');
    this.loadPersonas();
  }

  async loadPersonas() {
    const bll = new PersonaBLL();
    this.personas = await bll. selectAll(this.db);
  }
}
