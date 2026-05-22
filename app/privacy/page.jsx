import { Theme } from "../components/Theme";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: Theme.primary }}
          >
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">Last updated: May 2026</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              1. Introduction
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Welcome to LetGossip. We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy
              explains how we collect, use, and share information about you when
              you use our platform.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              2. Information We Collect
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We collect information you provide directly to us when you create
              an account, such as your name, email address, and profile photo.
              We also collect content you post on the platform including blog
              posts, comments, and likes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We use the information we collect to provide, maintain, and
              improve our services, to personalize your experience, to
              communicate with you, and to ensure the safety and security of our
              platform.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We do not sell your personal information to third parties. We may
              share your information with service providers who assist us in
              operating our platform, subject to confidentiality agreements.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              5. Data Security
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We take reasonable measures to protect your personal information
              from unauthorized access, loss, or misuse. Your data is stored
              securely using Firebase, a Google service with industry-standard
              security practices.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">6. Your Rights</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              You have the right to access, correct, or delete your personal
              information at any time. You can update your profile information
              from your account settings or contact us to request deletion of
              your account.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">7. Cookies</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We use cookies and similar tracking technologies to improve your
              experience on our platform. You can control cookie settings
              through your browser preferences.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">8. Contact Us</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through our Chat with Us page or email us at
              privacy@letgossip.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
