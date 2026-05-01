import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnnouncementBanner from './components/AnnouncementBanner';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminLayout from './components/AdminLayout';
import AdminManageProducts from './pages/AdminManageProducts';
import AdminManageCategories from './pages/AdminManageCategories';
import AdminEditProduct from './pages/AdminEditProduct';
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
          <AnnouncementBanner />
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
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="manage" replace />} />
                <Route path="manage" element={<AdminManageProducts />} />
                <Route path="categories" element={<AdminManageCategories />} />
                <Route path="add" element={<AdminAddProduct />} />
                <Route path="edit/:id" element={<AdminEditProduct />} />
              </Route>
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
