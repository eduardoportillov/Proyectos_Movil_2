import 'package:flutter/material.dart';
import 'package:proyecto_2_buscador_movies/pages/history_search_movies.dart';
import 'package:proyecto_2_buscador_movies/pages/info_movie_page.dart';
import 'package:proyecto_2_buscador_movies/pages/search_movie_page.dart';

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
        "/": (context) => const SearchMovie(
              title: 'Buscador de Películas',
            ),
        "/infomovie": (context) => const InfoMovie(null),
        "/historySearchMovies": (context) => const HistorySearchMovies(),
      },
    );
  }
}
