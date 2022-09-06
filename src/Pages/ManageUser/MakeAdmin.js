import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MakeAdmin = ({ user, refetch }) => {
    const navigate = useNavigate();

    const handleMakeAdmin = (email) => {
        fetch(`http://localhost:5000/admin/${email}`, {
            method: 'put',
            headers: {
                authentication: localStorage.getItem('accessToken'),
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.status === (401 || 403)) {
                    toast.error('Unauthorized access');
                    signOut(auth);
                    navigate('/login');
                }
                return res.json()
            })
            .then(data => {
                if (data?.modifiedCount) {
                    refetch();
                    toast.success('New admin assigned!')
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="confirmMakeAdmin" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <div className="flex items-center justify-center">
                        <img src={user?.photoURL} alt="" className='w-16 rounded-full border' />
                        <p className='ml-2 text-2xl'>{user?.displayName}</p>
                    </div>
                    <p className='text-xl text-center'>{user?.email}</p>
                    <p className='text-xl text-center'>{user?.phoneNumber}</p>
                    <p className='text-sm text-center'>{user?.address}</p>
                    <div className="flex justify-center mt-4">
                        <h3 className="text-xl text-center font-bold text-red-600">Assign as an admin?</h3>
                        <label htmlFor="confirmMakeAdmin" className="btn mx-4">No</label>
                        <label htmlFor="confirmMakeAdmin" onClick={() => handleMakeAdmin(user?.email)} className='btn hover:bg-red-600'>Yes</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;