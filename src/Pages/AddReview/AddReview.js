import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddReview = () => {
    const [stars, setStars] = useState(0);
    const [user] = useAuthState(auth);

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
                }
            })
    }


    const handleStarsInput = (data) => {
        setStars(data);
    }

    return (
        <section className='w-3/4 lg:w-2/4 mx-auto px-5 h-[calc(100vh-115px)] overflow-auto'>
            <h2 className='text-2xl text-center underline mb-5'>Share your experience</h2>
            <div className='flex items-center'><label className='text-2xl mr-5'>Place Rating:</label> <ReactStars count={5} onChange={handleStarsInput} size={40} activeColor="#ffd700" /></div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="review" className='text-xl mr-5'>Don't shy to share your experience </label>
                    <div class="form-control">
                        <textarea class="textarea textarea-bordered h-24" name='review' placeholder="Write what is in your mind"></textarea>
                    </div>
                </div>
                <button className='btn btn-primary mx-auto w-full mt-5'>Submit</button>
            </form>
        </section>
    );
};

export default AddReview;