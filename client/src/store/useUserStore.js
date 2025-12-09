import { create} from "zustand"
import API from "../API"

const useUserStore = create((set,get)=>({
    loading:false,
    error:null,
    success:false,
    user:{},
    notifications:[],
    users:[],
    actionloading:0,

    fetchUser: async()=>{
        set({loading:true})
          try {
              const { data } = await API.get("auth/me");
              set({loading:false, user:data, notifications: data.notifications})
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, loading:false})
          }
    },
    fetchUsers: async()=>{
        set({loading:true})
          try {
              const { data } = await API.get("users/");
              set({loading:false,users:data})
    
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
    },

    followUser:async(userId)=>{
        set({actionloading:userId})
          try {
              await API.post(`follow/${userId}`);
              const updated =  get().users.map((user)=>user.id === userId? {...user, isFollowing:true, followersCount: parseInt(user.followersCount || 0)+1}:user)
            set({users:updated, actionloading:0})
               
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, actionloading:0})
          }
    },
    unFollowUser:async(userId)=>{
        set({actionloading:userId})
          try {
              await API.delete(`follow/${userId}`);
              const updated =  get().users.map((user)=>user.id === userId? {...user, isFollowing:false, followersCount: parseInt(user.followersCount || 0)-1}:user)
            set({users:updated, actionloading:0})
               
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, actionloading:0})
          }
    }
}))


export default useUserStore;