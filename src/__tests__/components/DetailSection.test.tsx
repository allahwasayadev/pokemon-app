import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailSection from '../../components/DetailSection';
import { DetailSectionProps } from '../../types/pokemonTypes';

const renderDetailSection = (props: DetailSectionProps) => {
  return render(<DetailSection {...props} />);
};

test('displays title and items correctly', () => {
  const props: DetailSectionProps = {
    title: 'General Information',
    items: [
      { label: 'Height', value: 7 },
      { label: 'Weight', value: 69 },
    ],
  };

  renderDetailSection(props);

  expect(screen.getByText('General Information')).toBeInTheDocument();
  expect(screen.getByText('Height: 7')).toBeInTheDocument();
  expect(screen.getByText('Weight: 69')).toBeInTheDocument();
});

test('displays items with images correctly', () => {
  const props: DetailSectionProps = {
    title: 'Sprites',
    items: [
      { label: 'Front Default', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { label: 'Back Shiny', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png' },
    ],
  };

  renderDetailSection(props);

  expect(screen.getByText('Sprites')).toBeInTheDocument();
  expect(screen.getByAltText('Front Default sprite')).toBeInTheDocument();
  expect(screen.getByAltText('Back Shiny sprite')).toBeInTheDocument();
});

test('handles empty items list gracefully', () => {
  const props: DetailSectionProps = {
    title: 'Abilities',
    items: [],
  };

  renderDetailSection(props);

  expect(screen.getByText('Abilities')).toBeInTheDocument();
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});
