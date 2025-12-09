export default function Header({ currentPage, setCurrentPage, cartCount }) {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="cursor-pointer flex items-center gap-2"
        >
          <span className="text-3xl font-bold text-orange-500">SPORT</span>
          <span className="text-3xl font-bold">HORIZON</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className={`font-semibold transition ${
              currentPage === 'home' ? 'text-orange-400' : 'hover:text-orange-300'
            }`}
          >
            Accueil
          </button>

          {/* Panier */}
          <button
            onClick={() => setCurrentPage('cart')}
            className="relative bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
          >
            🛒 Panier
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}