import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonListQuery } from '../api/pokemonApi';
import { RootState } from '../store/store';
import { setPokemonList } from '../features/pokemonSlice';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemonTypes';

const PokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(0);
  const { data, error, isLoading } = useGetPokemonListQuery({ page });
  const pokemonList = useSelector((state: RootState) => state.pokemon.list[page] || []) as Pokemon[];
  const totalCount = useSelector((state: RootState) => state.pokemon.totalCount);

  useEffect(() => {
    if (data) {
      dispatch(setPokemonList({ page, data: data.results, count: data.count }));
    }
  }, [data, dispatch, page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Pokemon List</h2>
      {isLoading && <div className="text-center text-lg">Loading...</div>}
      {error && <div className="text-center text-red-500">Error loading data. Please try again.</div>}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemonList.map((pokemon, index) => (
              <Link to={`/pokemon/${pokemon.url.split('/')[6]}`} key={index}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-semibold capitalize text-center">{pokemon.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="bg-gray-400 text-white px-4 py-2 rounded disabled:bg-gray-300"
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
        </>
      )}
    </div>
  );
};

export default PokemonList;
