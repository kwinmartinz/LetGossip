"use client";
import { useEffect, useState } from "react";
import { Theme } from "../components/Theme";
import Link from "next/link";
import { FiTrash2, FiLoader } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import { MdOutlinePublish } from "react-icons/md";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const DraftsPosts = ({ session }) => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrafts = async () => {
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
        if (data.status === "draft") {
          items.push(data);
        }
      });
      setDrafts(items);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchDrafts();
  }, [session]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this draft?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setDrafts((prev) => prev.filter((d) => d.postId !== id));
      } catch (error) {
        console.error("Error deleting draft:", error);
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      await updateDoc(doc(db, "posts", id), {
        status: "published",
        createdAt: serverTimestamp(),
      });
      setDrafts((prev) => prev.filter((d) => d.postId !== id));
      alert("Post published successfully!");
    } catch (error) {
      console.error("Error publishing draft:", error);
    }
  };

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-black"
              style={{ color: Theme.primary }}
            >
              My Drafts
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Posts you have saved but not yet published.
            </p>
          </div>
          <Link
            href="/write"
            className="text-sm px-5 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: Theme.primary }}
          >
            Write New Post
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <FiLoader
              className="text-5xl animate-spin"
              style={{ color: Theme.primary }}
            />
            <p className="text-gray-400 text-sm">Loading drafts...</p>
          </div>
        ) : drafts.length === 0 ? (
          <div className="text-center py-20">
            <AiOutlineSave
              className="text-6xl mx-auto mb-4"
              style={{ color: Theme.primary }}
            />
            <p className="text-gray-400 text-lg">No drafts yet.</p>
            <p className="text-gray-300 text-sm mt-1">
              Start writing and save a draft to see it here.
            </p>
            <Link
              href="/write"
              className="mt-4 inline-block text-sm px-8 py-3 rounded-full text-white font-medium"
              style={{ backgroundColor: Theme.primary }}
            >
              Start Writing
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {drafts.map((draft) => (
              <div
                key={draft.postId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: Theme.primary }}
                    >
                      {draft.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {draft.createdAt?.seconds
                        ? new Date(
                            draft.createdAt.seconds * 1000,
                          ).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <h2 className="text-base font-black text-gray-800 mt-2">
                    {draft.title || "Untitled Draft"}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {draft.content?.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handlePublish(draft.postId)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
                    style={{ backgroundColor: Theme.primary }}
                  >
                    <MdOutlinePublish />
                    Publish
                  </button>
                  <button
                    onClick={() => handleDelete(draft.postId)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default DraftsPosts;
