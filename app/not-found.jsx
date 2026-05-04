import { Theme } from "./components/Theme";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center px-4 gap-6 text-center">
      <div
        className="text-8xl sm:text-9xl font-black"
        style={{ color: Theme.primary }}
      >
        404
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-md">
          Looks like this page took off without telling anyone. It might have
          been moved, deleted, or never existed in the first place.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="text-sm px-8 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
          style={{ backgroundColor: Theme.primary }}
        >
          Go Home
        </Link>
        <Link
          href="/explore"
          className="text-sm px-8 py-3 rounded-full border border-gray-200 text-gray-500 font-medium hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all duration-200"
        >
          Explore Posts
        </Link>
      </div>
    </main>
  );
}
