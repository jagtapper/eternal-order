"use client";

// Sitewide Yuga Signal offer, modeled on the Paradigm exit message.
// Desktop: opens when the pointer leaves through the top edge (after 1.5 s,
// cooldown after dismiss). Mobile: a floating button slides in once the
// visitor has read a quarter of the page; tapping it opens the same card.

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { GROKBOT_LINK, YUGA_TEMPLATE_LINK } from "@/lib/yuga-links";

const INITIAL_DELAY = 1500;
const DESKTOP_COOLDOWN = 2500;
const SCROLL_DEPTH = 0.25;

export function YugaSignalOffer() {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cooldownUntil = useRef(0);
  const startedAt = useRef(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const show = useCallback(() => {
    if (Date.now() - startedAt.current < INITIAL_DELAY) return;
    if (Date.now() < cooldownUntil.current) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    cooldownUntil.current = Date.now() + DESKTOP_COOLDOWN;
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    startedAt.current = Date.now();
    const mobile = !!window.matchMedia?.("(hover: none)").matches;
    setIsMobile(mobile);

    if (mobile) {
      let maxY = window.scrollY;
      const onScroll = () => {
        maxY = Math.max(maxY, window.scrollY);
        const range = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        if (maxY / range >= SCROLL_DEPTH) setShowButton(true);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (typeof e.clientY === "number" && e.clientY > 12) return;
      show();
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("yuga-offer-open");
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;
      const items = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>("a[href], button"),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("yuga-offer-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const templateHref = YUGA_TEMPLATE_LINK || "/education#yuga-signal";
  const templateExternal = !!YUGA_TEMPLATE_LINK;

  return (
    <>
      {isMobile && showButton && !open ? (
        <button
          type="button"
          onClick={() => {
            startedAt.current = 0;
            cooldownUntil.current = 0;
            show();
          }}
          className="yuga-offer-fab whitespace-nowrap fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-gold/60 bg-ink/90 px-5 py-3 font-display text-[15px] text-gold shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          Get your free Yuga Signal bot
        </button>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="yuga-offer-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
        >
          <div
            ref={cardRef}
            className="relative w-full max-w-[460px] rounded-[1.75rem] border border-gold/30 bg-surface px-6 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.6)] md:px-8 md:py-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-stone transition-colors hover:text-ivory"
            >
              <X size={18} weight="light" />
            </button>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Before you go
            </p>
            <h2
              id="yuga-offer-title"
              className="mt-3 font-display text-2xl leading-tight tracking-[-0.02em] text-ivory md:text-3xl"
            >
              Let a bot bring you Yuga Signal
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ivory-dim">
              Every new post, rewritten for what you care about and delivered
              each week. No site to check, nothing to search.
            </p>
            <ol className="mt-6 space-y-3">
              <li>
                <a
                  ref={firstLink}
                  href={GROKBOT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-gold px-5 py-3.5 text-ink transition-colors duration-300 hover:bg-ivory"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                      Step 1
                    </span>
                    <span className="font-display text-[16px]">
                      Start your free Grok Bot trial
                    </span>
                  </span>
                  <ArrowUpRight size={18} weight="regular" />
                </a>
              </li>
              <li>
                <a
                  href={templateHref}
                  {...(templateExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={templateExternal ? undefined : close}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-gold/50 px-5 py-3.5 text-ivory transition-colors duration-300 hover:border-ivory"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                      Step 2
                    </span>
                    <span className="font-display text-[16px]">
                      Add the Yuga Signal bot template
                    </span>
                  </span>
                  <ArrowUpRight size={18} weight="light" className="text-gold" />
                </a>
              </li>
            </ol>
            <button
              type="button"
              onClick={close}
              className="mt-5 w-full text-center text-[13px] text-stone transition-colors hover:text-ivory"
            >
              Not now
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
