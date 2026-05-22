"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import { FaImage, FaRegThumbsUp } from "react-icons/fa";
import { LuBold, LuItalic, LuHeading, LuList, LuQuote } from "react-icons/lu";
import { MdOutlinePublish } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { db, storage } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FiLoader, FiWifi } from "react-icons/fi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const categories = [
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

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function Write() {
  const { data: session } = useSession();
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [open, setOpen] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDraftClose = () => setDraftOpen(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "Title must be at least 5 characters")
        .required("Title is required"),
      content: Yup.string()
        .min(50, "Content must be at least 50 characters")
        .required("Content is required"),
      category: Yup.string().required("Please select a category"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setPublishing(true);
      setNetworkError("");
      try {
        if (!navigator.onLine) {
          setNetworkError(
            "No internet connection. Please check your network and try again.",
          );
          setPublishing(false);
          return;
        }

        let coverImageUrl = "";
        if (coverImageFile) {
          const imageRef = ref(
            storage,
            `covers/${Date.now()}_${coverImageFile.name}`,
          );
          await uploadBytes(imageRef, coverImageFile);
          coverImageUrl = await getDownloadURL(imageRef);
        }

        await addDoc(collection(db, "posts"), {
          title: values.title,
          content: values.content,
          category: values.category,
          coverImage: coverImageUrl,
          author: session?.user?.name || "Anonymous",
          authorImage: session?.user?.image || "",
          avatar: session?.user?.name?.slice(0, 2).toUpperCase() || "AN",
          likes: 0,
          comments: 0,
          status: "published",
          createdAt: serverTimestamp(),
        });

        resetForm();
        setCoverImage(null);
        setCoverImageFile(null);
        setWordCount(0);
        handleOpen();
      } catch (error) {
        console.error("Error publishing post:", error);
        if (!navigator.onLine) {
          setNetworkError(
            "No internet connection. Please check your network and try again.",
          );
        } else {
          setNetworkError(
            "Something went wrong while publishing. Please try again.",
          );
        }
      } finally {
        setPublishing(false);
      }
    },
  });

  const handleSaveDraft = async () => {
    if (!formik.values.title && !formik.values.content) {
      setNetworkError("Please write something before saving a draft.");
      return;
    }
    setSavingDraft(true);
    setNetworkError("");
    try {
      if (!navigator.onLine) {
        setNetworkError(
          "No internet connection. Please check your network and try again.",
        );
        setSavingDraft(false);
        return;
      }

      let coverImageUrl = "";
      if (coverImageFile) {
        const imageRef = ref(
          storage,
          `drafts/${Date.now()}_${coverImageFile.name}`,
        );
        await uploadBytes(imageRef, coverImageFile);
        coverImageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        title: formik.values.title || "Untitled Draft",
        content: formik.values.content || "",
        category: formik.values.category || "",
        coverImage: coverImageUrl,
        author: session?.user?.name || "Anonymous",
        authorImage: session?.user?.image || "",
        avatar: session?.user?.name?.slice(0, 2).toUpperCase() || "AN",
        likes: 0,
        comments: 0,
        status: "draft",
        createdAt: serverTimestamp(),
      });

      setDraftOpen(true);
    } catch (error) {
      console.error("Error saving draft:", error);
      if (!navigator.onLine) {
        setNetworkError(
          "No internet connection. Please check your network and try again.",
        );
      } else {
        setNetworkError("Something went wrong while saving. Please try again.");
      }
    } finally {
      setSavingDraft(false);
    }
  };

  const handleContentChange = (e) => {
    formik.handleChange(e);
    const words = e.target.value.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image is too large. Please upload an image under 5MB.");
      return;
    }

    setCoverImage(URL.createObjectURL(file));
    setCoverImageFile(file);
  };

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-3xl mx-auto flex flex-col gap-6"
      >
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
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200 disabled:opacity-50"
            >
              {savingDraft ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <>
                  <AiOutlineSave className="text-lg" />
                  Save Draft
                </>
              )}
            </button>
            <button
              type="submit"
              disabled={publishing}
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: Theme.primary }}
            >
              {publishing ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <>
                  <MdOutlinePublish className="text-lg" />
                  Publish
                </>
              )}
            </button>
          </div>
        </div>

        {/* Network Error */}
        {networkError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-2xl">
            <FiWifi className="text-lg shrink-0" />
            {networkError}
          </div>
        )}

        {/* Cover Image Upload */}
        <div className="flex flex-col gap-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {coverImage ? (
              <div className="relative">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <label
                    className="bg-white text-xs px-3 py-1 rounded-full shadow hover:bg-gray-50 transition-all duration-200 cursor-pointer font-medium"
                    style={{ color: Theme.primary }}
                  >
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage(null);
                      setCoverImageFile(null);
                      setImageError("");
                    }}
                    className="bg-white text-red-400 text-xs px-3 py-1 rounded-full shadow hover:bg-red-50 transition-all duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 h-52 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                <FaImage className="text-4xl text-gray-300" />
                <p className="text-gray-400 text-sm">
                  Click to upload a cover image
                </p>
                <p className="text-gray-300 text-xs">
                  PNG, JPG, WEBP up to 5MB
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
          {imageError && (
            <p className="text-red-400 text-xs px-4">{imageError}</p>
          )}
        </div>

        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <div
            className={`bg-white rounded-2xl border shadow-sm px-6 py-4 focus-within:border-[#7C3AED] transition-all duration-200 ${
              formik.touched.title && formik.errors.title
                ? "border-red-400"
                : "border-gray-100"
            }`}
          >
            <input
              type="text"
              name="title"
              placeholder="Write your title here..."
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full outline-none text-xl sm:text-2xl font-black text-gray-800 placeholder-gray-300"
            />
          </div>
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-400 text-xs px-4">{formik.errors.title}</p>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col gap-1">
          <div
            className={`bg-white rounded-2xl border shadow-sm px-6 py-4 focus-within:border-[#7C3AED] transition-all duration-200 ${
              formik.touched.category && formik.errors.category
                ? "border-red-400"
                : "border-gray-100"
            }`}
          >
            <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
              Select a Category
            </p>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full outline-none text-sm text-gray-700 bg-transparent cursor-pointer"
            >
              <option value="">-- Choose a category --</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-400 text-xs px-4">
              {formik.errors.category}
            </p>
          )}
        </div>

        {/* Formatting Toolbar */}
        <div className="bg-white rounded-t-2xl border border-b-0 border-gray-100 shadow-sm px-6 py-3 flex items-center gap-4 flex-wrap">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mr-2">
            Format
          </p>
          <button
            type="button"
            className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200"
          >
            <LuBold className="text-lg" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200"
          >
            <LuItalic className="text-lg" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200"
          >
            <LuHeading className="text-lg" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200"
          >
            <LuList className="text-lg" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-[#7C3AED] transition-all duration-200"
          >
            <LuQuote className="text-lg" />
          </button>
          <div className="ml-auto text-xs text-gray-400">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </div>
        </div>

        {/* Content Editor */}
        <div
          className={`bg-white rounded-b-2xl border border-t-0 shadow-sm px-6 py-4 -mt-6 ${
            formik.touched.content && formik.errors.content
              ? "border-red-400"
              : "border-gray-100"
          }`}
        >
          <textarea
            name="content"
            placeholder="Start writing your post here... Tell your story, share your opinion, spill the tea ☕"
            value={formik.values.content}
            onChange={handleContentChange}
            onBlur={formik.handleBlur}
            rows={16}
            className="w-full outline-none text-sm sm:text-base text-gray-700 placeholder-gray-300 leading-relaxed resize-none"
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.content}</p>
          )}
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
          <p className="text-xs text-gray-400">
            {wordCount < 100
              ? `${100 - wordCount} more words recommended for a great post`
              : "✅ Great length! Ready to publish."}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={savingDraft}
              className="flex items-center gap-2 text-sm px-5 py-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200 disabled:opacity-50"
            >
              {savingDraft ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <>
                  <AiOutlineSave className="text-lg" />
                  Save Draft
                </>
              )}
            </button>
            <button
              type="submit"
              disabled={publishing}
              className="flex items-center gap-2 text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: Theme.primary }}
            >
              {publishing ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                <>
                  <MdOutlinePublish className="text-lg" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Publish Success Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="flex items-center justify-center"
          >
            <FaRegThumbsUp
              className="text-6xl"
              style={{ color: Theme.primary }}
            />
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            Your post was successfully published!
          </Typography>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClose}
              className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>

      {/* Draft Saved Modal */}
      <Modal
        open={draftOpen}
        onClose={handleDraftClose}
        aria-labelledby="draft-modal-title"
        aria-describedby="draft-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="draft-modal-title"
            variant="h6"
            component="h2"
            className="flex items-center justify-center"
          >
            <AiOutlineSave
              className="text-6xl"
              style={{ color: Theme.primary }}
            />
          </Typography>
          <Typography
            id="draft-modal-description"
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            Your draft has been saved successfully!
          </Typography>
          <p className="text-center text-gray-400 text-xs mt-2">
            You can continue editing and publish when you are ready.
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDraftClose}
              className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              Continue Writing
            </button>
          </div>
        </Box>
      </Modal>
    </main>
  );
}
