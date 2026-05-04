import { Theme } from "../components/Theme";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LuMail, LuLock } from "react-icons/lu";

export default function SignIn() {
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
              Welcome Back!
            </h1>
            <p className="text-gray-400 text-sm text-center">
              Sign in to continue sharing your stories on LetGossip.
            </p>
          </div>

          {/* Google Sign In */}
          <button className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <p className="text-gray-400 text-xs">or sign in with email</p>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
              <LuMail className="text-gray-400 text-lg shrink-0" />
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
              <LuLock className="text-gray-400 text-lg shrink-0" />
              <input
                type="password"
                placeholder="Password"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href={"/forgot-password"}
                className="text-xs hover:underline transition-all duration-200"
                style={{ color: Theme.primary }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="font-semibold hover:underline"
              style={{ color: Theme.secondary }}
            >
              Sign Up Free
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
