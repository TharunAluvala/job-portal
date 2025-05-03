import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobContext, { Job } from '../context/JobContext';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useContext(JobContext);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id && jobs.length > 0) {
      const foundJob = jobs.find(job => job.id === id);
      setJob(foundJob || null);
    }
  }, [id, jobs]);
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Job not found</h2>
          <p className="text-gray-600 mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <ArrowLeftIcon size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeftIcon size={16} />
        <span>Back to listings</span>
      </button>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between">
          <h1 className="text-xl font-bold text-white">{job.title}</h1>
          
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <div className="flex items-center text-blue-100">
              <MapPinIcon size={16} className="mr-1" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-blue-100">
              <CalendarIcon size={16} className="mr-1" />
              <span>
                {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose max-w-none">
            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold mb-3">How to Apply</h2>
            <p className="text-gray-700">
              Interested candidates should submit their resume and cover letter through our online application system or contact our HR department directly.
            </p>
            
            <button
              className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;