import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:proyecto_2_buscador_movies/models/MovieDB.dart';
import 'package:proyecto_2_buscador_movies/models/movie.dart';

import '../bll/movie_bll.dart';
import '../models/ResponseApiMovie.dart';

class SearchMovie extends StatefulWidget {
  const SearchMovie({super.key, required this.title});

  final String title;

  final String URL_TMDB = "https://api.themoviedb.org/3";
  final String api_key = "db4ca37a177e5e6182de918e6d531984";

  @override
  State<SearchMovie> createState() => _SearchMovieState();
}

class _SearchMovieState extends State<SearchMovie> {
  final _formKey = GlobalKey<FormState>();
  final _queryController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(mainAxisSize: MainAxisSize.min, children: [
        Expanded(child: getForm(context)),
        Expanded(
            child: FutureBuilder<List<Result>>(
          future: getMoviesFromApi(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<Result> listaResults = snapshot.data as List<Result>;
              return getListView(listaResults);
            }
            if (snapshot.hasError) {
              return const Center(child: Text('Error al obtener los datos'));
            }
            return const Center(child: CircularProgressIndicator());
          },
        )),
      ]),
    );
  }

  getForm(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextFormField(
            controller: _queryController,
            decoration: const InputDecoration(
              labelText: "Título",
              hintText: "Ingrese el título o el año de la película",
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Por favor ingrese el título';
              }
              return null;
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: ElevatedButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) {
                  setState(() {});
                }
              },
              child: const Text('Buscar Pelicula'),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/historySearchMovies')
                  .then((value) => setState(() {}));
            },
            child: const Text("Historial de Búsquedas"),
          ),
        ],
      ),
    );
  }

  Future<List<Result>> getMoviesFromApi() async {
    var url = Uri.parse(
        '${widget.URL_TMDB}/search/movie?api_key=${widget.api_key}&query=${_queryController.text}');
    final response = await get(url);
    if (response.statusCode == 200) {
      return responseApiMovieFromJson(response.body).results;
    } else {
      return [];
    }
  }

  Future<Movie> getMovieByKeyFromApi(int movieKey) async {
    var url = Uri.parse(
        '${widget.URL_TMDB}/movie/${movieKey}?api_key=${widget.api_key}');
    final response = await get(url);
    if (response.statusCode == 200) {
      // movie = movieFromJson(response.body);
      return movieFromJson(response.body);
    } else {
      throw Exception('Error al obtener los datos');
    }
  }

  getListView(List<Result> listaMovies) {
    String urlImage;

    return ListView.builder(
        itemCount: listaMovies.length,
        itemBuilder: (context, index) {
          if (listaMovies[index].posterPath != null) {
            urlImage =
                'https://image.tmdb.org/t/p/w500${listaMovies[index].posterPath}';
          } else {
            urlImage =
                "https://tytenlinea.com/wp-content/uploads/2016/03/NO.png";
          }

          return ListTile(
            leading: Image.network('${urlImage}'),
            title: Text(listaMovies[index].title),
            subtitle: Text(listaMovies[index].overview),
            onTap: () async {
              Movie movie = await getMovieByKeyFromApi(listaMovies[index].id);
              if (movie != null) {
                await CreateMovieInDB(movie);

                // ignore: use_build_context_synchronously
                // Navigator.pushNamed(context, '/infomovie',
                //     arguments: movie?.id);
              }
            },
          );
        });
  }

  // ignore: non_constant_identifier_names
  CreateMovieInDB(Movie movie) async {
    MovieDbBLL.getMovieDB(movie.id).then((value) {
      String urlImage;
      if (movie.posterPath != null) {
        urlImage = 'https://image.tmdb.org/t/p/w500${movie.posterPath}';
      } else {
        urlImage = "https://tytenlinea.com/wp-content/uploads/2016/03/NO.png";
      }

      if (value == null) {
        MovieDB movieDB = MovieDB(
            id: movie.id,
            title: movie.title,
            age: movie.releaseDate,
            runtime: movie.runtime,
            gender: movie.genres.toString(),
            poster_path: urlImage,
            overview: movie.overview,
            user_score: movie.voteAverage.toString());

        MovieDbBLL.insertMovieDB(movieDB);
      }
    });
  }
}
