import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const useUserProducts = (limit) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/products?limit=${limit}`, {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
            .then(res => setProducts(res.data))
            .catch(err => {
                if (err?.response?.status === 401) {
                    toast('You do not have access authority')
                }
            })
    }, [limit])
    return { products, setProducts }
};

export default useUserProducts;