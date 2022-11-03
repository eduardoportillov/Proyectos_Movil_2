import 'package:flutter/material.dart';
import 'package:http/http.dart';

import 'details_post.dart';
import 'models/post.dart';

class PostListPage extends StatelessWidget {
  const PostListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de posts'),
      ),
      body: getFutureListFromApi(),
    );
  }

  getFutureListFromApi() {
    return FutureBuilder<List<Post>>(
      future: getPostsFromApi(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          List<Post> listaPosts = snapshot.data as List<Post>;
          return getListView(listaPosts);
        }
        if (snapshot.hasError) {
          return const Center(child: Text('Error al obtener los datos'));
        }
        return const Center(child: CircularProgressIndicator());
      },
    );
  }

  Future<List<Post>> getPostsFromApi() async {
    final response =
        await get(Uri.parse('https://jsonplaceholder.typicode.com/posts'));
    if (response.statusCode == 200) {
      return postFromJson(response.body);
    } else {
      throw Exception('Failed to load posts');
    }
  }

  getListView(List<Post> listaPosts) {
    return ListView.builder(
      itemCount: listaPosts.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(listaPosts[index].title,
              style: Theme.of(context).textTheme.headlineSmall),
          subtitle: Text(listaPosts[index].body),
          trailing: const Icon(Icons.arrow_forward),
          onTap: () {
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => DetailPost(listaPosts[index])));
          },
        );
      },
    );
  }
}
