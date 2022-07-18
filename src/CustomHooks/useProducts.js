import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => setProducts(res))
    }, [])
    return { products, setProducts }
};

export default useProducts;