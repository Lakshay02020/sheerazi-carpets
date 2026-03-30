import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import CartDrawer from './components/CartDrawer';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminAddProduct />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
