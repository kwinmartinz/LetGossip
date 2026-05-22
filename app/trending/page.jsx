"use client";
import { useEffect, useState } from "react";
import { Theme } from "../components/Theme";
import Link from "next/link";
import { FaFire, FaHeart, FaRegComment } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const rankColors = {
  1: "#F59E0B",
  2: "#9CA3AF",
  3: "#B45309",
};

export default function Trending() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topPost, setTopPost] = useState(null);

  const fetchTrendingPosts = async () => {
    setLoading(true);
    const items = [];
    try {
      const q = query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("likes", "desc"),
        limit(10),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        items.push({ postId: doc.id, ...doc.data() });
      });
      setPosts(items);
      if (items.length > 0) setTopPost(items[0]);
    } catch (error) {
      console.error("Error fetching trending posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: Theme.primary }}
          >
            Trending Now
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            The hottest posts on LetGossip right now ranked by likes, comments
            and engagement.
          </p>
        </div>

        {/* Top Post Banner */}
        {topPost && (
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white"
            style={{ backgroundColor: Theme.primary }}
          >
            <FaFire className="text-[#F59E0B] text-2xl shrink-0" />
            <p className="text-sm sm:text-base font-medium">
              Today's top post —{" "}
              <span className="font-bold">"{topPost.title}"</span> with{" "}
              <span className="font-bold">{topPost.likes || 0} likes</span> and{" "}
              <span className="font-bold">
                {topPost.comments || 0} comments.
              </span>
            </p>
          </div>
        )}

        {/* Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <FiLoader
              className="text-5xl animate-spin"
              style={{ color: Theme.primary }}
            />
            <p className="text-gray-400 text-sm">Loading trending posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No trending posts yet. Be the first to write!
            </p>
            <Link
              href="/write"
              className="mt-4 inline-block text-sm px-8 py-3 rounded-full text-white font-medium"
              style={{ backgroundColor: Theme.primary }}
            >
              Write a Post
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {posts.map((post, index) => (
              <Link
                href={`/post/${post.postId}`}
                key={post.postId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex items-start gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                {/* Rank Number */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                  style={{
                    backgroundColor: rankColors[index + 1] || Theme.primary,
                  }}
                >
                  {index + 1}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: Theme.primary }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {post.createdAt?.seconds
                        ? new Date(
                            post.createdAt.seconds * 1000,
                          ).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base sm:text-lg font-black text-gray-800 leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {post.content?.slice(0, 120)}...
                  </p>

                  {/* Author & Stats */}
                  <div className="flex items-center justify-between mt-1 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      {post.authorImage ? (
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: Theme.primary }}
                        >
                          {post.avatar}
                        </div>
                      )}
                      <span className="text-xs text-gray-500 font-medium">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-pink-400" /> {post.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaRegComment /> {post.comments || 0}
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
        )}

        {/* Bottom CTA */}
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
