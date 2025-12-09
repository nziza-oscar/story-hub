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

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("storyhub_token");
      window.location.href = "/login";
     console.log(err?.response)
    }
    return Promise.reject(err);
  }
);

export default API