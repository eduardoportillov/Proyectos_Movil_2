import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(notes: Note[], text: string): Note[] {
    if (text === '') {
      return notes;
    }

    text = text.toLowerCase();

    return notes.filter((note) => {
      if (note.title.toLowerCase().includes(text)) {
        return note.title.toLowerCase().includes(text);
      } else {
        if (note.type === 'text') {
          return note.description.toLowerCase().includes(text);
        }else{
          // return note.todos.find(todo => todo.content.toLowerCase().includes(text));
        }
      }
    });
  }
}
