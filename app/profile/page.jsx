import { Theme } from "../components/Theme";
import Link from "next/link";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { posts } from "../data/posts";

const user = {
  name: "Fatima Aliyu",
  avatar: "FA",
  bio: "Writer, thinker, and chronic overthinker. I write about life, growth, and everything in between.",
  joined: "January 2026",
  totalPosts: 6,
  totalLikes: 1586,
  followers: 348,
  following: 120,
};

export default function Profile() {
  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shrink-0"
            style={{ backgroundColor: Theme.primary }}
          >
            {user.avatar}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h1 className="text-2xl font-black text-gray-800">{user.name}</h1>
              <Link
                href="/settings"
                className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200"
              >
                <LuSettings className="text-lg" />
                Edit Profile
              </Link>
            </div>

            <p className="text-gray-500 text-sm">{user.bio}</p>
            <p className="text-gray-400 text-xs">Joined {user.joined}</p>

            {/* Stats */}
            <div className="flex items-center justify-center sm:justify-start gap-6 mt-2 flex-wrap">
              <div className="flex flex-col items-center sm:items-start">
                <p
                  className="text-xl font-black"
                  style={{ color: Theme.primary }}
                >
                  {user.totalPosts}
                </p>
                <p className="text-xs text-gray-400">Posts</p>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p
                  className="text-xl font-black"
                  style={{ color: Theme.primary }}
                >
                  {user.totalLikes}
                </p>
                <p className="text-xs text-gray-400">Likes</p>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p
                  className="text-xl font-black"
                  style={{ color: Theme.primary }}
                >
                  {user.followers}
                </p>
                <p className="text-xs text-gray-400">Followers</p>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p
                  className="text-xl font-black"
                  style={{ color: Theme.primary }}
                >
                  {user.following}
                </p>
                <p className="text-xs text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-black" style={{ color: Theme.primary }}>
            My Posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                href={`/post/${post.id}`}
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: post.color }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-base font-black text-gray-800 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-pink-400" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegComment /> {post.comments}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
