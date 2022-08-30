import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';

const useUserInfo = () => {
    const [user] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState({});
    const { isLoading, error, data, refetch } = useQuery([user?.email], () =>
        fetch(`http://localhost:5000/user/${user?.email}`, {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
            .then(res => res.json())
    );
    useEffect(() => {
        setUserInfo(data);
    }, [data]);
    return { userInfo, setUserInfo, refetch, isLoading }
};

export default useUserInfo;