import React from 'react';
import ReactStars from 'react-stars';
import SetTitle from '../../Utilities/SetTitle';
import ProductCard from '../Shared/ProductCard';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import useAllProducts from '../../CustomHooks/useAllProducts';
import { Link } from 'react-router-dom';

const Home = () => {
    const { products, setProducts } = useAllProducts(6);
    const carouselItems = products.slice(0, 4);


    const firstExample = {
        value: 2.5,
        edit: false
    };

    const reviewSize = {
        size: 30,
    }
    // if (!products[0]) { return <Loading /> }
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

            {/* Customer reviews==================== */}
            <h1 className='text-4xl text-center mt-10 mb-5 underline'>What client says about us</h1>
            <ReactStars {...firstExample} {...reviewSize} />

            {/* About us==================== */}
            <h1 className='text-4xl text-center mt-10 mb-5 underline'>About us</h1>


        </div>
    );
};

export default Home;