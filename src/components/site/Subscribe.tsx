"use client";

import { FormEvent, useId, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

type Status = "idle" | "saving" | "done" | "error";
type Variant = "footer" | "hero";

const WEB3FORMS = "https://api.web3forms.com/submit";

export function Subscribe({ variant = "footer" }: { variant?: Variant }) {
  const uid = useId();
  const emailId = `subscribe-email-${uid}`;
  const companyId = `subscribe-company-${uid}`;
  const compact = variant === "hero";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const company = String(form.get("company") ?? "");
    const submittedEmail = String(form.get("email") ?? "");

    // Honeypot: bots fill hidden fields. Pretend it worked.
    if (company.trim()) {
      setStatus("done");
      setEmail("");
      setMessage("You are on the list. When the next pulse is ready, it will find you.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setMessage("Could not save it. Try again.");
      return;
    }

    try {
      const response = await fetch(WEB3FORMS, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          email: submittedEmail,
          subject: "Eternal Order: stay updated",
          from_name: "Eternal Order",
          message: "Weekly pulse signup. No membership.",
        }),
      });
      const data = (await response.json()) as { success?: boolean };

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage("Could not save it. Try again.");
        return;
      }

      setStatus("done");
      setEmail("");
      setMessage("You are on the list. When the next pulse is ready, it will find you.");
    } catch {
      setStatus("error");
      setMessage("Could not save it. Try again.");
    }
  }

  const form = (
    <>
      {status === "done" ? (
        <p
          role="status"
          className={
            compact
              ? "text-[14px] leading-relaxed text-ivory"
              : "mt-8 max-w-xl text-[15px] leading-relaxed text-ivory"
          }
        >
          {message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className={compact ? "w-full" : "mt-8 max-w-xl"}>
          <label
            htmlFor={emailId}
            className={
              compact
                ? "sr-only"
                : "block text-[13px] tracking-[0.04em] text-ivory"
            }
          >
            Email
          </label>
          <div
            className={
              compact
                ? "flex flex-col gap-2 sm:flex-row sm:items-stretch"
                : "mt-2 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            }
          >
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              placeholder="you@example.com"
              className={
                compact
                  ? "h-11 min-w-0 flex-1 rounded-full border border-ivory/14 bg-ink/70 px-5 text-[15px] text-ivory outline-none placeholder:text-ivory-dim/80 focus-visible:border-gold"
                  : "h-12 min-w-0 flex-1 rounded-full border border-ivory/14 bg-ink px-5 text-[15px] text-ivory outline-none placeholder:text-ivory-dim/80 focus-visible:border-gold"
              }
            />
            <div className="sr-only" aria-hidden="true">
              <label htmlFor={companyId}>Company</label>
              <input
                id={companyId}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={status === "saving"}
              className={`group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gold px-5 text-[13px] tracking-[0.04em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#e4a05a] active:scale-[0.98] disabled:opacity-60 ${
                compact ? "h-11" : "h-12"
              }`}
            >
              <span>{status === "saving" ? "Saving" : "Stay updated"}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10">
                <ArrowUpRight size={14} weight="light" />
              </span>
            </button>
          </div>
          {status === "error" ? (
            <p role="alert" className="mt-2 text-sm text-gold">
              {message}
            </p>
          ) : compact ? null : (
            <p className="mt-3 text-sm text-stone">
              One note when a new pulse is up. That is all.
            </p>
          )}
        </form>
      )}
    </>
  );

  if (compact) {
    return (
      <div
        data-hero-item
        className="hero-index rounded-[1.5rem] border border-ivory/10 bg-ink/62 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="shrink-0 md:max-w-[16rem]">
            <p className="font-display text-xl tracking-tight text-ivory md:text-2xl">
              Stay updated
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-ivory-dim">
              The weekly pulse. No membership.
            </p>
          </div>
          <div className="min-w-0 flex-1">{form}</div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-5 pb-4 pt-16 md:px-8 md:pt-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[1.75rem] border border-ivory/10 bg-surface px-5 py-8 md:px-10 md:py-10">
          <h2 className="font-display text-3xl tracking-[-0.03em] text-ivory md:text-4xl">
            Stay updated
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-dim">
            The weekly cohesion watch, when there is one. No membership. No
            list we sell.
          </p>
          {form}
        </div>
      </div>
    </section>
  );
}
