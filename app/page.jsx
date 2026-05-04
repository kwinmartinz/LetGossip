import { Theme } from "./components/Theme";
import Link from "next/link";
import { FaPenNib, FaFire, FaUsers } from "react-icons/fa";
import { FaUserPlus, FaPen, FaShareNodes } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-dvh bg-[url('/bg3.webp')] bg-center bg-cover bg-no-repeat">
        <div className="min-h-dvh bg-black/50 flex flex-col items-center justify-center px-4">
          <div className="text-white w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Your Stories.{" "}
              <span style={{ color: Theme.secondary }} className="italic">
                Your Voice.
              </span>
              <br />
              <span className="text-white text-2xl sm:text-4xl lg:text-5xl mt-2 block">
                Welcome to LetGossip.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 max-w-2xl">
              The boldest thoughts deserve the best platform. Write freely, read
              widely, and connect with people who actually get you. No filters.
              No limits. Just real talk, the LetGossip way. Whether you are
              sharing life lessons, hot takes, or untold stories, this is your
              stage. Every post is a conversation waiting to happen and yours
              could be next.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link
                href={"/write"}
                style={{ backgroundColor: Theme.primary }}
                className="text-base sm:text-xl px-8 sm:px-10 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              >
                Start Writing
              </Link>
              <Link
                href={"/explore"}
                style={{ backgroundColor: Theme.secondary }}
                className="text-base sm:text-xl px-8 sm:px-10 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
              >
                Explore Posts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why LetGossip Section */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: Theme.primary }}
          >
            Why LetGossip?
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-10 sm:mb-14">
            A platform built for people with something real to say.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-md border border-gray-100">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: Theme.primary }}
              >
                <FaPenNib />
              </div>
              <h3 className="text-xl font-bold">Write Freely</h3>
              <p className="text-gray-500 text-sm text-center">
                Express your thoughts, opinions, and stories without limits.
                Your voice matters here.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-md border border-gray-100">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: Theme.secondary }}
              >
                <FaFire />
              </div>
              <h3 className="text-xl font-bold">Trending Stories</h3>
              <p className="text-gray-500 text-sm text-center">
                Discover the hottest posts from writers around the world. Stay
                in the loop always.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-md border border-gray-100">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: Theme.primary }}
              >
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold">Connect & Grow</h3>
              <p className="text-gray-500 text-sm text-center">
                Follow writers you love, get followers, and build a community
                around your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ backgroundColor: "#faf5ff" }}
      >
        <div className="w-full max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: Theme.primary }}
          >
            How It Works
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-10 sm:mb-14">
            Get started in three simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg"
                style={{ backgroundColor: Theme.primary }}
              >
                <FaUserPlus />
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: Theme.secondary }}
              >
                1
              </div>
              <h3 className="text-xl font-bold">Create an Account</h3>
              <p className="text-gray-500 text-sm text-center">
                Sign up for free in seconds. No complicated forms, just your
                name, email, and password.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg"
                style={{ backgroundColor: Theme.primary }}
              >
                <FaPen />
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: Theme.secondary }}
              >
                2
              </div>
              <h3 className="text-xl font-bold">Write Your Post</h3>
              <p className="text-gray-500 text-sm text-center">
                Use our clean editor to write anything; opinions, stories, tips,
                reviews. Your words, your way.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg"
                style={{ backgroundColor: Theme.primary }}
              >
                <FaShareNodes />
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: Theme.secondary }}
              >
                3
              </div>
              <h3 className="text-xl font-bold">Connect with Readers</h3>
              <p className="text-gray-500 text-sm text-center">
                Publish and watch your story reach readers worldwide. Get likes,
                comments, and followers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 text-white"
        style={{ backgroundColor: Theme.primary }}
      >
        <div className="w-full max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            LetGossip by the Numbers
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-10 sm:mb-14">
            A growing community of bold voices from around the world.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-4xl sm:text-5xl font-black"
                style={{ color: Theme.secondary }}
              >
                10K+
              </p>
              <p className="text-white/70 text-sm">Active Writers</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p
                className="text-4xl sm:text-5xl font-black"
                style={{ color: Theme.secondary }}
              >
                50K+
              </p>
              <p className="text-white/70 text-sm">Posts Published</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p
                className="text-4xl sm:text-5xl font-black"
                style={{ color: Theme.secondary }}
              >
                120+
              </p>
              <p className="text-white/70 text-sm">Countries Reached</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p
                className="text-4xl sm:text-5xl font-black"
                style={{ color: Theme.secondary }}
              >
                1M+
              </p>
              <p className="text-white/70 text-sm">Monthly Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-center">
        <h2
          className="text-3xl sm:text-4xl font-black mb-4"
          style={{ color: Theme.primary }}
        >
          Ready to share your story?
        </h2>
        <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Join thousands of writers already on LetGossip. It's free, it's fun,
          it's yours.
        </p>
        <Link
          href={"/signup"}
          style={{ backgroundColor: Theme.secondary }}
          className="text-base sm:text-xl px-10 sm:px-12 py-3 sm:py-4 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
