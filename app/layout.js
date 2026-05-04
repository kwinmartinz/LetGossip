import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

export const metadata = {
  title: "LetGossip | Express Yourself",
  description: "A blogging platform where your voice finds a home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.className}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
