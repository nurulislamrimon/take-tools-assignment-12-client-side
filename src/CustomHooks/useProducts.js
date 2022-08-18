import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useProducts = (limit) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/products?limit=${limit}`)
            .then(res => setProducts(res.data))
    }, [limit])
    return { products, setProducts }
};

export default useProducts;