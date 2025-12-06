import React from 'react'
import { FiImage } from 'react-icons/fi'

const CreatePost = () => {
  return (
    <div className='my-2'>
          {/* Create Post */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                       alt="Profile" 
                       className="w-full h-full object-cover" />
                </div>
                <button className="flex-1 text-left p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                  What's on your mind, John?
                </button>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                  <FiImage className="w-5 h-5" />
                  <span>Photo/Video</span>
                </button>
                
              </div>
            </div>
    </div>
  )
}

export default CreatePost