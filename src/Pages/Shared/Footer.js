import React from 'react';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className='text-center my-3'>
            &copy; Take Tools {year}
        </footer>
    );
};

export default Footer;