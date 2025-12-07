import React, { useState } from "react";
import { FiUsers, FiUser, FiFileText } from "react-icons/fi";
import UsersTab from "../components/UsersTab";
import {dumyusers} from "../utils/data"
const User = () => {
  const [activeTab, setActiveTab] = useState("posts");

  // Static user data
  const user = {
    username: "Oscar",
    bio: "Frontend Developer | React Enthusiast",
    email: "oscar@example.com",
    avatar: null,
    followersCount: 1234,
    followingCount: 56,
    posts: [
      { id: 1, content: "Hello world!" },
      { id: 2, content: "My second post." },
    ],
    followers: [
      { id: 1, username: "alice" },
      { id: 2, username: "bob" },
    ],
    following: [
      { id: 3, username: "charlie" },
      { id: 4, username: "david" },
    ],
  };

  return (
    <div className="bg-white p-2 mt-6">
      {/* Banner Section */}
      <div className="bg-gray-100 rounded-lg p-6 flex gap-6 items-center">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold rounded-full">
            {user.username[0].toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.bio}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <div className="flex gap-4 mt-2">
            <span>
              <FiUsers className="inline mr-1" />
              {user.followersCount} Followers
            </span>
            <span>
              <FiUser className="inline mr-1" />
              {user.followingCount} Following
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-6">
        <div className="flex border-b">
          {["posts", "followers", "following"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
                activeTab === tab
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "posts" &&
            (user.posts.length ? (
              user.posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border-b border-gray-100 rounded"
                >
                  {post.content}
                </div>
              ))
            ) : (
              <p>No posts yet.</p>
            ))}

          {activeTab === "followers" && <UsersTab users={dumyusers.followers}/>
            }

          {activeTab === "following" &&<UsersTab users={dumyusers.followers}/> }
        </div>
      </div>
    </div>
  );
};

export default User;
