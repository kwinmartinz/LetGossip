"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import { FiSend, FiLoader } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click Sign Up on the navbar, fill in your details and you are good to go!",
  },
  {
    question: "How do I publish a post?",
    answer:
      "Click Write on the navbar, fill in your title, category and content then click Publish.",
  },
  {
    question: "Can I delete my posts?",
    answer:
      "Yes! Go to your Profile page and click the delete icon on any of your posts.",
  },
  {
    question: "How do I save a draft?",
    answer:
      "On the Write page click Save Draft. You can find your drafts under My Drafts in the navbar menu.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "On the Sign In page click Forgot Password and follow the steps to reset it.",
  },
];

export default function ChatWithUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl"
            style={{ backgroundColor: Theme.primary }}
          >
            <BsChatDots />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: Theme.primary }}
          >
            Chat with Us
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Have a question or need help? Send us a message and we will get back
            to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
            <h2 className="text-lg font-black text-gray-800">Send a Message</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: Theme.primary }}
                >
                  ✓
                </div>
                <p className="font-bold text-gray-800">Message Sent!</p>
                <p className="text-gray-400 text-sm">
                  We have received your message and will get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200 mt-2"
                  style={{ backgroundColor: Theme.primary }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-2xl">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C3AED] transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C3AED] transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    rows={5}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C3AED] transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-medium text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: Theme.primary }}
                >
                  {sending ? (
                    <FiLoader className="animate-spin text-lg" />
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-gray-800">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <p className="text-sm font-bold text-gray-800">
                    {faq.question}
                  </p>
                  <span
                    className="text-lg font-black shrink-0 ml-2"
                    style={{ color: Theme.primary }}
                  >
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-500">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
