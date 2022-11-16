import 'package:flutter/material.dart';
import 'package:proyecto_2_buscador_movies/bll/movie_bll.dart';
import 'package:proyecto_2_buscador_movies/models/MovieDB.dart';
import 'package:proyecto_2_buscador_movies/models/movie.dart';

class InfoMovie extends StatefulWidget {
  final int? idMovie;
  const InfoMovie(this.idMovie, {super.key});

  @override
  State<InfoMovie> createState() => _InfoMovieState();
}

class _InfoMovieState extends State<InfoMovie> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle de la pelicula'),
      ),
      body: FutureBuilder<MovieDB?>(
        future: MovieDbBLL.getMovieDB(widget.idMovie),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            MovieDB? movieDB = snapshot.data;
            return getCardMovieView(movieDB);
          }
          if (snapshot.hasError) {
            return const Center(child: Text('Error al obtener los datos'));
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }

  getCardMovieView(MovieDB? movie) {
    return Column(mainAxisSize: MainAxisSize.min, children: [
      Image.network(
        'https://image.tmdb.org/t/p/original${movie?.poster_path}',
        width: 200,
      ),
      Text("Titulo: ${movie?.title ?? ''}"),
      Text(""),
      Text("Resumen: ${movie?.overview ?? ''}"),
      Text(""),
      Text("User Score: ${movie?.user_score ?? ''}"),
      Text(""),
      Text("Año: ${movie?.age ?? ''}"),
      Text(""),
      Text("Genero: ${movie?.gender ?? ''}"),
    ]);
  }
}
