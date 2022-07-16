import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div class="card bg-base-100 shadow-xl image-full">
            <figure>
                <img src={product} alt="" className=' object-contain' />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;