import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article, addToCart }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${article.documentId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="bg-gradient-to-br from-orange-100 to-blue-100 h-48 overflow-hidden flex items-center justify-center">
        {article.image ? (
          <img src={article.image} alt={article.nom} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">👟</span>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{article.nom}</h3>
        <p className="text-gray-600 text-sm mb-4">{article.categorie}</p>
        <p className="text-2xl font-bold text-orange-500 mb-4">{article.prix} Dhs</p>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
          >
            Voir détails
          </button>
          <button
            onClick={() => addToCart(article)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
          >
            🛒 Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}