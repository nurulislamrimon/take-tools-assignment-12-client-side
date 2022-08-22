import React from 'react';
import useAllProducts from '../../CustomHooks/useAllProducts';
import FullHLoading from '../../Utilities/FullHLoading';
import ProductCard from '../Shared/ProductCard';

const AllProducts = () => {
    const { products, setProducts } = useAllProducts(0);
    return (
        <div>
            {/* products section========================== */}
            <p className='text-4xl text-center mt-10 w-3/4 mx-auto'>Products</p>
            <marquee className='text-xl mb-5 w-2/4 mx-auto block' scrollamount='5'>Select your favourite product and get it from your door!</marquee>
            {!products[0] && <FullHLoading />}
            <section className="grid lg:grid-cols-3 gap-10 justify-items-center mb-10">
                {products.map((product, index) => <ProductCard key={index} product={product}></ProductCard>)}
            </section>
        </div>
    );
};

export default AllProducts;