import React from 'react'
import { FiEdit, FiTrash2, FiEye, FiCalendar, FiMessageSquare, FiHeart, FiShare2 } from 'react-icons/fi'

const MyPosts = () => {
  // Mock posts data in Facebook style
  const posts = [
    {
      id: 1,
      title: 'React Hooks Complete Guide',
      content: 'Just published my complete guide to React Hooks! Covers everything from useState to custom hooks. What topics should I cover next?',
      status: 'published',
      date: '2 hours ago',
      views: 1245,
      comments: 42,
      likes: 89,
      shares: 12,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Node.js Performance Tips',
      content: 'Sharing some Node.js performance optimization techniques that helped reduce our API response time by 70%. Working on a follow-up about caching strategies.',
      status: 'published',
      date: '1 day ago',
      views: 890,
      comments: 23,
      likes: 56,
      shares: 8,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Database Design Patterns',
      content: 'Drafting a post about database design patterns for scalable applications. Looking for feedback on the outline before publishing.',
      status: 'draft',
      date: '3 days ago',
      views: 0,
      comments: 0,
      likes: 0,
      shares: 0,
      image: null
    },
    {
      id: 4,
      title: 'Tailwind CSS Workflow',
      content: 'How I use Tailwind CSS in my React projects for faster development. From setup to production optimization.',
      status: 'published',
      date: '1 week ago',
      views: 567,
      comments: 18,
      likes: 34,
      shares: 5,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop'
    }
  ]

  return (
    <div >
      {/* Main Container */}
      <div className="py-6">
        
       

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Post Header with Actions */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      Y
                    </div>
                    <div className="ml-3">
                      <div className="font-bold">You</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FiCalendar className="mr-1" />
                        {post.date}
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.content}</p>
                
                {/* Post Image */}
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Post Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 py-3 border-t border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-1">
                        👍
                      </div>
                      <span>{post.likes}</span>
                    </div>
                    <span>{post.comments} comments</span>
                  </div>
                 
                </div>

                {/* Action Buttons - Facebook Style */}
                <div className="grid grid-cols-3 gap-1 pt-2">
                  <button className="flex items-center justify-center py-2 text-gray-500 hover:bg-gray-100 rounded-md">
                    <FiHeart className="mr-2" />
                    Like
                  </button>
                  <button className="flex items-center justify-center py-2 text-gray-500 hover:bg-gray-100 rounded-md">
                    <FiMessageSquare className="mr-2" />
                    Comment
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <FiEdit className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">You haven't posted anything yet</h3>
            <p className="text-gray-600 mb-6">Share your thoughts and knowledge with the community</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Create Your First Post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPosts