import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AddArticlePage from './pages/AddArticlePage';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (article, quantity = 1) => {
    const existing = cart.find(item => item.id === article.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === article.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...article, quantity: quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header cartCount={cart.length} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/ajouter-article" element={<AddArticlePage />} />
            <Route path="/gerer-categories" element={<ManageCategoriesPage />} />  {/* ← Ajoute ça */}
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}