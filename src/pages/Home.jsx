import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const SHOP_CATEGORIES = [
    { name: 'Hand Tufted', url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&q=80&w=800' },
    { name: 'Shaggy', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Persian Silk', url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=800' },
    { name: 'Designer', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800' }
];

const COLORS = [
    { name: 'Red', hex: '#d32f2f' },
    { name: 'Blue', hex: '#1976d2' },
    { name: 'Beige', hex: '#f5f5dc' },
    { name: 'Grey', hex: '#9e9e9e' },
    { name: 'Black', hex: '#212121' },
    { name: 'Green', hex: '#388e3c' }
];

const Home = () => {
    // We now use the global memory cache instead of fetching manually
    const { products, loading } = useProducts();

    // Just show top 8 newest products
    const trendingProducts = products.slice(0, 8);

    return (
        <div className="home-page">
            <Hero />

            {/* Shop by Category Section */}
            <section className="section container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                    <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>Shop by Category</h2>
                    <Link to="/shop" style={{ color: 'var(--text-dark)', textDecoration: 'underline', fontWeight: 500 }}>View All</Link>
                </div>
                
                <div className="category-grid">
                    {SHOP_CATEGORIES.map(cat => (
                        <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} key={cat.name} className="category-card">
                            <img src={cat.url} alt={cat.name} />
                            <div className="category-overlay">
                                <h3>{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Shop by Color Section */}
            <section className="section bg-secondary">
                <div className="container">
                    <h2 className="section-title">Shop by Color</h2>
                    <div className="color-showcase">
                        {COLORS.map(color => (
                            <Link to={`/shop?color=${color.name}`} key={color.name} className="color-circle-link">
                                <div className="color-circle" style={{ backgroundColor: color.hex, border: color.name === 'Beige' ? '1px solid #ccc' : 'none' }}></div>
                                <span>{color.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="section container">
                <h2 className="section-title">Latest Arrivals</h2>
                <div className="product-grid">
                    {loading ? (
                         <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>Loading signature collections...</div>
                    ) : trendingProducts.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>No products found. Add some from the admin dashboard!</div>
                    ) : (
                        trendingProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/shop" className="btn">Shop The Full Collection</Link>
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
        
        /* Category Grid */
        .category-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        @media (min-width: 768px) {
            .category-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .category-card {
            position: relative;
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            display: block;
            text-decoration: none;
        }
        .category-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        .category-card:hover img {
            transform: scale(1.05);
        }
        .category-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
            display: flex;
            align-items: flex-end;
            padding: 20px;
        }
        .category-overlay h3 {
            color: white;
            margin: 0;
            font-size: 1.4rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }

        /* Color Showcase */
        .color-showcase {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
        }
        .color-circle-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: var(--text-dark);
            transition: transform 0.3s ease;
        }
        .color-circle-link:hover {
            transform: translateY(-5px);
        }
        .color-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .color-circle-link span {
            font-size: 0.95rem;
            font-weight: 500;
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
        .text-center {
          text-align: center;
        }
      `}</style>
        </div>
    );
};

export default Home;
