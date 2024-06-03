import { PokemonDetails } from '../types/pokemonTypes';

const getGeneralInformation = (detail: PokemonDetails | undefined) => [
  { label: 'Height', value: detail?.height },
  { label: 'Weight', value: detail?.weight },
  { label: 'Base Experience', value: detail?.base_experience },
  { label: 'Order', value: detail?.order },
  { label: 'ID', value: detail?.id },
  { label: 'Is Default', value: detail?.is_default ? 'Yes' : 'No' },
  { label: 'Location Area Encounters', value: detail?.location_area_encounters },
];

export const getDetailSections = (detail: PokemonDetails | undefined) => [
  {
    title: 'General Information',
    items: getGeneralInformation(detail),
  },
  {
    title: `Abilities (${detail?.abilities.length})`,
    items: detail?.abilities.map((a) => ({ label: a.ability.name })) ?? [],
  },
  {
    title: `Stats (${detail?.stats.length})`,
    items: detail?.stats.map((s) => ({ label: s.stat.name, value: s.base_stat })) ?? [],
  },
  {
    title: `Types (${detail?.types.length})`,
    items: detail?.types.map((t) => ({ label: t.type.name })) ?? [],
  },
  {
    title: `Forms (${detail?.forms.length})`,
    items: detail?.forms.map((f) => ({ label: f.name })) ?? [],
  },
  {
    title: `Moves (${detail?.moves.length})`,
    items: detail?.moves.map((m) => ({ label: m.move.name })) ?? [],
  },
  {
    title: `Game Indices (${detail?.game_indices.length})`,
    items: detail?.game_indices.map((g) => ({ label: `${g.version.name}: ${g.game_index}` })) ?? [],
  },
  {
    title: 'Sprites',
    items: [
      { label: 'Back Default', image: detail?.sprites.back_default },
      { label: 'Back Shiny', image: detail?.sprites.back_shiny },
      { label: 'Front Shiny', image: detail?.sprites.front_shiny },
    ],
  },
];
