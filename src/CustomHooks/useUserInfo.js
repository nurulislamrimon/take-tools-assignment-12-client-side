import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import LoadingSpinner from '../Utilities/LoadingSpinner';

const useUserInfo = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const { isLoading, error, data, refetch } = useQuery([user?.email], () => {
        if (user) {
            return axios(`http://localhost:5000/user/${user?.email}`, {
                headers: {
                    bearer: localStorage.getItem('accessToken')
                }
            })
        }
    }
    );

    useEffect(() => {
        setUserInfo(data?.data)
    }, [data])
    isLoading && <LoadingSpinner />

    if (error?.response?.status === (401 || 403)) {
        toast('Unauthorized access')
        signOut(auth)
        navigate('/login')
    }

    return { userInfo, setUserInfo, refetch, isLoading }
};

export default useUserInfo;