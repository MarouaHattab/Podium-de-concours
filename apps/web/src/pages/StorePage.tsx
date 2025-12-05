import React from 'react';
import { motion } from 'framer-motion';

export default function StorePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold mb-2 text-gradient">
          🛒 Boutique
        </h1>
        <p className="text-gray-400 text-lg">
          Dépense tes gems pour des power-ups et améliorations
        </p>
      </motion.div>

      <div className="mt-8 card">
        <p className="text-gray-400">
          Fonctionnalité en cours de développement...
        </p>
        <p className="mt-4 text-gray-500">
          Bientôt disponible : boost XP x2, restauration de cœurs, protection de streak, 
          et contenus débloquables.
        </p>
      </div>
    </div>
  );
}
