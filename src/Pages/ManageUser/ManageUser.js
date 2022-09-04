import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useQuery } from "react-query";
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import MakeAdmin from './MakeAdmin';
import RemoveAdmin from './RemoveAdmin';

const ManageUser = () => {
    const [makeAdmin, setMakeAdmin] = useState();
    const [removeAdmin, setRemoveAdmin] = useState();

    const { isLoading, data, error, refetch } = useQuery([], async () =>
        await axios('http://localhost:5000/users', {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
    )

    isLoading && <LoadingSpinner />

    if (error?.response?.status === (401 || 403)) {
        toast.error('Unauthorized access')
    };


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
                                {user?.role !== 'admin' &&
                                    <label className='btn' onClick={() => setMakeAdmin(user)} htmlFor="confirmMakeAdmin">
                                        Make Admin
                                    </label>
                                }

                                {makeAdmin && <MakeAdmin user={makeAdmin} refetch={refetch} />}
                            </td>
                            <td>
                                {user?.role === 'admin' &&
                                    <label className='btn' onClick={() => setRemoveAdmin(user)} htmlFor="confirmRemoveAdmin">
                                        Remove Admin
                                    </label>
                                }

                                {removeAdmin && <RemoveAdmin user={removeAdmin} refetch={refetch} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ManageUser;