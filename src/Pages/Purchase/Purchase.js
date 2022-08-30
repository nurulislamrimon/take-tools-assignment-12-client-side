import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useParams } from 'react-router-dom';
import useProduct from '../../CustomHooks/useProduct';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { toast } from 'react-toastify';
import { useState } from 'react';
import useUserInfo from '../../CustomHooks/useUserInfo';

const Purchase = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { userInfo } = useUserInfo();
    const location = useLocation()
    const [isActiveSubmitBtn, setIsActiveSubmitBtn] = useState(true);
    const { id } = useParams();
    const { product, setProduct } = useProduct(id);

    const handleSubmitBtn = e => {
        if (parseInt(product?.minOrderQty) <= e.target.value && e.target.value <= parseInt(product?.availableQty)) {
            setIsActiveSubmitBtn(true)
        } else {
            setIsActiveSubmitBtn(false)
        }
    }
    const handleChange = e => {
        const { minOrderQty, ...rest } = product;
        setProduct({ minOrderQty: e.target.value, ...rest })
    }
    const onSubmit = (data) => {
        const { _id, ...rest } = product;
        const newCart = { ...rest, productId: _id, customer: userInfo?.email, cartQuantity: data.productQuantity }
        fetch('http://localhost:5000/cartItem', {
            method: 'put',
            headers: { 'content-type': 'application/json', 'bearer': localStorage.getItem('accessToken') },
            body: JSON.stringify(newCart)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.upsertedCount) {
                    toast('New product is added on your cart!')
                }
                else if (data?.modifiedCount) {
                    toast('You made a new change at this product on your cart!')
                }
                else {
                    toast('You already added this product on your cart!')
                }
            })
    }

    return (
        <section>

            {(!userInfo?.phoneNumber || !userInfo?.address) && <div id="toast-message-cta" className="mx-auto p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                <div className="flex">
                    <img className="w-8 h-8 rounded-full shadow-lg" src={userInfo?.photoURL} alt="img" />
                    <div className="ml-3 text-sm font-normal">
                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{userInfo?.displayName}</span>
                        <div className="mb-2 text-sm font-normal">Hi {userInfo?.displayName}, thanks for being with us.Please complete your profile</div>
                        <Link to="/editProfile" className='inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"' state={{ from: location }} replace >Update Profile</Link>
                    </div>
                </div>
            </div>}

            <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} className=' mx-5'>
                <div className="card lg:card-side bg-base-100 shadow-xl items-center">
                    <img src={product?.picture} alt="Album" className='object-fit w-2/4' />
                    <div className="card-body w-2/4">
                        <h2 className='text-2xl'>Product Name: {product?.name}</h2>
                        <h6 className='text-xl'>Price: ${product?.price}</h6>
                        <h6 className='text-xl'>Available: {product?.availableQty}pcs</h6>
                        <h6 className='text-xl'>Minimum order: {product?.minOrderQty}pcs</h6>
                        <h6 className='text-xl'>Supplier: {product?.supplier}</h6>
                        <div className='flex items-start'><span className='text-xl'>About:</span> <span className='pt-1 indent-4 text-justify'>{product?.about}</span></div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Enter product quantity you want to take:</span>
                            </label>
                            <div className="flex">
                                <input className="input input-bordered mr-5"  {...register("productQuantity", { required: true, min: product?.minOrderQty, max: product?.availableQty })} value={product?.minOrderQty} onChange={handleSubmitBtn} />
                                <button className={`btn ${!isActiveSubmitBtn && 'btn-disabled'}`}>Add to cart</button>
                            </div>
                            {errors.productQuantity &&
                                <label className="label">
                                    <small className='text-red-700'>You should take this product between {`${product?.minOrderQty} and ${product?.availableQty}`}pcs</small>
                                </label>
                            }
                        </div>
                    </div>

                </div>
            </form>
        </section>
    );
};

export default Purchase;