export const metadata = {
  title: "Privacy Policy — Freeddy",
  description: "How Freeddy collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="meta">
        Effective Date: 22 March 2026 &nbsp;·&nbsp; Jurisdiction: India &nbsp;·&nbsp; Compliant with: IT Act 2000, DPDP Act 2023
      </p>

      <div className="highlight">
        <strong>Plain English Summary:</strong> We collect only the data we need to run Freeddy. We do not sell your data. We use reputable third parties (Supabase, Stripe) to store and process it securely. You have the right to access, correct, and delete your data at any time.
      </div>

      <h2>1. Who We Are</h2>
      <p>
        Freeddy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the operator of the platform accessible at freeddy.online. Our registered mailing address is 380 G/1, South Behala Road, Near Natore Colony, Behala, Kolkata — 700061, West Bengal, India. For any privacy-related queries, contact us at <a href="mailto:inquiries@freeddy.online">inquiries@freeddy.online</a>.
      </p>

      <h2>2. What Data We Collect</h2>
      <h3>2.1 Data You Provide Directly</h3>
      <ul>
        <li><strong>Account Data:</strong> Full name, email address, password (hashed), business name, and country/timezone when you register.</li>
        <li><strong>Profile Data:</strong> Profile photo, bio, hourly rate, skills, and portfolio links you choose to add.</li>
        <li><strong>Billing Data:</strong> Subscription plan and billing cycle. Payment card details are processed and stored by our payment processor (Stripe/Razorpay) and are never stored on our servers.</li>
        <li><strong>Communications:</strong> Messages, proposals, contracts, and files you send or receive through the Freeddy chat portal.</li>
        <li><strong>Support Data:</strong> Any information you voluntarily provide when contacting our support team.</li>
        <li><strong>Waitlist Data:</strong> Name and email address submitted through our pre-launch waitlist form.</li>
      </ul>

      <h3>2.2 Data Collected Automatically</h3>
      <ul>
        <li><strong>Usage Data:</strong> Pages visited, features used, session duration, clickstream data, and the actions taken within the platform.</li>
        <li><strong>Device & Log Data:</strong> IP address, browser type and version, operating system, device identifiers, referral URL, and access timestamps.</li>
        <li><strong>Cookies and Similar Technologies:</strong> Session cookies (essential for authentication), preference cookies, and analytics identifiers. See Section 8 for more detail.</li>
      </ul>

      <h3>2.3 Data From Third Parties</h3>
      <p>If you connect a third-party service (e.g., Google for authentication), we receive the basic profile data authorised by that service&apos;s OAuth flow. We only store what is necessary.</p>

      <h2>3. How We Use Your Data</h2>
      <p>We process your data for the following purposes, relying on the following lawful bases:</p>
      <ul>
        <li><strong>Performance of Contract:</strong> To provide, maintain, and improve the Service, process payments, deliver features, and manage your account.</li>
        <li><strong>Legitimate Interests:</strong> To detect and prevent fraud and abuse, to understand how users interact with the Service, and to improve security.</li>
        <li><strong>Consent:</strong> To send you marketing communications, product updates, and waitlist notifications, where you have opted in. You may withdraw consent at any time.</li>
        <li><strong>Legal Obligation:</strong> To comply with applicable laws, regulations, court orders, and lawful requests from government authorities.</li>
      </ul>

      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell, rent, or trade your personal data. We may share your data with:</p>
      <ul>
        <li><strong>Service Providers:</strong> Supabase (database and authentication), Stripe / Razorpay (payment processing), Resend / SendGrid (transactional email), Ably (real-time messaging), and Vercel (hosting). These providers act as data processors under contractual data processing agreements.</li>
        <li><strong>Legal Compliance:</strong> When required to do so by law, regulation, judicial process, or lawful government request.</li>
        <li><strong>Business Transfer:</strong> In connection with a merger, acquisition, or sale of all or substantially all of our assets. You will be notified via email in advance.</li>
        <li><strong>Your Clients:</strong> Data within the client portal (messages, documents, payment details) is shared with the specific client you designate on the platform. You control this sharing entirely.</li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We retain your personal data for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it longer for legal, accounting, or fraud-prevention purposes (typically not exceeding 7 years under Indian law).
      </p>
      <p>Waitlist data is retained until the platform launches or until you request deletion, whichever comes first.</p>

      <h2>6. Data Security</h2>
      <p>
        We implement industry-standard security measures, including TLS encryption in transit, AES-256 encryption at rest (via Supabase), Role-Based Access Control (RBAC), and regular security audits. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
      </p>
      <p>In the event of a data breach that is likely to prejudicially affect you, we will notify you and the relevant authorities as required by the Digital Personal Data Protection Act, 2023 (DPDP Act), and the Information Technology Act, 2000.</p>

      <h2>7. Your Rights</h2>
      <p>Under the DPDP Act, 2023 and applicable law, you have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Right of Access:</strong> To obtain confirmation of whether we process your data and to receive a copy of the data we hold about you.</li>
        <li><strong>Right to Correction:</strong> To have inaccurate or incomplete personal data corrected.</li>
        <li><strong>Right to Erasure:</strong> To have your personal data deleted (subject to legal retention obligations).</li>
        <li><strong>Right to Grievance Redressal:</strong> To raise a complaint about our data processing practices with our designated grievance officer.</li>
        <li><strong>Right to Nominate:</strong> To nominate another individual to exercise your data rights in the event of your death or incapacity.</li>
      </ul>
      <p>To exercise any of these rights, email us at <a href="mailto:inquiries@freeddy.online">inquiries@freeddy.online</a> with the subject line &ldquo;Privacy Rights Request&rdquo;. We will respond within 30 days.</p>

      <h2>8. Cookies</h2>
      <p>We use the following types of cookies:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for authentication and session management. These cannot be disabled without breaking core functionality.</li>
        <li><strong>Analytics Cookies:</strong> Used to understand usage patterns. We use privacy-respecting analytics. You may opt out at any time.</li>
        <li><strong>Preference Cookies:</strong> Remember your settings (e.g., theme, language). Optional.</li>
      </ul>
      <p>Most browsers allow you to control cookies through their settings. Blocking essential cookies may impair the Service.</p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        The Service is not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal data, please contact us immediately and we will delete it promptly.
      </p>

      <h2>10. International Data Transfers</h2>
      <p>
        Your data may be processed by our service providers outside of India (e.g., Supabase may store data in the US or EU, Vercel may route data through global edge nodes). By using the Service, you consent to such transfers. We ensure that our sub-processors maintain adequate data protection standards consistent with Indian law.
      </p>

      <h2>11. Grievance Officer</h2>
      <p>
        In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, we have designated the following Grievance Officer for privacy-related complaints:
      </p>
      <ul>
        <li><strong>Name:</strong> To be designated upon company formation</li>
        <li><strong>Email:</strong> <a href="mailto:inquiries@freeddy.online">inquiries@freeddy.online</a></li>
        <li><strong>Address:</strong> 380 G/1, South Behala Road, Near Natore Colony, Behala, Kolkata — 700061, West Bengal, India</li>
        <li><strong>Response Time:</strong> Within 30 days of receiving the complaint</li>
      </ul>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. We will notify you of material changes via email at least 14 days before the change takes effect. The &ldquo;Effective Date&rdquo; at the top of this policy indicates when it was last revised.
      </p>

      <hr />
      <p style={{ fontSize: "0.75rem", color: "#bbb" }}>
        Last updated: 22 March 2026. This policy is drafted in compliance with the Information Technology Act, 2000; the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011; and the Digital Personal Data Protection Act, 2023 (India).
      </p>
    </>
  );
}
