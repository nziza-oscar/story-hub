import { useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import useUserStore from '../store/useUserStore'
import {Link} from "react-router-dom"
const Users = () => {
  const { users, fetchUsers, loading, actionloading, followUser, unFollowUser } = useUserStore()


  const handleUnFollow = (userId)=>{
             unFollowUser(userId)
  }

  const handleFollow = (userId)=>{
       followUser(userId)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  

  console.log(users)
  return (
    <div>
      <h3 className='text-gray-600 font-bold py-4'>Discover People</h3>

      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className='min-h-screen bg-gray-200 animate-pulse rounded flex items-center justify-center'>Loading....</div>
        ) : (
          users.map((user) => (
           <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-indigo-400 flex items-center justify-center rounded-full text-lg font-bold">
                    {user?.username?.[0].toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-gray-900">{user.username}</h3>
                  <Link to={`@${user.username}`} className="text-blue-500 text-sm">@{user.username}</Link>

                  {/* FOLLOW NUMBERS HERE */}
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{user.followersCount} Followers</span>
                    <span>{user.followingCount} Following</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {user.isFollowing ? (
                  <button  disabled={actionloading==user.id} onClick={()=>handleUnFollow(user.id)}  className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">
                    {actionloading==user.id? <span className='animate-bounce text-gray-200 text-lg'>...</span>:"Unfollow"}
                  </button>
                ) : (
                  <button disabled={actionloading==user.id} onClick={()=>handleFollow(user.id)} className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    {actionloading==user.id? <span className='animate-bounce text-gray-200 text-lg'>...</span>:"Follow"}
                  </button>
                )}
              </div>
            </div>

          ))
        )}
      </div>

      {users.length === 0 && !loading && (
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

export default Users;
