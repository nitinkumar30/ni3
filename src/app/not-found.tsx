import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div
        className="text-8xl sm:text-9xl font-bold mb-4"
        style={{
          background: "var(--theme-gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </div>
      <h1 className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-sm mb-8 max-w-md" style={{ color: "var(--muted)" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
        style={{
          background: "var(--theme-gradient)",
          color: "var(--background)",
        }}
      >
        ← Back to Home
      </Link>
      <div
        className="mt-16 text-4xl opacity-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        {">_"}
      </div>
    </main>
  );
}
