import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import ConfirmRemoveCartItem from './ConfirmRemoveCartItem';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [removeItem, setRemoveItem] = useState(null);

    const { isLoading, data, error, refetch } = useQuery([user], async () =>
        await axios(`http://localhost:5000/orderItems/${user?.email}`, {
            headers: { authentication: localStorage.getItem('accessToken') }
        })
    )

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error?.response?.status === (401 || 403)) {
        toast('Sorry, You do not have access permission!');
        signOut(auth);
        navigate('/login');
    }

    return (
        <section className='lg:px-10 px-5 h-[calc(100vh-115px)] overflow-auto'>
            {/* dashboard menu expander */}
            <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </label>
            <h2 className='text-2xl text-center underline mb-5'>My Orders</h2>
            <table className="table table-zebra w-full mt-10 lg:mt-0">
                <thead className="sticky top-0">
                    <tr>
                        <th></th>
                        <th>Product Photo</th>
                        <th>Order info</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={product?.picture} className='h-24' alt="img" />
                            </td>
                            <td>
                                <div className="flex">
                                    <Link to={`/product/${product?.productId}`} className='text-2xl mr-5 underline hover:text-blue-800' title='Click here to edit'>{product?.name}</Link>

                                </div>
                                <p>Price: ${product?.price}</p>
                                <p>Cart item: {product?.cartQuantity}pcs</p>
                                <p>Total Price: ${parseFloat(product?.price) * parseInt(product?.cartQuantity)}</p>
                            </td>
                            <td>
                                <Link to='/pay' className='btn'>Pay</Link>
                            </td>
                            <td>
                                {/* delete btn */}

                                <label htmlFor="confirmRemoveCartItem">
                                    <svg title='Remove this item' onClick={() => setRemoveItem(product)} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-warning mt-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </label>
                                {removeItem && <ConfirmRemoveCartItem product={removeItem} refetch={refetch} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!data?.data[0] && <p className='text-center mt-10'>No Order!</p>}
        </section>
    );
};

export default MyOrders;