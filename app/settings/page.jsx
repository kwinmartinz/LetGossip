"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import { LuUser, LuMail, LuLock, LuCamera } from "react-icons/lu";

export default function Settings() {
  const [name, setName] = useState("Queen-Martins");
  const [email, setEmail] = useState("queenmartins@letgossip.com");
  const [bio, setBio] = useState(
    "Writer, thinker, and chronic overthinker. I write about life, growth, and everything in between.",
  );
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-black"
            style={{ color: Theme.primary }}
          >
            Account Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Update your profile information and password.
          </p>
        </div>

        {/* Profile Photo */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-base font-black text-gray-700">Profile Photo</h2>
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-black shrink-0 overflow-hidden"
              style={{ backgroundColor: Theme.primary }}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                "FA"
              )}
            </div>
            <label className="flex items-center gap-2 text-sm px-5 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200 cursor-pointer">
              <LuCamera className="text-lg" />
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-base font-black text-gray-700">
            Profile Information
          </h2>

          {/* Name */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
            <LuUser className="text-gray-400 text-lg shrink-0" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
            <LuMail className="text-gray-400 text-lg shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Bio */}
          <div className="flex items-start gap-3 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
            <LuUser className="text-gray-400 text-lg shrink-0 mt-1" />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              rows={3}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 resize-none"
            />
          </div>

          <button
            className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: Theme.primary }}
          >
            Save Changes
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-base font-black text-gray-700">
            Change Password
          </h2>

          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
            <LuLock className="text-gray-400 text-lg shrink-0" />
            <input
              type="password"
              placeholder="Current password"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
            <LuLock className="text-gray-400 text-lg shrink-0" />
            <input
              type="password"
              placeholder="New password"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
            <LuLock className="text-gray-400 text-lg shrink-0" />
            <input
              type="password"
              placeholder="Confirm new password"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          <button
            className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: Theme.primary }}
          >
            Update Password
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 flex flex-col gap-4">
          <h2 className="text-base font-black text-red-500">Danger Zone</h2>
          <p className="text-gray-400 text-sm">
            Deleting your account is permanent and cannot be undone. All your
            posts and data will be lost.
          </p>
          <button className="w-full py-3 rounded-full text-white font-medium text-sm bg-red-400 hover:bg-red-500 transition-all duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
}
