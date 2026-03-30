import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-60" style={{ maxWidth: '500px' }}>
            <div style={{ padding: '30px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--white)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Portal Login</h2>
                
                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Admin Email</label>
                        <input 
                            type="email" 
                            required 
                            className="form-control" 
                            style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Password</label>
                        <input 
                            type="password" 
                            required 
                            className="form-control"
                            style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn" 
                        disabled={loading}
                        style={{ width: '100%', marginTop: '10px' }}
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '10px' }}>
                        Authorized personnel only. Contact the owner if you need access.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
