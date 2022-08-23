import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify'

const AddProduct = () => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit, watch, reset, formState, formState: { errors } } = useForm();


    const onSubmit = (data) => {
        const newProduct = { ...data, supplier: user?.email }
        fetch(`https://take-tools.herokuapp.com/addProduct`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => data?.acknowledged && toast('New Product Added'))
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ name: '', price: '', availableQty: '', minOrderQty: '', about: '', picture: '' });
        }
    }, [formState, reset])
    return (
        <section className='relative'>
            {/* dashboard menu expander */}
            <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </label>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/4 mx-auto'>
                <h1 className='text-5xl text-center underline'>Add New Product</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Product Name:</span>
                    </label>
                    <input className="input input-bordered w-100" placeholder='Hammer' {...register("name", { required: true })} />
                    {errors.name &&
                        <label className="label">
                            <small className='text-alert'>Product Name is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Price:</span>
                    </label>
                    <input className="input input-bordered w-100" placeholder='500'  {...register("price", { required: true })} />
                    {errors.price &&
                        <label className="label">
                            <small className='text-alert'>Price is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Available Quantity:</span>
                    </label>
                    <input className="input input-bordered w-100" placeholder='1000'  {...register("availableQty", { required: true })} />
                    {errors.availableQty &&
                        <label className="label">
                            <small className='text-alert'>Available Quantity is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Minimum Order Quantity:</span>
                    </label>
                    <input className="input input-bordered w-100" placeholder='100'  {...register("minOrderQty", { required: true })} />
                    {errors.minOrderQty &&
                        <label className="label">
                            <small className='text-alert'>Minimum Order Quantity is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">About:</span>
                    </label>
                    <input className="input input-bordered w-100" placeholder='write something about this product'  {...register("about", { required: true })} />
                    {errors.about &&
                        <label className="label">
                            <small className='text-alert'>About is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Photo URL:</span>
                    </label>
                    <input className="input input-bordered w-100" placeholder='https://example'  {...register("picture", { required: true })} />
                    {errors.picture &&
                        <label className="label">
                            <small className='text-alert'>Photo url is required</small>
                        </label>
                    }
                </div>
                <button className='btn w-full my-5'>Submit</button>
            </form>
        </section>
    );
};

export default AddProduct;