import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={product} alt="Shoes" className='h-32 w-full object-center' /></figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Link to={`/product/${product?._id}`} className="btn btn-primary" >Buy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;