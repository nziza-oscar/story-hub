import { 
  FiHome, 

  FiUsers, 
 
  FiBell,
  FiSearch,
 
} from 'react-icons/fi'
import logo from "../assets/logo.png"
import { useEffect, useState } from 'react'
import Profile from './Profile'
import Notifications from './Notifications'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useUserStore from '../store/useUserStore'
const TopBar = () => {
  const [activeTab, setActiveTab] = useState('feed')
  const {signout} = useAuthStore()
  const {loading, user, fetchUser} = useUserStore() 
 



useEffect(()=>{
    
    fetchUser()
},[])


  return (
    <div>
         {/* Top Navigation Bar */}
              <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex items-center justify-between ">
                    {/* Logo */}
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-blue-600">
                        <img src={logo} alt='Logo' className='w-24' />
                      </div>
                     
                    </div>
                     <div className="ml-8 relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search posts, users..."
                          className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-400 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
        
        
                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-6">
                      <Link to="/" className={`p-2 rounded-lg cursor-pointer ${activeTab === 'feed' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <FiHome className="w-6 h-6" />
                      </Link>
                      
                      <Link to="/users" className="cursor-pointer p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <FiUsers className="w-6 h-6" />
                      </Link>
                      
                      {/* Notifications Dropdown */}
                      <Notifications />
                      
                      {/* Profile Dropdown */}
                      {
                        loading && user? <div className='w-10 h-10 animate-pulse rounded-full bg-gray-400'></div> : <Profile logout={signout} user={user}/>
                      }
                    </div>
                  </div>
                </div>
              </header>

    </div>
  )
}

export default TopBar