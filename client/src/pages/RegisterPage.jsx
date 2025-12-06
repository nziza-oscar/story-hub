import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock} from 'react-icons/fi'
import logo from "../assets/logo.png"
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'
const RegisterPage = () => {



  const {loading, signup, error,success, clearSuccessError} = useAuthStore()
  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })


  const handleChange = (e)=>{
      const {name,value} = e.target
      setFormData({...formData, [name]:value})
  }

 const handleSubmit = async(e)=>{
  e.preventDefault()
    await signup(formData, navigate)
 }

 useEffect(()=>{
   if(success || error){
       const timeout = setTimeout(()=>{
          clearSuccessError()
       },4000)

       return ()=>clearTimeout(timeout)
   }
 },[error,success])


  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            
            <img src={logo} alt="Logo" className='w-40 mx-auto'/>
            <p className="text-gray-600 mt-2">Join StoryHub community</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username..."
                  value={formData.username}
                  name='username'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  value={formData.email}
                  name='email'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  name='password'
                
                  value={formData.password}
                  onChange={handleChange}

                />
              </div>
            </div>

          

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300"
            >
             { loading ? "Creating...":" Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage