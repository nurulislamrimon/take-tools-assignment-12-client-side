import React from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../../CustomHooks/useProduct';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify'

const UpdateProduct = () => {
    const [user] = useAuthState(auth)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { id } = useParams();
    const { product, setProduct } = useProduct(id);
    let { name, price, availableQty, about, minOrderQty, picture } = product;

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name': {
                const { name, ...rest } = product;
                const newName = e.target.value;
                setProduct({ name: newName, ...rest })
                break;
            }

            case 'price': {
                const { price, ...rest } = product;
                const newPrice = e.target.value;
                setProduct({ price: newPrice, ...rest })
                break;
            }
            case 'availableQty': {
                const { availableQty, ...rest } = product;
                const newAvailableQty = e.target.value;
                setProduct({ availableQty: newAvailableQty, ...rest })
                break;
            }
            case 'minOrderQty': {
                const { minOrderQty, ...rest } = product;
                const newMinOrderQty = e.target.value;
                setProduct({ minOrderQty: newMinOrderQty, ...rest })
                break;
            }
            case 'about': {
                const { about, ...rest } = product;
                const newAbout = e.target.value;
                setProduct({ about: newAbout, ...rest })
                break;
            }
            default: {
                const { picture, ...rest } = product;
                const newPicture = e.target.value;
                setProduct({ picture: newPicture, ...rest })
            }
        }
    }

    const onSubmit = (data) => {
        const updatedData = { ...data, supplier: user?.email }
        fetch(`http://localhost:5000/product?id=${id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => data.modifiedCount && toast('Product is updated'))
    }

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} className='w-2/4 mx-auto'>
                <h1 className='text-5xl text-center underline'>{name}</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Product Name:</span>
                    </label>
                    <input className="input input-bordered w-100" value={name}  {...register("name", { required: true })} />
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
                    <input className="input input-bordered w-100" value={price}  {...register("price", { required: true })} />
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
                    <input className="input input-bordered w-100" value={availableQty}  {...register("availableQty", { required: true })} />
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
                    <input className="input input-bordered w-100" value={minOrderQty}  {...register("minOrderQty", { required: true })} />
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
                    <input className="input input-bordered w-100" value={about}  {...register("about", { required: true })} />
                    {errors.about &&
                        <label className="label">
                            <small className='text-alert'>About is required</small>
                        </label>
                    }
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-lg">Photo:</span>
                    </label>
                    <input className="input input-bordered w-100" value={picture}  {...register("picture", { required: true })} />
                    {errors.picture &&
                        <label className="label">
                            <small className='text-alert'>Photo is required</small>
                        </label>
                    }
                </div>
                <button className='btn w-full my-5'>Submit</button>
            </form>
        </section>
    );
};

export default UpdateProduct;