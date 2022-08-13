import React from 'react';

const NotFound = () => {
    return (
        <div className='h-[calc(100vh-150px)] flex flex-col justify-center'>
            <h1 className="text-4xl text-center text-warning">404</h1>
            <h4 className="text-2xl text-center">Sorry! Page doesn't exist.</h4>
        </div>
    );
};

export default NotFound;