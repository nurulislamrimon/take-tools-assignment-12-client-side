import React from 'react';
import CustomLink from '../../Utilities/CustomLink';
import { Outlet } from 'react-router-dom';
import useUserInfo from '../../CustomHooks/useUserInfo';


const Dashboard = () => {
    const { userInfo, setUserInfo } = useUserInfo();
    const adminMenus = [
        <CustomLink to='manageProducts' key='manageProducts' className='btn btn-ghost w-full'>Manage Products</CustomLink>,
        <CustomLink to='addProduct' key='addProduct' className='btn btn-ghost w-full'>Add Product</CustomLink>,
        <CustomLink to='manageUser' key='manageUser' className='btn btn-ghost w-full'>Manage User</CustomLink>,
        <CustomLink to='manageOrder' key='manageOrder' className='btn btn-ghost w-full'>Manage Order</CustomLink>,
        <CustomLink to='myProfile' key='myProfile' className='btn btn-ghost w-full'>My Profile</CustomLink>]
    const customerMenus = [
        <CustomLink to='myOrders' key='myOrders' className='btn btn-ghost w-full'>My Orders</CustomLink>,
        <CustomLink to='addReview' key='addReview' className='btn btn-ghost w-full'>Add a Review</CustomLink>,
        <CustomLink to='myProfile' key='myProfile' className='btn btn-ghost w-full'>My Profile</CustomLink>]
    return (
        <div className='h-[calc(100vh-115px)] overflow-hidden pb-10'>
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
                <div className="drawer-side shadow-2xl overflow-auto h-[calc(100vh-115px)]">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        {userInfo?.role === 'admin' ? adminMenus : customerMenus}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;