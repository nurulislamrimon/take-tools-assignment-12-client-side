import React from 'react';
import ReactStars from 'react-stars';
import SetTitle from '../../Utilities/SetTitle';
import ProductCard from '../Shared/ProductCard';
import useProducts from '../../CustomHooks/useProducts';

const Home = () => {
    const { products, setProducts } = useProducts();
    const carouselItems = products.slice(0, 4);
    // console.log(products);


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
            <section className="carousel w-full">
                {carouselItems.map((product, index) =>
                    <div key={index} id={`slide${index}`} className="carousel-item relative w-full h-96 object-contain">
                        <img src={product?.picture} className="w-full h-full" alt='img' />
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
            <h1 className='text-4xl text-center mt-10 mb-5 underline'>Our Products</h1>
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