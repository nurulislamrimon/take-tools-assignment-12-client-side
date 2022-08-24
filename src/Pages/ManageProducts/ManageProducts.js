import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import ConfirmDelete from '../../Utilities/ConfirmDelete';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const ManageProducts = () => {
    const [controllDeletion, setControllDeletion] = useState(null);
    const [user] = useAuthState(auth);
    const limit = 0;
    const { isLoading, error, data, refetch } = useQuery([user, limit], () =>
        axios.get(`http://localhost:5000/myProducts/${user?.email}?limit=${limit}`, {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
    )
    const products = data?.data;

    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className='relative'>
            <div className="overflow-x-auto">
                {/* dashboard sidebar open */}
                <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </label>
                <table className="table table-zebra w-full mt-10">
                    <thead>
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
                        {products.map((product, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{product?.name}</td>
                                <td className='h-[60px]'><img src={product?.picture} alt="img" width={50} className='h-full' /></td>
                                <td>${product?.price}</td>
                                <td>{product?.availableQty}pcs</td>
                                <td>{product?.minOrderQty}pcs</td>
                                <td>
                                    <div className="flex justify-around">
                                        <Link to={`/product/${product._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>


                                        <label onClick={() => setControllDeletion(product)} htmlFor="confirm-delete" className='cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </label>
                                        {controllDeletion && <ConfirmDelete refetch={refetch} product={controllDeletion} />}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;