import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
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
                        to="/admin/categories" 
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
                        Manage Categories
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
            <main className="admin-content">
                <Outlet />
            </main>
            <style>{`
                .admin-layout {
                    display: flex;
                    flex-direction: row;
                    min-height: calc(100vh - 80px);
                }
                .admin-sidebar {
                    width: 250px;
                    background-color: var(--secondary);
                    border-right: 1px solid var(--border-color);
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                }
                .admin-content {
                    flex: 1;
                    padding: 40px;
                    background-color: #f9f9f9;
                    overflow-x: hidden;
                }
                @media (max-width: 768px) {
                    .admin-layout {
                        flex-direction: column;
                    }
                    .admin-sidebar {
                        width: 100%;
                        border-right: none;
                        border-bottom: 1px solid var(--border-color);
                        padding: 20px;
                    }
                    .admin-content {
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
