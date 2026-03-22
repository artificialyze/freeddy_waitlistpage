import Link from "next/link";
import styles from "./legal.module.css";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.legalRoot}>
      <header className={styles.legalHeader}>
        <Link href="/" className={styles.legalLogo}>Freeddy</Link>
        <Link href="/" className={styles.legalBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to homepage
        </Link>
      </header>
      <main className={styles.legalMain}>{children}</main>
      <footer className={styles.legalFooter}>
        <p>© 2026 Freeddy. All rights reserved.</p>
        <div className={styles.legalFooterLinks}>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/refunds">Refunds</Link>
        </div>
      </footer>
    </div>
  );
}
