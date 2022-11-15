import 'package:flutter/material.dart';
import 'package:http/http.dart';

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

  List<Result> listMovies = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(mainAxisSize: MainAxisSize.min, children: [
        Expanded(child: getForm(context)),
        Expanded(child: getListView(listMovies)),
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
              hintText: "Ingrese el título",
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
                  getMoviesFromApi();
                  setState(() {});
                }
              },
              child: const Text('Buscar Pelicula'),
            ),
          ),
        ],
      ),
    );
  }

  getMoviesFromApi() async {
    var url = Uri.parse(
        '${widget.URL_TMDB}/search/movie?api_key=${widget.api_key}&query=${_queryController.text}');
    final response = await get(url);
    if (response.statusCode == 200) {
      listMovies = responseApiMovieFromJson(response.body).results;
    } else {
      return [];
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
          urlImage = "https://tytenlinea.com/wp-content/uploads/2016/03/NO.png";
        }

        return ListTile(
          leading: Image.network('${urlImage}'),
          title: Text(listaMovies[index].title),
          subtitle: Text(listaMovies[index].overview),
        );
      },
    );
  }
}
