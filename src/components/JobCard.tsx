import { Link } from 'react-router-dom';
import JobContext, { Job } from '../context/JobContext';
import { formatDistanceToNow } from 'date-fns';
import { MapPinIcon, CalendarIcon, ArrowRightIcon, DeleteIcon, Delete } from 'lucide-react';
import { useContext } from 'react';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {

const { deleteJobById } = useContext(JobContext);
  const handleDelete = async (job: any) => {
    try {
      const token = localStorage.getItem('token') || '';
      await deleteJobById(job.id);
      // Refresh job list or update state here
    } catch (error) {
      alert('Error deleting job');
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className='flex justify-between'>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {job.title}
        </h3>
        {/* <div>
          <button onClick={() => handleDelete(job)}> Remove</button>
         
        </div> */}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPinIcon size={16} className="mr-1 text-gray-500" />
            {job.location}
          </div>
          
          <div className="flex items-center">
            <CalendarIcon size={16} className="mr-1 text-gray-500" />
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {job.description}
        </p>
        
        <Link
          to={`/job/${job.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details
          <ArrowRightIcon size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;