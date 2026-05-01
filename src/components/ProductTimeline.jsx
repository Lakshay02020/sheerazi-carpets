import React from 'react';

const ProductTimeline = () => {
    const today = new Date();
    
    // Format helper
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    };

    const orderOnStr = formatDate(today);
    
    const shippedDate = new Date(today);
    shippedDate.setDate(shippedDate.getDate() + 4);
    const shippedStr = formatDate(shippedDate);
    
    const deliveredDate = new Date(shippedDate);
    deliveredDate.setDate(deliveredDate.getDate() + 4);
    const deliveredStr = formatDate(deliveredDate);

    return (
        <div style={{ marginTop: '25px', marginBottom: '15px' }}>
            {/* Timeline Wrapper */}
            <div style={{ border: '2px solid #4a1919', borderRadius: '10px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: '35%', left: '15%', right: '15%', height: '2px', backgroundColor: '#4a1919', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4a1919', transform: 'translateY(-2px)' }}></div>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4a1919', transform: 'translateY(-2px)' }}></div>
                </div>

                {/* Order On */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: 'var(--white)', padding: '0 10px' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '5px' }}>
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span style={{ fontWeight: 'bold', color: '#a0300d', fontSize: '0.9rem' }}>Order On</span>
                    <span style={{ fontSize: '0.85rem', color: '#555' }}>{orderOnStr}</span>
                </div>

                {/* Shipped */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: 'var(--white)', padding: '0 10px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '5px' }}>
                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                        <path d="M15 18H9" />
                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                        <circle cx="17" cy="18" r="2" />
                        <circle cx="7" cy="18" r="2" />
                    </svg>
                    <span style={{ fontWeight: 'bold', color: '#a0300d', fontSize: '0.9rem' }}>Shipped</span>
                    <span style={{ fontSize: '0.85rem', color: '#555' }}>{shippedStr}</span>
                </div>

                {/* Delivered */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: 'var(--white)', padding: '0 10px' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '5px' }}>
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span style={{ fontWeight: 'bold', color: '#a0300d', fontSize: '0.9rem' }}>Delivered</span>
                    <span style={{ fontSize: '0.85rem', color: '#555' }}>{deliveredStr}</span>
                </div>
            </div>

            {/* Discount Banner */}
            <div style={{ marginTop: '15px', backgroundColor: '#0d6efd', borderRadius: '8px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem' }}>
                    <span style={{ fontStyle: 'italic', fontWeight: '800', background: 'white', color: '#0d6efd', padding: '2px 8px', borderRadius: '4px' }}>%</span>
                    <span>Get <strong>10%</strong> extra discount on Prepaid orders</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ background: 'white', borderRadius: '20px', padding: '2px 10px', color: '#00baef', fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>Paytm</div>
                    <div style={{ background: 'white', borderRadius: '20px', padding: '2px 10px', color: '#5f259f', fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>PhonePe</div>
                    <div style={{ background: 'white', borderRadius: '20px', padding: '2px 10px', color: '#ea4335', fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>GPay</div>
                </div>
            </div>

            {/* Return & Exchange Banner */}
            <div style={{ marginTop: '15px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '15px', color: '#333' }}>
                <div style={{ backgroundColor: '#e9ecef', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Returns & Exchanges Available</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Hassle-free 7-day return policy for your peace of mind.</div>
                </div>
            </div>
        </div>
    );
};

export default ProductTimeline;
