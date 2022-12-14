import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import CustomLink from '../../Utilities/CustomLink';


const Header = () => {
    const [user] = useAuthState(auth);

    const menus = [
        <CustomLink to='/' key={1} className='p-3 btn btn-ghost'>Home</CustomLink>,
        <CustomLink to='/allProducts' key='products' className='p-3 btn btn-ghost'>Products</CustomLink>,
        <CustomLink to='/blogs' key={2} className='p-3 btn btn-ghost'>Blogs</CustomLink>,
        <CustomLink to='/myPortfolio' key={3} className='p-3 btn btn-ghost'>My Portfolio</CustomLink>,
        user?.uid ?
            <div key={5} className='lg:flex'>
                <CustomLink to='/dashboard' key='dashboard' className='p-3 btn btn-ghost'>Dashboard</CustomLink>
                <div className="flex">
                    <Link to='/dashboard/myProfile' className='cursor-pointer'>
                        <img src={user?.photoURL || 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'} alt='img' height={40} width={40} title={user?.displayName} className='rounded-lg mx-3 object-cover' />
                    </Link>
                    <button className='px-5' onClick={() => signOut(auth)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
            : <div key={4} className='flex'>
                <CustomLink to='/login' className='p-3 btn btn-ghost'>Login</CustomLink>
                <CustomLink to='/signup' className='p-3 btn btn-ghost'>Signup</CustomLink>
            </div>
    ]

    return (
        <header className='sticky top-0 z-10'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menus}
                        </ul>
                    </div>
                    <Link to='/' className="uppercase lg:text-2xl font-semibold ml-4 font-title">Take Tools</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menus}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;