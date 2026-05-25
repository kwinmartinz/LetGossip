"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Theme } from "@/app/components/Theme";
import Link from "next/link";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { FaRegComment, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { FiLoader, FiBellOff } from "react-icons/fi";
import { LuArrowLeft } from "react-icons/lu";

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading" || !session?.user?.name) return;

    // Real-time listener filtering alerts tied directly to the logged-in writer's name
    const q = query(
      collection(db, "notifications"),
      where("postOwnerName", "==", session.user.name),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(items);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to notifications: ", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [session, status]);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "notifications", id), { isRead: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id, e) => {
    e.preventDefault(); // Prevents clicking the trash icon from opening the post link
    try {
      await deleteDoc(doc(db, "notifications", id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    if (unreadNotifications.length === 0) return;

    const batch = writeBatch(db);
    unreadNotifications.forEach((n) => {
      const docRef = doc(db, "notifications", n.id);
      batch.update(docRef, { isRead: true });
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center gap-4">
        <FiLoader
          className="text-5xl animate-spin"
          style={{ color: Theme.primary }}
        />
        <p className="text-gray-400 text-sm">Loading alerts...</p>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-black text-gray-800">Access Denied</h1>
        <p className="text-gray-400 text-sm max-w-sm">
          Please sign in to view your post notification center stream.
        </p>
        <Link
          href="/signin"
          className="mt-2 text-sm px-8 py-3 rounded-full text-white font-medium"
          style={{ backgroundColor: Theme.primary }}
        >
          Sign In
        </Link>
      </main>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-600 transition-colors"
          >
            <LuArrowLeft className="text-lg" />
            Back to Explore
          </Link>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs font-semibold flex items-center gap-1.5 text-gray-500 hover:text-purple-600 transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
            >
              <FaCheckCircle /> Mark all as read
            </button>
          )}
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-800">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span
              className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
              style={{ backgroundColor: Theme.primary }}
            >
              {unreadCount} new
            </span>
          )}
        </div>

        {/* Notifications Stack */}
        <div className="flex flex-col gap-3 mt-2">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                <FiBellOff size={24} />
              </div>
              <p className="text-gray-400 text-sm">
                Your stream is completely clean. No updates yet!
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Link
                href={`/post/${notification.postId}`}
                key={notification.id}
                onClick={() =>
                  !notification.isRead && markAsRead(notification.id)
                }
                className={`group flex items-start justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 bg-white ${
                  notification.isRead
                    ? "border-gray-100 opacity-75 hover:opacity-100"
                    : "border-purple-100 shadow-sm ring-1 ring-purple-100/50"
                }`}
              >
                <div className="flex gap-3 items-start">
                  {/* Actor Avatar */}
                  <div className="relative shrink-0">
                    {notification.triggeredByImage ? (
                      <img
                        src={notification.triggeredByImage}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: Theme.primary }}
                      >
                        {notification.triggeredBy?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white border-2 border-white">
                      <FaRegComment size={9} />
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-gray-600 leading-snug">
                      <span className="font-bold text-gray-800">
                        {notification.triggeredBy}
                      </span>{" "}
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-400">
                      {notification.createdAt?.seconds
                        ? new Date(
                            notification.createdAt.seconds * 1000,
                          ).toLocaleDateString()
                        : "Just now"}
                    </span>
                  </div>
                </div>

                {/* Inline Actions */}
                <div className="flex items-center gap-2 self-center">
                  {!notification.isRead && (
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: Theme.primary }}
                      title="Unread"
                    />
                  )}
                  <button
                    onClick={(e) => deleteNotification(notification.id, e)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors md:opacity-0 group-hover:opacity-100"
                    title="Remove alert"
                  >
                    <FaTrashAlt size={12} />
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
