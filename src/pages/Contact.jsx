import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would plug into an email service (like EmailJS or Firebase Functions)
        setStatus('Thank you for reaching out! A member of our team will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="contact-page container py-60">
            <div className="text-center" style={{ marginBottom: '50px' }}>
                <h1 className="section-title">Contact Us</h1>
                <p className="section-subtitle">Have a question about our carpets, need help with an order, or looking for a custom design? We'd love to hear from you.</p>
            </div>

            <div className="contact-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
                
                {/* Contact Information Cards */}
                <div className="contact-info">
                    <h2 style={{ marginBottom: '25px', fontSize: '1.8rem', fontWeight: 400 }}>Get In Touch</h2>
                    
                    <div className="info-item" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '50%', height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MapPin size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Visit Our Showroom</h4>
                            <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                                Fine and Art Carpets HQ<br />
                                123 Artisan Street, Carpet District<br />
                                Bhadohi, Uttar Pradesh, 221401<br />
                                India
                            </p>
                        </div>
                    </div>

                    <div className="info-item" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '50%', height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Call Us</h4>
                            <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                                Support: +91 98765 43210<br />
                                Wholesale: +91 12345 67890
                            </p>
                        </div>
                    </div>

                    <div className="info-item" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '50%', height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mail size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Email Us</h4>
                            <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                                care@fineandartcarpets.com<br />
                                sales@fineandartcarpets.com
                            </p>
                        </div>
                    </div>

                    <div className="info-item" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                        <div style={{ backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '50%', height: '54px', width: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Clock size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Business Hours</h4>
                            <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                                Monday - Saturday: 10:00 AM - 7:00 PM<br />
                                Sunday: Closed (Appointment Only)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ marginBottom: '25px', fontSize: '1.8rem', fontWeight: 400 }}>Send a Message</h2>
                    {status && <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '15px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #c8e6c9' }}>{status}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.95rem' }}>Full Name *</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #dcdcdc' }} 
                                placeholder="Your Name"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.95rem' }}>Email Address *</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #dcdcdc' }} 
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.95rem' }}>Phone Number</label>
                                <input 
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #dcdcdc' }} 
                                    placeholder="+91"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.95rem' }}>Message *</label>
                            <textarea 
                                required 
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #dcdcdc', resize: 'vertical' }} 
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            
            <style>{`
                .section-title {
                    font-size: 2.2rem;
                    margin-bottom: 20px;
                    font-weight: 300;
                }
                .section-subtitle {
                    font-size: 1.1rem;
                    color: var(--text-light);
                    max-width: 600px;
                    margin: 0 auto;
                }
                .py-60 {
                    padding-top: 60px;
                    padding-bottom: 60px;
                }
                .text-center {
                    text-align: center;
                }
                .btn:hover {
                    opacity: 0.9;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--primary) !important;
                }
            `}</style>
        </div>
    );
};

export default Contact;
