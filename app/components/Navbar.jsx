"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

export default function Navbar() {
  const { data: session } = useSession();
  const [navOpen, setNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Explore", url: "/explore" },
    { label: "Trending", url: "/trending" },
    { label: "Write", url: "/write" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-[#7C3AED] sticky top-0 z-50 shadow-md">
      {/* Main Row */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
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

        {/* Nav Links — desktop only */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop session check — Avatar + dropdown */}
          <span className="max-md:hidden">
            {session ? (
              <div>
                <button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="flex items-center"
                >
                  <Avatar
                    alt={session?.user?.name}
                    src={session?.user?.image}
                  />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{ list: { "aria-labelledby": "basic-button" } }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href={"/profile"}>My Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href={"/write"}>Write Post</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href={"/drafts"}>My Drafts</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <button className="bg-red-500 w-full text-white m-0 py-1 px-4 rounded-md">
                      Logout
                    </button>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link
                className="flex items-center gap-2 bg-white text-[#7C3AED] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#F59E0B] hover:text-white transition-all duration-200"
                href={"/signin"}
              >
                Sign In <LuUserRound className="text-lg" />
              </Link>
            )}
          </span>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden text-2xl text-white"
          >
            {navOpen ? (
              <IoMdClose className="text-white" />
            ) : (
              <RiMenu3Fill className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu — clean links only, no Avatar, no dropdown */}
      {navOpen && (
        <div className="md:hidden bg-white flex flex-col items-center gap-6 py-8 border-t border-gray-200">
          {/* Nav Links */}
          {navLinks.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              onClick={() => setNavOpen(false)}
              className="text-[#7C3AED] text-lg px-6 py-2 rounded-full border border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:text-white transition-all duration-200 w-48 text-center"
            >
              {item.label}
            </Link>
          ))}

          {/* Session Links */}
          {session ? (
            <>
              <Link
                href="/profile"
                onClick={() => setNavOpen(false)}
                className="text-[#7C3AED] text-lg px-6 py-2 rounded-full border border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:text-white transition-all duration-200 w-48 text-center"
              >
                My Profile
              </Link>
              <Link
                href="/write"
                onClick={() => setNavOpen(false)}
                className="text-[#7C3AED] text-lg px-6 py-2 rounded-full border border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:text-white transition-all duration-200 w-48 text-center"
              >
                Write Post
              </Link>
              <Link
                href="/drafts"
                onClick={() => setNavOpen(false)}
                className="text-[#7C3AED] text-lg px-6 py-2 rounded-full border border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:text-white transition-all duration-200 w-48 text-center"
              >
                My Drafts
              </Link>
              <button
                onClick={() => {
                  setNavOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="bg-red-500 text-white text-lg px-6 py-2 rounded-full hover:opacity-90 transition-all duration-200 w-48"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href={"/signin"}
              onClick={() => setNavOpen(false)}
              className="flex items-center gap-2 bg-[#7C3AED] text-white text-lg px-6 py-2 rounded-full hover:bg-[#F59E0B] transition-all duration-200"
            >
              Sign In <LuUserRound className="text-2xl" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
