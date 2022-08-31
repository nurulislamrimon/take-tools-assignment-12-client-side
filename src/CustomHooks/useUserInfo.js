import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const useUserInfo = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const { isLoading, error, data, refetch } = useQuery([user?.email], () => {
        if (user) {
            return fetch(`http://localhost:5000/user/${user?.email}`, {
                headers: {
                    "bearer": localStorage.getItem('accessToken')
                }
            })
                .then(res => res.json())
        }
    }
    );

    useEffect(() => {
        setUserInfo(data);
    }, [data]);

    if (error) {
        if (error?.response?.status === 401 || 403) {
            toast.error('Sorry! Unauthorized access');
            signOut(auth);
            navigate('/login')
        }
    }
    // error && toast.error(error?.message)
    return { userInfo, setUserInfo, refetch, isLoading }
};

export default useUserInfo;