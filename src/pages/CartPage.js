export default function CartPage({ cart, removeFromCart, setCurrentPage }) {
  const total = cart.reduce((sum, item) => sum + (item.prix * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Panier vide</h2>
          <p className="text-gray-600 mb-6">Tu n'as pas encore ajouté d'articles</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            ← Retour aux articles
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🛒 Mon Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-6 border-b hover:bg-orange-50 transition"
              >
                <span className="text-6xl">{item.image}</span>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.nom}</h3>
                  <p className="text-orange-500 font-semibold">{item.prix}€</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold bg-gray-100 px-4 py-2 rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105"
                  >
                    ❌ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-xl shadow-lg p-8 h-fit sticky top-8">
          <h2 className="text-2xl font-bold mb-6">Résumé</h2>
          
          <div className="mb-6 space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.nom} x{item.quantity}</span>
                <span className="font-semibold">{item.prix * item.quantity}€</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white pt-4 mb-6">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total :</span>
              <span className="text-orange-400">{total}€</span>
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 font-bold py-3 rounded-lg transition transform hover:scale-105 mb-4">
            💳 Passer la commande
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className="w-full border-2 border-white text-white font-bold py-2 rounded-lg hover:bg-white hover:text-blue-900 transition"
          >
            ← Continuer les achats
          </button>
        </div>
      </div>
    </main>
  );
}