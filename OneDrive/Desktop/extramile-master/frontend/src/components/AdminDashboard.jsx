import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [employees, setEmployees] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
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
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

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
    const toggleEmployeeSelection = (employeeId) => {
        if (selectedEmployeeId.includes(employeeId)) {
            setSelectedEmployeeId(selectedEmployeeId.filter(id => id !== employeeId));
        } else {
            setSelectedEmployeeId([...selectedEmployeeId, employeeId]);
        }
    };

    const applyFilter = () => {
        if (selectedEmployeeId.length > 0) {
            setFilteredEmployees(employees.filter(employee => selectedEmployeeId.includes(employee._id)));
        } else {
            setFilteredEmployees(employees); // Reset to show all employees if no filter is applied
        }
        setShowDropdown(false); // Close dropdown after applying filter
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <section>
                <h2>Filter Employees</h2>
                <button onClick={() => setShowDropdown(!showDropdown)}>
                    {showDropdown ? 'Hide Filter' : 'Show Filter'}
                </button>
                {showDropdown && (
                    <div className="dropdown">
                        <h3>Select Employees to Filter</h3>
                        {employees.map((employee) => (
                            <div key={employee._id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployeeId.includes(employee._id)}
                                        onChange={() => toggleEmployeeSelection(employee._id)}
                                    />
                                    {employee.name}
                                </label>
                            </div>
                        ))}
                        <button onClick={applyFilter}>Apply Filter</button>
                    </div>
                )}
            </section>

            <section>
                <h2>Employees</h2>
                <ul>
                    {filteredEmployees.map((employee) => (
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
                <br/>
                <br/>
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) =>
                        setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                />
                <br/>
                <br/>
                <input
                    type="text"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={(e) =>
                        setNewEmployee({ ...newEmployee, position: e.target.value })
                    }
                />
                <br/>
                <br/>
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
                        <div key={review._id}>
                            {review.title} - {review.description}
                        </div>
                    ))}
                </ul>

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
                    onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                    }
                />
                <br/>
                <br/>
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