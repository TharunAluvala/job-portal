import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import JobDetail from './pages/JobDetail';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
// import dotenv from 'dotenv';
// dotenv.config();
function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-job" element={<AddJob />} />
              <Route path="job/:id" element={<JobDetail />} />
            </Route>
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;