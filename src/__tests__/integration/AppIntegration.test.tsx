import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import PokemonPage from '../../pages/PokemonPage';
import pokemonReducer from '../../features/pokemonSlice';
import { pokemonApi } from '../../api/pokemonApi';
import { useGetPokemonListQuery, useGetPokemonByIdQuery } from '../../api/pokemonApi';
import { PokemonListResponse, PokemonDetails } from '../../types/pokemonTypes';

jest.mock('../../api/pokemonApi', () => ({
  ...jest.requireActual('../../api/pokemonApi'),
  useGetPokemonListQuery: jest.fn(),
  useGetPokemonByIdQuery: jest.fn(),
}));

const mockUseGetPokemonListQuery = useGetPokemonListQuery as jest.Mock;
const mockUseGetPokemonByIdQuery = useGetPokemonByIdQuery as jest.Mock;

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

test('full app rendering/navigating', async () => {
  const mockListResponse: PokemonListResponse = {
    count: 2,
    next: null,
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  const mockDetailResponse: PokemonDetails = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      back_default: '',
      back_shiny: '',
      front_shiny: '',
      front_female: null,
      front_shiny_female: null,
      back_female: null,
      back_shiny_female: null,
      other: {
        dream_world: { front_default: '', front_female: null },
        home: { front_default: '', front_female: null, front_shiny: '', front_shiny_female: null },
        'official-artwork': { front_default: '', front_shiny: '' },
        showdown: {
          front_default: '',
          front_female: null,
          back_default: '',
          back_female: null,
          front_shiny: '',
          front_shiny_female: null,
          back_shiny: '',
          back_shiny_female: null,
        },
      },
      versions: {
        'generation-i': { 'red-blue': {}, yellow: {} },
        'generation-ii': { crystal: {}, gold: {}, silver: {} },
        'generation-iii': { emerald: {}, 'firered-leafgreen': {}, 'ruby-sapphire': {} },
        'generation-iv': { 'diamond-pearl': {}, 'heartgold-soulsilver': {}, platinum: {} },
        'generation-v': { 'black-white': {} },
        'generation-vi': { 'omegaruby-alphasapphire': {}, 'x-y': {} },
        'generation-vii': { icons: {}, 'ultra-sun-ultra-moon': {} },
        'generation-viii': { icons: {} },
      },
    },
    abilities: [
      { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
      { ability: { name: 'chlorophyll', url: '' }, is_hidden: true, slot: 3 },
    ],
    base_experience: 64,
    cries: { latest: '', legacy: '' },
    forms: [{ name: 'bulbasaur', url: '' }],
    game_indices: [{ game_index: 1, version: { name: 'red', url: '' } }],
    height: 7,
    held_items: [],
    is_default: true,
    location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
    moves: [{ move: { name: 'razor-wind', url: '' }, version_group_details: [] }],
    order: 1,
    past_abilities: [],
    past_types: [],
    species: { name: 'bulbasaur', url: '' },
    stats: [
      { base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } },
      { base_stat: 49, effort: 0, stat: { name: 'special-defense', url: '' } },
    ],
    types: [
      { slot: 1, type: { name: 'grass', url: '' } },
      { slot: 2, type: { name: 'poison', url: '' } },
    ],
    weight: 69,
  };

  mockUseGetPokemonListQuery.mockReturnValue({
    data: mockListResponse,
    error: undefined,
    isLoading: false,
  });

  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: mockDetailResponse,
    error: undefined,
    isLoading: false,
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Welcome to the Pokemon App')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());

  fireEvent.click(screen.getByText('bulbasaur'));

  await waitFor(() => {
    const nameElements = screen.getAllByText(/bulbasaur/i);
    expect(nameElements).toHaveLength(2); // Expecting the title and form
    expect(screen.getByText('Height: 7')).toBeInTheDocument();
    expect(screen.getByText('Weight: 69')).toBeInTheDocument();
  });
  expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
});
