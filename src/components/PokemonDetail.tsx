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

  const detail: PokemonDetails | undefined = cachedDetail || data;

  const renderDetailSection = (title: string, items: { label: string; value?: string | number; image?: string }[]) => (
    <div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow min-h-[150px] max-h-80">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="overflow-y-auto">
        <ul className="list-disc list-inside">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.label}: {item.value}
              {item.image && <img src={item.image} alt="sprite" className="inline-block w-16 h-16 m-2" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center capitalize">{detail?.name}</h1>
        <div className="flex justify-center mb-6">
          <img src={detail?.sprites.front_default} alt={detail?.name} className="w-32 h-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDetailSection('General Information', [
            { label: 'Height', value: detail?.height },
            { label: 'Weight', value: detail?.weight },
            { label: 'Base Experience', value: detail?.base_experience },
            { label: 'Order', value: detail?.order },
            { label: 'ID', value: detail?.id },
            { label: 'Is Default', value: detail?.is_default ? 'Yes' : 'No' },
            { label: 'Location Area Encounters', value: detail?.location_area_encounters }
          ])}
          {renderDetailSection(`Abilities (${detail?.abilities.length})`, detail?.abilities.map(a => ({ label: a.ability.name })) ?? [])}
          {renderDetailSection(`Stats (${detail?.stats.length})`, detail?.stats.map(s => ({ label: s.stat.name, value: s.base_stat })) ?? [])}
          {renderDetailSection(`Types (${detail?.types.length})`, detail?.types.map(t => ({ label: t.type.name })) ?? [])}
          {renderDetailSection(`Forms (${detail?.forms.length})`, detail?.forms.map(f => ({ label: f.name })) ?? [])}
          {renderDetailSection(`Moves (${detail?.moves.length})`, detail?.moves.map(m => ({ label: m.move.name })) ?? [])}
          {renderDetailSection(`Game Indices (${detail?.game_indices.length})`, detail?.game_indices.map(g => ({ label: `${g.version.name}: ${g.game_index}` })) ?? [])}
          {renderDetailSection('Sprites', [
            { label: 'Back Default', image: detail?.sprites.back_default },
            { label: 'Back Shiny', image: detail?.sprites.back_shiny },
            { label: 'Front Shiny', image: detail?.sprites.front_shiny }
          ])}
          {renderDetailSection(`Held Items (${detail?.held_items.length})`, detail?.held_items.map(item => ({ label: item })) ?? [])}
          {renderDetailSection(`Past Abilities (${detail?.past_abilities.length})`, detail?.past_abilities.map(item => ({ label: item })) ?? [])}
          {renderDetailSection(`Past Types (${detail?.past_types.length})`, detail?.past_types.map(item => ({ label: item })) ?? [])}
          {renderDetailSection('Species', [
            { label: 'Name', value: detail?.species.name },
            { label: 'URL', value: detail?.species.url }
          ])}
          {renderDetailSection('Cries', [
            { label: 'Latest', value: detail?.cries.latest },
            { label: 'Legacy', value: detail?.cries.legacy }
          ])}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
