import { Theme } from "../components/Theme";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LuMail, LuLock, LuUser } from "react-icons/lu";

export default function SignUp() {
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
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
              <LuUser className="text-gray-400 text-lg shrink-0" />
              <input
                type="text"
                placeholder="Full name"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

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
                placeholder="Create password"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
              <LuLock className="text-gray-400 text-lg shrink-0" />
              <input
                type="password"
                placeholder="Confirm password"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 px-1">
              <input
                type="checkbox"
                id="terms"
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

            {/* Sign Up Button */}
            <button
              className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: Theme.primary }}
            >
              Create Account
            </button>
          </div>

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
