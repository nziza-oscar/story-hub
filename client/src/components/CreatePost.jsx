import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import usePostStore from "../store/usePostStore";
import { useEffect } from "react";
import { RiLoader4Line } from "react-icons/ri";
const CreatePost = ({ user }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const {loading, createPost } = usePostStore()

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = (e) => {
    e.preventDefault()
    if (!text.trim() && !image) return;

    const form = new FormData();
    form.append("title", text);
    if (image) form.append("photo", image);
    form.append("content", "normal post")
     createPost(form)
    
  };

useEffect(()=>{
     if(!loading){
        setText("");
        setImage(null);
        setPreview(null);
     }
},[loading])


  return (
    <form onSubmit={handlePost} className="my-2">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-indigo-500 h-full w-full flex items-center justify-center font-bold text-lg text-white">
                {user?.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder={`What's on your mind, ${user.username}?`}
            className="flex-1 text-left p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="preview"
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <label className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 cursor-pointer">
            <FiImage className="w-5 h-5" />
            <span>Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>

          <button
            onClick={handlePost}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            {
              loading? <RiLoader4Line className="text-white animate-spin"/> :<IoSend className="text-lg" />
            }
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
