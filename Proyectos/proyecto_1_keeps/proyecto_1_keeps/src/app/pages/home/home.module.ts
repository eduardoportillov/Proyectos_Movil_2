import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NoteCardComponent } from 'src/app/components/note-card/note-card.component';
import { NoteCreateComponent } from 'src/app/components/note-create/note-create.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ExportNoteComponent } from 'src/app/components/export-note/export-note.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, NoteCardComponent, NoteCreateComponent, ExportNoteComponent]
})
export class HomePageModule {}
