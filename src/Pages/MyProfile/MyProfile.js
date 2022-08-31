import React from 'react';
import { Link } from 'react-router-dom';
import useUserInfo from '../../CustomHooks/useUserInfo';
import UpdateProfileToast from '../../Utilities/UpdateProfileToast';

const MyProfile = () => {
    const { userInfo } = useUserInfo();
    return (
        <section className='relative'>
            <UpdateProfileToast photoURL={userInfo?.photoURL} displayName={userInfo?.displayName} mainText={`Hello ${userInfo?.displayName}! Do you want to edit your profile information?`} btnText='Edit Profile' position="absolute right-10" />

            <div className='flex flex-col items-center'>
                <div className="rounded-full w-20 h-20 overflow-hidden">
                    <img src={userInfo?.photoURL} alt="img" className="rounded-full w-full h-full object-cover" />
                </div>
                <h2 className='text-2xl'>{userInfo?.displayName}</h2>
            </div>
            <h2 className="text-2xl underline my-5 text-center">Details</h2>
            <div className='w-2/4 mx-auto grid gap-5 justify-center text-xl'>
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <p>{userInfo?.email}</p>
                </div>
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>

                    <p>{userInfo?.phoneNumber}</p>
                </div>
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p>{userInfo?.address}</p>
                </div>

            </div>
        </section>
    );
};

export default MyProfile;