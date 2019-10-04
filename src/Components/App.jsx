import React from 'react';
import Board from './Board/Board';
import BoardContextProvider from './Context/BoardContext';
import './app.scss';

const App = () => (
  <BoardContextProvider>
    <Board />
  </BoardContextProvider>
);

export default App;
