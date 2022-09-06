import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/orderItem/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])
    console.log(product);
    return (
        <section className='px-5 h-[calc(100vh-115px)] overflow-auto'>
            payment
        </section>
    );
};

export default Payment;