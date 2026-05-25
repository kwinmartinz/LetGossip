"use client";
import { useEffect, useState } from "react";
import { Theme } from "../components/Theme";
import Link from "next/link";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FiLoader, FiTrash2, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { signOut } from "next-auth/react";

export default function ProfilePage({ session }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("letgossip_display_name");
    const name = stored || session?.user?.name || "";
    setDisplayName(name);
    setNewName(name);
    setSavedName(name);
  }, [session]);

  const fetchPosts = async () => {
    setLoading(true);
    const items = [];
    try {
      const q = query(
        collection(db, "posts"),
        where("author", "==", session?.user?.name),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = { postId: doc.id, ...doc.data() };
        if (data.status === "published") items.push(data);
      });
      setPosts(items);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchPosts();
  }, [session]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts((prev) => prev.filter((p) => p.postId !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    try {
      localStorage.setItem("letgossip_display_name", newName.trim());
      setDisplayName(newName.trim());
      setSavedName(newName.trim());
      setEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleCancelEdit = () => {
    setNewName(savedName);
    setEditingName(false);
  };

  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

  const avatarInitial = displayName?.charAt(0)?.toUpperCase() || "?";

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={displayName}
              className="w-24 h-24 rounded-full object-cover shrink-0 border-4 border-[#F59E0B]"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shrink-0"
              style={{ backgroundColor: Theme.primary }}
            >
              {avatarInitial}
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-3 flex-1 text-center sm:text-left">
            {/* Name + Edit + Logout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-xl font-black text-gray-800 border-b-2 outline-none px-1"
                    style={{ borderColor: Theme.primary }}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1.5 rounded-full text-white"
                    style={{ backgroundColor: Theme.primary }}
                  >
                    <FiCheck size={16} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1.5 rounded-full bg-gray-100 text-gray-500"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-800">
                    {displayName}
                  </h1>
                  <button
                    onClick={() => setEditingName(true)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-[#7C3AED] hover:bg-gray-100 transition-all duration-200"
                  >
                    <FiEdit2 size={16} />
                  </button>
                </div>
              )}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-full border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
              >
                <LuLogOut className="text-lg" />
                Sign Out
              </button>
            </div>

            <p className="text-gray-500 text-sm">{session?.user?.email}</p>

            {/* Stats */}
            <div className="flex items-center justify-center sm:justify-start gap-6 mt-2 flex-wrap">
              <div className="flex flex-col items-center sm:items-start">
                <p
                  className="text-xl font-black"
                  style={{ color: Theme.primary }}
                >
                  {posts.length}
                </p>
                <p className="text-xs text-gray-400">Posts</p>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p
                  className="text-xl font-black"
                  style={{ color: Theme.primary }}
                >
                  {totalLikes}
                </p>
                <p className="text-xs text-gray-400">Likes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black" style={{ color: Theme.primary }}>
              My Posts
            </h2>
            <Link
              href="/write"
              className="text-sm px-5 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              + New Post
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <FiLoader
                className="text-5xl animate-spin"
                style={{ color: Theme.primary }}
              />
              <p className="text-gray-400 text-sm">Loading your posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts yet.</p>
              <Link
                href="/write"
                className="mt-4 inline-block text-sm px-8 py-3 rounded-full text-white font-medium"
                style={{ backgroundColor: Theme.primary }}
              >
                Write Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.postId}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Cover Image */}
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-36 object-cover rounded-xl"
                    />
                  )}

                  {/* Category, Date & Delete in one row */}
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
                    <button
                      onClick={() => handleDelete(post.postId)}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>

                  <h3 className="text-base font-black text-gray-800 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {post.content?.slice(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-pink-400" /> {post.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaRegComment /> {post.comments || 0}
                      </span>
                    </div>
                    <Link
                      href={`/post/${post.postId}`}
                      className="text-xs font-bold hover:opacity-70 transition-opacity"
                      style={{ color: Theme.primary }}
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
