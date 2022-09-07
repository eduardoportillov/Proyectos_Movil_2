import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  valor = '0';
  valorAntiguo = '0';

  operacionAnterior = 'x';
  listoParaNuevoInput = true;
  GrupoNumeros = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];

  onButtonPress(symbol) {
    console.log(symbol);

      if (!isNaN(symbol)) {
      console.log('is a number');
      if (this.listoParaNuevoInput)
        {this.valor = '' + symbol;}
      else
        {this.valor += '' + symbol;}
      this.listoParaNuevoInput = false;
    }
    else if (symbol === 'c') {
      this.valor = '0';
      this.listoParaNuevoInput = true;
    }
    else if (symbol === '=') {
      if (this.operacionAnterior === 'x')
        {this.valor = '' + (parseInt(this.valorAntiguo) * parseInt(this.valor));}
      else if (this.operacionAnterior === '-')
        {this.valor = '' + (parseInt(this.valorAntiguo) - parseInt(this.valor));}
      else if (this.operacionAnterior === '+')
        {this.valor = '' + (parseInt(this.valorAntiguo) + parseInt(this.valor));}
      else if (this.operacionAnterior === '/')
        {this.valor = '' + (parseInt(this.valorAntiguo) / parseInt(this.valor));}
      this.listoParaNuevoInput = true;
    }
    else { // operator
      this.listoParaNuevoInput = true;
      this.valorAntiguo = this.valor;
      this.operacionAnterior = symbol;
    }
  }
}
