import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { IonicModule } from '@ionic/angular';

const pages = [NoteComponent];

@NgModule({
  declarations: pages,
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
