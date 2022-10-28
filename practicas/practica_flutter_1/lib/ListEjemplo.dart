import 'package:flutter/material.dart';

class ListEjemplo extends StatelessWidget {
  const ListEjemplo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: getListViewFromArray(),
    );
  }

  ListView getListViewFromArray() {
    var listItems = getListElements();
    // var listView = ListView.separated()
    return ListView.builder(
        itemBuilder: (context, index) {
          return ListTile(
            leading: Icon(Icons.arrow_right),
            title: Text(listItems[index]),
            onTap: () {
              debugPrint('${listItems[index]} was tapped');
            },
          );
        },
        itemCount: listItems.length);
  }

  getListElements() {
    var items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
    return items;
  }
}
