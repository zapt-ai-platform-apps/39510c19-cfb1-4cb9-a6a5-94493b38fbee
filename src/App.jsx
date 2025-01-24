import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';
import AnimalCard from './components/AnimalCard';
import { sampleAnimals, speciesCategories } from './constants/animals';

export default function App() {
  const [animals, setAnimals] = useState(sampleAnimals);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSpecies, setSelectedSpecies] = useState('ALL');

  const handleSwipe = (direction) => {
    console.log('Swiped', direction);
    setCurrentIndex(prev => prev + 1);
  };

  const filteredAnimals = animals.filter(animal => 
    selectedSpecies === 'ALL' || animal.species === selectedSpecies
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-center">PetPals</h1>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedSpecies('ALL')}
            className={`px-4 py-2 rounded-full ${selectedSpecies === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          {Object.keys(speciesCategories).map(species => (
            <button
              key={species}
              onClick={() => setSelectedSpecies(species)}
              className={`px-4 py-2 rounded-full ${selectedSpecies === species ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {species}
            </button>
          ))}
        </div>

        <div className="relative h-[500px] w-full max-w-md mx-auto">
          <AnimatePresence>
            {filteredAnimals.slice(currentIndex, currentIndex + 2).map((animal, index) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                active={index === 0}
                onSwipe={handleSwipe}
              />
            ))}
          </AnimatePresence>
          
          {currentIndex >= filteredAnimals.length && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No more animals in this category!
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => handleSwipe('left')}
            className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            ❌ Dislike
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            ❤️ Like
          </button>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-600">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}