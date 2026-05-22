"use client";
import { useState } from "react";
import { Theme } from "../components/Theme";
import { FiSend, FiLoader, FiMail, FiMapPin, FiClock } from "react-icons/fi";

export default function ContactSupport() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
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
      setSubject("");
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
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: Theme.primary }}
          >
            Contact Support
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            We are here to help. Reach out to our support team and we will
            respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: Theme.primary }}
              >
                <FiMail />
              </div>
              <h3 className="font-black text-gray-800">Email Us</h3>
              <p className="text-gray-400 text-sm">support@letgossip.com</p>
              <p className="text-gray-400 text-sm">legal@letgossip.com</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: Theme.secondary }}
              >
                <FiClock />
              </div>
              <h3 className="font-black text-gray-800">Response Time</h3>
              <p className="text-gray-400 text-sm">
                We typically respond within 24 hours on business days.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: Theme.primary }}
              >
                <FiMapPin />
              </div>
              <h3 className="font-black text-gray-800">Based In</h3>
              <p className="text-gray-400 text-sm">Nigeria 🇳🇬</p>
              <p className="text-gray-400 text-sm">Serving users worldwide.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">
            <h2 className="text-lg font-black text-gray-800">
              Send a Support Request
            </h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: Theme.primary }}
                >
                  ✓
                </div>
                <p className="font-bold text-gray-800">Request Submitted!</p>
                <p className="text-gray-400 text-sm">
                  Our support team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all duration-200 mt-2"
                  style={{ backgroundColor: Theme.primary }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-2xl">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C3AED] transition-all duration-200 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="account">Account Issues</option>
                    <option value="post">Post or Content Issues</option>
                    <option value="billing">Billing or Payments</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={6}
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
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
