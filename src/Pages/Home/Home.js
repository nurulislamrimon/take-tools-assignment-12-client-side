import React from 'react';
import ReactStars from 'react-stars';
import SetTitle from '../../Utilities/SetTitle';
import ProductCard from '../Shared/ProductCard';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import useAllProducts from '../../CustomHooks/useAllProducts';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaUsers, FaRegMap, FaHammer } from 'react-icons/fa';

const Home = () => {
    const { products, setProducts } = useAllProducts(6);
    const [reviews, setReviews] = useState([]);
    const carouselItems = products.slice(0, 4);

    useEffect(() => {
        fetch(`http://localhost:5000/review?limit=${0}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='container mx-auto h-100 overflow-auto'>
            {/* title */}
            <SetTitle>Home</SetTitle>

            {/* ===========================carousel */}
            <section className="carousel w-full">
                {!products[0] && <LoadingSpinner />}
                {carouselItems.map((product, index) =>
                    <div key={index} id={`slide${index}`} className="carousel-item relative w-full h-96">
                        <img src={product?.picture} className="w-full h-full object-contain" alt={product?.name} />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${index === 0 ? carouselItems.length - 1 : index - 1}`} className="btn btn-circle">❮</a>
                            <a href={`#slide${index === carouselItems.length - 1 ? 0 : index + 1}`} className="btn btn-circle">❯</a>
                        </div>
                        <div className=' backdrop-blur-sm p-10 text-center w-full absolute bottom-0'>
                            <h2 className='text-2xl'>{product?.name}</h2>
                            <p>{product?.info}</p>
                        </div>
                    </div>
                )}
            </section>

            {/* products section========================== */}
            <div className='relative'>
                <h1 className='text-4xl mt-10 mb-5 underline text-center'>Products
                </h1>
                <Link to='/allProducts' className='absolute right-0 top-0'>See all Products</Link>
            </div>
            {!products[0] && <LoadingSpinner />}
            <section className="grid lg:grid-cols-3 gap-10 justify-items-center mb-10">
                {products.map((product, index) => <ProductCard key={index} product={product}></ProductCard>)}
            </section>

            {/* About us==================== */}
            <h1 className='text-4xl text-center mt-10 mb-5 underline'>Million Business Trust us</h1>
            <p className='text-2xl text-center'>Customers satisfaction is our main priority</p>
            <section className='grid lg:grid-cols-3 justify-center gap-10 py-10'>
                <div className="card w-96">
                    <FaRegMap className='h-20 w-20 mx-auto' />
                    <h1 className='text-center text-3xl font-bold'>
                        44+
                    </h1>
                    <p className='font-bold text-center'>Countries</p>
                </div>
                <div className="card w-96">
                    <FaHammer className='h-20 w-20 mx-auto' />
                    <h1 className='text-center text-3xl font-bold'>
                        50+
                    </h1>
                    <p className='font-bold text-center'>Products</p>
                </div>
                <div className="card w-96">
                    <FaUsers className='h-20 w-20 mx-auto' />
                    <h1 className='text-center text-3xl font-bold'>
                        150+
                    </h1>
                    <p className='font-bold text-center'>Happy Clients</p>
                </div>
            </section>
            {/* Customer reviews==================== */}
            <h1 className='text-4xl text-center mt-10 mb-5 underline'>What client says about us</h1>
            <div className="grid grid-cols-2 gap-5 p-5">
                {reviews?.map((review, index) => (
                    <div key={index} className="shadow-lg p-5">
                        <div className="flex">
                            <img src={review?.user?.photoURL} height={30} width={30} alt="" className='rouded-circle' />
                            <h4 className="text-lg font-bold">{review?.user?.displayName}</h4>
                        </div>
                        <ReactStars value={review?.rating} edit={false} size={20} />
                        <p>{review?.review}</p>
                    </div>
                ))}
            </div>
            {/* any query */}
            <section className='w-3/4 shadow-xl mx-auto p-5 mb-5'>
                <h2 className='text-3xl'>Don't hesitate to contact with us for any complaint or query</h2>
                <div className="ml-auto w-fit my-5">
                    <Link to='/dashboard/addReview' className='btn btn-secondary mr-5'>Submit a review</Link>
                    <a href="mailto:nurulislamrimon@gmail.com"><button className='btn btn-primary'>Contact us</button></a>
                </div>
            </section>
        </div>
    );
};

export default Home;