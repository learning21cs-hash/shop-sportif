import { useState } from 'react';
import ArticleCard from '../components/ArticleCard';

export default function HomePage({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'chaussures', name: '👟 Chaussures' },
    { id: 'vetements', name: '👕 Vêtements' },
    { id: 'accessoires', name: '🎒 Accessoires' }
  ];

  const articles = [
    { id: 1, nom: 'Chaussures Running Pro', prix: 120, categorie: 'chaussures', image: '👟' },
    { id: 2, nom: 'Chaussures Basketball', prix: 150, categorie: 'chaussures', image: '👟' },
    { id: 3, nom: 'T-shirt Sport', prix: 30, categorie: 'vetements', image: '👕' },
    { id: 4, nom: 'Short Performance', prix: 45, categorie: 'vetements', image: '🩳' },
    { id: 5, nom: 'Sac à dos Sport', prix: 80, categorie: 'accessoires', image: '🎒' },
    { id: 6, nom: 'Gourde Isotherme', prix: 35, categorie: 'accessoires', image: '🧊' }
  ];

  const filtered = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.categorie === selectedCategory);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-12 mb-12 shadow-2xl transform hover:scale-105 transition duration-300">
        <h1 className="text-5xl font-bold mb-4">Sport Horizon</h1>
        <p className="text-xl">Ensemble, construisons l'avenir du sport</p>
      </div>

      {/* Catégories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Catégories</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-800 border-2 border-orange-500 hover:bg-orange-50'
            }`}
          >
            Tous les articles
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-800 border-2 border-orange-500 hover:bg-orange-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, idx) => (
            <div key={article.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in">
              <ArticleCard article={article} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}