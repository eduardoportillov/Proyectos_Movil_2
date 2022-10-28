import 'package:flutter/material.dart';
import 'package:practica_flutter_1/Ejemplo.dart';
import 'package:practica_flutter_1/ListEjemplo.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

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
        "/": (context) => const MyHomePage(title: "Home"),
        "/ejemplo": (context) => const Ejemplo(),
        "/listEjemplo": (context) => const ListEjemplo(), 
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  void _decrementConter() {
    setState(() {
      _counter--;
    });
  }

  void _clenCounter() {
    setState(() {
      _counter = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: getCenterContent(context),
        ),
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            heroTag: "btn1",
            onPressed: _incrementCounter,
            tooltip: 'Increment',
            child: const Icon(Icons.add),
          ),
          const SizedBox(width: 10),
          FloatingActionButton(
            heroTag: "btn2",
            onPressed: _decrementConter,
            tooltip: 'Decrement',
            child: const Icon(Icons.remove),
          ),
          const SizedBox(width: 10),
          FloatingActionButton(
            heroTag: "clean",
            onPressed: _clenCounter,
            tooltip: 'Clean',
            child: const Icon(Icons.clear),
          ),
          FloatingActionButton(
            heroTag: "goto",
            onPressed: () => Navigator.pushNamed(context, "/ejemplo"),
            child: const Icon(Icons.arrow_forward),
          ),
          FloatingActionButton(
            heroTag: "back",
            onPressed: () => Navigator.pushNamed(context, "/listEjemplo"),
            child: const Icon(Icons.arrow_back),
          ),
        ],
      ),
    );
  }

  List<Widget> getCenterContent(BuildContext context) {
    return <Widget>[
      const Text(
        'You have pushed the button this many times:',
      ),
      Text(
        '$_counter',
        style: Theme.of(context).textTheme.headline4,
      ),
    ];
  }
}
