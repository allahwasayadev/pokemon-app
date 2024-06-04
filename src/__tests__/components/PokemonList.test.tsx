import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { useGetPokemonListQuery } from '../../api/pokemonApi';
import pokemonReducer from '../../features/pokemonSlice';
import PokemonList from '../../components/PokemonList';
import { PokemonListResponse } from '../../types/pokemonTypes';

jest.mock('../../api/pokemonApi', () => ({
  ...jest.requireActual('../../api/pokemonApi'),
  useGetPokemonListQuery: jest.fn(),
}));

const mockUseGetPokemonListQuery = useGetPokemonListQuery as jest.Mock;

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('displays loading state initially', () => {
  mockUseGetPokemonListQuery.mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: true,
  });

  render(
    <Provider store={store}>
      <Router>
        <PokemonList />
      </Router>
    </Provider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays list of Pokémon', async () => {
  const mockResponse: PokemonListResponse = {
    count: 2,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  mockUseGetPokemonListQuery.mockReturnValue({
    data: mockResponse,
    error: undefined,
    isLoading: false,
  });

  render(
    <Provider store={store}>
      <Router>
        <PokemonList />
      </Router>
    </Provider>
  );

  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
});

test('displays error message on API failure', async () => {
  mockUseGetPokemonListQuery.mockReturnValue({
    data: undefined,
    error: new Error('Failed to fetch'),
    isLoading: false,
  });

  render(
    <Provider store={store}>
      <Router>
        <PokemonList />
      </Router>
    </Provider>
  );

  await waitFor(() => expect(screen.getByText(/Error loading data/i)).toBeInTheDocument());
});
