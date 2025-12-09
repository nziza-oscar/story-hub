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
import useUserStore from '../store/useUserStore'
import usePostStore from '../store/usePostStore'

const HomePage = () => {
  const {user, loading} = useUserStore()



  
  return (
    
          <div className="col-span-6 space-y-6 py-3">
          
              <CreatePost user={user}/>

                {/* Posts Feed */}
                <div className="space-y-6">
                  <Posts />
                </div>
          </div>

   
  )
}

export default HomePage