import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import FullHLoading from '../../Utilities/FullHLoading';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();

    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = ({ email, password }) => {
        signInWithEmailAndPassword(email, password);
    }

    if (GoogleLoading || loading) { return <FullHLoading /> }
    if (user?.user?.uid || GoogleUser) {
        fetch('http://localhost:5000/user', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.user?.email || GoogleUser?.user?.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.matchedCount) {
                    toast(`Welcome Back Mr.${user?.user?.displayName || GoogleUser?.user?.displayName}`);
                } else {
                    toast(`Thank your Mr.${user?.user?.displayName || GoogleUser?.user?.displayName || 'User'} for being with us`);
                };
            })
        navigate('/')
    }

    return (
        <section className='max-w-md mx-auto'>
            <h1 className='text-center lg:text-5xl text-3xl my-5'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 pb-5">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">What is your email?</span>
                    </label>
                    <input className="input input-bordered w-100"  {...register("email", { required: true })} />
                    {errors.email &&
                        <label className="label">
                            <small className='text-alert'>Email is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">What is your password?</span>
                    </label>
                    <input className="input input-bordered w-100"  {...register("password", { required: true })} />
                    {errors.password &&
                        <label className="label">
                            <small className='text-alert'>Password is required</small>
                        </label>
                    }
                </div>

                {
                    (error || GoogleError || errors) &&
                    <p className='text-alert'>{error?.message || GoogleError?.message || errors?.message}</p>
                }
                <button className='btn' >Login</button>
            </form>
            <div className="divider">OR</div>
            <button className='btn w-full mt-5' onClick={() => signInWithGoogle()}>Google+</button>
        </section>
    );
};

export default Login;