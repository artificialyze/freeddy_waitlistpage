import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freeddy — The OS for Freelancers",
  description: "Freeddy is the all-in-one freelancer platform: CRM, client gateway, real-time chat portal, proposals, e-signatures, payments, and deliverables — all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container">
            <nav>
              <div className="logo-text">Freeddy</div>
              <div className="auth-buttons">
                <a href="#founding" className="btn-secondary" id="nav-waitlist">Join Waitlist</a>
              </div>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
