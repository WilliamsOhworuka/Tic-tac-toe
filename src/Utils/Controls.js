import Board from './Board';
import Player from './Player';

export default {
  starting: null,
  maximizing: null,
  board: null,
  player: null,
  playerTurn: null,

  newGame(depth = -1, startingPlayer = 1, addSymbol) {
    this.player = new Player(Number(depth));
    this.board = new Board();
    this.starting = Number(startingPlayer);
    this.maximizing = this.starting;
    this.playerTurn = this.starting;

    if (!this.starting) {
      const position = [0, 2, 4, 6, 8];
      const firstChoice = position[Math.floor(Math.random() * position.length)];
      const symbol = !this.maximizing ? 'x' : 'o';
      this.board.insert(symbol, firstChoice);
      addSymbol(firstChoice, symbol);
      this.playerTurn = 1;
    }
  },

  play(index, showWinner, addSymbol) {
    if (this.board.isTerminal() || !this.playerTurn) return false;
    let symbol = this.maximizing ? 'x' : 'o'; // Maximizing player is always 'x'
    this.board.insert(symbol, index);
    addSymbol(index, symbol);

    if (this.board.isTerminal()) {
      const { winner, direction } = this.board.isTerminal();
      showWinner(winner, direction);
      return undefined;
    }

    this.playerTurn = 0; // Switch turns
    this.player.getBestMove(this.board, !this.maximizing, (best) => {
      symbol = !this.maximizing ? 'x' : 'o';
      this.board.insert(symbol, best);
      addSymbol(best, symbol);
      if (this.board.isTerminal()) {
        const { winner, direction } = this.board.isTerminal();
        showWinner(winner, direction);
      }
      this.playerTurn = 1; // Switch turns
    });
    return undefined;
  },
};
