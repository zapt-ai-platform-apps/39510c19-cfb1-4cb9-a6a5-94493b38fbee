import React from 'react';
import { motion } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import { speciesCategories } from '../constants/animals';

function AnimalCard({ animal, active, onSwipe }) {
  const bind = useGesture({
    onDrag: ({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
      if (!active) return;
      const trigger = vx > 0.2;
      const dir = dx > 0 ? 1 : -1;
      
      if (trigger) {
        onSwipe(dir > 0 ? 'right' : 'left');
        cancel();
      }
    }
  });

  return (
    <motion.div
      {...bind()}
      className="absolute w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
      style={{ touchAction: 'none' }}
      drag={active ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      animate={{ scale: active ? 1 : 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="relative h-96">
        <img 
          src={animal.image} 
          alt={animal.name}
          className="w-full h-full object-cover"
          data-image-request={`${animal.breed} ${animal.species} professional photo`}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold text-white">{animal.name}</h2>
          <p className="text-white/90">
            {speciesCategories[animal.species].find(b => b === animal.breed)} {animal.species}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AnimalCard;