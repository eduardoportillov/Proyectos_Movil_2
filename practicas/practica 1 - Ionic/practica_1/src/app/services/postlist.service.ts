import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostlistService {

  constructor(private http: HttpClient) { }

  getPostList() {
    // get post list from jsonplaceholder with http
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

}
