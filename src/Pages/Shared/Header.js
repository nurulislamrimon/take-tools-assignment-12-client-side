import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const menus = [
        <li><Link to='/home'>Home</Link></li>,
        <li><Link to='/blogs'>Blogs</Link></li>,
        <li><Link to='/about'>About</Link></li>,
        <li><Link to='/signin'>Signin</Link></li>]
    return (
        <header>
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menus}
                        </ul>
                    </div>
                    <Link to='/' class="uppercase text-2xl font-semibold ml-4 font-title">Take Tools</Link>
                </div>
                <div class="navbar-end hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        {menus}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;