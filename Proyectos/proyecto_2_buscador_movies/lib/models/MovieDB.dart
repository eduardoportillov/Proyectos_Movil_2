import 'package:meta/meta.dart';
import 'dart:convert';

MovieDB MovieDBFromJson(String str) => MovieDB.fromJson(json.decode(str));

String MovieDBToJson(MovieDB data) => json.encode(data.toJson());

class MovieDB {
  MovieDB({
    required this.id,
    required this.title,
    required this.age,
    required this.runtime,
    required this.gender,
    required this.poster_path,
    required this.overview,
    required this.user_score,
  });

  int? id;
  String? title;
  String? age;
  int? runtime;
  String? gender;
  String? poster_path;
  String? overview;
  String? user_score;

  factory MovieDB.fromJson(Map<String, dynamic> json) => MovieDB(
        id: json["id"],
        title: json["title"],
        age: json["age"],
        runtime: json["runtime"],
        gender: json["gender"],
        poster_path: json["poster_path"],
        overview: json["overview"],
        user_score: json["user_score"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "age": age,
        "runtime": runtime,
        "gender": gender,
        "poster_path": poster_path,
        "overview": overview,
        "user_score": user_score,
      };
}
