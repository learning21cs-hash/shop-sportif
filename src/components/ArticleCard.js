export default function ArticleCard({ article, addToCart, goToProductDetail }) {
  return (
    <div 
      onClick={() => goToProductDetail(article.id, article.documentId)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform duration-300 hover:-translate-y-2 cursor-pointer"
    >
      {/* Image */}
      <div className="bg-gradient-to-br from-orange-100 to-blue-100 h-48 flex items-center justify-center hover:scale-110 transition duration-300 overflow-hidden">
        <img src={article.image} alt={article.nom} className="w-full h-full object-cover" />
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{article.nom}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-orange-500">{article.prix}€</span>
          <span className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
            {article.categoryName}
          </span>
        </div>

        {/* Bouton */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(article);
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-105 active:scale-95 shadow-lg"
        >
          🛒 Ajouter au panier
        </button>
      </div>
    </div>
  );
}