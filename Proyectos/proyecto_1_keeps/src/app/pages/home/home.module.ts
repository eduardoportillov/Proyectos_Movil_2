import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NoteCardComponent } from 'src/app/components/note-card/note-card.component';
import { NoteCreateComponent } from 'src/app/components/note-create/note-create.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NoteCardComponent]
})
export class HomePageModule {}
