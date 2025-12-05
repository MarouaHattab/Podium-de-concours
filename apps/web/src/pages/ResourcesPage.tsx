import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      category: 'Accessibilité',
      items: [
        { name: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
        { name: 'ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' },
        { name: 'Pa11y - Tests accessibilité', url: 'https://pa11y.org/' },
      ]
    },
    {
      category: 'Logiciels Libres',
      items: [
        { name: 'GNU Philosophy', url: 'https://www.gnu.org/philosophy/' },
        { name: 'Choose a License', url: 'https://choosealicense.com/' },
        { name: 'Open Source Guide', url: 'https://opensource.guide/' },
      ]
    },
    {
      category: 'Sobriété & Durabilité',
      items: [
        { name: 'Green IT', url: 'https://www.greenit.fr/' },
        { name: 'Eco-Index', url: 'https://www.ecoindex.fr/' },
        { name: 'Digital Sobriety', url: 'https://theshiftproject.org/lean-ict/' },
      ]
    },
    {
      category: 'Outils & Frameworks',
      items: [
        { name: 'Lighthouse', url: 'https://developer.chrome.com/docs/lighthouse/' },
        { name: 'axe DevTools', url: 'https://www.deque.com/axe/' },
        { name: 'Website Carbon Calculator', url: 'https://www.websitecarbon.com/' },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold mb-2 text-gradient">
          📚 Ressources NIRD
        </h1>
        <p className="text-gray-400 text-lg">
          Guides, outils et documentation pour approfondir tes connaissances
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-4 text-nird-primary">
              {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-nird-primary transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    <span className="underline">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 card-glass p-6"
      >
        <h3 className="text-xl font-bold mb-3">💡 Conseil</h3>
        <p className="text-gray-300">
          Explore ces ressources pour compléter ton apprentissage. Les meilleures 
          contributions à des projets open source peuvent être soumises comme missions !
        </p>
      </motion.div>
    </div>
  );
}
