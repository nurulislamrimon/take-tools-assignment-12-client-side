import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmCancelOrder from './ConfirmCancelOrder';

const ManageOrder = () => {
    const navigate = useNavigate();
    const [cancelOrder, setCancelOrder] = useState();

    const { data, isLoading, error, refetch } = useQuery([], async () =>
        await axios('http://localhost:5000/orderItems', {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
    )
    isLoading && <LoadingSpinner />
    if (error?.response?.status === (401 || 403)) {
        toast.error('Unauthorized access');
        signOut(auth);
        navigate('/login');
    };
    return (
        <section className='relative h-[calc(100vh-115px)] overflow-auto'>
            {/* dashboard menu expander */}
            <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </label>
            <table className="table table-zebra w-full mt-10 lg:mt-0">
                <thead className="sticky top-0">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Photo</th>
                        <th>Price</th>
                        <th>Available Qty</th>
                        <th>Min Order Qty</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((order, index) =>
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{order?.name}</td>
                            <td className='h-[60px]'><img src={order?.picture} alt="img" width={50} className='h-full' /></td>
                            <td>${order?.price}</td>
                            <td>{order?.availableQty}pcs</td>
                            <td>{order?.minOrderQty}pcs</td>
                            <td>
                                <div className="flex justify-around">
                                    {/* <Link to={`/dashboard/updateProduct/${order._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Link> */}


                                    <label onClick={() => setCancelOrder(order)} htmlFor="confirmCancelOrder" className='cursor-pointer hover:text-red-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </label>
                                    {cancelOrder && <ConfirmCancelOrder order={cancelOrder} refetch={refetch} />}
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default ManageOrder;