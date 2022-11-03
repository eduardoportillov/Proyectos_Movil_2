import 'package:flutter/material.dart';

import 'models/post.dart';

class DetailPost extends StatelessWidget {
  final Post post;

  const DetailPost(this.post, {super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del post'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(post.title, style: Theme.of(context).textTheme.headlineSmall),
            Text(post.body),
          ],
        ),
      ),
    );
  }
}
