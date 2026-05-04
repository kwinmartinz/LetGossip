import { Theme } from "../components/Theme";
import Link from "next/link";
import { FaFire, FaHeart, FaRegComment, FaTrophy } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { posts, rankColors } from "../data/posts";

export default function Trending() {
  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <FaFire className="text-[#F59E0B] text-3xl" />
            <h1
              className="text-3xl sm:text-4xl font-black"
              style={{ color: Theme.primary }}
            >
              Trending Now
            </h1>
            <FaFire className="text-[#F59E0B] text-3xl" />
          </div>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            The hottest posts on LetGossip right now ranked by likes, comments
            and engagement.
          </p>
        </div>

        <div
          className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white"
          style={{ backgroundColor: Theme.primary }}
        >
          <FaTrophy className="text-[#F59E0B] text-2xl shrink-0" />
          <p className="text-sm sm:text-base font-medium">
            🏆 Today's top post -{" "}
            <span className="font-bold">"Dear 22-Year-Old Me"</span> with{" "}
            <span className="font-bold">427 likes</span> and{" "}
            <span className="font-bold">89 comments.</span>
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex items-start gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                style={{
                  backgroundColor: rankColors[post.rank] || Theme.primary,
                }}
              >
                {post.rank}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: post.color }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-gray-800 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-1 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: post.color }}
                    >
                      {post.avatar}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-pink-400" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegComment /> {post.comments}
                    </span>
                    <span className="flex items-center gap-1 text-[#F59E0B] font-semibold">
                      <FaBolt /> Hot
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center py-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Want to be on this list? Write something people can't stop talking
            about.
          </p>
          <Link
            href={"/write"}
            className="text-sm px-10 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: Theme.primary }}
          >
            Start Writing Now
          </Link>
        </div>
      </div>
    </main>
  );
}
