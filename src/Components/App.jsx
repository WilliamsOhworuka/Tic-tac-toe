import React from 'react';
import Container from './GameContainer/Container';
import BoardContextProvider from './Context/BoardContext';
import './app.scss';

const App = () => (
  <BoardContextProvider>
    <Container />
  </BoardContextProvider>
);

export default App;
