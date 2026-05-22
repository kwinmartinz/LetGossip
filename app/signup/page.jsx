"use client";
import { Theme } from "../components/Theme";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LuMail, LuLock, LuUser } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { firebaseAuth } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signIn } from "next-auth/react";

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

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    window.location.href = "/signin";
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Please confirm your password"),
      terms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required("You must accept the terms and conditions"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError("");

      const auth = firebaseAuth;
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Update display name
          return updateProfile(user, {
            displayName: values.name,
          });
        })
        .then(() => {
          resetForm();
          setOpen(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setError(
              "An account with this email already exists. Please sign in instead.",
            );
          } else if (errorCode === "auth/invalid-email") {
            setError("Please enter a valid email address.");
          } else if (errorCode === "auth/weak-password") {
            setError("Password is too weak. Please use at least 6 characters.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <main className="min-h-dvh bg-[url('/bg6.avif')] bg-center bg-cover bg-no-repeat">
      <section className="min-h-dvh bg-black/50 flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/logo.png.png"}
              alt="LetGossip Logo"
              width={500}
              height={500}
              className="w-16 h-16 rounded-full border-2 border-[#F59E0B] bg-white p-1"
            />
            <h1
              className="text-2xl font-black"
              style={{ color: Theme.primary }}
            >
              Join LetGossip!
            </h1>
            <p className="text-gray-400 text-sm text-center">
              Create your free account and start sharing your stories today.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-2xl text-center">
              {error}
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <p className="text-gray-400 text-xs">or sign up with email</p>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <div
                className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${formik.touched.name && formik.errors.name ? "border-red-400" : "border-gray-200"}`}
              >
                <LuUser className="text-gray-400 text-lg shrink-0" />
                <input
                  type="text"
                  placeholder="Full name"
                  {...formik.getFieldProps("name")}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-400 text-xs px-4">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <div
                className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${formik.touched.email && formik.errors.email ? "border-red-400" : "border-gray-200"}`}
              >
                <LuMail className="text-gray-400 text-lg shrink-0" />
                <input
                  type="email"
                  placeholder="Email address"
                  {...formik.getFieldProps("email")}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-xs px-4">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div
                className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${formik.touched.password && formik.errors.password ? "border-red-400" : "border-gray-200"}`}
              >
                <LuLock className="text-gray-400 text-lg shrink-0" />
                <input
                  type="password"
                  placeholder="Create password"
                  {...formik.getFieldProps("password")}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-xs px-4">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <div
                className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-400" : "border-gray-200"}`}
              >
                <LuLock className="text-gray-400 text-lg shrink-0" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  {...formik.getFieldProps("confirmPassword")}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-400 text-xs px-4">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-2 px-1">
                <input
                  type="checkbox"
                  id="terms"
                  {...formik.getFieldProps("terms")}
                  className="mt-1 accent-[#7C3AED]"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-400 leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href={"/terms"}
                    className="font-semibold hover:underline"
                    style={{ color: Theme.primary }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={"/privacy"}
                    className="font-semibold hover:underline"
                    style={{ color: Theme.primary }}
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-400 text-xs px-4">
                  {formik.errors.terms}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ backgroundColor: Theme.primary }}
            >
              {loading ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href={"/signin"}
              className="font-semibold hover:underline"
              style={{ color: Theme.secondary }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>

      {/* Success Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
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
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              color: "#1f2937",
              fontSize: "1rem",
            }}
          >
            ACCOUNT CREATED SUCCESSFULLY!
          </Typography>
          <p className="text-center text-gray-400 text-xs mt-2">
            You can now sign in with your email and password.
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClose}
              className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              Go to Sign In
            </button>
          </div>
        </Box>
      </Modal>
    </main>
  );
}
