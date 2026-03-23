"use client";

import { useState } from "react";
import styles from "./page.module.css";
import HeroDemo from "./HeroDemo";

const WEBHOOK_URL = "https://hook.eu1.make.com/hgtsn7kxba1m8aaoy61xtd7qv1vhk9r3";

function WaitlistForm({ dark = false, variant = 'standard' }: { dark?: boolean, variant?: 'standard' | 'hero' }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          source: window.location.hostname,
          variant,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Waitlist error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={dark ? styles.waitlistSuccessDark : styles.waitlistSuccess}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>You&apos;re in. We&apos;ll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form className={dark ? styles.waitlistFormDark : styles.waitlistForm} onSubmit={handleSubmit}>
      <div className={dark ? styles.waitlistFieldRow : styles.waitlistRow}>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={dark ? styles.waitlistInputDark : styles.waitlistInput}
          required
        />
        <input
          type="email"
          placeholder="Work email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={dark ? styles.waitlistInputDark : styles.waitlistInput}
          required
        />
        <button 
          type="submit" 
          disabled={status === "loading"}
          className={dark ? styles.waitlistSubmitDark : styles.waitlistSubmit}
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
      {status === "error" && (
        <p className={styles.errorMessage}>Something went wrong. Please try again.</p>
      )}
      <p className={dark ? styles.waitlistMicrocopy : styles.heroMeta}>
        {dark 
          ? "No payment required now. We will contact you when the platform launches."
          : "JOIN THE FIRST 100 TO UNLOCK 50% LIFETIME PRIVILEGE"}
      </p>
    </form>
  );
}


const Icons = {
  Proposal: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Invoice: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  Deliverables: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Contract: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Feedback: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Leads: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Plus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
};

