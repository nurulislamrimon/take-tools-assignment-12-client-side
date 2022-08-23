import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import auth from '../firebase.init';

const useAllProducts = (limit) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://take-tools.herokuapp.com/allProducts?limit=${limit}`, {
        })
            .then(res => setProducts(res.data))
            .catch(err => {
                if (err?.response?.status === 401) {
                    toast('You do not have access authority');
                    signOut(auth);
                }
            })
    }, [limit])
    return { products, setProducts }
};

export default useAllProducts;