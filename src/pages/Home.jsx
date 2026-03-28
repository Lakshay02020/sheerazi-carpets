import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort by creation time so newest are first
                productsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setProducts(productsArray);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    return (
        <div className="home-page">
            <Hero />
            <section className="section container">
                <h2 className="section-title">Shop by Trending</h2>
                <div className="product-grid">
                    {loading ? (
                         <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>Loading signature collections...</div>
                    ) : products.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>No products found. Add some from the admin dashboard!</div>
                    ) : (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </section>

            <section className="section bg-secondary">
                <div className="container text-center py-60">
                    <h2 className="section-title">Bring Elegance Home</h2>
                    <p className="section-subtitle">Discover the perfect piece for your living space from our curated collection.</p>
                </div>
            </section>

            <style>{`
        .section {
          padding: 80px 0;
        }
        .section-title {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 40px;
        }
        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 30px;
        }
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .bg-secondary {
          background-color: var(--secondary);
        }
        .py-60 {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        .text-center {
          text-align: center;
        }
      `}</style>
        </div>
    );
};

export default Home;
