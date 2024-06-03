import React from 'react';
import { DetailSectionProps } from '../types/pokemonTypes';

const DetailSection: React.FC<DetailSectionProps> = ({ title, items }) => (
  <div className="flex flex-col bg-blue-50 p-4 rounded-lg shadow min-h-[150px] max-h-80">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <div className="overflow-y-auto">
      <ul className="list-disc list-inside">
        {items.map((item, idx) => (
          <li key={idx}>
            {item.label}: {item.value}
            {item.image && <img src={item.image} alt={`${item.label} sprite`} className="inline-block w-16 h-16 m-2" />}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default DetailSection;
