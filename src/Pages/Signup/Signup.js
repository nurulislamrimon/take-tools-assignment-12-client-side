import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import FullHLoading from '../../Utilities/FullHLoading';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import useToken from '../../CustomHooks/useToken';
import { useEffect } from 'react';

const Signup = () => {
    const [newError, setNewError] = useState('');
    const navigate = useNavigate();
    const imgbbKey = '8d5dfdf2da4e4f18afbf76c977833211';
    const formData = new FormData();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);
    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { token, setToken } = useToken(user || GoogleUser);
    const [logedUser] = useAuthState(auth);

    const onSubmit = async ({ name, email, password, confirmPassword, photo }) => {
        if (password !== confirmPassword) {
            return setNewError("Both of your password didn't match")
        }
        if (photo[0].size > 32000000) {
            return setNewError('Photo size should be less than 32MB')
        }


        formData.append("image", photo[0]);

        fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
            method: "POST",
            body: formData
        })
            .then(async res => res.json())
            .then(async data => {
                await createUserWithEmailAndPassword(email, password);
                await updateProfile({ displayName: name, photoURL: data?.data?.url })
            }
            )
            .catch(console.dir)

    }

    useEffect(() => {
        logedUser && navigate('/');
    }, [logedUser, navigate])

    if (loading || GoogleLoading) { return <FullHLoading /> };

    return (
        <section className='max-w-md mx-auto border p-10 rounded-2xl'>
            <h1 className='text-center text-3xl lg:text-5xl border-b-2 pb-2 mb-5'>Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 pb-5">

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Enter your name</span>
                    </label>
                    <input className="input input-bordered w-100"  {...register("name", { required: true })} />
                    {errors.name &&
                        <label className="label">
                            <small className='text-danger'>Name is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Enter your email address</span>
                    </label>
                    <input className="input input-bordered w-100"  {...register("email", { required: true })} />
                    {errors.email &&
                        <label className="label">
                            <small className='text-danger'>Email is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Enter new password</span>
                    </label>
                    <input className="input input-bordered w-100"  {...register("password", { required: true })} />
                    {errors.password &&
                        <label className="label">
                            <small className='text-danger'>New password is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Confirm password</span>
                    </label>
                    <input className="input input-bordered w-100"  {...register("confirmPassword", { required: true })} />
                    {errors?.confirmPassword &&
                        <label className="label">
                            <small className='text-danger'>Confirm password is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Upload your photo</span>
                    </label>
                    <input type='file' className="input input-bordered w-100"  {...register("photo", { required: true })} />
                    {errors?.photo &&
                        <label className="label">
                            <small className='text-danger'>Photo is required</small>
                        </label>
                    }
                </div>

                {
                    (error || GoogleError || errors || newError) &&
                    <p className='text-danger text-center'>{error?.message || GoogleError?.message || errors?.message || newError}</p>
                }
                <button className='btn' >Sign Up</button>
            </form>
            <div className="divider">OR</div>
            <button className='btn w-full mt-5' onClick={() => signInWithGoogle()}>Google+</button>
        </section>
    );
};

export default Signup;