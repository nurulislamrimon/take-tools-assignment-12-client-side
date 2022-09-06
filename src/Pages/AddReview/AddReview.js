import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddReview = () => {
    const [stars, setStars] = useState(0);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const newReview = { rating: stars, review: e.target.review.value, user: { displayName: user?.displayName, photoURL: user?.photoURL } };
        fetch('http://localhost:5000/review', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    toast('Thanks for your review')
                    navigate('/')
                }
            })
    }


    const handleStarsInput = (data) => {
        setStars(data);
    }

    return (
        <section className='w-3/4 lg:w-2/4 mx-auto px-5 h-[calc(100vh-115px)] overflow-auto'>
            {/* dashboard menu expander */}
            <label htmlFor="dashboard-sidebar" className="drawer-button lg:hidden absolute left-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </label>
            <h2 className='text-2xl text-center underline mb-5'>Share your experience</h2>
            <div className='flex items-center'><label className='text-xl mr-5'>Place Rating:</label> <ReactStars count={5} onChange={handleStarsInput} size={35} activeColor="#ffd700" /></div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="review" className='text-lg lg:text-xl mr-5'>Don't shy to share your experience </label>
                    <div className="form-control">
                        <textarea className="textarea textarea-bordered h-24" name='review' placeholder="Write what is in your mind"></textarea>
                    </div>
                </div>
                <button className='btn btn-primary mx-auto w-full mt-5'>Submit</button>
            </form>
        </section>
    );
};

export default AddReview;