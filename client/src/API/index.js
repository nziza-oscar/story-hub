import axios from "axios"

const API = axios.create({
    baseURL:"http://localhost:3000/api"
})

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("storyhub_token");
    if(token){
         config.headers.Authorization = `Bearer ${JSON.parse(token)}`
    }
     return config
}, (error)=>{
    return Promise.reject(error)
})


export default API