import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonDetails } from '../types/pokemonTypes';

interface PokemonState {
  list: { [key: number]: Pokemon[] };
  details: { [key: string]: PokemonDetails };
  selectedPokemon: string | null;
  totalCount: number;
}

const initialState: PokemonState = {
  list: {},
  details: {},
  selectedPokemon: null,
  totalCount: 0,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<{ page: number, data: Pokemon[], count: number }>) => {
      state.list[action.payload.page] = action.payload.data;
      state.totalCount = action.payload.count;
    },
    setPokemonDetail: (state, action: PayloadAction<{ id: string, data: PokemonDetails }>) => {
      state.details[action.payload.id] = action.payload.data;
    },
    setSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { setPokemonList, setPokemonDetail, setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
