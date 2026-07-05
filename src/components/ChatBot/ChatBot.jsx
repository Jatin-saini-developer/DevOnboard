/**
 * ChatBot.jsx — DevOnboard Assistant
 *
 * Architecture:
 *  ┌─────────────────────────────────────────────────┐
 *  │  <ChatBot />                                    │
 *  │  ├─ FAB trigger  (fixed bottom-right)           │
 *  │  └─ Chat window  (conditionally rendered)       │
 *  │     ├─ <ChatHeader />   logo + title + close    │
 *  │     ├─ <MessageList />  scrollable bubbles      │
 *  │     │   └─ <TypingIndicator /> (when loading)   │
 *  │     └─ <InputBar />     textarea + send btn     │
 *  └─────────────────────────────────────────────────┘
 *
 * ── How to connect your backend ─────────────────────────
 *  1. Set CHAT_API_URL to your real endpoint.
 *  2. Expected contract:
 *       POST /api/chat
 *       Body   : { "message": "user text here" }
 *       Returns: { "reply":   "bot response here" }
 */

import { useState, useRef, useEffect, useCallback } from "react";

/* ── Config ───────────────────────────────────────────── */
const CHAT_API_URL = "http://localhost:8000/api/chat";

const INITIAL_MESSAGES = [
  {
    id: "init-0",
    role: "bot",
    text: "Hi! Ask me anything about DevOnboard.",
  },
];

/* ═══════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════ */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1.5 self-start">
      <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/5 border border-white/[0.07]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.15}s` }}
            className="block w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce"
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ role, text }) {
  const isBot = role === "bot";
  return (
    <div
      className={`flex flex-col max-w-[86%] ${isBot ? "self-start" : "self-end"}`}
      style={{ animation: "fadeSlideUp 0.25s ease forwards" }}
    >
      <div
        className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed break-words ${
          isBot
            ? "bg-white/[0.05] border border-white/[0.07] text-neutral-300 rounded-2xl rounded-tl-sm"
            : "bg-white/[0.1] border border-white/[0.12] text-white rounded-2xl rounded-tr-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function MessageList({ messages, isTyping, listRef }) {
  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-2.5"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} text={msg.text} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}

function ChatHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
          </svg>
        </div>
        <div>
          <p className="text-[13.5px] font-semibold text-neutral-100 tracking-tight">
            DevOnboard Assistant
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-white/35">Online</span>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close chat"
        className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors duration-150"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function InputBar({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] flex-shrink-0">
      <textarea
        id="cb-input"
        rows={1}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask about DevOnboard..."
        aria-label="Type your message"
        className="flex-1 resize-none bg-white/[0.04] border border-white/[0.08]
                   rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-neutral-200
                   placeholder:text-white/25 outline-none h-10 min-h-[40px] max-h-24
                   focus:border-white/[0.18] focus:bg-white/[0.06]
                   transition-colors duration-200 font-[inherit] leading-snug
                   disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ scrollbarWidth: "thin" }}
      />
      <button
        id="cb-send-btn"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="w-9 h-9 rounded-[9px] bg-white/[0.08] border border-white/[0.1]
                   flex items-center justify-center flex-shrink-0
                   text-white/50 hover:text-white hover:bg-white/[0.14]
                   hover:border-white/[0.18] hover:-translate-y-px
                   active:translate-y-0
                   disabled:opacity-35 disabled:cursor-not-allowed
                   transition-all duration-150"
      >
        <svg className="w-4 h-4 translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main ChatBot component
═══════════════════════════════════════════════════════ */
export default function ChatBot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [input, setInput]         = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const [error, setError]         = useState(null);

  const listRef = useRef(null);

  /* Auto-scroll to bottom */
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const openChat  = () => { setIsClosing(false); setIsOpen(true); };
  const closeChat = () => {
    setIsClosing(true);
    setTimeout(() => { setIsOpen(false); setIsClosing(false); }, 200);
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    setIsTyping(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      const botMsg = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: data.reply ?? "Sorry, I did not get that.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("[ChatBot] error:", err);
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping]);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes chatOpen {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes chatClose {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.88) translateY(12px); }
        }
        .cb-enter { animation: chatOpen  0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .cb-leave { animation: chatClose 0.2s ease-in forwards; }
      `}</style>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="DevOnboard Assistant chat window"
          className={`
            fixed bottom-24 right-7 z-[9998]
            w-[360px]
            max-h-[520px]
            flex flex-col
            bg-[rgba(14,14,14,0.97)] backdrop-blur-xl
            border border-white/[0.07]
            rounded-[18px]
            overflow-hidden
            shadow-[0_24px_64px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03)]
            ${isClosing ? "cb-leave" : "cb-enter"}
          `}
        >
          <ChatHeader onClose={closeChat} />
          <MessageList messages={messages} isTyping={isTyping} listRef={listRef} />
          {error && (
            <p className="text-[11.5px] text-red-400/70 text-center px-4 pb-1">
              {error}
            </p>
          )}
          <InputBar
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSend={sendMessage}
            disabled={isTyping}
          />
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="cb-trigger-btn"
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        className="
          fixed bottom-7 right-7 z-[9999]
          w-[54px] h-[54px] rounded-full
          bg-[rgba(18,18,18,0.95)] backdrop-blur-md
          border border-white/[0.1]
          shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]
          flex items-center justify-center
          text-white/70 hover:text-white
          hover:scale-105 hover:border-white/20
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)]
          active:scale-95
          transition-all duration-200
        "
      >
        {/* X icon when open */}
        <span className={`absolute transition-all duration-200 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>

        {/* Chat icon when closed */}
        <span className={`absolute transition-all duration-200 ${isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
          </svg>
        </span>

        {/* Green pulse dot (only when closed) */}
        {!isOpen && (
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}
      </button>
    </>
  );
}
