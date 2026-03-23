"use client";

import { useState } from "react";
import styles from "./Header.module.css";
import pageStyles from "./page.module.css";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            <div className={styles.left}>
              <div className={styles.logo}>Freeddy</div>
              <div className={styles.menu}>
                <div className={styles.menuItem}>
                  Product
                  <div className={styles.dropdown}>
                    <a href="#">Features</a>
                    <a href="#">Roadmap</a>
                  </div>
                </div>
                <div className={styles.menuItem}>
                  Solutions
                  <div className={styles.dropdown}>
                    <a href="#">For Designers</a>
                    <a href="#">For Developers</a>
                    <a href="#">For Agencies</a>
                    <a href="#">For Copywriters</a>
                    <a href="#">For Web Developers</a>
                    <a href="#">For Social Media Marketers</a>
                    <a href="#">For AI Automation Agency</a>
                  </div>
                </div>
                <div className={styles.menuItem}>
                  Compare
                  <div className={styles.dropdown}>
                    <a href="#">vs. Notion</a>
                    <a href="#">vs. HoneyBook</a>
                  </div>
                </div>
                <div className={styles.menuItem}>
                  Resources
                  <div className={styles.dropdown}>
                    <a href="#">Blog</a>
                    <a href="#">Manifesto</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <a href="#founding" className={styles.link}>Join Waitlist</a>
              <button 
                onClick={() => setShowModal(true)} 
                className={styles.enterBtn}
              >
                Enter App
              </button>
            </div>
          </nav>
        </div>
      </header>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
            <div className={styles.modalContent}>
              <span className={pageStyles.kicker}>APP IN BUILDING</span>
              <h2 className={styles.modalTitle}>Exclusivity is currently locked.</h2>
              <p className={styles.modalText}>
                Freeddy is currently in private beta and limited to our early adopters. 
                Full access will be unlocked to the **first 100 members** on a first-come, first-served basis.
              </p>
              
              <div className={styles.priceBox}>
                <div className={styles.priceItem}>
                    <span className={styles.priceLabel}>Regular Price</span>
                    <span className={styles.priceValueStrike}>$19/mo</span>
                </div>
                <div className={styles.priceItemActive}>
                    <span className={styles.priceLabel}>Founding Member Price</span>
                    <span className={styles.priceValue}>$9/mo</span>
                </div>
              </div>

              <p className={styles.modalSub}>
                Lock in your lifetime price before the threshold is reached. No exceptions.
              </p>
              
              <button 
                className={pageStyles.waitlistSubmit} 
                onClick={() => {
                  setShowModal(false);
                  window.location.hash = "founding";
                }}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Claim My Spot Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
