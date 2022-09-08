import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import FullHLoading from '../../Utilities/FullHLoading';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const CheckoutForm = ({ order }) => {
    const [user] = useAuthState(auth);
    const [cardError, setCardError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const [trxId, setTrxId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const totalPrice = order?.price * order?.cartQuantity;

    useEffect(() => {

        if (!isNaN(totalPrice)) {
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    authentication: localStorage.getItem('accessToken')
                },
                body: JSON.stringify({ totalPrice: totalPrice })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.clientSecret) {
                        setClientSecret(data.clientSecret)
                    }
                })
        }
    }, [totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (elements == null) {
            setIsLoading(false)
            return;
        }
        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });
        if (error) {
            setCardError(error?.message);
            setIsLoading(false);
            return;
        } else {
            setCardError('');
        }
        const { paymentIntent, paymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: order?.customer
                    },
                },
            },
        );
        if (paymentError) {
            setCardError(paymentError?.message)
            setIsLoading(false);
            return;
        } else {
            setPaymentSuccess('Congrates! Your payment is successfully done.');
            setTrxId(paymentIntent?.id);
            fetch(`http://localhost:5000/payment/${order?._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authentication: localStorage.getItem('accessToken')
                },
                body: JSON.stringify({ trxId: paymentIntent?.id })
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }
        setIsLoading(false);
    };



    return (
        <form onSubmit={handleSubmit}>
            <h2 className='text-xl text-center mb-5 underline'>Pay using card</h2>
            <CardElement />
            {cardError && <small className='text-error'>{cardError}</small>}
            {isLoading && <LoadingSpinner />}
            {paymentSuccess && <div>
                <small className='text-success'>{paymentSuccess}</small><br />
                <small>Transaction ID: <span className='text-warning'>{trxId}</span></small>
            </div>}
            <button type="submit" className='btn btn-success ml-auto block mt-3' disabled={!stripe || !elements || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;