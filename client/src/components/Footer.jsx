import React from 'react'

const Footer = () => {
  return (
         <footer className="bg-white shadow-sm py-3 ">
                <div className="flex justify-center ">
                 <p className='text-sm  text-gray-500'>All right is reserved by &copy; {new Date().getFullYear()} <strong>StoryHub</strong></p>
                </div>
        </footer>
  )
}

export default Footer