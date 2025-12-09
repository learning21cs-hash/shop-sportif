export default function ArticleCard({ article, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="bg-gradient-to-br from-orange-100 to-blue-100 h-48 flex items-center justify-center text-8xl hover:scale-110 transition duration-300">
        {article.image}
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{article.nom}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-orange-500">{article.prix}€</span>
        </div>

        {/* Bouton */}
        <button
          onClick={() => addToCart(article)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-105 active:scale-95 shadow-lg"
        >
          🛒 Ajouter au panier
        </button>
      </div>
    </div>
  );
}