import React, { useContext, useEffect } from 'react';
import { BoardSearchContext } from '../Context/BoardContext';
import Cell from './Cell/Cell';
import './Board.scss';

const Board = () => {
  const {
    handleClick, board, handleReset, winCoords,
  } = useContext(BoardSearchContext);

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div id="board">
      {board.map((cell, index) => {
        const win = winCoords ? winCoords.includes(index) : null;
        return (
          <Cell
            className={win ? `cell-${index} win` : `cell-${index}`}
            testId={`cell-${index}`}
            onClick={() => handleClick(index)}
          >
            <p>{cell}</p>
          </Cell>
        );
      })}
    </div>
  );
};

export default Board;
