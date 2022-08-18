import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { name, availableQty, minOrderQty, about, picture, price } = product;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={picture} alt={name} className='h-32 w-full object-center' /></figure>
            <div className="card-body">
                <div className="card-description">
                    <h2 className="card-title">{name}</h2>
                    <p className='text-lg'>Price: ${price}</p>
                    <p className='text-lg'>Available Quantity: {availableQty}</p>
                    <p className='text-lg'>Minimum Order Quantity:{minOrderQty}</p>
                    <p className='text-lg'>Description: {about.length > 50 ? about.slice(0, 50).concat('...') : about}</p>
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/buyProduct/${product?._id}`} className="btn btn-primary w-full" >Buy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;