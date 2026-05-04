import { Theme } from "@/app/components/Theme";
import Link from "next/link";
import { FaHeart, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { LuArrowLeft } from "react-icons/lu";
import { posts } from "@/app/data/posts";

const comments = [
  {
    id: 1,
    name: "Amara Osei",
    avatar: "AO",
    date: "April 25, 2026",
    text: "This hit me right in the chest. I needed every single word of this. Thank you!",
    color: "#7C3AED",
  },
  {
    id: 2,
    name: "Chidi Nwosu",
    avatar: "CN",
    date: "April 25, 2026",
    text: "The part about comparing your chapter three to someone else's chapter twenty is something I will carry for a long time.",
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "Ngozi Adeleke",
    avatar: "NA",
    date: "April 26, 2026",
    text: "I literally teared up reading this. Sharing with every young person I know.",
    color: "#7C3AED",
  },
];

export default async function SinglePost({ params }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <main className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-black" style={{ color: Theme.primary }}>
          Post Not Found
        </h1>
        <p className="text-gray-400 text-sm">
          This post does not exist or has been removed.
        </p>
        <Link
          href="/explore"
          className="text-sm px-6 py-2 rounded-full text-white font-medium"
          style={{ backgroundColor: Theme.primary }}
        >
          Back to Explore
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        {/* Back Button */}
        <Link
          href={"/explore"}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#7C3AED] transition-all duration-200 w-fit"
        >
          <LuArrowLeft className="text-lg" />
          Back to Explore
        </Link>

        {/* Post Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: post.color }}
            >
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.date}</span>
            <span className="text-xs text-gray-400">· 5 min read</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-800 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: post.color }}
            >
              {post.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {post.author}
              </p>
              <p className="text-xs text-gray-400">Writer on LetGossip</p>
            </div>
          </div>
        </div>

        {/* Cover Image Placeholder */}
        <div
          className="w-full h-56 sm:h-72 rounded-2xl flex items-center justify-center text-white text-lg font-medium"
          style={{ backgroundColor: post.color }}
        >
          📝 LetGossip Post Cover
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 sm:px-10 py-8 flex flex-col gap-4">
          <p className="text-gray-700 text-base leading-relaxed">
            {post.excerpt}
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            This is where the full content of the post will appear once the
            database is connected. For now this is a preview of the post based
            on the excerpt available.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Stay tuned — full post content, images, and formatting will be
            available once Firebase is set up and posts are being written and
            saved from the Write page.
          </p>
        </div>

        {/* Likes & Share */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <button className="flex items-center gap-2 text-sm font-medium text-pink-400 hover:text-pink-500 transition-all duration-200">
            <FaHeart className="text-xl" />
            {post.likes} Likes
          </button>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Share:
            </p>
            <Link
              href={"#"}
              className="text-gray-400 hover:text-[#7C3AED] text-xl transition-all duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              href={"#"}
              className="text-gray-400 hover:text-[#7C3AED] text-xl transition-all duration-200"
            >
              <BsTwitterX />
            </Link>
            <Link
              href={"#"}
              className="text-gray-400 hover:text-[#7C3AED] text-xl transition-all duration-200"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-black" style={{ color: Theme.primary }}>
            Comments ({comments.length})
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex flex-col gap-3">
            <textarea
              placeholder="Share your thoughts on this post..."
              rows={3}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-300 leading-relaxed resize-none"
            />
            <div className="flex justify-end">
              <button
                className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: Theme.primary }}
              >
                Post Comment
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex items-start gap-4"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: comment.color }}
                >
                  {comment.avatar}
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-sm font-semibold text-gray-700">
                      {comment.name}
                    </p>
                    <p className="text-xs text-gray-400">{comment.date}</p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
