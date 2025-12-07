import { create} from "zustand"
import API from "../API"

const useNotificationStore = create((set,get)=>({
    loading:false,
    error:null,
    success:false,
    notifications:[],
    meta:{},
    fetchNotification: async()=>{
        set({loading:true})
          try {
              const { data } = await API.get("notifications/");
              set({loading:false, notifications: data.data, meta:data.meta})
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, loading:false})
          }
    },
   markAsRead:async()=>{
        set({loading:true})
          try {
              await API.patch("notifications/user/read-all");
               const updated = get().notifications.map((n)=>({
                ...n,
                is_read:true
               }))
              set({loading:false, notifications: updated})
              
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, loading:false})
          }
    },
   
}))


export default useNotificationStore;