import { useState } from 'react';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
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

  const goToProductDetail = (productId, documentId) => {
    setSelectedProductId(documentId);
    setCurrentPage('product-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        cartCount={cart.length}
      />
      
      <div className="flex-grow">
        {currentPage === 'home' && (
          <HomePage addToCart={addToCart} goToProductDetail={goToProductDetail} />
        )}
        
        {currentPage === 'product-detail' && (
          <ProductDetailPage 
            productId={selectedProductId} 
            setCurrentPage={setCurrentPage}
            addToCart={addToCart}
          />
        )}
        
        {currentPage === 'cart' && (
          <CartPage 
            cart={cart} 
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            setCurrentPage={setCurrentPage}
            removeFromCart={removeFromCart}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}