import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
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
    const handleRemoveFromCart = (id) => {
        console.log(`${id} item is deleted`);
    }
    return (
        <div className='lg:px-10 px-5'>
            {data?.map(product => (
                <div className="flex items-center justify-between border-b-2 first:border-t-2">
                    <img src={product?.picture} className='w-1/4' alt="img" />
                    <div>
                        <div className="flex">
                            <Link to={`/product/${product?.productId}`} className='text-2xl mr-5 underline hover:text-blue-800' title='Click here to edit'>{product?.name}</Link>

                        </div>
                        <p>Price: ${product?.price}</p>
                        <p>Cart item: {product?.cartQuantity}pcs</p>
                        <p>Total Price: ${parseFloat(product?.price) * parseInt(product?.cartQuantity)}</p>

                    </div>
                    {/* delete btn */}
                    <svg title='Remove this item' onClick={() => handleRemoveFromCart(product?._id)} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-red-600 mt-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            ))}
            <button className="btn btn-primary mt-5 block ml-auto">Checkout</button>
        </div>
    );
};

export default Cart;