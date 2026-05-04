"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navLinks = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Explore",
      url: "/explore",
    },
    {
      label: "Trending",
      url: "/trending",
    },
    {
      label: "Write",
      url: "/write",
    },
  ];

  return (
    <main className="flex items-center justify-between px-6 py-3 shadow-md bg-[#7C3AED] sticky top-0 z-50">
      {/* Left — Nav Links (desktop) */}
      <div className="flex items-center gap-4 max-md:hidden">
        {navLinks.map((item, i) => (
          <Link
            key={i}
            className="text-white text-sm px-4 py-2 rounded-full border border-white/30 hover:bg-white hover:text-[#7C3AED] transition-all duration-200"
            href={item.url}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Center — Logo */}
      <Link
        href={"/"}
        className="flex items-center gap-2 z-50 absolute left-1/2 -translate-x-1/2"
      >
        <Image
          src={"/logo.png.png"}
          alt="logo"
          width={500}
          height={500}
          className="w-11 h-11 rounded-full bg-white border-2 border-[#F59E0B] p-1"
        />
        <span>
          <p className="font-bold text-white">
            Let<span className="text-[#F59E0B]">Gossip</span>
          </p>
          <p className="text-xs text-white/60">Express Yourself</p>
        </span>
      </Link>

      {/* Right — Sign In Button (desktop) */}
      <Link
        className="max-md:hidden flex items-center gap-2 bg-white text-[#7C3AED] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#F59E0B] hover:text-white transition-all duration-200"
        href={"/signin"}
      >
        Sign In <LuUserRound className="text-lg" />
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="md:hidden z-50 text-2xl"
      >
        {navOpen ? <IoMdClose /> : <RiMenu3Fill />}
      </button>

      {/* Mobile Navbar */}
      <div
        className={`md:hidden bg-[#7C3AED] h-dvh w-full absolute top-0 left-0 ${navOpen ? "flex" : "hidden"} flex-col items-center gap-10 pt-20`}
      >
        {navLinks.map((item, i) => (
          <Link
            key={i}
            className="text-white text-lg px-6 py-2 rounded-full border border-white/30 hover:bg-white hover:text-[#7C3AED] transition-all duration-200"
            href={item.url}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href={"/signin"}
          className="flex items-center gap-2 bg-white text-[#7C3AED] text-lg px-6 py-2 rounded-full"
        >
          Sign In <LuUserRound className="text-2xl" />
        </Link>
      </div>
    </main>
  );
}
