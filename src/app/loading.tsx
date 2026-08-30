export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-end px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="h-px w-32 origin-left animate-pulse bg-gold/70" />
        <p className="mt-6 font-display text-3xl text-ivory-dim">
          Opening the archive
        </p>
      </div>
    </div>
  );
}
