import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={toggleCart}></div>
            <div className={`cart-drawer open`}>
                <div className="cart-header">
                    <h3>Your Cart</h3>
                    <button onClick={toggleCart} className="close-btn"><X /></button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                            <button className="btn mt-4" onClick={() => { toggleCart(); navigate('/'); }}>Continue Shopping</button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={`${item.id}-${item.size}`} className="cart-item">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="cart-item-img" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/carpet_fallback/200/200'; }} 
                                />
                                <div className="cart-item-details">
                                    <h4>{item.title}</h4>
                                    <p className="size">Size: {item.size}</p>
                                    <div className="qty-controls">
                                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Minus size={14} /></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus size={14} /></button>
                                    </div>
                                </div>
                                <div className="cart-item-price">
                                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id, item.size)} className="remove-btn">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Subtotal:</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="taxes-note">Tax included and shipping calculated at checkout.</p>
                        <button className="btn btn-checkout" onClick={() => { toggleCart(); navigate('/checkout'); }}>
                            Check out
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        .cart-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
        }
        .cart-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 100%;
          max-width: 400px;
          background: var(--white);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          animation: slideIn 0.3s forwards ease-out;
        }
        @keyframes slideIn {
          to { transform: translateX(0); }
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .close-btn {
          background: none; border: none; cursor: pointer; color: var(--text-dark);
        }
        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        .empty-cart {
          text-align: center;
          padding-top: 50px;
          color: var(--text-light);
        }
        .cart-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .cart-item-img {
          width: 80px; height: 100px; object-fit: cover; border-radius: 4px;
        }
        .cart-item-details { flex: 1; }
        .cart-item-details h4 {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          margin-bottom: 5px;
        }
        .cart-item-details .size {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 10px;
        }
        .qty-controls {
          display: flex; align-items: center; border: 1px solid var(--border-color); width: fit-content;
        }
        .qty-controls button {
          background: none; border: none; padding: 5px 8px; cursor: pointer; display: flex; align-items: center;
        }
        .qty-controls span { padding: 0 10px; font-size: 0.9rem; }
        .cart-item-price {
          display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between;
        }
        .remove-btn {
          background: none; border: none; color: var(--text-light); cursor: pointer;
        }
        .remove-btn:hover { color: var(--primary); }
        .cart-footer {
          padding: 20px;
          border-top: 1px solid var(--border-color);
          background: var(--secondary);
        }
        .cart-total {
          display: flex; justify-content: space-between;
          font-size: 1.2rem; font-weight: 600; margin-bottom: 10px;
        }
        .taxes-note { font-size: 0.8rem; color: var(--text-light); margin-bottom: 20px; text-align: center; }
        .btn-checkout { width: 100%; }
        .mt-4 { margin-top: 25px; }
      `}</style>
        </>
    );
};
export default CartDrawer;
