import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDashboard(){
    const [assignedReviews, setAssignedReviews] = useState([]);
    const [feedback, setFeedback] = useState({ reviewId:'', content:''});

    useEffect(() => {
        fetchAssignedReviews();
    }, []);

    const fetchAssignedReviews = async () => {
        try {
            const response = await axios.get('/api/reviews/assigned');
            setAssignedReviews(response.data);
        } catch (error) {
            console.error('Error fetching assigned reviews:', error);
        }
    };

    const handleSubmitFeedback = async () => {
        try {
            await axios.post('/api/feedbacks', feedback);
            setFeedback({ reviewId: '', content: '' });
            fetchAssignedReviews();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <section>
                <h2>Assigned Reviews</h2>
                <ul>
                    {assignedReviews.map((review) => (
                        <li key={review._id}>
                            <h3>{review.title}</h3>
                            <button onClick={() => setFeedback({ reviewId: review._id, content: '' })}>Submit Feedback</button>
                        </li>
                    ))}
                </ul>

                {feedback.reviewId && (
                    <div>
                        <h3>Submit Feedback</h3>
                        <form onSubmit={handleSubmitFeedback}>
                            <textarea
                                value={feedback.content}
                                onChange={(e) => setFeedback({ ...feedback, content: e.target.value })}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </section>
        </div>
    );
}

export default EmployeeDashboard;