import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const Cart = () => {
    const [user] = useAuthState(auth);
    const { isLoading, error, data, refetch } = useQuery(['repoData'], () =>
        fetch(`http://localhost:5000/cartItems/${user?.email}`, {
            headers: { bearer: localStorage.getItem('accessToken') }
        }).then(res => res.json()
        )
    )
    if (isLoading) {
        <LoadingSpinner />
    }
    console.log(data);
    return (
        <div>

        </div>
    );
};

export default Cart;