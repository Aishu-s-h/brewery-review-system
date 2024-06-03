import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrewery, addReview } from '../api';

const Brewery = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState({});
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({ rating: 1, description: '' });

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const { data } = await getBrewery(id);
                setBrewery(data.brewery);
                setReviews(data.reviews);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBrewery();
    }, [id]);

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addReview(id, review);
            setReviews([...reviews, data]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>{brewery.name}</h1>
            <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
            <p>Phone: {brewery.phone}</p>
            <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        {review.rating} - {review.description} (by {review.userId.username})
                    </li>
                ))}
            </ul>
            <h2>Add a Review</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="rating" min="1" max="5" onChange={handleChange} value={review.rating} />
                <textarea name="description" onChange={handleChange} value={review.description}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Brewery;
