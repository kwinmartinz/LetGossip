"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import Image from "next/image";
import Link from "next/link";
import { LuMail } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import bcrypt from "bcryptjs";

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

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    window.location.href = "/signin";
  };

  // Step 1 — Verify email
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", values.email),
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError("No account found with this email address.");
          setLoading(false);
          return;
        }

        setUserDocId(snapshot.docs[0].id);
        setStep(2);
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Step 2 — Reset password
  const passwordFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
        .required("Please confirm your new password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        await updateDoc(doc(db, "users", userDocId), {
          password: hashedPassword,
        });
        setOpen(true);
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <main className="min-h-dvh bg-[url('/bg5.avif')] bg-center bg-cover bg-no-repeat">
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
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-gray-400 text-sm text-center">
              {step === 1
                ? "Enter your email and we will verify your account."
                : "Enter your new password below."}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-2xl text-center">
              {error}
            </div>
          )}

          {/* Step 1 — Email Verification */}
          {step === 1 && (
            <form
              onSubmit={emailFormik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${emailFormik.touched.email && emailFormik.errors.email ? "border-red-400" : "border-gray-200"}`}
                >
                  <LuMail className="text-gray-400 text-lg shrink-0" />
                  <input
                    type="email"
                    placeholder="Email address"
                    {...emailFormik.getFieldProps("email")}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
                {emailFormik.touched.email && emailFormik.errors.email && (
                  <p className="text-red-400 text-xs px-4">
                    {emailFormik.errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: Theme.primary }}
              >
                {loading ? (
                  <FiLoader className="text-lg animate-spin" />
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>
          )}

          {/* Step 2 — New Password */}
          {step === 2 && (
            <form
              onSubmit={passwordFormik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? "border-red-400" : "border-gray-200"}`}
                >
                  <LuMail className="text-gray-400 text-lg shrink-0" />
                  <input
                    type="password"
                    placeholder="New password"
                    {...passwordFormik.getFieldProps("newPassword")}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
                {passwordFormik.touched.newPassword &&
                  passwordFormik.errors.newPassword && (
                    <p className="text-red-400 text-xs px-4">
                      {passwordFormik.errors.newPassword}
                    </p>
                  )}
              </div>

              <div className="flex flex-col gap-1">
                <div
                  className={`flex items-center gap-3 border rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200 ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? "border-red-400" : "border-gray-200"}`}
                >
                  <LuMail className="text-gray-400 text-lg shrink-0" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    {...passwordFormik.getFieldProps("confirmPassword")}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
                {passwordFormik.touched.confirmPassword &&
                  passwordFormik.errors.confirmPassword && (
                    <p className="text-red-400 text-xs px-4">
                      {passwordFormik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: Theme.primary }}
              >
                {loading ? (
                  <FiLoader className="text-lg animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {/* Back to Sign In */}
          <p className="text-center text-sm text-gray-400">
            Remember your password?{" "}
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
            }}
          >
            PASSWORD RESET SUCCESSFULLY!
          </Typography>
          <p className="text-center text-gray-400 text-xs mt-2">
            You can now sign in with your new password.
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
