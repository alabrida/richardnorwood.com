'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import { useWMSStore } from '@/lib/wms/WindowManager';
import { getApp } from '@/lib/apps/registry';
import { playSound } from '@/lib/apps/helpers';
import styles from './AIM.module.css';

interface ChatMessage {
  sender: string;
  text: string;
  time: string;
  self: boolean;
}

const BUDDIES = [
  {
    group: 'Revenue Team',
    members: [
      { name: 'Richard Norwood', status: 'online' as const, action: 'calendly' },
      { name: 'Strategy Bot', status: 'online' as const, action: 'chat' },
    ],
  },
  {
    group: 'Resources',
    members: [
      { name: 'Blog', status: 'online' as const, action: 'ie' },
      { name: 'FAQ', status: 'online' as const, action: 'help' },
      { name: 'Services', status: 'away' as const, action: 'none' },
    ],
  },
];

const BOT_RESPONSES = [
  "Great question! Based on your Revenue Journey stage, I'd recommend focusing on your acquisition funnel first. What's your current conversion rate?",
  "That's a common challenge at Stage 2. Have you tried implementing an automated follow-up sequence? Most businesses see a 40% improvement in 30 days.",
  "I'd suggest running the Revenue Journey Assessment (open Calculator from the desktop) to get a precise diagnosis. It takes less than 2 minutes.",
  "Absolutely. The 90-Day Partnership is designed exactly for that. Book a strategy call with Richard to discuss your specific situation.",
  "Let me think about that... Your best next move is to map your customer journey end-to-end. The leaks are usually in the transitions between stages.",
];

export default function AIMBuddyList({ onTitleChange }: AppProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(BUDDIES.map((b) => b.group))
  );
  const [chatWith, setChatWith] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const openWindow = useWMSStore((s) => s.openWindow);

  const toggleGroup = useCallback((group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }, []);

  const handleBuddyClick = useCallback(
    (name: string, action: string) => {
      if (action === 'ie') {
        const app = getApp('internet-explorer');
        if (app) openWindow(app);
        return;
      }
      if (action === 'help') {
        // Stage 2: will open Help Center when built
        return;
      }
      if (action === 'calendly' || action === 'chat') {
        playSound('door-open');
        setChatWith(name);
        setMessages([
          {
            sender: name,
            text:
              action === 'calendly'
                ? "Hey! 👋 Ready to book a strategy call? Visit calendly.com/richardnorwood or just tell me what you're working on."
                : "Hi there! I'm the Revenue Strategy Bot. Ask me anything about revenue optimization, the 5-Stage Revenue Journey, or our services.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            self: false,
          },
        ]);
        onTitleChange?.(`${name} - Instant Message`);
      }
    },
    [openWindow, onTitleChange]
  );

  const handleSend = useCallback(() => {
    if (!input.trim() || !chatWith) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { sender: 'You', text: input, time: now, self: true };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Bot response after delay
    setTimeout(() => {
      let response: string;

      if (chatWith === 'Richard Norwood') {
        // Calendly-style: direct booking link
        const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2IUrfLBntA3iUYdPVHGDJwltQwjr4Pm03h7dCEVJvwgzMW-fvCTU-2tN-y81X-N4R0DxXqDr0V?gv=true';
        const calendarResponses = [
          `Great to connect! Let's get you on the calendar. Book your strategy call here:\n\n📅 ${calendarUrl}`,
          `I'd love to dig into that with you. Pick a time that works:\n\n📅 ${calendarUrl}`,
          `That sounds like an architecture problem — exactly what I solve. Let's talk:\n\n📅 ${calendarUrl}`,
        ];
        response = calendarResponses[Math.floor(Math.random() * calendarResponses.length)];
      } else {
        // Strategy Bot: scripted conversation tree
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('revenue') || lowerInput.includes('growth')) {
          response = "Revenue leaks come from 5 stages: Awareness → Acquisition → Activation → Revenue → Retention. Most businesses have 2-3 disconnected stages. Run the Calculator (desktop icon) to find yours.";
        } else if (lowerInput.includes('service') || lowerInput.includes('partnership') || lowerInput.includes('pricing')) {
          response = "We offer a structured 90-Day Partnership in three phases: Phase I (Commercial EKG), Phase II (MNS Orchestration), and Phase III (Sovereign Engine). Open Internet Explorer from the desktop to read more.";
        } else if (lowerInput.includes('assessment') || lowerInput.includes('calculator') || lowerInput.includes('ekg')) {
          response = "The Commercial EKG is a 250+ point diagnostic. For a quick preview, try the Calculator app on the desktop — it's a 5-question prequalifier that maps your Revenue Journey stage.";
        } else if (lowerInput.includes('book') || lowerInput.includes('call') || lowerInput.includes('schedule') || lowerInput.includes('meet')) {
          response = "You can book a strategy call with Richard directly! Double-click 'Richard Norwood' in the buddy list to get his calendar link.";
        } else {
          response = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: chatWith,
          text: response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          self: false,
        },
      ]);
    }, 1200);
  }, [input, chatWith]);

  const backToList = useCallback(() => {
    playSound('door-close');
    setChatWith(null);
    setMessages([]);
    onTitleChange?.('AIM Buddy List');
  }, [onTitleChange]);

  // ── Chat View ──
  if (chatWith) {
    return (
      <div className={styles.chat}>
        <div className={styles.chatHeader}>
          <span onClick={backToList} style={{ cursor: 'pointer' }}>← </span>
          {chatWith}
        </div>
        <div className={styles.chatMessages}>
          {messages.map((msg, i) => (
            <div key={i} className={styles.chatMsg}>
              <span className={`${styles.chatSender} ${msg.self ? styles.self : styles.other}`}>
                {msg.sender}
              </span>
              <span className={styles.chatTime}>({msg.time})</span>
              <div className={styles.chatText}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className={styles.chatInputArea}>
          <input
            className={styles.chatInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            autoFocus
          />
          <button className={styles.chatSendBtn} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    );
  }

  // ── Buddy List View ──
  return (
    <div className={styles.aim}>
      <div className={styles.header}>
        <span className={styles.headerLogo}>💬</span>
        <span className={styles.screenName}>RevenueArchitect</span>
      </div>

      <div className={styles.buddyList}>
        {BUDDIES.map((group) => (
          <div key={group.group}>
            <button
              className={styles.groupHeader}
              onClick={() => toggleGroup(group.group)}
            >
              <span
                className={`${styles.groupArrow} ${
                  expandedGroups.has(group.group) ? styles.expanded : ''
                }`}
              >
                ▶
              </span>
              {group.group} ({group.members.filter((m) => m.status === 'online').length}/
              {group.members.length})
            </button>

            {expandedGroups.has(group.group) &&
              group.members.map((buddy) => (
                <button
                  key={buddy.name}
                  className={styles.buddyItem}
                  onDoubleClick={() => handleBuddyClick(buddy.name, buddy.action)}
                >
                  <span className={`${styles.statusDot} ${styles[buddy.status]}`} />
                  <span
                    className={`${styles.buddyName} ${
                      buddy.status === 'online' ? styles.bold : ''
                    }`}
                  >
                    {buddy.name}
                  </span>
                </button>
              ))}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.footerBtn}>Away Message</button>
        <button className={styles.footerBtn}>Setup</button>
      </div>
    </div>
  );
}

export const aimConfig: AppConfig = {
  id: 'aim',
  title: 'Partnership Ecosystem',
  icon: '/icons/icons/aim.png',
  defaultSize: { width: 220, height: 400 },
  minSize: { width: 180, height: 300 },
  component: AIMBuddyList,
};
