import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import controls from '../Utils/Controls';
import App from './App';

describe('My tic-tac-toe board', () => {
  afterEach(cleanup);
  test('it should update cell clicked with \'x\'', () => {
    const { getByTestId } = render(<App />);
    const cell = getByTestId('cell-0');
    fireEvent.click(cell);
    const value = getByTestId('cell-0').children[0];

    expect(value.textContent).toBe('x');
  });

  test('it should update board state with \'x\' when cell is clicked', () => {
    const { getByTestId } = render(<App />);
    const cell = getByTestId('cell-0');
    fireEvent.click(cell);

    expect(controls.board.state[0]).toBe('x');
  });

  test('AI should play next when player clicks', () => {
    const { getByTestId } = render(<App />);
    const cell = getByTestId('cell-0');
    fireEvent.click(cell);

    expect(controls.board.state.find((item) => item === 'o')).toBeTruthy();
  });

  test('AI should play first when starting is set to computer', () => {
    const { getByTestId } = render(<App />);
    const startingPlayer = getByTestId('Starting Player');

    fireEvent.click(startingPlayer);
    const option = getByTestId('Computer');
    fireEvent.click(option);

    const newGame = getByTestId('New Game');
    fireEvent.click(newGame);

    expect(controls.board.state.find((item) => item === 'x')).toBeTruthy();
  });

  test('board state should reset when new game button is clicked', () => {
    const { getByTestId } = render(<App />);

    const cell = getByTestId('cell-0');
    fireEvent.click(cell);

    const newGame = getByTestId('New Game');
    fireEvent.click(newGame);

    expect(controls.board.state.every((item) => item === '')).toBeTruthy();
  });
});
