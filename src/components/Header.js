import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Header({ cartCount }) {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <Link
            to="/"
            className="font-semibold transition hover:text-orange-300"
          >
            Accueil
          </Link>

          {/* Panier */}
          <Link
            to="/cart"
            className="relative bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
          >
            🛒 Panier
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}