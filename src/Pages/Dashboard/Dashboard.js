import React from 'react';
import CustomLink from '../../Utilities/CustomLink';
import { Outlet } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile drawer-start">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* menus btn */}
                    {/*  <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </label> */}
                    {/* main content */}
                    <Outlet />
                </div>
                {/* drawer side */}
                <div className="drawer-side shadow-black">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <CustomLink to='manageProducts' className='btn btn-ghost w-full'>Manage Products</CustomLink>
                        <CustomLink to='addProduct' className='btn btn-ghost w-full'>Add Product</CustomLink>
                        <CustomLink to='myCart' className='btn btn-ghost w-full'>My Cart</CustomLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;