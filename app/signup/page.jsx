"use client";
import { Theme } from "../components/Theme";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LuMail, LuLock, LuUser } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
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
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Connect to your database here later
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

          {/* Google Sign Up */}
          <button className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200">
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
              className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              Create Account
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
    </main>
  );
}
