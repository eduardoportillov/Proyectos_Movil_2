import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpNoteService {

  url = `http://192.168.0.11:3000`;

  constructor(private http: HttpClient) {}

  postCountNote(notesArray: any) {
    return this.http.post<number>(`${this.url}/contarnotas`, notesArray);
  }
}
