import Script from "next/script";

const GA_ID = /^G-[A-Z0-9]+$/;

function measurementId() {
  const raw = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
  return GA_ID.test(raw) ? raw : "";
}

export function Analytics() {
  const id = measurementId();
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
