import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../CustomHooks/useProducts';

const Products = () => {
    const { products, setProducts } = useProducts();
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Available Qty</th>
                            <th>Min Order Qty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{product?.name}</td>
                                <td>${product?.price}</td>
                                <td>{product?.availableQty}pcs</td>
                                <td>{product?.minOrderQty}pcs</td>
                                <td><Link to={`/product/${product._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;