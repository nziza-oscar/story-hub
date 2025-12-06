import { useState } from 'react'
import { 
  FiHome, 
  FiVideo, 
  FiUsers, 
  FiMessageSquare,
  FiBell,
  FiSearch,
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiImage,
  FiFilm,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi'
import { FaRegNewspaper, FaUserCircle } from 'react-icons/fa'
import TopBar from '../components/TopBar'
import Posts from '../components/Posts'
import CreatePost from '../components/CreatePost'
import Footer from '../components/Footer'

const HomePage = () => {

  // Database Users Data
  const users = [
    { id: 1, username: 'johndev', email: 'john@dev.com', role: 'author' },
    { id: 2, username: 'janedev', email: 'jane@dev.com', role: 'author' },
    { id: 3, username: 'alexcoder', email: 'alex@coder.com', role: 'reader' },
    { id: 4, username: 'techguru', email: 'guru@tech.com', role: 'admin' }
  ]

  // Database Categories Data
  const categories = [
    { id: 1, name: 'Technology', slug: 'technology', description: 'Latest tech news' },
    { id: 2, name: 'Programming', slug: 'programming', description: 'Code tutorials' },
    { id: 3, name: 'Web Dev', slug: 'web-dev', description: 'Frontend & backend' }
  ]

  // Database Tags Data
  const tags = [
    { id: 1, name: 'React', slug: 'react' },
    { id: 2, name: 'NodeJS', slug: 'nodejs' },
    { id: 3, name: 'Database', slug: 'database' },
    { id: 4, name: 'API', slug: 'api' },
    { id: 5, name: 'JavaScript', slug: 'javascript' }
  ]

  // Database Posts Data
  const posts = [
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      slug: 'react-hooks-deep-dive',
      content: 'Exploring advanced React Hooks patterns...',
      excerpt: 'Learn advanced patterns for React Hooks usage in production applications...',
      status: 'published',
      userId: 1,
      categoryId: 2,
      viewCount: 1542,
      createdAt: '2024-01-20T10:30:00Z',
      publishedAt: '2024-01-20T10:30:00Z',
      user: users[0],
      category: categories[1],
      tags: [tags[0], tags[4]],
      comments: [
        { id: 1, content: 'Great explanation!', userId: 2, createdAt: '2024-01-20T12:00:00Z' },
        { id: 2, content: 'Very helpful!', userId: 3, createdAt: '2024-01-20T14:30:00Z' }
      ]
    },
    {
      id: 2,
      title: 'Node.js Performance Optimization',
      slug: 'nodejs-performance-optimization',
      content: 'Tips for optimizing Node.js server performance...',
      excerpt: 'Discover techniques to improve your Node.js application performance...',
      status: 'published',
      userId: 2,
      categoryId: 1,
      viewCount: 2310,
      createdAt: '2024-01-18T14:20:00Z',
      publishedAt: '2024-01-18T14:20:00Z',
      user: users[1],
      category: categories[0],
      tags: [tags[1], tags[3]],
      comments: [
        { id: 3, content: 'Saved me hours of debugging!', userId: 1, createdAt: '2024-01-18T16:45:00Z' }
      ]
    },
    {
      id: 3,
      title: 'Database Design Patterns',
      slug: 'database-design-patterns',
      content: 'Common database design patterns explained...',
      excerpt: 'Understanding database design patterns for scalable applications...',
      status: 'draft',
      userId: 1,
      categoryId: 1,
      viewCount: 0,
      createdAt: '2024-01-15T09:15:00Z',
      publishedAt: null,
      user: users[0],
      category: categories[0],
      tags: [tags[2]],
      comments: []
    }
  ]

  return (
    
          <div className="col-span-6 space-y-6 py-3">
          
              <CreatePost/>

                {/* Posts Feed */}
                <div className="space-y-6">
                  <Posts posts={posts}/>
                </div>
          </div>

   
  )
}

export default HomePage