import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../bll/movie_bll.dart';
import '../models/MovieDB.dart';
import 'info_movie_page.dart';

class HistorySearchMovies extends StatefulWidget {
  const HistorySearchMovies({super.key});

  @override
  State<HistorySearchMovies> createState() => _HistorySearchMovies();
}

class _HistorySearchMovies extends State<HistorySearchMovies> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de MovieDBs'),
      ),
      body: FutureBuilder<List<MovieDB>>(
        future: MovieDbBLL.getMovieDBs(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<MovieDB> listaMovieDBs = snapshot.data as List<MovieDB>;
            return getListView(listaMovieDBs);
          }
          if (snapshot.hasError) {
            return const Center(child: Text('Error al obtener los datos'));
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}

Widget getListView(List<MovieDB> listaMovieDBs) {
  return ListView.builder(
    itemCount: listaMovieDBs.length,
    itemBuilder: (context, index) {
      return ListTile(
        leading: Image.network(listaMovieDBs[index].poster_path ?? ""),
        title: Text(listaMovieDBs[index].title ?? ""),
        subtitle: Text(listaMovieDBs[index].overview ?? ""),
        onTap: () {
          // ignore: use_build_context_synchronously
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => InfoMovie(listaMovieDBs[index].id)));
        },
      );
    },
  );
}
