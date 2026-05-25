"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";

export default function Navbar() {
  const { data: session } = useSession();
  const [navOpen, setNavOpen] = useState(false);

  // Separated anchor states to keep desktop and mobile contexts completely distinct
  const [desktopAnchorEl, setDesktopAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const desktopOpen = Boolean(desktopAnchorEl);
  const mobileOpen = Boolean(mobileAnchorEl);

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Explore", url: "/explore" },
    { label: "Trending", url: "/trending" },
    { label: "Write", url: "/write" },
  ];

  const handleDesktopClick = (event) => {
    setDesktopAnchorEl(event.currentTarget);
  };

  const handleDesktopClose = () => {
    setDesktopAnchorEl(null);
  };

  const handleMobileClick = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileClose = () => {
    setMobileAnchorEl(null);
  };

  const handleLogout = async () => {
    handleDesktopClose();
    handleMobileClose();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-[#7C3AED] sticky top-0 z-50 shadow-md">
      {/* Main Row */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo — Left on all screens */}
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
          {/* Desktop — session check */}
          <span className="max-md:hidden">
            {session ? (
              <div>
                <button
                  id="basic-button"
                  aria-controls={desktopOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={desktopOpen ? "true" : undefined}
                  onClick={handleDesktopClick}
                  className="flex items-center"
                >
                  <Avatar
                    alt={session?.user?.name}
                    src={session?.user?.image}
                  />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={desktopAnchorEl}
                  open={desktopOpen}
                  onClose={handleDesktopClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handleDesktopClose}>
                    <Link href={"/profile"}>My Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleDesktopClose}>
                    <Link href={"/write"}>Write Post</Link>
                  </MenuItem>
                  <MenuItem onClick={handleDesktopClose}>
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

      {/* Mobile Menu — drops below navbar */}
      {navOpen && (
        <div className="md:hidden bg-white flex flex-col items-center gap-8 py-8 border-t border-gray-200">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              onClick={() => setNavOpen(false)}
              className="text-[#7C3AED] text-lg px-6 py-2 rounded-full border border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:text-white transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile — session check */}
          {session ? (
            <div>
              <button
                id="mobile-button"
                aria-controls={mobileOpen ? "mobile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={mobileOpen ? "true" : undefined}
                onClick={handleMobileClick}
                className="flex items-center"
              >
                <Avatar alt={session?.user?.name} src={session?.user?.image} />
              </button>
              <Menu
                id="mobile-menu"
                anchorEl={mobileAnchorEl}
                open={mobileOpen}
                onClose={handleMobileClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "mobile-button",
                  },
                }}
              >
                <MenuItem onClick={handleMobileClose}>
                  <Link onClick={() => setNavOpen(false)} href={"/profile"}>
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMobileClose}>
                  <Link onClick={() => setNavOpen(false)} href={"/write"}>
                    Write Post
                  </Link>
                </MenuItem>
                {/* Fixed: Added missing drafts screen link mapping explicitly for mobile view layouts */}
                <MenuItem onClick={handleMobileClose}>
                  <Link onClick={() => setNavOpen(false)} href={"/drafts"}>
                    My Drafts
                  </Link>
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
              href={"/signin"}
              onClick={() => setNavOpen(false)}
              className="flex items-center gap-2 bg-[#7C3AED] text-white text-lg px-6 py-2 rounded-full hover:bg-[#F59E0B] hover:text-white transition-all duration-200"
            >
              Sign In <LuUserRound className="text-2xl" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
