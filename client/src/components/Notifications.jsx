import { useState, useRef, useEffect } from 'react'
import { FiBell, FiCheck, FiMessageSquare, FiHeart, FiUsers, FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useNotificationStore from '../store/useNotificationStore'
import moment from 'moment'

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [unreadCount,setUnread] = useState(0)
 const {loading,fetchNotification, notifications, markAsRead} = useNotificationStore()
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

 


 const IconType=(type)=>{
  switch(type){
    case 'like_post':
      return <FiHeart className="text-red-500" />
    case 'comment_post':
      return <FiMessageSquare className="text-blue-500" />
    case 'follow_user':
      return  <FiUsers className="text-green-500" />
   default :
    return <FiSettings className="text-purple-500" />
  }
 }

 useEffect(()=>{
     fetchNotification()
 },[])

 useEffect(()=>{
       if(notifications.length > 0) {
        setUnread(notifications.filter((n)=>!n.is_read).length)
       }
 },[notifications])

 console.log(notifications)

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">Notifications</h3>
              <button onClick={()=>markAsRead()} className=" cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium">
                Mark all as read
              </button>
            </div>
            <div className="flex space-x-2 mt-3">
          
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                    !notification.is_read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {IconType(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-gray-900">
                            {notification.type === 'follow_user' ? (
                              <>
                                <span className="font-semibold">{notification?.data?.user}</span>{' '}
                                {notification.message}
                              </>
                            ) : notification.type === 'system' ? (
                              <span className="font-semibold">{notification.message}</span>
                            ) : (
                              <>
                                <span className="font-semibold">{notification.data.user}</span>
                                
                                <span className="font-semibold">"{notification.message}</span>
                              </>
                            )}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{moment(notification.createdAt).fromNow()}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {!notification.is_read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <FiBell className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-gray-900 font-medium mb-2">No notifications</h4>
                <p className="text-gray-600 text-sm">
                  You're all caught up! Check back later for new notifications.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <Link
              to="/notifications"
              className="block text-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications