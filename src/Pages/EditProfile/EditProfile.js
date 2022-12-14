import React from 'react';
import { useState } from 'react';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGenerateImgLink from '../../CustomHooks/useGenerateImgLink';
import useUpdateMyProfile from '../../CustomHooks/useUpdateMyProfile';
import useUserInfo from '../../CustomHooks/useUserInfo';
import auth from '../../firebase.init';
import FullHLoading from '../../Utilities/FullHLoading';

const EditProfile = () => {
    const { userInfo, setUserInfo, refetch, isLoading } = useUserInfo();
    const { generateImgLink } = useGenerateImgLink();
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/dashboard/myProfile";
    const [editName, setEditName] = useState(false);
    const [editMobile, setEditMobile] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [editEducation, setEditEducation] = useState(false);
    const [editLinkdin, setEditLinkdin] = useState(false);
    const [updateProfile] = useUpdateProfile(auth);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { updateMyProfile } = useUpdateMyProfile();



    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            const { photoURL, ...rest } = userInfo;
            setUserInfo({ photoURL: URL.createObjectURL(e.target.files[0]), ...rest })
        }
        if (e.target.name === 'name') {
            const { displayName, ...rest } = userInfo;
            setUserInfo({ displayName: e.target.value, ...rest })
        }
        else if (e.target.name === 'phoneNumber') {
            const { phoneNumber, ...rest } = userInfo;
            setUserInfo({ phoneNumber: e.target.value, ...rest })
        }
        else if (e.target.name === 'address') {
            const { address, ...rest } = userInfo;
            setUserInfo({ address: e.target.value, ...rest })
        }
        else if (e.target.name === 'education') {
            const { education, ...rest } = userInfo;
            setUserInfo({ education: e.target.value, ...rest })
        }
        else if (e.target.name === 'linkdin') {
            const { linkdin, ...rest } = userInfo;
            setUserInfo({ linkdin: e.target.value, ...rest })
        }
    }

    const onSubmit = async (data) => {
        if (data.photo.length && data.name) {
            if (data.photo[0].size > 32000000) {
                return toast('Photo size should be less than 32MB')
            }
            const url = await generateImgLink(data);
            if (url) {
                const { _id, photoURL, ...rest } = userInfo;
                await updateMyProfile({ photoURL: url, ...rest })
                await updateProfile({ displayName: data.name, photoURL: url })
            }

        }
        else if (data.photo.length) {
            if (data.photo[0].size > 32000000) {
                return toast('Photo size should be less than 32MB')
            }
            const url = await generateImgLink(data);
            if (url) {
                const { _id, photoURL, ...rest } = userInfo;
                await updateMyProfile({ photoURL: url, ...rest })
                await updateProfile({ photoURL: url })
            }

        }
        else if (data.name) {
            const { _id, ...rest } = userInfo;
            await updateMyProfile(rest);
            await updateProfile({ displayName: data.name })
        }
        else {
            const { _id, ...rest } = userInfo;
            await updateMyProfile(rest);
        }
        refetch();
        navigate(from);
    }

    if (isLoading) {
        return <FullHLoading />
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} className="grid gap-5 pb-5 lg:w-2/4 mx-auto p-4">
                <div className="rounded-full w-20 h-20 mx-auto relative  overflow-hidden">
                    <img src={userInfo?.photoURL} alt="img" className="rounded-full w-full h-full object-cover" />


                    <div className="w-20 h-2/4 mx-auto absolute bottom-0 bg-black/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8 absolute bottom-2 left-1/2 transform -translate-x-1/2 z">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                        <input type="file"  {...register("photo")} className="opacity-0" />
                    </div>
                </div>
                {/* email input */}
                <div className="flex items-start">
                    <label htmlFor="email" className='lg:text-2xl text-lg'>Email :</label>
                    <input className={`ml-5 lg:text-2xl text-lg bg-white w-3/4 ${editName && 'input-bordered'}`} value={userInfo?.email || ''} {...register("email")} disabled />
                </div>
                {/* name input */}
                <div className="flex items-start">
                    <label htmlFor="name" className='lg:text-2xl text-lg'>Name :</label>
                    <input className={`ml-5 lg:text-2xl text-lg bg-white w-3/4 ${editName && 'input input-bordered'}`} value={userInfo?.displayName || ''} {...register("name")} disabled={!editName} />
                    <svg onClick={() => setEditName(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${editName && 'hidden'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
                {/* phoneNumber input */}
                <div className="flex items-start">
                    <label htmlFor="phoneNumber" className='lg:text-2xl text-lg'>Mobile :</label>
                    <input className={`ml-5 lg:text-2xl text-lg bg-white w-3/4 ${editMobile && 'input input-bordered'}`} value={userInfo?.phoneNumber || ''} {...register("phoneNumber")} disabled={!editMobile} />
                    <svg onClick={() => setEditMobile(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${editMobile && 'hidden'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
                {/* education input */}
                <div className="flex items-start">
                    <label htmlFor="education" className='lg:text-2xl text-lg'>Education :</label>
                    <input className={`ml-5 resize-none lg:text-2xl text-lg bg-white w-3/4 ${editEducation && 'resize input input-bordered'}`} value={userInfo?.education || ''} {...register("education")} disabled={!editEducation} />
                    <svg onClick={() => setEditEducation(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${editEducation && 'hidden'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
                {/* linkdin input */}
                <div className="flex items-start">
                    <label htmlFor="linkdin" className='lg:text-2xl text-lg'>Linkdin id :</label>
                    <input className={`ml-5 resize-none lg:text-2xl text-lg bg-white w-3/4 ${editLinkdin && 'resize input input-bordered'}`} value={userInfo?.linkdin || ''} {...register("linkdin")} disabled={!editLinkdin} />
                    <svg onClick={() => setEditLinkdin(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${editLinkdin && 'hidden'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
                {/* address input */}
                <div className="flex items-start">
                    <label htmlFor="address" className='lg:text-2xl text-lg'>Address :</label>
                    <textarea className={`ml-5 resize-none lg:text-2xl text-lg bg-white w-3/4 ${editAddress && 'resize input input-bordered'}`} value={userInfo?.address || ''} {...register("address")} disabled={!editAddress} />
                    <svg onClick={() => setEditAddress(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${editAddress && 'hidden'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>

                <button className='btn'>Update</button>
            </form>
        </div>
    );
};

export default EditProfile;