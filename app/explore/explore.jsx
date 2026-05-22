"use client";
import { useEffect, useState } from "react";
import { Theme } from "../components/Theme";
import Link from "next/link";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  increment,
  orderBy,
  query,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const POSTS_PER_PAGE = 6;

const categories = [
  "All",
  "Lifestyle",
  "Fashion",
  "Business",
  "News",
  "Entertainment",
  "Relationships",
  "Travel",
  "Health",
  "Other",
];

const ExplorePosts = ({ session }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    const items = [];
    try {
      const q = query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("createdAt", "desc"),
        limit(POSTS_PER_PAGE),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        items.push({ postId: doc.id, ...doc.data() });
      });
      setPosts(items);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!lastDoc) return;
    setLoadingMore(true);
    const items = [];
    try {
      const q = query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(POSTS_PER_PAGE),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        items.push({ postId: doc.id, ...doc.data() });
      });
      setPosts((prev) => [...prev, ...items]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this post?")) {
        await deleteDoc(doc(db, "posts", id));
        setPosts((prev) => prev.filter((post) => post.postId !== id));
      }
    } catch (error) {
      console.error("An error occurred", error);
      alert("Oops...Something went wrong!");
    }
  };

  const handleLike = async (postId) => {
    if (likedPosts.includes(postId)) return;
    try {
      await updateDoc(doc(db, "posts", postId), {
        likes: increment(1),
      });
      setLikedPosts((prev) => [...prev, postId]);
      setPosts((prev) =>
        prev.map((post) =>
          post.postId === postId
            ? { ...post, likes: (post.likes || 0) + 1 }
            : post,
        ),
      );
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
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

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm max-w-xl mx-auto w-full">
          <LuSearch className="text-gray-400 text-lg shrink-0" />
          <input
            type="text"
            placeholder="Search posts, topics, or writers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className="text-sm px-5 py-2 rounded-full border transition-all duration-200 font-medium"
              style={{
                backgroundColor:
                  selectedCategory === cat ? Theme.primary : "white",
                color: selectedCategory === cat ? "white" : "#6B7280",
                borderColor:
                  selectedCategory === cat ? Theme.primary : "#E5E7EB",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <FiLoader
              className="text-5xl animate-spin"
              style={{ color: Theme.primary }}
            />
            <p className="text-gray-400 text-sm">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No posts yet. Be the first to write!
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.postId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative"
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                )}

                {/* Category & Date & Delete */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white shrink-0"
                    style={{ backgroundColor: Theme.primary }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex-1 text-center">
                    {post.createdAt?.seconds
                      ? new Date(
                          post.createdAt.seconds * 1000,
                        ).toLocaleDateString()
                      : ""}
                  </span>
                  {session?.user?.name === post.author ? (
                    <button
                      onClick={() => handleDelete(post.postId)}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
                      title="Delete Post"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  ) : (
                    <div className="w-6" />
                  )}
                </div>

                {/* Title */}
                <h2 className="text-base font-black text-gray-800 leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {post.content?.slice(0, 120)}...
                </p>

                {/* Read More */}
                <Link
                  href={`/post/${post.postId}`}
                  className="text-sm font-bold hover:opacity-70 transition-opacity"
                  style={{ color: Theme.primary }}
                >
                  Read more →
                </Link>

                {/* Author & Stats */}
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {post.authorImage ? (
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: Theme.primary }}
                      >
                        {post.avatar}
                      </div>
                    )}
                    <span className="text-xs text-gray-500 font-medium">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <button
                      onClick={() => handleLike(post.postId)}
                      className={`flex items-center gap-1 transition-colors ${
                        likedPosts.includes(post.postId)
                          ? "text-pink-500"
                          : "text-gray-400 hover:text-pink-400"
                      }`}
                    >
                      <FaHeart /> {post.likes || 0}
                    </button>
                    <Link
                      href={`/post/${post.postId}`}
                      className="flex items-center gap-1 hover:text-[#7C3AED] transition-colors"
                    >
                      <FaRegComment /> {post.comments || 0}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="flex items-center gap-2 text-sm px-10 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: Theme.primary }}
            >
              {loadingMore ? (
                <FiLoader className="animate-spin text-lg" />
              ) : (
                "Load More Posts"
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExplorePosts;
