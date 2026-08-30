import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Subscribe } from "@/components/site/Subscribe";
import { nav } from "@/lib/site";

export function Footer() {
  return (
    <footer data-footer-parallax className="relative z-[1]">
      <Subscribe />
      <div className="border-t border-ivory/8 px-5 pb-12 pt-16 md:px-8">
        <div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Link href="/" className="inline-flex">
            <Wordmark size="footer" />
          </Link>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory-dim">
            Sanatan dharma as a philosophy and a way of life. Not a religion you
            join, and not an organization either. Read it, send it, argue with
            it.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone">
            Paths
          </p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ivory-dim transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone">
            Note
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Educational writing on an inherited way of living. Not conversion,
            not legal advice, not a campaign. No membership. No donation ask.
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
