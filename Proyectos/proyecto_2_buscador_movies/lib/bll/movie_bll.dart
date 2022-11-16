import '../models/MovieDB.dart';
import '../providers/database_provider.dart';

class MovieDbBLL {
  static Future<List<MovieDB>> getMovieDBs() async {
    final db = await DatabaseProvider.database;
    var res = await db.query("history_search_movie");
    List<MovieDB> list =
        res.isNotEmpty ? res.map((c) => MovieDB.fromJson(c)).toList() : [];
    return list;
  }

  static Future<MovieDB?> getMovieDB(int? id) async {
    final db = await DatabaseProvider.database;
    var res = await db
        .query("history_search_movie", where: "id = ?", whereArgs: [id]);
    return res.isNotEmpty ? MovieDB.fromJson(res.first) : null;
  }

  static Future<int> insertMovieDB(MovieDB MovieDB) async {
    final db = await DatabaseProvider.database;
    var res = await db.insert("history_search_movie", MovieDB.toJson());
    return res;
  }

  static Future<int> updateMovieDB(MovieDB MovieDB) async {
    final db = await DatabaseProvider.database;
    var res = await db.update("history_search_movie", MovieDB.toJson(),
        where: "id = ?", whereArgs: [MovieDB.id]);
    return res;
  }

  static Future<int> deleteMovieDB(int id) async {
    final db = await DatabaseProvider.database;
    var res = await db
        .delete("history_search_movie", where: "id = ?", whereArgs: [id]);
    return res;
  }
}
