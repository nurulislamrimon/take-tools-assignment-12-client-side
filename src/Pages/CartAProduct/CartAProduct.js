import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useProduct from '../../CustomHooks/useProduct';

const CartAProduct = () => {
    const { id } = useParams();
    const { product, setProduct } = useProduct(id);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} className=' mx-5'>
                <div className="card lg:card-side bg-base-100 shadow-xl items-center">
                    <img src={product?.picture} alt="Album" className='object-cover w-2/4' />
                    <div className="card-body w-2/4">
                        <h2 className='text-2xl'>Product Name: {product?.name}</h2>
                        <p>Price: ${product?.price}</p>
                        <p>Available: {product?.availableQty}pcs</p>
                        <p>Minimum order: {product?.minOrderQty}pcs</p>
                        <p>Supplier: {product?.supplier}</p>
                        <small>About: {product?.about}</small>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Enter product quantity you want to take:</span>
                            </label>
                            <div className="flex">
                                <input className="input input-bordered mr-5"  {...register("productQuantity", { required: true, min: product?.minOrderQty, max: product?.availableQty })} placeholder={product?.minOrderQty} />
                                <button className={`btn`}>Submit</button>
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