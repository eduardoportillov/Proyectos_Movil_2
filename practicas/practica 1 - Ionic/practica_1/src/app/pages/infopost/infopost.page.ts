import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostlistService } from 'src/app/services/postlist.service';

import { Post } from 'src/models/post';

@Component({
  selector: 'app-infopost',
  templateUrl: './infopost.page.html',
  styleUrls: ['./infopost.page.scss'],
})
export class InfopostPage implements OnInit {
  infoPost: Post;
  constructor(
    private route: ActivatedRoute,
    private api: PostlistService
  ) {}

  fetchPost(id) {
    this.api.getPostByKey(id).subscribe((data) => {
      console.log(data);
      this.infoPost = data;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if(params.has('id')){
      this.fetchPost(params.get('id'));
      }
    });
  }
}
