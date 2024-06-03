import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonByIdQuery } from '../api/pokemonApi';
import { RootState } from '../store/store';
import { setPokemonDetail } from '../features/pokemonSlice';
import { PokemonDetails } from '../types/pokemonTypes';
import { getDetailSections } from '../constants/pokemonConstants';
import DetailSection from '../components/DetailSection';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const cachedDetail = useSelector((state: RootState) => (id ? state.pokemon.details[id] : undefined));
  const { data, error, isLoading } = useGetPokemonByIdQuery(id!, {
    skip: !id || !!cachedDetail,
  });

  useEffect(() => {
    if (data && !cachedDetail && id) {
      dispatch(setPokemonDetail({ id, data }));
    }
  }, [data, dispatch, cachedDetail, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data. Please try again later.</div>;

  const detail: PokemonDetails | undefined = cachedDetail || data;
  const detailSections = getDetailSections(detail);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center capitalize">{detail?.name}</h1>
        <div className="flex justify-center mb-6">
          <img src={detail?.sprites.front_default} alt={detail?.name} className="w-32 h-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailSections.map((section, idx) => (
            <DetailSection key={idx} title={section.title} items={section.items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
