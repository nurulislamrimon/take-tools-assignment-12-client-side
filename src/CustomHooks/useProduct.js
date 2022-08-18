import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const useProduct = (id) => {
    const [product, setProduct] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/product?id=${id}`)
            .then(res => setProduct(res?.data))
    }, [id])
    return { product, setProduct }
};

export default useProduct;