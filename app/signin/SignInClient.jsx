"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LuMail, LuLock } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { app } from "@/config/firebase";

export default function SignInClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Firebase sign in success:", user.email);

        // Create NextAuth session
        const result = await signIn("credentials", {
          email: user.email,
          password: password,
          redirect: false,
        });

        console.log("NextAuth result:", result);

        if (result?.ok) {
          window.location.href = "/";
        } else {
          setError(
            "Signed in to Firebase but session failed. Please try again.",
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Firebase error:", error.code);
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setError("No account found with this email. Please sign up.");
        } else if (errorCode === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (errorCode === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (errorCode === "auth/invalid-credential") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
      });
  };

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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-2xl text-center">
              {error}
            </div>
          )}

          {/* Google Sign In */}
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
            <p className="text-gray-400 text-xs">or sign in with email</p>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
              <LuMail className="text-gray-400 text-lg shrink-0" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-[#7C3AED] transition-all duration-200">
              <LuLock className="text-gray-400 text-lg shrink-0" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ backgroundColor: Theme.primary }}
            >
              {loading ? (
                <FiLoader className="text-lg animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

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
