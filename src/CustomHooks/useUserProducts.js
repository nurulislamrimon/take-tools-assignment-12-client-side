import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";
import auth from '../firebase.init';
import { useNavigate } from 'react-router-dom';


const useUserProducts = (limit) => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        axios.get(`http://localhost:5000/myProducts/${user?.email}?limit=${limit}`, {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
            .then(res => setProducts(res.data))
            .catch(err => {
                if (err?.response?.status === 401 || 403) {
                    toast(err?.response?.data?.result);
                    signOut(auth);
                    navigate('/login');
                }
            })
    }, [user, limit])
    return { products, setProducts }
};

export default useUserProducts;