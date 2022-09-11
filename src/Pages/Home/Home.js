import React from 'react';
import ReactStars from 'react-stars';
import SetTitle from '../../Utilities/SetTitle';
import ProductCard from '../Shared/ProductCard';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import useAllProducts from '../../CustomHooks/useAllProducts';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import CountUp from 'react-countup';
import { FaUsers, FaRegMap, FaHammer } from 'react-icons/fa';

const Home = () => {
    const { products, setProducts } = useAllProducts(6);
    const [reviews, setReviews] = useState([]);

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/banners?limit=${0}`)
            .then(res => res.json())
            .then(data => setBanners(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/review?limit=${0}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div>
            {/* title */}
            <SetTitle>Home</SetTitle>

            {/* ===========================carousel */}
            <section className="carousel w-full">
                {!products[0] && <LoadingSpinner />}
                {banners?.map((banner, index) =>
                    <div key={banner?._id} id={`slide${index}`} className="carousel-item relative w-full h-[100vh]">
                        <img src={banner?.picture} className="w-full h-full object-fit bg-fixed" alt={banner?.name} />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${index === 0 ? banners.length - 1 : index - 1}`} className="btn btn-circle">❮</a>
                            <a href={`#slide${index === banners.length - 1 ? 0 : index + 1}`} className="btn btn-circle">❯</a>
                        </div>
                        <div className='rounded-xl p-5 text-center absolute bottom-2/4 right-20 left-20 bg-[#6D717A] text-[#DFCBD8] shadow-xl'>
                            <div className='backdrop-blur-lg'>
                                <h2 className='text-2xl'>{banner?.name}</h2>
                                <p>{banner?.about}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* products section========================== */}
            <div className="container mx-auto">
                <div className='relative'>
                    <h1 className='text-4xl mt-10 mb-5 underline text-center'>Products
                    </h1>
                    <Link to='/allProducts' className='absolute right-0 top-0'>See all Products</Link>
                </div>
                {!products[0] && <LoadingSpinner />}
                <section className="grid lg:grid-cols-3 gap-10 justify-items-center mb-10">
                    {products?.map((product) => <ProductCard key={product?._id} product={product}></ProductCard>)}
                </section>
            </div>

            {/* our technology */}
            <section className=' shadow-lg py-5'>
                <h1 className="text-4xl text-center py-5">Our Technology</h1>
                <div className="lg:flex items-center">
                    <article className='lg:w-2/4 mx-auto'>
                        <h4 className="font-bold text-center">The best technology guarantee!</h4>
                        <p className='text-center'>We have the best tools production technology. Customer satisfaction is our main priority, that's why we have all kind of technological support for you. We are updating our technology with modern world.</p>
                    </article>
                    <iframe className='rounded-2xl w-full lg:w-2/4' width="560" height="315" src="https://www.youtube.com/embed/i-PgeWbDgq4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </section>

            {/* shipping */}
            <section className='p-5 mt-5 container mx-auto'>
                <h1 className="text-4xl text-center py-5">Fast shipping Service</h1>
                <div className="grid lg:grid-cols-2 items-center justify-around">
                    <article className='lg:order-2'>
                        <h4 className="font-bold text-center">Get the best shipping service all over the world!</h4>
                        <p className='text-center'>Get your product from your door step with fast and high security delivery service of take-tools.</p>
                    </article>
                    <img className='lg:order-1 w-full' src="http://hi-light.tki.tw/public/photo/form/143629016820275.jpg" alt="" />
                </div>
            </section >

            {/* business summery==================== */}
            <div className="mt-5">
                < h1 className='text-4xl text-center mt-10' > Million Business Trust us</ h1>
                <p className='text-2xl text-center'>Customers satisfaction is our main priority</p>
                <section className='grid lg:grid-cols-3 justify-center gap-10 py-10'>
                    <div className="card w-96">
                        <FaRegMap className='h-20 w-20 mx-auto' />
                        <h1 className='text-center text-3xl font-bold'>
                            <CountUp end={44} duration={4} />
                            +
                        </h1>
                        <p className='font-bold text-center'>Countries</p>
                    </div>
                    <div className="card w-96">
                        <FaHammer className='h-20 w-20 mx-auto' />
                        <h1 className='text-center text-3xl font-bold'>
                            <CountUp end={50} duration={5} />
                            +
                        </h1>
                        <p className='font-bold text-center'>Products</p>
                    </div>
                    <div className="card w-96">
                        <FaUsers className='h-20 w-20 mx-auto' />
                        <h1 className='text-center text-3xl font-bold'>
                            <CountUp end={150} duration={7} />
                            +
                        </h1>
                        <p className='font-bold text-center'>Happy Clients</p>
                    </div>
                </section>
            </div>
            {/* Customer reviews==================== */}
            <div className="container mx-auto">
                <h1 className='text-4xl text-center mt-10 mb-5 underline'>What client says about us</h1>
                <div className="grid lg:grid-cols-2 gap-5 p-5">
                    {reviews?.map((review) => (
                        <div key={review?._id} className="shadow-lg p-5">
                            <div className="flex items-center">
                                <img src={review?.user?.photoURL} alt="" className='rounded-full h-12 w-12' />
                                <h4 className="text-lg font-bold ml-3">{review?.user?.displayName}</h4>
                            </div>
                            <ReactStars value={review?.rating} edit={false} size={20} />
                            <p>{review?.review}</p>
                        </div>
                    ))}
                </div>

                {/* any query */}
                <section className='flex items-end lg:items-center justify-around lg:w-3/4 shadow-xl mx-auto p-5 mb-5'>
                    <h2 className='text-md lg:text-xl'>Don't hesitate to contact with us for any complaint or query</h2>
                    <Link to='/dashboard/addReview' className='btn btn-secondary btn-xs mr-5'>Submit a review</Link>
                    <a href="mailto:nurulislamrimon@gmail.com"><button className='btn btn-primary btn-xs'>Contact us</button></a>
                </section>
            </div>
        </div >
    );
};

export default Home;