import 'package:flutter/material.dart';
import 'package:practica_flutter_http/post_list_page.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: "/",
      routes: {
        "/": (context) => const PostListPage(),
        "/postListPage": (context) => const PostListPage(),
      },
    );
  }
}
