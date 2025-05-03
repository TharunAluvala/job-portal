import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Use Render's dynamic port or fallback to 5000
console.log(`Using port: ${PORT}`); // This will show you the port Render assigns

// Middleware
app.use(cors());
app.use(express.json());

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // In production, use environment variable

// In-memory database
let jobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React, implementing responsive designs, and collaborating with backend developers.\n\nRequirements:\n- 2+ years of experience with React\n- Strong knowledge of HTML, CSS, and JavaScript\n- Experience with responsive design\n- Familiarity with REST APIs',
    location: 'San Francisco, CA',
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    id: '2',
    title: 'Backend Engineer',
    description: 'Join our engineering team as a Backend Engineer to build scalable and maintainable server-side applications. You will work with databases, implement APIs, and ensure high performance and security.\n\nRequirements:\n- 3+ years of experience in backend development\n- Proficiency in Node.js and Express\n- Experience with SQL and NoSQL databases\n- Knowledge of API design and implementation',
    location: 'New York, NY',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    description: 'We are seeking a Full Stack Developer to work on both frontend and backend aspects of our applications. You will be involved in the entire development lifecycle, from conception to deployment.\n\nRequirements:\n- Strong proficiency in JavaScript/TypeScript\n- Experience with React for frontend development\n- Experience with Node.js for backend development\n- Knowledge of database design and optimization\n- Familiarity with cloud services (AWS, Azure, or GCP)',
    location: 'Remote',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    description: 'We are looking for a DevOps Engineer to help automate our CI/CD pipelines, manage infrastructure, and optimize deployment processes.\n\nRequirements:\n- Experience with CI/CD tools (Jenkins, GitHub Actions, etc.)\n- Knowledge of infrastructure as code (Terraform, CloudFormation)\n- Experience with containerization (Docker, Kubernetes)\n- Understanding of cloud platforms (AWS, Azure, or GCP)',
    location: 'Seattle, WA',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    description: 'Join our design team to create engaging and intuitive user experiences for our web and mobile applications.\n\nRequirements:\n- Portfolio demonstrating UI/UX design skills\n- Proficiency with design tools (Figma, Adobe XD)\n- Understanding of user-centered design principles\n- Experience in conducting user research and testing',
    location: 'Remote',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials (for demonstration purposes only)
  if (email === 'admin@job.com' && password === 'Admin@123') {
    const user = { id: '1', email };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Get all jobs
app.get('/api/jobs', authenticateToken, (req, res) => {
  res.json(jobs);
});

// Get job by ID
app.get('/api/jobs/:id', authenticateToken, (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  res.json(job);
});

// Add a new job
app.post('/api/jobs', authenticateToken, (req, res) => {
  const { title, description, location } = req.body;
  
  if (!title || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newJob = {
    id: (jobs.length + 1).toString(),
    title,
    description,
    location,
    postedDate: new Date().toISOString()
  };
  
  jobs = [newJob, ...jobs];
  
  res.status(201).json(newJob);
});

// Delete a job by ID
app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
  const jobId = req.params.id;
  const jobIndex = jobs.findIndex(j => j.id === jobId);

  if (jobIndex === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }

  jobs.splice(jobIndex, 1);
  res.json({ message: 'Job deleted successfully' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {  // Bind to 0.0.0.0 so it's externally accessible
  console.log(`Server running on port ${PORT}`);
});

// For easy testing
console.log('Test account:');
console.log('Email: admin@job.com');
console.log('Password: Admin@123');
