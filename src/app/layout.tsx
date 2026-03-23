import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
