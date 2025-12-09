import React, { useEffect } from 'react'
import { 
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageCircle,
  FiMapPin
} from 'react-icons/fi'
import { BiSolidLike } from "react-icons/bi";

import usePostStore from '../store/usePostStore'
import { RiLoader4Line } from "react-icons/ri";
import moment from "moment"
import { Link } from 'react-router-dom';
const Posts = () => {


    const {isLoadingPosts,posts,fetchPosts, toggleLike}= usePostStore()

const toggleLikes = (postId,likedBy)=>{
    toggleLike(postId,likedBy)
    console.log({postId,likedBy})
}
    useEffect(()=>{
          fetchPosts()
    }, [])

    console.log(posts)
  return (
    <div className="space-y-6">
        {isLoadingPosts ? <div className='h-[300px] flex items-center justify-center'><RiLoader4Line size={40} className='animate-spin'/> </div>:  posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Post Header */}
                  
                   <div className="p-4 ">
                  <Link to={`/user/@${post.author.username}`}>

                    <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                            { 
                              post.author.avatar ? <img
                              src={post.author.avatar}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                            : <div className='bg-indigo-500 h-full w-full flex items-center  justify-center font-bold text-lg text-white'>{ post?.author?.username?.[0]?.toUpperCase()}</div>
                            }
                        </div>
                        <div>
                          <div className="font-bold">{post.author.username}</div>
                          <div className="text-gray-500 text-sm flex items-center space-x-2">
                            <span>{moment(post.createdAt).fromNow()}</span>
                            <span>•</span>
                            
                            
                          </div>
                        </div>
                      </div>
                      
                    </div>
                     </Link>

                    {/* Post Content */}
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                      <p className="text-gray-700 mt-2">{post.content}</p>
                      
                       {
                        post.featured_image && (
                          <div>
                            <img src={post.featured_image} alt={post.title}/>
                          </div>
                        )
                       }
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
                          <span>{post.like_count}</span>
                        </div>
                        <span>{post.comment_count} comments</span>
                       
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-2">
                      <button className="cursor-pointer flex items-center justify-center space-x-2 py-2 rounded-lg 
                    text-blue-500" onClick={()=>toggleLikes(post.id,post.likedBy)}>
                        { post.likedBy.map((p)=>p.id).includes(post.author.id) ? <BiSolidLike/>: <FiThumbsUp className="w-5 h-5" />}
                        <span>Like</span>
                      </button>
                      <button className="cursor-pointer flex items-center justify-center space-x-2 py-2 rounded-lg 
                      text-blue-500">
                        <FiMessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                      
                    </div>
                  </div>

                  {/* Comments Section */}
                 
                </div>
              ))}
    </div>
  )
}

export default Posts