import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-start justify-end px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          Missing
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl tracking-[-0.035em] text-ivory md:text-7xl">
          This page is not in the archive.
        </h1>
        <div className="mt-10">
          <Button href="/">Return home</Button>
        </div>
      </div>
    </div>
  );
}
