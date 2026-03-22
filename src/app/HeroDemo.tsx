"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./HeroDemo.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "dashboard" | "crm" | "chat";
type LeadStatus = "new" | "discovery" | "proposal" | "won" | "lost";

interface Lead {
  id: number;
  name: string;
  company: string;
  value: number;
  status: LeadStatus;
  tag: "hot" | "warm" | "cold";
  time: string;
}

interface Message {
  id: number;
  from: "freelancer" | "client";
  text: string;
  type?: "text" | "proposal" | "system";
  proposalState?: "pending" | "signed" | "paid";
  amount?: number;
  time: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const initialLeads: Lead[] = [
  { id: 1, name: "Sarah Chen", company: "Nexus Digital", value: 12000, status: "new", tag: "hot", time: "2m ago" },
  { id: 2, name: "Marcus Webb", company: "Apex Ventures", value: 8500, status: "new", tag: "warm", time: "1h ago" },
  { id: 3, name: "Priya Sharma", company: "Growth Labs", value: 22000, status: "discovery", tag: "hot", time: "3h ago" },
  { id: 4, name: "James Okafor", company: "BlueSky SaaS", value: 5500, status: "proposal", tag: "warm", time: "1d ago" },
  { id: 5, name: "Lena Fischer", company: "Pinnacle Co.", value: 18000, status: "won", tag: "hot", time: "2d ago" },
];

const initialMessages: Message[] = [
  { id: 1, from: "client", text: "Hey! I reviewed the initial scope. Love the direction. When can we kick off?", type: "text", time: "9:14 AM" },
  { id: 2, from: "freelancer", text: "Great to hear! I've put together the official proposal. You can review, sign, and pay the deposit right here.", type: "text", time: "9:16 AM" },
  { id: 3, from: "freelancer", text: "", type: "proposal", proposalState: "pending", amount: 15000, time: "9:16 AM" },
];

const METRIC_TARGETS = { mrr: 12450, clients: 8, invoices: 3, earned: 34200 };

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [metrics, setMetrics] = useState({ mrr: 0, clients: 0, invoices: 0, earned: 0 });
  const [draggedLead, setDraggedLead] = useState<number | null>(null);
  const [dragOverCol, setDragOverCol] = useState<LeadStatus | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeChartBar, setActiveChartBar] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animate metrics on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setMetrics({
        mrr: Math.round(METRIC_TARGETS.mrr * ease),
        clients: Math.round(METRIC_TARGETS.clients * ease),
        invoices: Math.round(METRIC_TARGETS.invoices * ease),
        earned: Math.round(METRIC_TARGETS.earned * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "freelancer",
      text: chatInput,
      type: "text",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    setMessages((m) => [...m, newMsg]);
    setChatInput("");
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((m) => [
          ...m,
          {
            id: Date.now(),
            from: "client",
            text: "That's exactly what I needed — thanks!",
            type: "text",
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
          },
        ]);
      }, 2000);
    }, 800);
  };

  const handleProposalAction = (msgId: number, action: "signed" | "paid") => {
    setMessages((msgs) =>
      msgs.map((m) => {
        if (m.id !== msgId) return m;
        const newState = action;
        return { ...m, proposalState: newState };
      })
    );
    if (action === "signed") {
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            id: Date.now(),
            from: "client",
            text: "",
            type: "system",
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
          } as Message,
        ]);
      }, 400);
      showNotification("Contract signed by client — awaiting deposit payment.");
    }
    if (action === "paid") {
      setMessages((msgs) => msgs.map((m) => m.id === msgId ? { ...m, proposalState: "paid" } : m));
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            id: Date.now(),
            from: "client",
            text: "Done. Excited to get started!",
            type: "text",
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
          },
        ]);
      }, 400);
      showNotification("Payment of $7,500 received via Stripe. Deposit secured!");
      setMetrics((m) => ({ ...m, mrr: m.mrr + 625, earned: m.earned + 7500 }));
    }
  };

  const moveLeadForward = (leadId: number) => {
    const stages: LeadStatus[] = ["new", "discovery", "proposal", "won"];
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        const idx = stages.indexOf(l.status);
        const nextStatus = stages[Math.min(idx + 1, stages.length - 1)];
        if (nextStatus === "won") {
          showNotification(`${l.name} moved to Won. Revenue of $${l.value.toLocaleString()} logged!`);
          setMetrics((m) => ({ ...m, clients: m.clients + 1, earned: m.earned + l.value }));
        } else {
          showNotification(`${l.name} moved to ${nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}.`);
        }
        return { ...l, status: nextStatus };
      })
    );
  };

  const columns: { id: LeadStatus; label: string }[] = [
    { id: "new", label: "New Lead" },
    { id: "discovery", label: "Discovery" },
    { id: "proposal", label: "Proposal" },
    { id: "won", label: "Won" },
  ];

  const chartData = [35, 52, 44, 78, 61, 88, 72, 95, 83, 100, 91, 100];
  const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className={styles.demoRoot}>
      {/* Notification Toast */}
      {notification && (
        <div className={styles.toast}>
          <span className={styles.toastDot}></span>
          {notification}
        </div>
      )}

      {/* ── APP FRAME ── */}
      <div className={styles.frame}>
        {/* Window chrome */}
        <div className={styles.windowBar}>
          <div className={styles.trafficLights}>
            <div className={styles.dot} data-color="red"></div>
            <div className={styles.dot} data-color="yellow"></div>
            <div className={styles.dot} data-color="green"></div>
          </div>
          <div className={styles.windowTitle}>Freeddy · Workspace</div>
          <div className={styles.windowStatus}>
            <span className={styles.liveIndicator}></span> Live
          </div>
        </div>

        {/* App layout */}
        <div className={styles.appLayout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarBrand}>
              <div className={styles.brandMark}>F</div>
            </div>
            <nav className={styles.sidebarNav}>
              {[
                { id: "dashboard" as Tab, label: "Overview", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  )},
                { id: "crm" as Tab, label: "CRM", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  )},
                { id: "chat" as Tab, label: "Chat Portal", icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  )},
              ].map((item) => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ""}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className={styles.sidebarFooter}>
              <div className={styles.avatarBubble}>JD</div>
            </div>
          </aside>

          {/* Main content */}
          <main className={styles.main}>
            {/* ── DASHBOARD VIEW ── */}
            {activeTab === "dashboard" && (
              <div className={styles.view}>
                <div className={styles.viewHeader}>
                  <div>
                    <h2 className={styles.viewTitle}>Good morning, Jordan.</h2>
                    <p className={styles.viewSubtitle}>Here's your business at a glance.</p>
                  </div>
                  <button className={styles.btnOutline} onClick={() => setActiveTab("crm")}>
                    View Pipeline
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>

                <div className={styles.metricsGrid}>
                  {[
                    { label: "Monthly MRR", value: `$${metrics.mrr.toLocaleString()}`, delta: "+18%", up: true },
                    { label: "Active Clients", value: metrics.clients.toString(), delta: "+2 this month", up: true },
                    { label: "Open Invoices", value: metrics.invoices.toString(), delta: "$12,000 pending", up: false },
                    { label: "Total Earned", value: `$${metrics.earned.toLocaleString()}`, delta: "+34% YoY", up: true },
                  ].map((m, i) => (
                    <div className={styles.metricCard} key={i}>
                      <span className={styles.metricCardLabel}>{m.label}</span>
                      <span className={styles.metricCardValue}>{m.value}</span>
                      <span className={`${styles.metricDelta} ${m.up ? styles.up : styles.down}`}>{m.delta}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.chartSection}>
                  <div className={styles.chartHeader}>
                    <span className={styles.chartTitle}>MRR Growth</span>
                    <span className={styles.chartPeriod}>Last 12 months</span>
                  </div>
                  <div className={styles.chartArea}>
                    {chartData.map((val, i) => (
                      <div
                        key={i}
                        className={`${styles.bar} ${activeChartBar === i ? styles.barActive : ""}`}
                        style={{ height: `${val}%` }}
                        onMouseEnter={() => setActiveChartBar(i)}
                        onMouseLeave={() => setActiveChartBar(null)}
                      >
                        {activeChartBar === i && (
                          <div className={styles.barTooltip}>${Math.round(val * 124.5).toLocaleString()}</div>
                        )}
                        <div className={styles.barMonth}>{chartMonths[i]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.recentLeads}>
                  <div className={styles.sectionHeaderRow}>
                    <span className={styles.sectionLabel}>Recent Leads</span>
                    <button className={styles.btnLink} onClick={() => setActiveTab("crm")}>View All</button>
                  </div>
                  <div className={styles.leadList}>
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className={styles.leadRow} onClick={() => { setSelectedLead(lead); setActiveTab("crm"); }}>
                        <div className={styles.leadAvatar}>{lead.name.charAt(0)}</div>
                        <div className={styles.leadInfo}>
                          <span className={styles.leadName}>{lead.name}</span>
                          <span className={styles.leadCompany}>{lead.company}</span>
                        </div>
                        <div className={styles.leadMeta}>
                          <span className={`${styles.leadTag} ${styles[lead.tag]}`}>{lead.tag.toUpperCase()}</span>
                          <span className={styles.leadValue}>${lead.value.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── CRM VIEW ── */}
            {activeTab === "crm" && (
              <div className={styles.view}>
                <div className={styles.viewHeader}>
                  <div>
                    <h2 className={styles.viewTitle}>CRM Pipeline</h2>
                    <p className={styles.viewSubtitle}>{leads.length} leads · ${leads.reduce((s, l) => s + l.value, 0).toLocaleString()} total pipeline</p>
                  </div>
                  <button className={styles.btnPrimary} onClick={() => {
                    const newLead: Lead = {
                      id: Date.now(),
                      name: "New Prospect",
                      company: "Inbound",
                      value: Math.floor(Math.random() * 15000) + 3000,
                      status: "new",
                      tag: "warm",
                      time: "Just now",
                    };
                    setLeads(prev => [newLead, ...prev]);
                    showNotification("New lead added to pipeline.");
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Lead
                  </button>
                </div>

                <div className={styles.kanban}>
                  {columns.map((col) => (
                    <div
                      key={col.id}
                      className={`${styles.kanbanCol} ${dragOverCol === col.id ? styles.kanbanColOver : ""}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
                      onDragLeave={() => setDragOverCol(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedLead !== null) {
                          const lead = leads.find(l => l.id === draggedLead);
                          if (lead) {
                            setLeads(p => p.map(l => l.id === draggedLead ? { ...l, status: col.id } : l));
                            if (col.id === "won") {
                              showNotification(`${lead.name} WON! $${lead.value.toLocaleString()} logged.`);
                              setMetrics(m => ({ ...m, earned: m.earned + lead.value }));
                            }
                          }
                        }
                        setDraggedLead(null);
                        setDragOverCol(null);
                      }}
                    >
                      <div className={styles.kanbanColHeader}>
                        <span className={styles.kanbanColTitle}>{col.label}</span>
                        <span className={styles.kanbanCount}>{leads.filter(l => l.status === col.id).length}</span>
                      </div>
                      <div className={styles.kanbanCards}>
                        {leads.filter((l) => l.status === col.id).map((lead) => (
                          <div
                            key={lead.id}
                            className={`${styles.kanbanCard} ${selectedLead?.id === lead.id ? styles.kanbanCardSelected : ""} ${draggedLead === lead.id ? styles.kanbanCardDragging : ""}`}
                            draggable
                            onDragStart={() => setDraggedLead(lead.id)}
                            onDragEnd={() => setDraggedLead(null)}
                            onClick={() => setSelectedLead(lead)}
                          >
                            <div className={styles.kanbanCardTop}>
                              <span className={`${styles.tagBadge} ${styles[lead.tag]}`}>{lead.tag.toUpperCase()}</span>
                              <span className={styles.kanbanCardTime}>{lead.time}</span>
                            </div>
                            <div className={styles.kanbanCardName}>{lead.name}</div>
                            <div className={styles.kanbanCardCompany}>{lead.company}</div>
                            <div className={styles.kanbanCardFooter}>
                              <span className={styles.kanbanCardValue}>${lead.value.toLocaleString()}</span>
                              {col.id !== "won" && col.id !== "lost" && (
                                <button
                                  className={styles.btnForward}
                                  onClick={(e) => { e.stopPropagation(); moveLeadForward(lead.id); }}
                                >
                                  Advance
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
                                </button>
                              )}
                              {col.id === "won" && (
                                <span className={styles.wonBadge}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                  Won
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        {leads.filter(l => l.status === col.id).length === 0 && (
                          <div className={styles.emptyCol}>Drop here</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedLead && (
                  <div className={styles.leadDetail}>
                    <div className={styles.leadDetailHeader}>
                      <div className={styles.leadDetailAvatar}>{selectedLead.name.charAt(0)}</div>
                      <div>
                        <div className={styles.leadDetailName}>{selectedLead.name}</div>
                        <div className={styles.leadDetailCompany}>{selectedLead.company}</div>
                      </div>
                      <button className={styles.btnClose} onClick={() => setSelectedLead(null)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                    <div className={styles.leadDetailBody}>
                      <div className={styles.leadDetailStat}>
                        <span>Value</span><strong>${selectedLead.value.toLocaleString()}</strong>
                      </div>
                      <div className={styles.leadDetailStat}>
                        <span>Stage</span><strong style={{ textTransform: "capitalize" }}>{selectedLead.status}</strong>
                      </div>
                      <div className={styles.leadDetailStat}>
                        <span>Signal</span><strong style={{ textTransform: "capitalize", color: selectedLead.tag === "hot" ? "#ef4444" : selectedLead.tag === "warm" ? "#f97316" : "#3b82f6" }}>{selectedLead.tag}</strong>
                      </div>
                    </div>
                    <div className={styles.leadDetailActions}>
                      <button className={styles.btnPrimary} onClick={() => { setActiveTab("chat"); setSelectedLead(null); }}>
                        Open Chat Portal
                      </button>
                      <button className={styles.btnOutline} onClick={() => { moveLeadForward(selectedLead.id); setSelectedLead(null); }}>
                        Advance Stage
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── CHAT VIEW ── */}
            {activeTab === "chat" && (
              <div className={styles.view} style={{ display: "flex", flexDirection: "column", height: "100%", padding: 0 }}>
                <div className={styles.chatLayout}>
                  {/* Chat list sidebar */}
                  <div className={styles.chatSidebar}>
                    <div className={styles.chatSidebarHeader}>
                      <span className={styles.chatSidebarTitle}>Conversations</span>
                      <button className={styles.btnIconSmall}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    </div>
                    {[
                      { name: "Priya Sharma", project: "Brand Identity", unread: 1, online: true },
                      { name: "Sarah Chen", project: "Web Redesign", unread: 0, online: false },
                      { name: "Marcus Webb", project: "Content Strategy", unread: 3, online: true },
                    ].map((c, i) => (
                      <div key={i} className={`${styles.chatListItem} ${i === 0 ? styles.chatListItemActive : ""}`}>
                        <div className={styles.chatListAvatar}>
                          {c.name.charAt(0)}
                          {c.online && <span className={styles.onlineDot}></span>}
                        </div>
                        <div className={styles.chatListInfo}>
                          <span className={styles.chatListName}>{c.name}</span>
                          <span className={styles.chatListProject}>{c.project}</span>
                        </div>
                        {c.unread > 0 && <span className={styles.unreadBadge}>{c.unread}</span>}
                      </div>
                    ))}
                  </div>

                  {/* Chat main */}
                  <div className={styles.chatMain}>
                    <div className={styles.chatMainHeader}>
                      <div className={styles.chatMainProfile}>
                        <div className={styles.chatMainAvatar}>P</div>
                        <div>
                          <div className={styles.chatMainName}>Priya Sharma</div>
                          <div className={styles.chatMainStatus}><span className={styles.onlineIndicator}></span> Online · Brand Identity</div>
                        </div>
                      </div>
                      <div className={styles.chatMainActions}>
                        <button className={styles.btnIconSmall} title="Call">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.91-1.91a2 2 0 0 1 2.11-.45c.92.27 1.86.44 2.81.5A2 2 0 0 1 21.66 15z"/></svg>
                        </button>
                        <button className={styles.btnIconSmall} title="Files">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        </button>
                      </div>
                    </div>

                    <div className={styles.chatMessages}>
                      {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.msgWrapper} ${msg.from === "freelancer" ? styles.msgRight : styles.msgLeft}`}>
                          {msg.type === "text" && (
                            <div className={`${styles.bubble} ${msg.from === "freelancer" ? styles.bubbleOwn : styles.bubbleOther}`}>
                              {msg.text}
                              <span className={styles.bubbleTime}>{msg.time}</span>
                            </div>
                          )}
                          {msg.type === "proposal" && (
                            <div className={styles.proposalCard}>
                              <div className={styles.proposalHeader}>
                                <div>
                                  <div className={styles.proposalLabel}>ACTIVE PROPOSAL</div>
                                  <div className={styles.proposalAmount}>${msg.amount?.toLocaleString()}.00</div>
                                  <div className={styles.proposalSub}>50% deposit on signing · Remaining on delivery</div>
                                </div>
                                <div className={`${styles.proposalStateIcon} ${styles[msg.proposalState!]}`}>
                                  {msg.proposalState === "pending" && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                  )}
                                  {msg.proposalState === "signed" && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                                  )}
                                  {msg.proposalState === "paid" && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                  )}
                                </div>
                              </div>
                              <div className={styles.proposalActions}>
                                {msg.proposalState === "pending" && (
                                  <>
                                    <button className={styles.btnProposalSecondary}>View Full Terms</button>
                                    <button className={styles.btnProposalPrimary} onClick={() => handleProposalAction(msg.id, "signed")}>
                                      Sign Contract
                                    </button>
                                  </>
                                )}
                                {msg.proposalState === "signed" && (
                                  <>
                                    <div className={styles.signedConfirmation}>
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                      Signed
                                    </div>
                                    <button className={styles.btnProposalPrimary} onClick={() => handleProposalAction(msg.id, "paid")}>
                                      Pay $7,500 Deposit
                                    </button>
                                  </>
                                )}
                                {msg.proposalState === "paid" && (
                                  <div className={styles.paidConfirmation}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                    $7,500 received · Project active
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {msg.type === "system" && (
                            <div className={styles.systemMsg}>Contract co-signed · Milestone 1 begins now</div>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className={`${styles.msgWrapper} ${styles.msgLeft}`}>
                          <div className={styles.typingIndicator}>
                            <span></span><span></span><span></span>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className={styles.chatInputBar}>
                      <div className={styles.chatInputRow}>
                        <div className={styles.quickActions}>
                          <button className={styles.quickAction} title="Send Proposal" onClick={() => { showNotification("Open proposal builder..."); }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            Proposal
                          </button>
                          <button className={styles.quickAction} title="Send Invoice" onClick={() => { showNotification("Invoice builder coming soon..."); }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                            Invoice
                          </button>
                          <button className={styles.quickAction} title="Attach File" onClick={() => { showNotification("File attachment coming soon..."); }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                            Attach
                          </button>
                        </div>
                        <div className={styles.inputWrapper}>
                          <input
                            ref={inputRef}
                            type="text"
                            className={styles.chatInput}
                            placeholder="Write a message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          />
                          <button
                            className={`${styles.sendBtn} ${chatInput.trim() ? styles.sendBtnActive : ""}`}
                            onClick={handleSendMessage}
                            disabled={!chatInput.trim()}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
