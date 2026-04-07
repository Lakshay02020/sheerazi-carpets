import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
            <aside className="admin-sidebar" style={{ width: '250px', backgroundColor: 'var(--secondary)', borderRight: '1px solid var(--border-color)', padding: '30px 20px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '30px', fontSize: '1.2rem', fontWeight: 'bold' }}>Admin Dashboard</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                    <NavLink 
                        to="/admin/manage" 
                        style={({isActive}) => ({
                            padding: '10px 15px', 
                            borderRadius: '6px', 
                            textDecoration: 'none', 
                            color: isActive ? 'var(--white)' : 'var(--text-dark)', 
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            fontWeight: isActive ? '600' : '400',
                            transition: '0.2s'
                        })}
                    >
                        Manage Products
                    </NavLink>
                    <NavLink 
                        to="/admin/add" 
                        style={({isActive}) => ({
                            padding: '10px 15px', 
                            borderRadius: '6px', 
                            textDecoration: 'none', 
                            color: isActive ? 'var(--white)' : 'var(--text-dark)', 
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            fontWeight: isActive ? '600' : '400',
                            transition: '0.2s'
                        })}
                    >
                        Add New Product
                    </NavLink>
                </nav>
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                    <button onClick={logout} className="btn" style={{ width: '100%', backgroundColor: 'var(--text-dark)' }}>
                        Log Out
                    </button>
                </div>
            </aside>
            <main className="admin-content" style={{ flex: 1, padding: '40px', backgroundColor: '#f9f9f9' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
