import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetPokemonListQuery } from '../api/pokemonApi';
import { setPokemonList, setSelectedPokemon } from '../features/pokemonSlice';
import { RootState } from '../store/store';
import { Pokemon } from '../types/pokemonTypes';

const PokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useGetPokemonListQuery({ page });
  const pokemonList = useSelector((state: RootState) => state.pokemon.list[page] || []);
  const totalCount = useSelector((state: RootState) => state.pokemon.totalCount);

  useEffect(() => {
    if (data && pokemonList.length === 0) {
      dispatch(setPokemonList({ page, data: data.results, count: data.count }));
    }
  }, [data, dispatch, page, pokemonList.length]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemon List</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon: Pokemon, index: number) => (
          <li
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            <Link
              to={`/pokemon/${index + 1 + page * 20}`}
              onClick={() => dispatch(setSelectedPokemon(pokemon.name))}
              className="text-lg font-semibold text-center block"
            >
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={pokemonList.length === 0 || (page + 1) * 20 >= totalCount}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
