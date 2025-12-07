import React, { useState } from "react";
import { Link } from "react-router-dom";

const UsersTab = ({users}) => {
  const [actionloading, setActionLoading] = useState(null);

  const handleFollow = (id) => {
    setActionLoading(id);
    // simulate follow API call
    setTimeout(() => setActionLoading(null), 1000);
  };

  const handleUnFollow = (id) => {
    setActionLoading(id);
    // simulate unfollow API call
    setTimeout(() => setActionLoading(null), 1000);
  };



  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="w-12 h-12 bg-indigo-400 flex items-center justify-center rounded-full text-lg font-bold">
                {user.username[0].toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="font-bold text-gray-900">{user.username}</h3>
              <Link to={`/users/@${user.username}`} className="text-blue-500 text-sm">
                @{user.username}
              </Link>

              <div className="flex gap-4 text-xs text-gray-500 mt-1">
                <span>{user.followersCount} Followers</span>
                <span>{user.followingCount} Following</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {user.isFollowing ? (
              <button
                disabled={actionloading === user.id}
                onClick={() => handleUnFollow(user.id)}
                className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                {actionloading === user.id ? (
                  <span className="animate-bounce text-gray-200 text-lg">...</span>
                ) : (
                  "Unfollow"
                )}
              </button>
            ) : (
              <button
                disabled={actionloading === user.id}
                onClick={() => handleFollow(user.id)}
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                {actionloading === user.id ? (
                  <span className="animate-bounce text-gray-200 text-lg">...</span>
                ) : (
                  "Follow"
                )}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersTab;
