import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getAllJobs, addJob, deleteJob } from '../services/jobService';
import AuthContext from './AuthContext';

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  postedDate: string;
}

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  locationFilter: string;
  addNewJob: (job: Omit<Job, 'id' | 'postedDate'>) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setLocationFilter: (location: string) => void;
  refreshJobs: () => Promise<void>;
  deleteJobById: (job: Omit<Job, 'id' | 'postedDate'>) => Promise<void>;
}

const JobContext = createContext<JobContextType>({
  jobs: [],
  filteredJobs: [],
  loading: false,
  error: null,
  searchTerm: '',
  locationFilter: '',
  addNewJob: async () => {},
  setSearchTerm: () => {},
  setLocationFilter: () => {},
  refreshJobs: async () => {},
  deleteJobById:  async () => {}
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  const { user, isAuthenticated } = useContext(AuthContext);

  // Fetch jobs when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshJobs();
    }
  }, [isAuthenticated]);

  // Filter jobs based on search term and location filter
  useEffect(() => {
    if (jobs.length > 0) {
      let filtered = [...jobs];
      
      if (searchTerm) {
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (locationFilter) {
        filtered = filtered.filter(job => 
          job.location === locationFilter
        );
      }
      
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  }, [jobs, searchTerm, locationFilter]);

  const refreshJobs = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllJobs(user.token);
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const addNewJob = async (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await addJob(jobData, user.token);
      await refreshJobs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add job');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deleteJobById = async (jobData: any) => {
    console.log("jobData", jobData)
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await deleteJob(jobData, user.token);
      await refreshJobs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add job');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        loading,
        error,
        searchTerm,
        locationFilter,
        addNewJob,
        setSearchTerm,
        setLocationFilter,
        refreshJobs,
        deleteJobById
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;