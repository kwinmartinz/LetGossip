"use client";
import { Theme } from "@/app/components/Theme";
import Link from "next/link";
import { FaHeart, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { LuArrowLeft } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { db } from "@/config/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  increment,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SinglePostClient() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Fetch post
  const fetchPost = async () => {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { postId: docSnap.id, ...docSnap.data() };
        setPost(data);
        setLikesCount(data.likes || 0);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, "posts", id, "comments"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      setComments(items);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  // Handle Like
  const handleLike = async () => {
    if (liked) return;
    try {
      await updateDoc(doc(db, "posts", id), {
        likes: increment(1),
      });
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle Comment
  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    setPostingComment(true);
    try {
      await addDoc(collection(db, "posts", id, "comments"), {
        text: commentText,
        name: session?.user?.name || "Anonymous",
        avatar: session?.user?.name?.slice(0, 2).toUpperCase() || "AN",
        authorImage: session?.user?.image || "",
        createdAt: serverTimestamp(),
      });
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setPostingComment(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <main className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center gap-4">
        <FiLoader
          className="text-5xl animate-spin"
          style={{ color: Theme.primary }}
        />
        <p className="text-gray-400 text-sm">Loading post...</p>
      </main>
    );
  }

  // Post Not Found
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
              style={{ backgroundColor: Theme.primary }}
            >
              {post.category}
            </span>
            <span className="text-xs text-gray-400">
              {post.createdAt?.seconds
                ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
                : ""}
            </span>
            <span className="text-xs text-gray-400">· 5 min read</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-800 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            {post.authorImage ? (
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: Theme.primary }}
              >
                {post.avatar}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {post.author}
              </p>
              <p className="text-xs text-gray-400">Writer on LetGossip</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-56 sm:h-72 rounded-2xl object-cover"
          />
        ) : (
          <div
            className="w-full h-56 sm:h-72 rounded-2xl flex items-center justify-center text-white text-lg font-medium"
            style={{ backgroundColor: Theme.primary }}
          >
            📝 LetGossip Post
          </div>
        )}

        {/* Post Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 sm:px-10 py-8 flex flex-col gap-4">
          {post.content?.split("\n").map((paragraph, i) => (
            <p key={i} className="text-gray-700 text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Likes & Share */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
              liked ? "text-pink-500" : "text-gray-400 hover:text-pink-400"
            }`}
          >
            <FaHeart className="text-xl" />
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </button>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Share:
            </p>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`}
              target="_blank"
              className="text-gray-400 hover:text-[#7C3AED] text-xl transition-all duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}&text=${post.title}`}
              target="_blank"
              className="text-gray-400 hover:text-[#7C3AED] text-xl transition-all duration-200"
            >
              <BsTwitterX />
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? window.location.href : ""}`}
              target="_blank"
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

          {/* Comment Input */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex flex-col gap-3">
            <textarea
              placeholder={
                session
                  ? "Share your thoughts on this post..."
                  : "Sign in to leave a comment..."
              }
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={!session}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-300 leading-relaxed resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="flex justify-end">
              {session ? (
                <button
                  onClick={handlePostComment}
                  disabled={postingComment || !commentText.trim()}
                  className="flex items-center gap-2 text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: Theme.primary }}
                >
                  {postingComment ? (
                    <FiLoader className="animate-spin text-sm" />
                  ) : (
                    "Post Comment"
                  )}
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
                  style={{ backgroundColor: Theme.primary }}
                >
                  Sign In to Comment
                </Link>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-4">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.commentId}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 flex items-start gap-4"
                >
                  {comment.authorImage ? (
                    <img
                      src={comment.authorImage}
                      alt={comment.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: Theme.primary }}
                    >
                      {comment.avatar}
                    </div>
                  )}
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="text-sm font-semibold text-gray-700">
                        {comment.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {comment.createdAt?.seconds
                          ? new Date(
                              comment.createdAt.seconds * 1000,
                            ).toLocaleDateString()
                          : "Just now"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
