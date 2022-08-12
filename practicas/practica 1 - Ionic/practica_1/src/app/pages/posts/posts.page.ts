import { Component, OnInit } from '@angular/core';
import { PostlistService } from 'src/app/services/postlist.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: Post[];
  constructor(private api: PostlistService) {
    this.fetchPostList();
  }

  fetchPostList() {
    this.api.getPostList().subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnInit(){}
}
