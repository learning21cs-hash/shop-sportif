    import { useState, useEffect } from 'react';

export default function ProductDetailPage({ productId, setCurrentPage, addToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://shop-api-production-b01f.up.railway.app/api/articles/${productId}?populate=*`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          id: data.data.id,
          nom: data.data.nom,
          prix: data.data.prix,
          description: data.data.description || 'Pas de description',
          categoryName: data.data.category?.name,
image: data.data.image ? `https://shop-api-production-b01f.up.railway.app${data.data.image.url}` : '👟'        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (!product) return <div className="text-center py-20">Produit introuvable</div>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Retour */}
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-8 text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2"
      >
        ← Retour aux articles
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl overflow-hidden flex items-center justify-center" style={{ minHeight: '500px' }}>
          <img src={product.image} alt={product.nom} className="w-full h-full object-cover" />
        </div>

        {/* Détails */}
        <div>
          <div className="mb-4">
            <span className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              {product.categoryName}
            </span>
          </div>

          <h1 className="text-4xl font-black text-gray-800 mb-4">{product.nom}</h1>

          <div className="text-5xl font-bold text-orange-500 mb-8">
            {product.prix}€
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Quantité */}
          <div className="flex items-center gap-4 mb-8">
            <label className="font-semibold text-gray-800">Quantité :</label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
              >
                −
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Boutons */}
          <button
          onClick={() => {
  addToCart(product, quantity);
  setCurrentPage('home');

}}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-105 mb-4"
          >
            🛒 Ajouter au panier
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className="w-full border-2 border-gray-300 text-gray-800 font-bold py-4 rounded-lg hover:bg-gray-100 transition"
          >
            Continuer les achats
          </button>
        </div>
      </div>
    </main>
  );
}