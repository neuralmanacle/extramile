import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDashboard({user}){
    const [assignedReviews, setAssignedReviews] = useState([]);
    const [feedback, setFeedback] = useState({ reviewId:'', content:''});
    const [reviews, setReviews] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [newReview, setNewReview] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        fetchAssignedReviews();
        fetchEmployees();
    }, []);

    const fetchAssignedReviews = async () => {
        try {
            const response = await axios.get('/api/reviews/assigned');
            setAssignedReviews(response.data);
        } catch (error) {
            console.error('Error fetching assigned reviews:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
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
    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };
    const handleAddReview = async () => {
        try {
            await axios.post('/api/reviews', newReview);
            setNewReview({ title: '', description: '' });
            fetchReviews();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };
    return (
        <div>
            <h1>Employee Dashboard</h1>
            <p>Logged in as: {user.email}</p>
            <section>
                <h2>Assigned Reviews</h2>
                <div>
                    {assignedReviews.map((review) => (
                        <span key={review._id}>
                            <h3>{review.title}</h3>
                            <button onClick={() => setFeedback({ reviewId: review._id, content: '' })}>
                                Submit Feedback
                            </button>
                        </span>
                    ))}
                </div>

                {feedback.reviewId && (
                    <div>
                        <h3>Submit Feedback</h3>
                        <form onSubmit={handleSubmitFeedback}>
                            <textarea
                                value={feedback.content}
                                onChange={(e) => setFeedback({ ...feedback, content: e.target.value })}
                                placeholder="Write your feedback here..."
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}

                <h3>Add Review</h3>
                <select
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <br/>
                <br/>
                <input
                    type="text"
                    placeholder="Title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                />
                <br />
                <input
                    type="text"
                    placeholder="Description"
                    value={newReview.description}
                    onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                />
                <br/>
                <br/>
                <button onClick={handleAddReview}>Add Review</button>
            </section>
        </div>
    );
}

export default EmployeeDashboard;