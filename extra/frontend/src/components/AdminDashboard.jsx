import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [employees, setEmployees] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
    });
    const [newReview, setNewReview] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        fetchEmployees();
        fetchReviews();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
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

    const handleAddEmployees = async () => {
        try {
            await axios.post('/api/employees', newEmployee);
            setNewEmployee({ name: '', email: '', position: '', department: '' });
            fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
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
            <h1>Admin Dashboard</h1>

            <section>
                <h2>Employees</h2>
                <ul>
                    {employees.map((employee) => (
                        <li key={employee._id}>
                            {employee.name} - {employee.position}
                        </li>
                    ))}
                </ul>

                <h3>Add Employee</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={(e) =>
                        setNewEmployee({ ...newEmployee, name: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) =>
                        setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={(e) =>
                        setNewEmployee({ ...newEmployee, position: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={newEmployee.department}
                    onChange={(e) =>
                        setNewEmployee({ ...newEmployee, department: e.target.value })
                    }
                />  
                <button onClick={handleAddEmployees}>Add Employee</button>
            </section>

            <section>
                <h2>Reviews</h2>
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            {review.title} - {review.description}
                        </li>
                    ))}
                </ul>

                <h3>Add Review</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newReview.title}
                    onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newReview.description}
                    onChange={(e) =>
                        setNewReview({ ...newReview, description: e.target.value })
                    }
                />
                <button onClick={handleAddReview}>Add Review</button>
            </section>
        </div>
    );
}

export default AdminDashboard;