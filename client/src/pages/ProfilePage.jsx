import React, { useState } from 'react'
import { FiUser, FiEdit, FiMail, FiCalendar, FiBook, FiUsers, FiMessageSquare } from 'react-icons/fi'
import EditProfileModal from '../components/EditProfileModal'

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock user data
  const user = {
    id: 1,
    username: 'johndev',
    email: 'john@dev.com',
    name: 'John Developer',
    bio: 'Full-stack developer passionate about React and Node.js',
    joinDate: 'January 15, 2024',
    postsCount: 24,
    followers: 456,
    following: 123,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  }

  // Mock user posts
  const userPosts = [
    { id: 1, title: 'React Hooks Guide', date: '2 days ago', likes: 42 },
    { id: 2, title: 'Node.js Performance Tips', date: '1 week ago', likes: 28 },
    { id: 3, title: 'Database Design Patterns', date: '2 weeks ago', likes: 15 }
  ]

  return (

      <div className="py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow"
              />
              <div>
                <div className="flex justify-between space-x-4 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>

                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </button>
                </div>

                <p className="text-gray-600 mb-2">@{user.username}</p>
                <p className="text-gray-700 mb-4">{user.bio}</p>
                
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <FiMail className="mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    Joined {user.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 mt-8 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.postsCount}</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
              <div className="text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.following}</div>
              <div className="text-gray-600">Following</div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FiBook className="mr-3" />
            Recent Posts
          </h2>
          
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                      <FiUsers className="mr-1" />
                      {post.likes}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          
      <EditProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
      </div>

    
   
  )
}

export default ProfilePage