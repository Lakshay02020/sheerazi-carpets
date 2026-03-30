import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use onSnapshot so that if admin adds a product, the shop updates instantly in real-time across all clients
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const productsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            productsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            setProducts(productsArray);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching products real-time: ", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        products,
        loading
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
