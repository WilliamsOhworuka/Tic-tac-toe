class Board {
  constructor(state = ['', '', '', '', '', '', '', '', '']) {
    this.state = state;
  }

  isEmpty() {
    return this.state.every((cell) => cell === !cell);
  }

  isFull() {
    return this.state.every((cell) => cell);
  }

  isTerminal() {
    if (this.isEmpty()) return false;

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let row = 1;
    for (let i = 0; i < lines.length; i += 1) {
      row = row > 3 ? 1 : row;
      const [a, b, c] = lines[i];
      if (this.state[a] === this.state[b] && this.state[a] === this.state[c] && this.state[a]) {
        return { winner: this.state[a], direction: [a, b, c] };
      }
      row += 1;
    }
    if (this.isFull()) {
      return { winner: 'draw' };
    }

    // return false otherwise
    return false;
  }

  insert(symbol, position) {
    // Cell is either occupied or does not exist
    if (position > 8 || this.state[position]) return false;
    this.state[position] = symbol;
    return true;
  }

  getAvailableMoves() {
    const moves = [];
    for (let i = 0; i < this.state.length; i += 1) {
      if (!this.state[i]) moves.push(i);
    }
    return moves;
  }
}

export default Board;
