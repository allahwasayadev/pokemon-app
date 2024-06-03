import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonDetails } from '../types/pokemonTypes';

interface PokemonState {
  list: Pokemon[];
  details: { [key: string]: PokemonDetails };
  selectedPokemon: string | null;
}

const initialState: PokemonState = {
  list: [],
  details: {},
  selectedPokemon: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<Pokemon[]>) => {
      state.list = action.payload;
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