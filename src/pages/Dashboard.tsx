import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobContext from '../context/JobContext';
import JobCard from '../components/JobCard';
import { PlusCircleIcon, Search, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const { 
    filteredJobs, 
    loading, 
    error, 
    searchTerm, 
    locationFilter,
    setSearchTerm, 
    setLocationFilter,
    refreshJobs
  } = useContext(JobContext);
  
  const [locations, setLocations] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Extract unique locations for the filter dropdown
  useEffect(() => {
    if (filteredJobs.length > 0) {
      const uniqueLocations = Array.from(
        new Set(filteredJobs.map(job => job.location))
      );
      setLocations(uniqueLocations);
    }
  }, [filteredJobs]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshJobs();
    setTimeout(() => setIsRefreshing(false), 600); // For better UX
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/add-job"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            <PlusCircleIcon size={18} />
            <span>Add New Job</span>
          </Link>
          
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500">
              {searchTerm || locationFilter 
                ? "Try adjusting your search or filter criteria"
                : "Add your first job to get started"}
            </p>
            
            {(searchTerm || locationFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                }}
                className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;