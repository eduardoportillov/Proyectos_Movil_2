import 'dart:io';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseProvider {
  DatabaseProvider._();
  static Database? _database;
  static final DatabaseProvider db = DatabaseProvider._();

  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await initDB();
    return _database!;
  }

  static initDB() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = join(documentsDirectory.path, "dbmovies.db");
    return await openDatabase(path, version: 1, onOpen: (db) {},
        onCreate: (Database db, int version) async {
      await db.execute("CREATE TABLE IF NOT EXISTS history_search_movie ("
          "id INTEGER PRIMARY KEY,"
          "title TEXT,"
          "age TEXT,"
          "runtime INTEGER,"
          "gender TEXT,"
          "poster_path TEXT,"
          "overview TEXT,"
          "user_score TEXT"
          ")");
    });
  }
}
