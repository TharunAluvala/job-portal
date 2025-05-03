# Job Portal Dashboard

A full-stack job portal application with a React frontend and Node.js backend.

## Features

- User authentication with JWT
- Job listing dashboard with search and filter functionality
- Job creation form with validation
- Detailed job view
- Responsive design for all devices

## Technologies Used

### Frontend
- React with TypeScript
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js with Express
- JWT for authentication
- In-memory data storage

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm run server
   ```
4. In a separate terminal, start the frontend development server:
   ```
   npm run dev
   ```

## Demo Credentials

- Email: admin@job.com
- Password: Admin@123

## Screenshots

(Optional: Add screenshots here)

## Assumptions Made

- Authentication is handled with JWT and hardcoded credentials for demonstration purposes
- Jobs are stored in-memory; in a production environment, this would be replaced with a database
- The application is designed as a single-page application with client-side routing