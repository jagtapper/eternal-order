"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Wordmark } from "@/components/brand/Wordmark";
import { nav, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-5 md:px-6">
        <div className="pointer-events-auto flex h-16 w-full max-w-[1180px] items-center justify-between rounded-full border border-ivory/10 bg-ink/55 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-5">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] tracking-[0.04em] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    active ? "text-gold" : "text-ivory-dim hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <List
              size={22}
              weight="light"
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "scale-75 rotate-45 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <X
              size={22}
              weight="light"
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "scale-100 opacity-100" : "scale-75 -rotate-45 opacity-0"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[25] bg-ink/88 backdrop-blur-3xl transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="flex min-h-[100dvh] flex-col justify-end px-6 pb-16 pt-28"
          aria-label="Mobile"
        >
          {nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-t border-ivory/10 py-5 font-display text-4xl tracking-tight text-ivory transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
