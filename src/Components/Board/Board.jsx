import React, { useContext, useEffect } from 'react';
import { BoardSearchContext } from '../Context/BoardContext';
import Cell from './Cell/Cell';
import './Board.scss';

const Board = () => {
  const { handleClick, board, newGame } = useContext(BoardSearchContext);

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div id="board">
      <p className="winner" id="win">jbsbksbsvn,snvn</p>
      {board.map((cell, index) => <Cell className={`cell-${index}`} onClick={() => handleClick(index)}>{cell}</Cell>)}
      <button type="button" className="new" onClick={() => newGame()}>New Game</button>
    </div>
  );
};

export default Board;
