import { Theme } from "../components/Theme";
import Link from "next/link";
import { FaFire, FaHeart, FaRegComment } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { posts, categories } from "../data/posts";

export default function Explore() {
  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: Theme.primary }}
          >
            Explore Posts
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            Discover stories, opinions, and hot takes from writers around the
            world.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm max-w-xl mx-auto w-full">
          <LuSearch className="text-gray-400 text-lg shrink-0" />
          <input
            type="text"
            placeholder="Search posts, topics, or writers..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="text-sm px-5 py-2 rounded-full border border-gray-200 bg-white hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200 font-medium text-gray-500"
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white"
          style={{ backgroundColor: Theme.primary }}
        >
          <p className="text-sm sm:text-base font-medium">
            Trending today{" "}
            <span className="font-bold">"Dear 22-Year-Old Me"</span> is the most
            liked post with 427 hearts!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <h2 className="text-base font-black text-gray-800 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: post.color }}
                  >
                    {post.avatar}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {post.author}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-pink-400" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegComment /> {post.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="text-sm px-10 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: Theme.primary }}
          >
            Load More Posts
          </button>
        </div>
      </div>
    </main>
  );
}
