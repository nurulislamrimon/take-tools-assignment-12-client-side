import React from 'react';
import { Link } from 'react-router-dom';

const UpdateProfileToast = ({ photoURL, displayName, mainText, btnText, position }) => {
    return (
        <div id="toast-message-cta" className={`${position} p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400`} role="alert">
            <div className="flex">
                <img className="w-8 h-8 rounded-full shadow-lg" src={photoURL} alt="img" />
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{displayName}</span>
                    <div className="mb-2 text-sm font-normal">{mainText}</div>
                    <Link to="/editProfile" className='inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"' >{btnText}</Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileToast;