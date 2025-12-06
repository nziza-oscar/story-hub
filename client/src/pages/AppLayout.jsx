import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'
import Footer from "../components/Footer"

const AppLayout = () => {
  const location = useLocation()
  useEffect(()=>{
          window.scrollTo({
            top:0,
            left:0,
            behavior:"instant"
          })
  },[location])
  return (
    <div className="min-h-screen bg-gray-200">
     <TopBar/>
  
      <div className="pt-16 max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Sidebar - User Info & Database Stats */}
          <div className="col-span-3 space-y-6"></div>

          {/* Main Feed */}
          <div className="col-span-6 space-y-6 py-3">
          
             <div className="min-h-screen">
              <Outlet/>
             </div>
          </div>

          {/* Right Sidebar - Database Relationships */}
          <div className="col-span-3 space-y-6">
            
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AppLayout