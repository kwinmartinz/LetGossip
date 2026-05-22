import { Theme } from "./Theme";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <main
      style={{ backgroundColor: Theme.footerBg }}
      className="flex items-center justify-between px-10 py-3 max-lg:flex-col max-lg:gap-5 text-white"
    >
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-1">
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

      {/* Links */}
      <div className="flex items-center gap-8 text-sm max-md:flex-col">
        <Link
          href={"/chat"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          Chat with us
        </Link>
        <Link
          href={"/privacy"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          Privacy Policy
        </Link>
        <Link
          href={"/terms"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          Terms of Service
        </Link>
        <Link
          href={"/contact"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          Contact Support
        </Link>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-3 text-xl">
        <Link
          href={"#"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          <FaFacebook />
        </Link>
        <Link
          href={"#"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          <FaInstagram />
        </Link>
        <Link
          href={"#"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          <BsTwitterX />
        </Link>
        <Link
          href={"#"}
          className="hover:text-yellow-300 transition-all duration-200"
        >
          <FaLinkedin />
        </Link>
      </div>
    </main>
  );
}
