import React from 'react';

const Blogs = () => {

    return (
        <section className='px-10'>
            <h1 className="text-2xl lg:text-5xl text-center underline">Blogs</h1>
            <ol>
                <li className='list-decimal my-5'>
                    <h5 className="text-lg font-bold">How will you improve the performance of a React Application?</h5>
                    <p>We know that, react re-renders only in two times. First, When props make changes. Second, when state has changes. We can improve performance by controlling re-render.</p>
                </li>
                <li className='list-decimal my-5'>
                    <h5 className="text-lg font-bold">What are the different ways to manage a state in a React application?</h5>
                    <p>There are four types of react state. First one is local component state. useState() is the most popular way to manage local state. Second state is Global state. Redux, MobX, Xstate, Recoil are the popular state management libraries of it.</p>
                </li>
                <li className='list-decimal my-5'>
                    <h5 className="text-lg font-bold">How does prototypical inheritance work?</h5>
                    <p></p>
                </li>
                <li className='list-decimal my-5'>
                    <h5 className="text-lg font-bold">Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts
                        ?</h5>
                    <p></p>
                </li>
                <li className='list-decimal my-5'>
                    <h5 className="text-lg font-bold">You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h5>
                    <p></p>
                </li>
                <li className='list-decimal my-5'>
                    <h5 className="text-lg font-bold">What is a unit test? Why should write unit tests?</h5>
                    <p></p>
                </li>
            </ol>
        </section>
    );
};

export default Blogs;