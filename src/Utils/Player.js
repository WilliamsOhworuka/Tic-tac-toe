import Board from './Board';

class Player {
  constructor(maxDepth = -1) {
    this.max_depth = maxDepth;
    this.nodes_map = new Map();
  }

  getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
    if (depth === 0) this.nodes_map.clear();
    if (board.isTerminal() || depth === this.max_depth) {
      if (board.isTerminal().winner === 'x') {
        return 100 - depth;
      } if (board.isTerminal().winner === 'o') {
        return -100 + depth;
      }
      return 0;
    }
    // Current player is maximizing
    if (maximizing) {
      let best = -100;
      board.getAvailableMoves().forEach((index) => {
        const child = new Board([...board.state]);
        child.insert('x', index);
        const nodeValue = this.getBestMove(child, false, callback, depth + 1);
        best = Math.max(best, nodeValue);

        if (depth === 0) {
          const moves = this.nodes_map.has(nodeValue) ? `${this.nodes_map.get(nodeValue)},${index}` : index;
          this.nodes_map.set(nodeValue, moves);
        }
      });

      if (depth === 0) {
        let ret;
        if (typeof this.nodes_map.get(best) === 'string') {
          const arr = this.nodes_map.get(best).split(',');
          const rand = Math.floor(Math.random() * arr.length);
          ret = arr[rand];
        } else {
          ret = this.nodes_map.get(best);
        }

        callback(ret);
        return ret;
      }
      return best;
    }

    if (!maximizing) {
      let best = 100;
      board.getAvailableMoves().forEach((index) => {
        const child = new Board([...board.state]);
        child.insert('o', index);

        const nodeValue = this.getBestMove(child, true, callback, depth + 1);
        best = Math.min(best, nodeValue);

        if (depth === 0) {
          const moves = this.nodes_map.has(nodeValue) ? `${this.nodes_map.get(nodeValue)},${index}` : index;
          this.nodes_map.set(nodeValue, moves);
        }
      });

      if (depth === 0) {
        let ret;
        if (typeof this.nodes_map.get(best) === 'string') {
          const arr = this.nodes_map.get(best).split(',');
          const rand = Math.floor(Math.random() * arr.length);
          ret = arr[rand];
        } else {
          ret = this.nodes_map.get(best);
        }

        callback(ret);
        return ret;
      }

      return best;
    }
    return undefined;
  }
}

export default Player;