export default function Home() {
  return (
    <div className={styles.wrapper}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroBadgeBox}>
              <span className={styles.badge}>FOUNDING MEMBER ACCESS · $9/MO LIFETIME</span>
            </div>
            <h1 className={styles.heroTitle}>
              The <span className={styles.textHighlight}>Operating System</span><br />
              for Elite Freelancers.
            </h1>
            <p className={styles.heroSub}>
              Freeddy consolidates your fragmented workflow into a single, high-performance platform. 
              Manage high-value clients, negotiate deals, and deliver results with surgical precision.
            </p>
            <WaitlistForm variant="hero" />
          </div>
        </div>
        <div className={styles.heroBackground}>
          <div className={styles.gridOverlay}></div>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO ── */}
      <section className={styles.heroDemo}>
        <div className={styles.heroDemoLabel}>
          <span className={styles.kicker}>FULLY INTERACTIVE DEMO</span>
          <p className={styles.heroDemoSub}>Experience the workspace. Join the first 100 to unlock lifetime 50% discount.</p>
        </div>
        <HeroDemo />
      </section>

      {/* ── PROBLEM ── */}
      <section className={styles.problem}>
        <div className="container">
          <div className={styles.problemHeader}>
            <h2 className={styles.problemTitle}>
              You're managing chaos, not a business.
            </h2>
            <p className={styles.problemLead}>
              Fragmented tools dilute your authority and confuse your clients. It's time to professionalize your delivery.
            </p>
          </div>
          <div className={styles.problemGrid}>
            {[
              { icon: <Icons.Proposal />, title: "Scattered Proposals", desc: "Crucial documents buried in email threads that nobody can find when it matters." },
              { icon: <Icons.Invoice />, title: "Manual Invoicing", desc: "Chasing payments month after month instead of focusing on high-leverage work." },
              { icon: <Icons.Deliverables />, title: "Contextless Handoffs", desc: "Deliverables sent over random Drive links with zero professional presentation." },
              { icon: <Icons.Contract />, title: "Platform Fatigue", desc: "Contracts signed on external platforms that break the seamless client experience." },
              { icon: <Icons.Feedback />, title: "Ghosted Feedback", desc: "Crucial client revisions scattered across WhatsApp, Slack, and disjointed email chains." },
              { icon: <Icons.Leads />, title: "Lost Opportunities", desc: "High-quality leads gone cold because follow-up sequences fell through the cracks." }
            ].map((item, idx) => (
              <div className={styles.problemCard} key={idx}>
                <div className={styles.problemIconWrapper}>{item.icon}</div>
                <div className={styles.problemContent}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRM DEMO ── */}
      <section className={styles.demoSection}>
        <div className="container">
          <div className={styles.demoSplit}>
            <div className={styles.demoText}>
              <span className={styles.kicker}>CRM ENGINE</span>
              <h2 className={styles.sectionTitle}>Precision Client Management.</h2>
              <p className={styles.sectionLead}>
                A dynamic schema engine that molds to your operational needs. Track lifecycle stages, financial status, and custom data points in one command center.
              </p>
              <div className={styles.miniFeatureGrid}>
                <div className={styles.miniFeature}>
                  <div className={styles.miniIcon}><Icons.Plus /></div>
                  <div className={styles.miniContent}>
                    <h6>Custom Table Schemas</h6>
                    <p>Build segmented databases for cold outreach, VIP clients, or retainers.</p>
                  </div>
                </div>
                <div className={styles.miniFeature}>
                  <div className={styles.miniIcon}><Icons.Search /></div>
                  <div className={styles.miniContent}>
                    <h6>Advanced Search</h6>
                    <p>Fuzzy search across all tables for instant contact retrieval and history.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.demoVisual}>
              <div className={styles.mockPipelineBoard}>
                 <div className={styles.pipelineColumn}>
                   <div className={styles.pipelineHeader}>New Lead <span className={styles.count}>2</span></div>
                   <div className={styles.pipelineCard}>
                     <div className={styles.cardTop}>
                       <span className={styles.cardStatus} data-type="hot">Hot</span>
                       <span className={styles.cardDate}>2h ago</span>
                     </div>
                     <div className={styles.cardName}>Growth Sprints Inc.</div>
                     <div className={styles.cardBottom}>$5,000 · Outreach</div>
                   </div>
                   <div className={styles.pipelineCard}>
                     <div className={styles.cardTop}>
                       <span className={styles.cardStatus} data-type="warm">Warm</span>
                       <span className={styles.cardDate}>1d ago</span>
                     </div>
                     <div className={styles.cardName}>SaaS Launch Lab</div>
                     <div className={styles.cardBottom}>$12,000 · Referral</div>
                   </div>
                 </div>
                 <div className={styles.pipelineColumn}>
                   <div className={styles.pipelineHeader}>Discovery <span className={styles.count}>1</span></div>
                   <div className={styles.pipelineCard}>
                     <div className={styles.cardTop}>
                       <span className={styles.cardStatus} data-type="hot">Hot</span>
                       <span className={styles.cardDate}>10m ago</span>
                     </div>
                     <div className={styles.cardName}>Pinnacle Partners</div>
                     <div className={styles.cardBottom}>$8,500 · Strategy</div>
                   </div>
                 </div>
                 <div className={styles.pipelineColumn}>
                   <div className={styles.pipelineHeader}>Negotiating <span className={styles.count}>1</span></div>
                   <div className={styles.pipelineCard}>
                      <div className={styles.cardTop}>
                        <span className={styles.cardStatus} data-type="active">Proposal Sent</span>
                        <span className={styles.cardDate}>Just now</span>
                      </div>
                      <div className={styles.cardName}>Apex Creative</div>
                      <div className={styles.cardBottom}>$15,000 · Retainer</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE ENGINE (CHAT) ── */}
      <section className={styles.coreEngine}>
        <div className="container">
          <div className={styles.engineMetaGrid}>
            <div className={styles.engineText}>
              <span className={styles.kicker}>THE CORE EXPERIENCE</span>
              <h2 className={styles.sectionTitle}>The Chat Portal That Actually Runs Your Business.</h2>
              <p className={styles.sectionLead}>
                Forget fragmented communication. Freeddy's portal looks like an elegant messaging app but 
                operates as a full-scale professional automation engine.
              </p>
              <div className={styles.engineBulletGrid}>
                <div className={styles.bulletItem}>
                  <h5>Smart Proposals</h5>
                  <p>Send interactive quotes that allow for inline negotiation and version tracking.</p>
                </div>
                <div className={styles.bulletItem}>
                  <h5>One-Click Signatures</h5>
                  <p>Legally binding e-signatures handled entirely within the chat timeline.</p>
                </div>
                <div className={styles.bulletItem}>
                  <h5>Embedded Payments</h5>
                  <p>Invoices that settle instantly through Stripe/PayPal directly in the conversation.</p>
                </div>
                <div className={styles.bulletItem}>
                  <h5>Live Audit Trails</h5>
                  <p>Every scope change and milestone approval logged in a permanent, secure thread.</p>
                </div>
              </div>
            </div>
            <div className={styles.engineVisual}>
               <div className={styles.mockChatFrame}>
                 <div className={styles.chatHeader}>
                   <div className={styles.chatProfile}></div>
                   <div className={styles.chatInfo}>
                     <div className={styles.chatName}>Client Gateway (Jane Doe)</div>
                     <div className={styles.chatStatus}>Online</div>
                   </div>
                 </div>
                 <div className={styles.chatBody}>
                   <div className={styles.chatMsg} data-pos="left">Ready to move forward with Project Apex. Send over the final proposal?</div>
                   <div className={styles.chatActionCard}>
                      <div className={styles.actionType}>Active Proposal</div>
                      <div className={styles.actionVal}>$15,000.00 USD</div>
                      <div className={styles.actionButtons}>
                        <button className={styles.btnActionSecondary}>View Terms</button>
                        <button className={styles.btnActionMini}>Sign & Pay</button>
                      </div>
                   </div>
                   <div className={styles.chatMsg} data-pos="right">Just sent. You can sign and pay the deposit directly in this chat.</div>
                   <div className={styles.chatSystemMsg}>Contract signed by Jane Doe · 10:05 AM</div>
                   <div className={styles.chatSystemMsg} data-type="success">Payment of $7,500.00 received via Stripe</div>
                   <div className={styles.chatTyping}>
                     <div className={styles.dot}></div>
                     <div className={styles.dot}></div>
                     <div className={styles.dot}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCS DEMO ── */}
      <section className={styles.docsSection}>
        <div className="container">
          <div className={styles.demoSplit}>
             <div className={styles.demoVisual}>
               <div className={styles.mockEditorSuite}>
                 <div className={styles.editorToolbar}>
                   <div className={styles.toolbarGroup}>
                     <span className={styles.tool}>H1</span>
                     <span className={styles.tool}>H2</span>
                     <span className={styles.tool}>B</span>
                     <span className={styles.tool}>I</span>
                   </div>
                   <div className={styles.toolbarGroup}>
                     <span className={styles.tool}>Link</span>
                     <span className={styles.tool}>Image</span>
                   </div>
                 </div>
                 <div className={styles.editorCanvas}>
                   <div className={styles.docBreadcrumb}>Drive / Proposals / Project_Apex_v2.doc</div>
                   <h1 className={styles.docTitle}>Strategic Roadmap: Q3 Growth</h1>
                   <p className={styles.docText}>
                     This engagement covers the full-scale deployment of our primary growth architecture...
                   </p>
                   <div className={styles.docTableOfContents}>
                      <div className={styles.tocItem}>1. Executive Summary</div>
                      <div className={styles.tocItem}>2. Technical Requirements</div>
                      <div className={styles.tocItem} data-active="true">3. Investment & Timeline</div>
                   </div>
                   <div className={styles.docHighlightCard}>
                     <strong>Total Investment:</strong> $15,000.00
                   </div>
                 </div>
                 <div className={styles.editorCta}>
                   <button className={styles.btnActionMini}>Inject into Chat Portal</button>
                 </div>
               </div>
             </div>
             <div className={styles.demoText}>
                <span className={styles.kicker}>DOCUMENT SUITE</span>
                <h2 className={styles.sectionTitle}>Built-In Document Mastery.</h2>
                <p className={styles.sectionLead}>
                  A native rich-text engine for crafting high-impact proposals and contracts. No more external editors—create, store, and inject documents directly into your client conduits.
                </p>
                <div className={styles.metaStatGrid}>
                  <div className={styles.metaStat}>
                    <strong>∞</strong>
                    <p>Documents & Folders</p>
                  </div>
                  <div className={styles.metaStat}>
                    <strong>v1.2</strong>
                    <p>Live Versioning</p>
                  </div>
                  <div className={styles.metaStat}>
                    <strong>Secured</strong>
                    <p>Cloud Storage</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── INTERFACE OVERVIEW ── */}
      <section className={styles.dualInterface}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.kicker}>DUAL-PATH ARCHITECTURE</span>
            <h2 className={styles.sectionTitle}>Unified Perspectives. Infinite Potential.</h2>
            <p className={styles.sectionLeadCentered}>
              Freeddy partitions the complexity for you while maintaining absolute simplicity for your clients.
            </p>
          </div>
          
          <div className={styles.interfaceGrid}>
            <div className={styles.interfacePanel} data-variant="freelancer">
              <div className={styles.panelGlass}>
                <div className={styles.panelInfo}>
                  <span className={styles.panelTag}>THE OPERATING SYSTEM</span>
                  <h3>Command Center</h3>
                  <p>Track high-level metrics, manage lead quality, and execute complex workflows without cognitive load.</p>
                </div>
                <div className={styles.mockMiniDashboard}>
                  <div className={styles.miniSidebar}>
                    <div className={styles.miniLogo}></div>
                    <div className={styles.miniNavGroup}>
                      <div className={styles.miniNavItem} data-active="true"></div>
                      <div className={styles.miniNavItem}></div>
                      <div className={styles.miniNavItem}></div>
                    </div>
                  </div>
                  <div className={styles.miniMain}>
                    <div className={styles.miniHeader}>
                      <div className={styles.miniTitle}>Overview</div>
                    </div>
                    <div className={styles.miniMetricGrid}>
                      <div className={styles.miniMetric}>
                        <span className={styles.metricLabel}>Monthly MRR</span>
                        <span className={styles.metricValue}>$12,450</span>
                      </div>
                      <div className={styles.miniMetric}>
                        <span className={styles.metricLabel}>Active Clients</span>
                        <span className={styles.metricValue}>8</span>
                      </div>
                    </div>
                    <div className={styles.miniChart}>
                       <div className={styles.chartBar} style={{ height: '40%' }}></div>
                       <div className={styles.chartBar} style={{ height: '70%' }}></div>
                       <div className={styles.chartBar} style={{ height: '50%' }}></div>
                       <div className={styles.chartBar} style={{ height: '90%' }}></div>
                       <div className={styles.chartBar} style={{ height: '60%' }}></div>
                       <div className={styles.chartBar} style={{ height: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.interfacePanel} data-variant="client">
              <div className={styles.panelGlass}>
                <div className={styles.panelInfo}>
                  <span className={styles.panelTag}>THE PROJECT VAULT</span>
                  <h3>Client Gateway</h3>
                  <p>A frictionless, high-trust environment. No login hurdles—just a secure, branded gateway that puts everything in context.</p>
                </div>
                <div className={styles.mockClientPortal}>
                  <div className={styles.clientPortalHeader}>
                    <div className={styles.clientAvatar}></div>
                    <div className={styles.clientMetaBox}>
                      <div className={styles.clientName}>Acme Corp Rebrand</div>
                      <div className={styles.clientStatus}><span className={styles.statusDot}></span> On Track</div>
                    </div>
                  </div>
                  <div className={styles.clientPortalBody}>
                    <div className={styles.progressSection}>
                      <div className={styles.progressText}>
                        <span className={styles.phaseLabel}>Phase 2: Visual Identity</span>
                        <span className={styles.phasePct}>65%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{width: '65%'}}></div>
                      </div>
                    </div>
                    <div className={styles.deliverableList}>
                      <div className={styles.deliverableItem}>
                        <div className={styles.deliverableIcon}><Icons.Deliverables /></div>
                        <div className={styles.deliverableInfo}>
                          <span className={styles.deliverableName}>Brand_Assets_v1.zip</span>
                          <span className={styles.deliverableSize}>12.4 MB</span>
                        </div>
                        <button className={styles.btnActionSecondary} style={{padding: '0.2rem 0.6rem', fontSize: '0.65rem', margin: '0'}}>Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDING ACCESS ── */}
      <section className={styles.founding} id="founding">
        <div className="container">
          <div className={styles.foundingCard}>
            <div className={styles.foundingContent}>
              <span className={styles.kickerLight}>FOUNDING MEMBER ENROLLMENT</span>
              <h2 className={styles.foundingTitleLight}>Lock In Your Advantage.<br />Before the Market Does.</h2>
              <p className={styles.foundingLead}>
                Lock in our unique Founding Member rate of **$9/month** before we transition to our standard **$19/month** pricing. 
                The first 100 members secure this price for every feature and update — forever.
                This offer disappears the moment the threshold is reached. No exceptions.
              </p>
              <div className={styles.perksGrid}>
                <div className={styles.perk}>LIFETIME $9 PRICE LOCK</div>
                <div className={styles.perk}>DIRECT ROADMAP INFLUENCE</div>
                <div className={styles.perk}>FREE BETA ACCESS</div>
                <div className={styles.perk}>FOUNDING STATUS BADGE</div>
              </div>
              <WaitlistForm dark />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>Freeddy</div>
              <p className={styles.footerTagline}>The Operating System for Freelancers.</p>
              <div className={styles.footerContact}>
                <a href="mailto:inquiries@freeddy.online" className={styles.footerContactItem}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                  inquiries@freeddy.online
                </a>
                <div className={styles.footerContactItem}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  380 G/1, South Behala Road, Near Natore Colony,<br />Behala, Kolkata — 700061, West Bengal, India
                </div>
              </div>
            </div>
            <div className={styles.footerNavGroup}>
              <div className={styles.footerNavCol}>
                <span className={styles.footerNavTitle}>Product</span>
                <a href="#">Features</a>
                <a href="#">Roadmap</a>
                <a href="#founding">Pricing</a>
              </div>
              <div className={styles.footerNavCol}>
                <span className={styles.footerNavTitle}>Solutions</span>
                <a href="#">Designers</a>
                <a href="#">Developers</a>
                <a href="#">Agencies</a>
                <a href="#">Copywriters</a>
                <a href="#">Web Devs</a>
                <a href="#">Social Media</a>
                <a href="#">AI Automation</a>
              </div>
              <div className={styles.footerNavCol}>
                <span className={styles.footerNavTitle}>Legal</span>
                <a href="/legal/terms">Terms</a>
                <a href="/legal/privacy">Privacy</a>
                <a href="/legal/refunds">Refunds</a>
              </div>
              <div className={styles.footerNavCol}>
                <span className={styles.footerNavTitle}>Social</span>
                <a href="https://www.instagram.com/freeddy.crm/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com/profile.php?id=61584891273986" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://x.com/Saikat_slays" target="_blank" rel="noopener noreferrer">Twitter (CEO)</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 Freeddy. All rights reserved. Registered in India.</p>
            <div className={styles.footerLegal}>
              <a href="/legal/terms">Terms</a>
              <a href="/legal/privacy">Privacy</a>
              <a href="/legal/refunds">Refunds</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
