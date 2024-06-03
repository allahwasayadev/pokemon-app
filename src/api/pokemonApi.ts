import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonDetails } from '../types/pokemonTypes';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { page: number }>({
      query: ({ page }) => `pokemon?offset=${page * 20}&limit=20`,
    }),
    getPokemonById: builder.query<PokemonDetails, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
