import axios from 'axios';
import React from 'react';

const ConfirmDelete = ({ productId }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/product?id=${id}`)
            .then(res => console.log(res))
    }
    return (
        <div>
            <input type="checkbox" id="confirm-delete" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="confirm-delete" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for</p>
                    <button onClick={() => handleDelete(productId)} className='btn btn-danger'>Confirm Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;