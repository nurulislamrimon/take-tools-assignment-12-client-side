import React, { useState } from 'react';
import ReactStars from 'react-stars';
import SetTitle from '../../Utilities/SetTitle';
import ProductCard from '../Shared/ProductCard';
import useProducts from '../../CustomHooks/useProducts';

const Home = () => {
    const { products, setProducts } = useProducts();

    console.log(products);


    const images = [
        'https://static.educalingo.com/img/en/800/claw-hammer.jpg',
        'https://cdn.shopify.com/s/files/1/0306/3197/products/lump1_IMG_7724_1024x1024.jpg?v=1553995483',
        'https://cdn.shopify.com/s/files/1/0021/2258/0031/products/nash-hammer-not-a-frame-on-facebook-parts-tools-weekoflabor2018-motorcycle-company-llc-co_638.jpg?v=1566851446'
    ]

    const firstExample = {
        value: 2.5,
        edit: false
    };

    const reviewSize = {
        size: 30,
    }
    return (
        <div className='container mx-auto h-100 overflow-auto'>
            {/* title */}
            <SetTitle>Home</SetTitle>

            {/* ===========================carousel */}
            <section class="carousel w-full">
                {images.map((image, index) =>
                    <div id={`slide${index}`} class="carousel-item relative w-full h-96 object-contain">
                        <img src={image} class="w-full h-full" />
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${index === 0 ? images.length - 1 : index - 1}`} class="btn btn-circle">❮</a>
                            <a href={`#slide${index === images.length - 1 ? 0 : index + 1}`} class="btn btn-circle">❯</a>
                        </div>
                        <div className=' backdrop-blur-sm p-10 text-center w-full absolute bottom-0'>
                            <h2 className='text-2xl'>image.name</h2>
                            <p>image.info</p>
                        </div>
                    </div>
                )}
            </section>

            {/* products section========================== */}
            <h1 className='text-4xl text-center mt-10 mb-5'>Our Products</h1>
            <section className="grid lg:grid-cols-3 gap-10 justify-items-center mb-10">
                {images.map((product, index) => <ProductCard product={product}></ProductCard>)}
            </section>

            {/* Customer reviews==================== */}
            <h1 className='text-4xl text-center mt-10 mb-5'>What client says about us</h1>
            <ReactStars {...firstExample} {...reviewSize} />

            {/* About us==================== */}
            <h1 className='text-4xl text-center mt-10 mb-5'>About us</h1>


        </div>
    );
};

export default Home;