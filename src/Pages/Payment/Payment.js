import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Lf1SOHojcY9S4uQ9rYUEQjD2DMjdOVNOGCzBlwt83aV29cjcNtObsiIDxVWFKgLe2plLcYApd87haQnCMVb5NVi00LVjVcv9N');

const Payment = () => {
    const [order, setOrder] = useState({});
    const [user] = useAuthState(auth);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/orderItem/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [id])

    return (
        <section className='px-5 h-[calc(100vh-115px)] overflow-auto'>
            {/* dashboard menu expander */}
            <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </label>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto mb-3">
                <div className="card-body shadow-xl rounded-xl">
                    <h2 className="card-title">Hi {user?.displayName},</h2>
                    <p>Your order for <span className='font-bold'>{order?.name},</span><span className='font-bold text-primary'> {order?.cartQuantity}pcs</span><span className='font-bold'>, unit price ${order?.price} </span></p>
                    <img src={order?.picture} className='w-2/4 mx-auto' alt="" />
                    <p>Please pay <span className='font-bold'>${order?.price * order?.cartQuantity}</span></p>
                </div>
                <div className="card-body rounded-xl mt-3">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </section>
    );
};

export default Payment;