import React from 'react';

const Welcome = () => {
    return (
        <section className='h-[calc(100vh-130px)] flex justify-center items-center relative'>
            {/* dashboard menu expander */}
            <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </label>
            <h1 className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-primary to-red'>Welcome to dashboard</h1>
        </section >
    );
};

export default Welcome;