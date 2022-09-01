import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import auth from '../firebase.init';

const useAllProducts = (limit) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios(`http://localhost:5000/allProducts?limit=${limit}`)
            .then(res => setProducts(res.data))
            .catch(err => {
                if (err?.response?.status === (401 || 403)) {
                    toast('You do not have access permission');
                    signOut(auth);
                }
            })
    }, [limit])
    return { products, setProducts }
};

export default useAllProducts;