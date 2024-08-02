# Employee Review Application 🚍

## Project Overview

This is a MERN stack application that consists of a **React** frontend and a **Node.js** backend. The application allows users to manage employee reviews and feedback, providing a dashboard for both admins and employees.

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) or Firebase Authentication (if applicable)

## Features

- Admin dashboard to manage employees and reviews.
- Employee dashboard to submit feedback and view assigned reviews.
- User authentication (login/logout).
- Responsive design for better user experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/neuralmanacle/extramile
   cd extramile

2. **Set up Backend**:

   ```bash
   cd backend
   npm install

3. **Set up env variables**:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret

4. **Set up Frontend**:

    ```bash
    cd ../frontend
    npm install
    
5. **Running The Application**:
   Start the backend server:
     ```bash
     npm start

     
  The backend server should now be running on http://localhost:5000

  Start the frontend server:
    ```bash
    
     npm start
  The backend server should now be running on http://localhost:3000
