import { create} from "zustand"
import API from "../API"

const useAuthStore = create((set)=>({
    loading:false,
    error:null,
    success:false,
    signin: async(formData, next)=>{
        set({loading:true})
          try {
              const { data } = await API.post("auth/login", formData);

              if(data.token) {
                localStorage.setItem("storyhub_token", JSON.stringify(data.token))
                next("/")
              }
              
            set({loading:false})
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, loading:false})
          }
    },
     signup: async(formData,next)=>{
        set({loading:true})
          try {
              const { data } = await API.post("auth/register", formData);

              if(data.token) {
                localStorage.setItem("storyhub_token", JSON.stringify(data.token))
                next("/")
              }
              
            set({loading:false})
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, loading:false})
          }
    },
    clearSuccessError:()=>{
        set({success:false, error:null})
    },
    signout:()=>{
        localStorage.removeItem("storyhub_token")
        window.location.href="/login"
    }
}))


export default useAuthStore;