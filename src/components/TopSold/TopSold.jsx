import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';

const TopSold = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dantech-server.onrender.com/product');
                const storedData = response.data.sort((a, b) => {
                    const dateA = a.time ? new Date(a.time.replace(/(\d+)(th|st|nd|rd)/, '$1')) : new Date(0);
                    const dateB = b.time ? new Date(b.time.replace(/(\d+)(th|st|nd|rd)/, '$1')) : new Date(0);
                    return dateB - dateA;
                });
                setProduct(storedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const topSale = product.filter(p => p.subcategory === 'topsale');
    if (loading) return <Loader />;
    return (
        <div>
            <div className='my-10 max-w-screen-xl mx-auto px-3'>
                <h1 className='font-poppin text-3xl uppercase text-center font-bold'>Meilleures Ventes</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
                    {topSale.map(p => (
                        <ProductCard p={p} key={p._id} />
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default TopSold;
