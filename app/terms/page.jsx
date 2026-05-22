import { Theme } from "../components/Theme";

export default function TermsOfService() {
  return (
    <main className="min-h-dvh bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: Theme.primary }}
          >
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm">Last updated: May 2026</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              By accessing and using LetGossip, you accept and agree to be bound
              by these Terms of Service. If you do not agree to these terms,
              please do not use our platform.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              2. User Accounts
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              You must create an account to use certain features of LetGossip.
              You are responsible for maintaining the security of your account
              and for all activities that occur under your account. You must
              provide accurate information when creating your account.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              3. Content Guidelines
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              You are responsible for all content you post on LetGossip. You
              agree not to post content that is illegal, harmful, threatening,
              abusive, harassing, defamatory, or otherwise objectionable. We
              reserve the right to remove content that violates these
              guidelines.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              4. Intellectual Property
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              You retain ownership of the content you post on LetGossip. By
              posting content, you grant us a non-exclusive license to display
              and distribute your content on our platform. You must not post
              content that infringes on the intellectual property rights of
              others.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              5. Prohibited Activities
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              You agree not to engage in any activity that interferes with or
              disrupts our platform, attempt to gain unauthorized access to any
              part of our platform, use our platform for any illegal purpose, or
              impersonate any person or entity.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">6. Termination</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We reserve the right to suspend or terminate your account at any
              time for violations of these Terms of Service. You may also delete
              your account at any time from your profile settings.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              LetGossip is provided on an as-is basis. We are not liable for any
              damages arising from your use of our platform. We do not guarantee
              that our platform will be available at all times or free from
              errors.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">
              8. Changes to Terms
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We may update these Terms of Service from time to time. We will
              notify you of any significant changes by posting the new terms on
              this page. Your continued use of LetGossip after changes
              constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-gray-800">9. Contact Us</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us through our Chat with Us page or email us at
              legal@letgossip.com.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
