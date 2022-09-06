import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useProduct from '../../CustomHooks/useProduct';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useUserInfo from '../../CustomHooks/useUserInfo';
import UpdateProfileToast from '../../Utilities/UpdateProfileToast';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const Purchase = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { userInfo } = useUserInfo();
    const navigate = useNavigate();
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
        fetch('http://localhost:5000/orderItem', {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                authentication: localStorage.getItem('accessToken')
            },
            body: JSON.stringify(newCart)
        })
            .then(res => {
                if (res?.status === (401 || 403)) {
                    toast('Unauthorized access');
                    signOut(auth);
                    navigate('/login')
                }
                return res.json()
            })
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
        navigate('/dashboard/myOrders')
    }

    return (
        <section>

            {(!userInfo?.phoneNumber || !userInfo?.address) &&
                <UpdateProfileToast photoURL={userInfo?.photoURL} displayName={userInfo?.displayName} mainText={`Hi ${userInfo?.displayName}, thanks for being with us.Please complete your profile`} btnText='Update Profile' position="mx-auto" />}

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
                                <button className={`btn ${!isActiveSubmitBtn && 'btn-disabled'}`}>Add to order list</button>
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