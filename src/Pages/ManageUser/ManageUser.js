import axios from 'axios';
import React from 'react';
import { useQuery } from "react-query";
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const ManageUser = () => {
    const { isLoading, data, error, refetch } = useQuery([], async () =>
        await axios('http://localhost:5000/users', {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
    )

    isLoading && <LoadingSpinner />

    const handleMakeAdmin = (email) => {
        fetch(`http://localhost:5000/admin/${email}`, {
            method: 'put',
            headers: {
                bearer: localStorage.getItem('accessToken'),
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 401 || 403) {
                    toast.error('Unauthorized access')
                }
                return res.json()
            })
            .then(data => {
                if (data?.modifiedCount) {
                    toast.success('New admin assigned!')
                }
            })
        refetch();
    }

    return (
        <section className='h-[calc(100vh-130px)] overflow-auto'>
            <h2 className='text-2xl text-center underline mb-5'>All User</h2>
            <table className="table table-zebra w-full mt-10 lg:mt-0">
                <thead className="sticky top-0">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <p>{user?.displayName}</p>
                            </td>
                            <td>
                                <p>{user?.email}</p>
                            </td>
                            <td>
                                {user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user?.email)} className='btn'>Make Admin</button>}
                            </td>
                            <td>
                                {/* delete btn */}

                                <label htmlFor="confirmRemoveCartItem">
                                    <svg title='Remove this item' xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-warning mt-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ManageUser;