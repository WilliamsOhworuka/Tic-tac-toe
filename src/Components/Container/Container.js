import React, { useContext } from 'react';
import Board from '../Board/Board';
import { BoardSearchContext } from '../Context/BoardContext';
import Dropdown from '../Dropdown/Dropdown';
import Result from '../Result/Result';
import './Container.scss';

const Container = () => {
  let result;
  const dificulty = [{ text: 'Easy', value: 2 }, { text: 'Medium', value: 4 }, { text: 'Hard', value: -1 }];
  const starting = [{ text: 'Human', value: 1 }, { text: 'Computer', value: 0 }];

  const {
    setOptions, handleReset, winner,
  } = useContext(BoardSearchContext);

  if (winner) {
    result = winner === 1 ? <Result exclamation="Horray" emoji="https://img.icons8.com/color/70/000000/confetti.png" text="You win" />
      : <Result exclamation="Well played" emoji="https://img.icons8.com/cute-clipart/70/000000/facebook-like.png" text="Its a DRAW" />;
  } else {
    result = winner === 0 ? <Result exclamation="Sorry" emoji="https://img.icons8.com/dusk/70/000000/sad.png" text="You Lose" /> : null;
  }

  return (
    <div className="gameContainer">
      <div className="controls">
        <Dropdown type="Starting Player" defaultValue={starting[0].text} options={starting} setState={setOptions} id="turns" />
        <Dropdown type="Difficulty" defaultValue={dificulty[0].text} options={dificulty} setState={setOptions} id="depth" />
        <button type="button" onClick={handleReset} data-testid="New Game"> New Game </button>
      </div>
      <Board />
      {result}
    </div>
  );
};

export default Container;
