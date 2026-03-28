import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [errorDesc, setErrorDesc] = useState('');

    if (cartItems.length === 0 && !orderComplete) {
        return (
            <div className="container py-60 text-center">
                <h2>Your cart is empty</h2>
                <button className="btn mt-4" onClick={() => navigate('/')}>Return to Shop</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrorDesc('');

        const formData = new FormData(e.target);
        const customer = {
            email: formData.get('email'),
            fullName: formData.get('fullName'),
            address: formData.get('address'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
        };

        const orderData = {
            customer,
            items: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                size: item.size,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: cartTotal,
            status: 'pending_payment',
            createdAt: serverTimestamp()
        };

        try {
            // 1. Create order on our backend
            const res = await fetch("https://sheerazi-carpets.onrender.com/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: cartTotal, currency: "INR" })
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || "Failed to create order");

            if (data.isMock) {
                // If using placeholder keys, bypass the real Razorpay popup to prevent crashes
                console.log("[Mock Mode] Simulating successful payment because you are using placeholder keys.");
                const verifyRes = await fetch("https://sheerazi-carpets.onrender.com/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isMock: true }) /* automatically verifies in mock mode */
                });
                
                orderData.status = "paid_mock";
                await addDoc(collection(db, 'orders'), orderData);
                setOrderComplete(true);
                setIsProcessing(false);
                return;
            }

            // 2. Open Razorpay Checkout for REAL keys
            const options = {
                key: "rzp_test_SWAjuCC264eUtf", // Replace when ready
                amount: data.amount,
                currency: data.currency,
                name: "Sheerazi Carpets",
                description: "Premium Rug Purchase",
                order_id: data.id,
                handler: async function (response) {
                    setIsProcessing(true); // resume loading state
                    try {
                        // 3. Verify Payment Signature securely on Backend
                        const verifyRes = await fetch("https://sheerazi-carpets.onrender.com/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });
                        
                        const verifyData = await verifyRes.json();
                        if (!verifyRes.ok) throw new Error(verifyData.msg || "Payment verification failed!");

                        // 4. Save to Firebase DataBase
                        orderData.status = "paid";
                        orderData.razorpay_payment_id = response.razorpay_payment_id;
                        orderData.razorpay_order_id = response.razorpay_order_id;

                        await addDoc(collection(db, 'orders'), orderData);
                        setOrderComplete(true);
                    } catch (err) {
                        console.error("Verification/Save Error: ", err);
                        setErrorDesc(`Payment Processed via Razorpay, but failed to verify/save: ${err.message}`);
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: customer.fullName,
                    email: customer.email,
                },
                theme: { color: "#2b84ea" }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                setErrorDesc(`Razorpay Payment Failed: ${response.error.description}`);
                setIsProcessing(false);
            });
            rzp.open();

        } catch (err) {
            console.error("Payment initiation error: ", err);
            setErrorDesc(`Failed to initialize payment: ${err.message}. Ensure backend is running.`);
            setIsProcessing(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="container py-60 text-center">
                <h2 style={{ color: 'var(--primary)', fontSize: '3rem', marginBottom: '20px' }}>Order Successful!</h2>
                <p className="mt-4" style={{ fontSize: '1.2rem' }}>Thank you for shopping with Sheerazi Carpets.<br />Your premium rug will arrive soon.</p>
                <button className="btn mt-4" onClick={() => {
                    window.location.href = '/';
                }}>Continue Shopping</button>
            </div>
        );
    }

    return (
        <div className="container py-60 checkout-layout">
            <div className="checkout-form">
                <h2 style={{ marginBottom: '20px' }}>Shipping Data & Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input required type="email" name="email" placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input required type="text" name="fullName" placeholder="Full Name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input required type="text" name="address" placeholder="Address" className="form-control" />
                    </div>
                    <div className="form-row">
                        <div className="form-group"><input required type="text" name="city" placeholder="City" className="form-control" /></div>
                        <div className="form-group"><input required type="text" name="postalCode" placeholder="Postal Code" className="form-control" /></div>
                    </div>

                    <h3 className="mt-4" style={{ marginBottom: '15px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>Secure Payment</h3>
                    {errorDesc && (
                        <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', border: '1px solid red' }}>
                            {errorDesc}
                        </div>
                    )}
                    <p style={{ marginBottom: '15px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        You will be securely redirected to Razorpay to complete your purchase.
                    </p>

                    <button type="submit" className="btn btn-pay mt-4" disabled={isProcessing} style={{ backgroundColor: '#2b84ea' }}>
                        {isProcessing ? 'Connecting Server / Processing...' : `Pay ₹${cartTotal.toFixed(2)} Securely`}
                    </button>
                </form>
            </div>

            <div className="checkout-summary bg-secondary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.size}`} className="summary-item">
                            <div className="summary-item-info">
                                <span>{item.title} (x{item.quantity})</span>
                                <span className="size">Size: {item.size}</span>
                            </div>
                            <div className="summary-item-price">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="summary-totals">
                    <div className="summary-row"><span>Subtotal:</span><span>₹{cartTotal.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Shipping:</span><span>Free</span></div>
                    <div className="summary-row total"><span>Total:</span><span>₹{cartTotal.toFixed(2)}</span></div>
                </div>
            </div>

            <style>{`
        .checkout-layout { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 768px) { .checkout-layout { grid-template-columns: 3fr 2fr; } }
        .form-group { margin-bottom: 15px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .form-control { width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); font-family: var(--font-sans); font-size: 1rem; }
        .form-control:focus { outline: none; border-color: var(--primary); }
        .btn-pay { width: 100%; font-size: 1.1rem; padding: 15px; }
        .checkout-summary { padding: 30px; border-radius: 4px; height: fit-content; }
        .checkout-summary h3 { margin-bottom: 20px; font-family: var(--font-sans); text-transform: uppercase; }
        .summary-item { display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border-color); }
        .summary-item-info { display: flex; flex-direction: column; }
        .summary-item-info .size { font-size: 0.8rem; color: var(--text-light); }
        .summary-item-price { font-weight: 500; }
        .summary-totals { padding-top: 15px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .summary-row.total { font-weight: bold; font-size: 1.2rem; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-color); color: var(--primary); }
        .mt-4 { margin-top: 25px; }
        .py-60 { padding-top: 60px; padding-bottom: 60px; }
      `}</style>
        </div>
    );
};

export default Checkout;
