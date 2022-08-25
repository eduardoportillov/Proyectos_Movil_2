import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostlistService {
  url = `https://jsonplaceholder.typicode.com`;

  constructor(private http: HttpClient) {}

  getPostList() {
    // get post list from jsonplaceholder with http
    return this.http.get<Post[]>(`${this.url}/posts`);
  }

  getPostByKey(key: number) {
    return this.http.get<Post>(`${this.url}/posts/${key}`);
  }

}
