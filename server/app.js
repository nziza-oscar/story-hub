const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require("./config/database")
const routes = require("./routes")
dotenv.config();



const app = express();

app.use(helmet());
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors());
// Request logging
app.use(morgan('dev'));
// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to StoryHub API',
    version: '1.0.0',
    docs: process.env.APP_URL + '/api-docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      posts: '/api/posts',
      categories: '/api/categories',
      comments: '/api/comments'
    }
  });
});


app.use("/api",routes)

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully');
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({});
      console.log(' Database models synchronized');
    }
    
    return true;
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    process.exit(1);
  }
};


const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`API URL: ${process.env.APP_URL || `http://localhost:${PORT}`}`);
      console.log(`Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
    
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

