import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useProduct from '../../CustomHooks/useProduct';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { toast } from 'react-toastify';

const CartAProduct = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const { product, setProduct } = useProduct(id);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { _id, ...rest } = product;
        const newCart = { ...rest, productId: _id, customer: user?.email, cartQuantity: data.cartQuantity }
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
                    toast('You made a new change on your cart!')
                }
                else {
                    toast('You already added this product on your cart!')
                }
            })
        // console.log(newOrder);
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} className=' mx-5'>
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
                                <input className="input input-bordered mr-5"  {...register("productQuantity", { required: true, min: product?.minOrderQty, max: product?.availableQty })} placeholder={product?.minOrderQty} />
                                <button className={`btn`}>Add to cart</button>
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

export default CartAProduct;