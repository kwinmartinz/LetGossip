"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import { FaImage } from "react-icons/fa";
import { LuBold, LuItalic, LuHeading, LuList, LuQuote } from "react-icons/lu";
import { MdOutlinePublish } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";

const categories = [
  "Lifestyle",
  "Fashion",
  "Business",
  "Opinion",
  "Relationships",
  "Travel",
  "Health",
  "Other",
];

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    const words = e.target.value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-black"
              style={{ color: Theme.primary }}
            >
              Write a Post
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Share your story with the LetGossip community.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm px-5 py-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200">
              <AiOutlineSave className="text-lg" />
              Save Draft
            </button>
            <button
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              <MdOutlinePublish className="text-lg" />
              Publish
            </button>
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {coverImage ? (
            <div className="relative">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-52 object-cover"
              />
              <button
                onClick={() => setCoverImage(null)}
                className="absolute top-3 right-3 bg-white text-red-400 text-xs px-3 py-1 rounded-full shadow hover:bg-red-50 transition-all duration-200"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 h-52 cursor-pointer hover:bg-gray-50 transition-all duration-200">
              <FaImage className="text-4xl text-gray-300" />
              <p className="text-gray-400 text-sm">
                Click to upload a cover image
              </p>
              <span
                className="text-xs px-4 py-2 rounded-full text-white font-medium"
                style={{ backgroundColor: Theme.primary }}
              >
                Choose Image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Title Input */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 focus-within:border-[#7C3AED] transition-all duration-200">
          <input
            type="text"
            placeholder="Write your title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none text-xl sm:text-2xl font-black text-gray-800 placeholder-gray-300"
          />
        </div>

        {/* Category Selector */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
          <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
            Select a Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className="text-sm px-4 py-2 rounded-full border transition-all duration-200 font-medium"
                style={{
                  backgroundColor:
                    selectedCategory === cat ? Theme.primary : "transparent",
                  color: selectedCategory === cat ? "white" : "#6B7280",
                  borderColor:
                    selectedCategory === cat ? Theme.primary : "#E5E7EB",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="bg-white rounded-t-2xl border border-b-0 border-gray-100 shadow-sm px-6 py-3 flex items-center gap-4 flex-wrap">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mr-2">
            Format
          </p>
          <button className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200">
            <LuBold className="text-lg" />
          </button>
          <button className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200">
            <LuItalic className="text-lg" />
          </button>
          <button className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200">
            <LuHeading className="text-lg" />
          </button>
          <button className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200">
            <LuList className="text-lg" />
          </button>
          <button className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200">
            <LuQuote className="text-lg" />
          </button>
          <div className="ml-auto text-xs text-gray-400">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-b-2xl border border-t-0 border-gray-100 shadow-sm px-6 py-4 -mt-6">
          <textarea
            placeholder="Start writing your post here... Tell your story, share your opinion, spill the tea ☕"
            value={content}
            onChange={handleContentChange}
            rows={16}
            className="w-full outline-none text-sm sm:text-base text-gray-700 placeholder-gray-300 leading-relaxed resize-none"
          />
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
          <p className="text-xs text-gray-400">
            {wordCount < 100
              ? `${100 - wordCount} more words recommended for a great post`
              : "✅ Great length! Ready to publish."}
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm px-5 py-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200">
              <AiOutlineSave className="text-lg" />
              Save Draft
            </button>
            <button
              className="flex items-center gap-2 text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              <MdOutlinePublish className="text-lg" />
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
