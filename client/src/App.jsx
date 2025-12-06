import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import Users from './pages/Users'
import AppLayout from './pages/AppLayout'
import MyPosts from './pages/MyPosts'

function App() {
  return (
      <Routes>
        <Route path="/" element={<AppLayout/>} >
            
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/posts" element={<MyPosts />} />
            <Route path="/users" element={<Users/>} />

        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<div className="p-8">Admin Dashboard</div>} />
        <Route path="/admin/users" element={<div className="p-8">User Management</div>} />
        <Route path="/admin/categories" element={<div className="p-8">Categories Management</div>} />
      </Routes>
      
    
  )
}

export default App