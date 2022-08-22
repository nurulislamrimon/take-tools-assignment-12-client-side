import React from 'react';
import CustomLink from '../../Utilities/CustomLink';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile drawer-end">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* menus btn */}
                    <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute right-5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </label>
                    {/* main content */}

                </div>
                {/* drawer side */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><CustomLink to='/myProducts'>My Products</CustomLink></li>
                        <li><CustomLink to='/addProduct'>Add Product</CustomLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;