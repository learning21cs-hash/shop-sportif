import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';

export default function HomePage({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    // Récupère les catégories
    fetch('https://shop-api-strapi-1507f748e924.herokuapp.com/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.data.map(cat => ({
          id: cat.id,
          name: cat.name
        })));
      })
      .catch(err => console.error(err));

    // Récupère les articles
    fetch('https://shop-api-strapi-1507f748e924.herokuapp.com/api/articles?populate=*')
      .then(res => res.json())
      .then(data => {
        setArticles(data.data.map(item => ({
          id: item.id,
          documentId: item.documentId,
          nom: item.nom,
          prix: item.prix,
          categoryId: item.category?.id,
          categoryName: item.category?.name,
          image: item.image ? `https://shop-api-strapi-1507f748e924.herokuapp.com${item.image.url}` : '👟'
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = articles.filter(a => {
    const matchCategory = selectedCategory === 'all' || a.categoryId === parseInt(selectedCategory);
    const matchSearch = a.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice = a.prix >= minPrice && a.prix <= maxPrice;
    return matchCategory && matchSearch && matchPrice;
  });

  if (loading) return <div className="text-center py-20">Chargement...</div>;

  return (
    <main className="py-8">
      {/* Hero attractif - pleine largeur */}
      <div className="mb-12 overflow-hidden">
        <div className="relative bg-gradient-to-br from-blue-900 via-orange-500 to-blue-700 text-white p-20 shadow-2xl" style={{ minHeight: '500px' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Contenu */}
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-8 flex-wrap">
              {/* Texte gauche */}
              <div className="flex-1">
                <h1 className="text-6xl font-black mb-4 leading-tight animate-fade-in">
                  Sport<br />
                  <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                    Horizon
                  </span>
                </h1>
                <p className="text-xl mb-6 text-gray-100 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Équipez-vous pour vos passions sportives 🏃⚽🎾
                </p>
                <button 
                  onClick={() => {
                    document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg animate-fade-in" 
                  style={{ animationDelay: '0.2s' }}
                >
                  Découvrir nos articles →
                </button>
              </div>

              {/* Icônes animées droite */}
              <div className="flex gap-6 text-7xl">
                <div className="animate-bounce" style={{ animationDelay: '0s' }}>⚽</div>
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🏃</div>
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎾</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white border-opacity-20">
              <div className="text-center">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-gray-200">Produits</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-sm text-gray-200">Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-gray-200">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recherche et Filtre */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recherche */}
          <input
            type="text"
            placeholder="🔍 Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          />

          {/* Filtre Prix Min */}
          <div>
            <label className="block text-sm font-semibold mb-2">Prix min: {minPrice} Dhs</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Filtre Prix Max */}
          <div>
            <label className="block text-sm font-semibold mb-2">Prix max: {maxPrice} Dhs</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Catégories et Articles avec max-width */}
      <div className="max-w-6xl mx-auto px-4">
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
                onClick={() => setSelectedCategory(cat.id.toString())}
                className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                  selectedCategory === cat.id.toString()
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
        <div id="articles">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos articles ({filtered.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, idx) => (
              <div key={article.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in">
                <ArticleCard article={article} addToCart={addToCart} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Aucun article ne correspond à ta recherche 😢</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}