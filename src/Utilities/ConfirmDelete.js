import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const ConfirmDelete = ({ product, refetch }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/product?id=${id}`, {
            headers: { bearer: localStorage.getItem('accessToken') }
        })
            .then(res => {
                if (res?.data?.deletedCount) { toast('Product deleted successfully') }
            })
            .catch(console.dir)
        refetch();
    }
    return (
        <div>
            <input type="checkbox" id="confirm-delete" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <div className="text-2xl flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>

                    <div className="mx-auto w-3/4">
                        <p className='text-xl'>Product: {product?.name}</p>
                        <p className='text-xl'>Price: ${product?.price}</p>
                        <p className='text-xl'>Stock items: {product?.availableQty}pcs</p>
                    </div>
                    <img src={product?.picture} alt='img' className='w-3/4 mx-auto' />
                    <div className="flex justify-center mt-4">
                        <h3 className="text-2xl text-center font-bold text-red-600">Do you want to delete?</h3>
                        <label htmlFor="confirm-delete" className="btn mx-4">No</label>
                        <label htmlFor="confirm-delete" onClick={() => handleDelete(product?._id)} className='btn hover:bg-red-600'>Yes</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;