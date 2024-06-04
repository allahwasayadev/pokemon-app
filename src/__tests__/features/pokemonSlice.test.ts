import pokemonReducer, { setPokemonList, setPokemonDetail, setSelectedPokemon, PokemonState } from '../../features/pokemonSlice';

describe('pokemonSlice', () => {
  const initialState: PokemonState = {
    list: {},
    details: {},
    selectedPokemon: null,
    totalCount: 0,
  };

  it('should handle initial state', () => {
    expect(pokemonReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setPokemonList', () => {
    const previousState: PokemonState = {
      ...initialState,
      list: {
        1: [{ name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      },
      totalCount: 1,
    };

    const newState = pokemonReducer(
      initialState,
      setPokemonList({
        page: 1,
        data: [{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
        count: 2,
      })
    );

    expect(newState.list[1]).toEqual([{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }]);
    expect(newState.totalCount).toEqual(2);
  });

  it('should handle setPokemonDetail', () => {
    const previousState: PokemonState = {
      ...initialState,
      details: {
        '1': { id: 1, name: 'Bulbasaur', base_experience: 64, height: 7, weight: 69, types: [] },
      },
    };

    const newState = pokemonReducer(
      previousState,
      setPokemonDetail({
        id: '2',
        data: { id: 2, name: 'Ivysaur', base_experience: 142, height: 10, weight: 130, types: [] },
      })
    );

    expect(newState.details['2']).toEqual({ id: 2, name: 'Ivysaur', base_experience: 142, height: 10, weight: 130, types: [] });
  });

  it('should handle setSelectedPokemon', () => {
    const newState = pokemonReducer(initialState, setSelectedPokemon('1'));

    expect(newState.selectedPokemon).toEqual('1');
  });
});
