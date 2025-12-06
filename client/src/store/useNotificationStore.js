import { create} from "zustand"
import API from "../API"

const useNotificationStore = create((set)=>({
    loading:false,
    error:null,
    success:false,
    notificatios:[],
    meta:{},
    fetchNotification: async()=>{
        set({loading:true})
          try {
              const { data } = await API.get("notifications/");
              set({loading:false, notificatios: data.data, meta:data.meta})
             
          } catch (error) {
            console.log(error.message)
            set({error: error.response?.data?.error, loading:false})
          }
    },
   
   
}))


export default useNotificationStore;