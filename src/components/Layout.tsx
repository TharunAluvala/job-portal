import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Layout = () => {
  const { loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;