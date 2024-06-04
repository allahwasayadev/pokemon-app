import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonPage from '../../pages/PokemonPage';
import pokemonReducer from '../../features/pokemonSlice';
import { pokemonApi } from '../../api/pokemonApi';

jest.mock('../../api/pokemonApi', () => ({
  ...jest.requireActual('../../api/pokemonApi'),
  useGetPokemonByIdQuery: jest.fn(),
}));

const mockUseGetPokemonByIdQuery = require('../../api/pokemonApi').useGetPokemonByIdQuery;

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

const renderPokemonPage = (id: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/pokemon/${id}`]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

test('renders PokemonPage and displays loading state', () => {
  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: true,
  });

  renderPokemonPage('1');

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders PokemonPage and displays error state', async () => {
  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: undefined,
    error: new Error('Failed to fetch'),
    isLoading: false,
  });

  renderPokemonPage('1');

  await waitFor(() => expect(screen.getByText('Error loading data. Please try again later.')).toBeInTheDocument());
});

test('renders PokemonPage and displays Pokémon details', async () => {
  const mockPokemonDetail = {
    name: 'bulbasaur',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    abilities: [
      { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
      { ability: { name: 'chlorophyll', url: '' }, is_hidden: true, slot: 3 },
    ],
    stats: [
      { base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } },
      { base_stat: 49, effort: 0, stat: { name: 'special-defense', url: '' } },
    ],
    types: [
      { slot: 1, type: { name: 'grass', url: '' } },
      { slot: 2, type: { name: 'poison', url: '' } },
    ],
    forms: [{ name: 'bulbasaur', url: '' }],
    moves: [{ move: { name: 'razor-wind', url: '' }, version_group_details: [] }],
    game_indices: [{ game_index: 1, version: { name: 'red', url: '' } }],
    id: 1,
    height: 7,
    weight: 69,
    base_experience: 64,
    order: 1,
    is_default: true,
    location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
  };

  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: mockPokemonDetail,
    error: undefined,
    isLoading: false,
  });

  renderPokemonPage('1');

  await waitFor(() => {
    const nameElements = screen.getAllByText(/bulbasaur/i);
    expect(nameElements).toHaveLength(2); // Expecting the title and form
  });
  expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
});
