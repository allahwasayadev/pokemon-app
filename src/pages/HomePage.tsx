import React from 'react';
import PokemonList from '../components/PokemonList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-6 mb-4">Welcome to the Pokemon App</h1>
      <PokemonList />
    </div>
  );
};

export default HomePage;
