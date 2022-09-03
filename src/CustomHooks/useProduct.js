import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const useProduct = (id) => {
    const [product, setProduct] = useState({});
    useEffect(() => {
        axios(`https://take-tools.herokuapp.com/product?id=${id}`)
            .then(res => setProduct(res?.data))
    }, [id])
    return { product, setProduct }
};

export default useProduct;