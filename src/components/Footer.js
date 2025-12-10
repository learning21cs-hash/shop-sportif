export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1 - Logo */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent mb-4">
              Sport Horizon
            </h3>
            <p className="text-gray-300 text-sm">
              Ensemble, construisons l'avenir du sport
            </p>
          </div>

          {/* Colonne 2 - Produits */}
          <div>
            <h4 className="text-lg font-bold mb-4">Produits</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition">Chaussures</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Vêtements</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Accessoires</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Nouveautés</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Politique de retour</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Conditions</a></li>
            </ul>
          </div>

          {/* Colonne 4 - Réseaux */}
          <div>
            <h4 className="text-lg font-bold mb-4">Réseaux</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition transform hover:scale-110">
                f
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition transform hover:scale-110">
                𝕏
              </a>
              <a href="#" className="bg-orange-500 hover:bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center transition transform hover:scale-110">
                📷
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 py-6">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 Sport Horizon. Tous droits réservés.</p>
            <p className="mt-2">Créé avec ❤️ pour les passionnés de sport</p>
          </div>
        </div>
      </div>
    </footer>
  );
}