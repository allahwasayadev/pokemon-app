import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useGetPokemonByIdQuery } from '../../api/pokemonApi';
import pokemonReducer, { setPokemonDetail } from '../../features/pokemonSlice';
import PokemonDetail from '../../components/PokemonDetail';
import { PokemonDetails } from '../../types/pokemonTypes';

jest.mock('../../api/pokemonApi', () => ({
  ...jest.requireActual('../../api/pokemonApi'),
  useGetPokemonByIdQuery: jest.fn(),
}));

const mockUseGetPokemonByIdQuery = useGetPokemonByIdQuery as jest.Mock;

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

beforeEach(() => {
  jest.clearAllMocks();
});

const renderWithRouter = (id: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/pokemon/${id}`]}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

test('displays loading state initially', () => {
  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: true,
  });

  renderWithRouter('1');

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays error state', async () => {
  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: undefined,
    error: new Error('Failed to fetch'),
    isLoading: false,
  });

  renderWithRouter('1');

  await waitFor(() => expect(screen.getByText('Error loading data. Please try again later.')).toBeInTheDocument());
});

test('displays Pokémon details', async () => {
  const mockDetail: PokemonDetails = {
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
    abilities: [],
    base_experience: 64,
    cries: { latest: '', legacy: '' },
    forms: [],
    game_indices: [],
    height: 7,
    held_items: [],
    is_default: true,
    location_area_encounters: '',
    moves: [],
    order: 1,
    past_abilities: [],
    past_types: [],
    species: { name: 'bulbasaur', url: '' },
    stats: [],
    types: [],
    weight: 69,
  };

  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: mockDetail,
    error: undefined,
    isLoading: false,
  });

  renderWithRouter('1');

  await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());
  expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText('bulbasaur')).toBeInTheDocument();
});

test('uses cached details if available', async () => {
  const mockDetail: PokemonDetails = {
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
    abilities: [],
    base_experience: 64,
    cries: { latest: '', legacy: '' },
    forms: [],
    game_indices: [],
    height: 7,
    held_items: [],
    is_default: true,
    location_area_encounters: '',
    moves: [],
    order: 1,
    past_abilities: [],
    past_types: [],
    species: { name: 'bulbasaur', url: '' },
    stats: [],
    types: [],
    weight: 69,
  };

  store.dispatch(setPokemonDetail({ id: '1', data: mockDetail }));

  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: false,
  });

  renderWithRouter('1');

  await waitFor(() => expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument());
  expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText('bulbasaur')).toBeInTheDocument();
});
