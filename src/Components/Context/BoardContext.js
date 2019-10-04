import React, { useState, createContext } from 'react';
import PropType from 'prop-types';
import Board from '../../Utils/Board';
import Player from '../../Utils/Player';

export const BoardSearchContext = createContext();

const BoardContextProvider = ({ children }) => {
  const initialBoard = ['', '', '', '', '', '', '', '', ''];
  const [clicked, setClicked] = useState([false, false, false, false,
    false, false, false, false, false]);
  const [board, setBoard] = useState(initialBoard);
  const [newBoard, setNewBoard] = useState(null);
  const [newPlayer, setNewPlayer] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(1);
  let maximizing;
  let b;
  const addSymbol = (position, symbol) => {
    setBoard((prevBoard) => {
      const tempBoard = [...prevBoard];
      tempBoard[position] = symbol;
      return tempBoard;
    });
  };

  const newGame = (depth = -1, startingPlayer = 1) => {
    document.getElementById('win').style.display = 'none';
    b = new Board(initialBoard);
    setNewBoard(b);
    setNewPlayer(new Player(Number(depth)));
    setBoard(initialBoard);
    // Initializing some variables for internal use
    const starting = Number(startingPlayer);
    maximizing = starting;
    setPlayerTurn(starting);

    if (!starting) {
      const position = [0, 2, 4, 6, 8];
      const firstChoice = position[Math.floor(Math.random() * position.length)];
      const symbol = !maximizing ? 'x' : 'o';
      newBoard.insert(symbol, firstChoice);
      addSymbol(position[firstChoice], symbol);
      setPlayerTurn(1); // Switch turns
    }
  };

  const showWinner = (winner, direction) => {
    if (winner !== 'draw') {
      for (let i = 0; i < 3; i += 1) {
        document.getElementsByClassName(`cell-${direction[i]}`)[0].style.backgroundColor = 'green';
      }
    }
    document.getElementById('win').style.display = 'block';
    document.getElementById('win').innerHTML = `Winner ${winner}`;
  };

  const checkClicked = (index) => {
    if (clicked[index]) {
      return true;
    }
    return false;
  };

  const handleClick = (index) => {
    if (checkClicked(index) || newBoard.isTerminal() || !playerTurn) return false;
    let symbol = maximizing ? 'x' : 'o'; // Maximizing player is always 'x'
    newBoard.insert(symbol, index);
    addSymbol(index, symbol);

    if (newBoard.isTerminal()) {
      const { winner, direction } = newBoard.isTerminal();
      showWinner(winner, direction);
    }
    setPlayerTurn(0); // Switch turns
    newPlayer.getBestMove(newBoard, !maximizing, (best) => {
      symbol = !maximizing ? 'x' : 'o';
      newBoard.insert(symbol, best);
      addSymbol(best, symbol);
      if (newBoard.isTerminal()) {
        const { winner, direction } = newBoard.isTerminal();
        showWinner(winner, direction);
      }
      setPlayerTurn(1); // Switch turns
    });
    return undefined;
  };

  return (
    <BoardSearchContext.Provider value={{
      clicked,
      setClicked,
      handleClick,
      newGame,
      board,
    }}
    >
      {children}
    </BoardSearchContext.Provider>
  );
};

BoardContextProvider.propTypes = {
  children: PropType.node.isRequired,
};


export default BoardContextProvider;
