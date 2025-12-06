import React from 'react'
import { 
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageCircle,
  FiMapPin
} from 'react-icons/fi'
const Posts = ({posts}) => {
  return (
    <div className="space-y-6">
        {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                               alt="Avatar" 
                               className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold">{post.user.username}</div>
                          <div className="text-gray-500 text-sm flex items-center space-x-2">
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <FiMapPin className="w-3 h-3 mr-1" />
                              {post.category.name}
                            </span>
                            
                          </div>
                        </div>
                      </div>
                      
                    </div>

                    {/* Post Content */}
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                      <p className="text-gray-700 mt-2">{post.excerpt}</p>
                      
                    

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span 
                              key={tag.id} 
                              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 cursor-pointer"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500 py-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-1">
                            👍
                          </div>
                          <span>42</span>
                        </div>
                        <span>{post.comments.length} comments</span>
                        <span>5 shares</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-2">
                      <button className="cursor-pointer flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
                        <FiThumbsUp className="w-5 h-5" />
                        <span>Like</span>
                      </button>
                      <button className="cursor-pointer flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
                        <FiMessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                      
                    </div>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="bg-gray-50 p-4 border-t border-gray-100">
                      <div className="space-y-3">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="bg-white p-3 rounded-xl">
                                <div className="font-medium text-sm">User {comment.userId}</div>
                                <div className="text-gray-700">{comment.content}</div>
                                <div className="text-gray-400 text-xs mt-1">
                                  {new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                              </div>
                              <div className="flex space-x-4 text-xs text-gray-500 mt-1 ml-2">
                                <button className="hover:text-blue-600">Like</button>
                                <button className="hover:text-blue-600">Reply</button>
                                <span>1 hr</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
    </div>
  )
}

export default Posts