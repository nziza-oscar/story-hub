import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import logo from "../assets/logo.png"
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'
const LoginPage = () => {
  const {loading, signin, error,success, clearSuccessError} = useAuthStore()
  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

 const handleChange = (e)=>{
      const {name,value} = e.target
      setFormData({...formData, [name]:value})
 }

 const handleSubmit = async (e)=>{
  e.preventDefault()
    await  signin(formData, navigate)
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
    <div className="min-h-screen   flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <img src={logo} alt="Logo" className='w-40 mx-auto'/>
            <p className="text-gray-600 mt-2"><strong>Sign</strong> in to your account</p>
          </div>
 
          {
            error && <div className='error'>{error}</div>
          }
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete='off'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name='email'
                  value={formData.email}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  onChange={handleChange}

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name='password'
                  value={formData.password}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg  transition-all duration-300"
              disabled={loading}
            >
              {loading?"processing...":"Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage