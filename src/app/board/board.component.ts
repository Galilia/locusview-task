import {Component, Input, OnInit} from '@angular/core';
import {forEachToken} from 'tslint';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  readonly lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  squares: string[] = [];
  xIsNext: boolean;
  winner: string;

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(i: number) {
    if (!this.squares[i]) {
      this.squares.splice(i, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.calculateWinner();
  }

  calculateWinner() {
    this.lines.forEach(line => {
      const [a, b, c] = line;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winner = this.squares[a];
      }
    });
  }

}
