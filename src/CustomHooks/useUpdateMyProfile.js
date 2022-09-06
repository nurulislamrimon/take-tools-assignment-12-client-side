import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const useUpdateMyProfile = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    async function updateMyProfile(newData) {
        await fetch(`http://localhost:5000/updateUser/${user?.email}`, {
            method: 'put',
            headers: {
                "content-type": "application/json",
                authentication: localStorage.getItem('accessToken')
            },
            body: JSON.stringify(newData)
        })
            .then(res => {
                if (res?.status === (401 || 403)) {
                    toast.error('Unauthorized access')
                    signOut(auth);
                    navigate('/login')
                }
                return res.json()
            })
            .then(d => {
                if (d.modifiedCount || d.upsertedCount) {
                    toast('Your profile information updated')
                }
            })
    }
    return { updateMyProfile };
};

export default useUpdateMyProfile;