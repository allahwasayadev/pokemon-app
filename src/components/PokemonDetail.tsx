import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonByIdQuery } from '../api/pokemonApi';
import { RootState } from '../store/store';
import { setPokemonDetail } from '../features/pokemonSlice';
import { PokemonDetails } from '../types/pokemonTypes';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const cachedDetail = useSelector((state: RootState) => id ? state.pokemon.details[id] : undefined);
  const { data, error, isLoading } = useGetPokemonByIdQuery(id!, {
    skip: !id || !!cachedDetail,
  });

  useEffect(() => {
    if (data && !cachedDetail && id) {
      dispatch(setPokemonDetail({ id, data }));
    }
  }, [data, dispatch, cachedDetail, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const detail = cachedDetail || data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{detail?.name}</h1>
      <img
        src={detail?.sprites.front_default}
        alt={detail?.name}
        className="w-32 h-32 mx-auto"
      />
      <div className="mt-4">
        <p><strong>Height:</strong> {detail?.height}</p>
        <p><strong>Weight:</strong> {detail?.weight}</p>
        <p><strong>Base Experience:</strong> {detail?.base_experience}</p>
        <h2 className="text-2xl font-bold mt-4">Abilities</h2>
        <ul className="list-disc list-inside">
          {detail?.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mt-4">Stats</h2>
        <ul className="list-disc list-inside">
          {detail?.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mt-4">Types</h2>
        <ul className="list-disc list-inside">
          {detail?.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
