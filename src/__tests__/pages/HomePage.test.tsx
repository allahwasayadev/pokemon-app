import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import pokemonReducer from '../../features/pokemonSlice';
import { pokemonApi } from '../../api/pokemonApi';
import { useGetPokemonListQuery } from '../../api/pokemonApi';
import { PokemonListResponse } from '../../types/pokemonTypes';

jest.mock('../../api/pokemonApi', () => ({
  ...jest.requireActual('../../api/pokemonApi'),
  useGetPokemonListQuery: jest.fn(),
}));

const mockUseGetPokemonListQuery = useGetPokemonListQuery as jest.Mock;

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

const renderHomePage = () => {
  return render(
    <Provider store={store}>
      <Router>
        <HomePage />
      </Router>
    </Provider>
  );
};

test('renders the PokemonList component and handles API response', async () => {
  const mockResponse: PokemonListResponse = {
    count: 20,
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

  renderHomePage();

  expect(screen.getByText('Welcome to the Pokemon App')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Pokemon List')).toBeInTheDocument());
  expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  expect(screen.getByText('ivysaur')).toBeInTheDocument();
});