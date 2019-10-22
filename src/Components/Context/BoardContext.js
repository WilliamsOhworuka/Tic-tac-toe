import React, { useState, createContext } from 'react';
import PropType from 'prop-types';
import controls from '../../Utils/Controls';

export const BoardSearchContext = createContext();

const BoardContextProvider = ({ children }) => {
  const initialBoard = ['', '', '', '', '', '', '', '', ''];
  const [clicked, setClicked] = useState([false, false, false, false,
    false, false, false, false, false]);
  const [board, setBoard] = useState(initialBoard);
  const [winCoords, setWinCoords] = useState(null);
  const [depth, setDepth] = useState(2);
  const [starting, setStarting] = useState(1);
  const [winner, setWinner] = useState(null);

  const setOptions = (type, value) => {
    if (type === 'Starting Player') {
      setStarting(value);
    } else {
      setDepth(value);
    }
  };

  const addSymbol = (position, symbol) => {
    setBoard((prevBoard) => {
      const tempBoard = [...prevBoard];
      tempBoard[position] = symbol;
      return tempBoard;
    });
  };

  const showWinner = (win, direction) => {
    if (win !== 'draw') { setWinCoords(direction); }
    switch (win) {
      case 'x':
        if (starting === 1) {
          setWinner(1);
        } else {
          setWinner(0);
        }
        break;
      case 'o':
        if (starting === 1) {
          setWinner(0);
        } else {
          setWinner(1);
        }
        break;
      default:
        setWinner(-1);
    }
  };


  const checkClicked = (index) => {
    if (clicked[index]) {
      return true;
    }
    return false;
  };

  const handleReset = () => {
    setWinner(null);
    setWinCoords(null);
    setBoard((prevState) => prevState.map(() => ''));
    setClicked((prevState) => prevState.map(() => false));
    controls.newGame(depth, starting, addSymbol);
  };

  const handleClick = (index) => {
    if (!checkClicked(index)) {
      setClicked((prevState) => {
        const temp = [...prevState];
        temp[index] = true;
        return temp;
      });
      controls.play(index, showWinner, addSymbol);
    }
  };

  return (
    <BoardSearchContext.Provider value={{
      handleClick,
      handleReset,
      winCoords,
      board,
      setOptions,
      winner,
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
