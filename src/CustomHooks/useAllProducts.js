import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const useAllProducts = (limit) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/allProducts?limit=${limit}`, {
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

export default useAllProducts;