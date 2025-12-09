import { create } from "zustand";
import API from "../API";

const usePostStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  isLoadingPosts:true,

  // -----------------------------
  // FETCH ALL POSTS
  // -----------------------------
  fetchPosts: async () => {
    set({ isLoadingPosts: true });
    try {
      const { data } = await API.get("/posts");
      set({ posts: data, isLoadingPosts: false });
    } catch (err) {
      set({ error: err.response?.data?.error, isLoadingPosts: false });
    }
  },

  // -----------------------------
  // CREATE POST
  // -----------------------------
  createPost: async (formData) => {
    set({loading:true})
    try {
      const { data } = await API.post("/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      set({ posts: [data, ...get().posts], loading:false });
    } catch (err) {
      set({ error: err.response?.data?.error, loading:false });
    }
  },

  // -----------------------------
  // DELETE POST
  // -----------------------------
  deletePost: async (postId) => {
    try {
      await API.delete(`/posts/${postId}`);
      set({ posts: get().posts.filter((p) => p.id !== postId) });
    } catch (err) {
      set({ error: err.response?.data?.error });
    }
  },

  // -----------------------------
  // UPDATE POST (TEXT ONLY)
  // -----------------------------
  updatePost: async (postId, text) => {
    try {
      const { data } = await API.patch(`/posts/${postId}`, { text });

      set({
        posts: get().posts.map((p) =>
          p.id === postId ? { ...p, text: data.text } : p
        ),
      });
    } catch (err) {
      set({ error: err.response?.data?.error });
    }
  },

  // -----------------------------
  // LIKE OR UNLIKE
  // -----------------------------
  toggleLike: async (postId,likedBy) => {
    try {
      set({
        posts: get().posts.map((p) => {
                if (p.id !== postId) return p;
                const currentUserId = p.author.id

                const alreadyLiked = p.likedBy.find((like)=>like.id == currentUserId);

                return {
                  ...p,
                  likedBy: alreadyLiked
                    ? p.likedBy.filter((u) => u.id !== currentUserId) // UNLIKE
                    : [...p.likedBy, {id:currentUserId}],                // LIKE

                  like_count: alreadyLiked
                    ? parseInt(p.like_count) - 1
                    : parseInt(p.like_count) + 1,
                };
              }),
          });
          
     if(likedBy.length == 0){
      await API.post(`/posts/${postId}/like`);
     }
     else{

       await API.delete(`/posts/${postId}/like`);
     }
     
      

    } catch (err) {
      set({ error: err.response?.data?.error });
    }
  },

  // -----------------------------
  // ADD COMMENT
  // -----------------------------
  addComment: async (postId, text) => {
    try {
      const { data } = await API.post(`/posts/${postId}/comments`, { text });

      set({
        posts: get().posts.map((p) =>
          p.id === postId
            ? { ...p, comments: [data, ...p.comments] }
            : p
        ),
      });
    } catch (err) {
      set({ error: err.response?.data?.error });
    }
  },

  // -----------------------------
  // DELETE COMMENT
  // -----------------------------
  deleteComment: async (postId, commentId) => {
    try {
      await API.delete(`/posts/${postId}/comments/${commentId}`);

      set({
        posts: get().posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.filter((c) => c.id !== commentId),
              }
            : p
        ),
      });
    } catch (err) {
      set({ error: err.response?.data?.error });
    }
  },
}));

export default usePostStore;
