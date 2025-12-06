import { useState } from 'react'
import { FiUser, FiUsers, FiMessageSquare,FiSearch } from 'react-icons/fi'
import TopBar from '../components/TopBar'

const Users= () => {
  // Simple users list
  const [searchTerm,setSearchTerm] = useState('')
  const users = [
    {
      id: 1,
      username: 'johndev',
      name: 'John Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      isFollowing: true,
      postsCount: 24
    },
 
    {
      id: 3,
      username: 'alexcoder',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      isFollowing: true,
      postsCount: 32
    },
    {
      id: 4,
      username: 'techguru',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      isFollowing: false,
      postsCount: 45
    },
    {
      id: 5,
      username: 'designwizard',
      name: 'Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      isFollowing: false,
      postsCount: 12
    },
    {
      id: 6,
      username: 'reactmaster',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
      isFollowing: true,
      postsCount: 28
    }
  ]

  return (
    
      <div >
        
         <h3 className='text-gray-600 font-bold  py-4'>Discover People</h3>
        {/* Users List */}
        <div className="bg-white rounded-lg shadow-sm">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              {/* User Info */}
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600 text-sm">@{user.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {user.isFollowing ? (
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
                    Unfollow
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Follow
                  </button>
                )}
                
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FiMessageSquare className="w-5 h-5" />
                </button>
                
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <FiUser className="w-5 h-5" />
                    <span className="ml-1 text-sm">{user.postsCount}</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Users State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiUsers className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users yet</h3>
            <p className="text-gray-600">Be the first to join!</p>
          </div>
        )}
      </div>
    
  )
}

export default Users