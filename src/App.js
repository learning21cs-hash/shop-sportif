import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (article) => {
    const existing = cart.find(item => item.id === article.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === article.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...article, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        cartCount={cart.length}
      />
      
      {currentPage === 'home' && (
        <HomePage addToCart={addToCart} />
      )}
      
      {currentPage === 'cart' && (
        <CartPage 
          cart={cart} 
          removeFromCart={removeFromCart}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}