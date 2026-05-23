export default function Hero() {
  const bio = [
    "At Snap, I scoped and built what was missing for over 375 million users, closing gaps I felt every day.",
    "At Amazon, I built the tool to allow Product Managers to stop guessing and build products that users actually use.",
    "As a Founder, I discovered that the best features come from living the problem and building something that people actually need.",
  ];

  return (
    <section className="relative w-full max-w-full flex items-end overflow-hidden bg-[#f0407a]" style={{ height: "85vh" }}>
      {/* Optional: subtle texture or pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Big name — white fill with pink stroke, with an offset pink shadow copy
          for the layered outline look from the Figma */}
      <div
        className="relative z-10 w-full max-w-full min-w-0 overflow-hidden px-4 pb-0 sm:px-6"

      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8">
          {/* Queenellie text */}
          <div className="relative mb-10">
            {/* Offset pink "shadow" copy — creates the layered outline feel */}
            <h1
              aria-hidden="true"
              className="leading-[0.88] absolute"
              style={{
                fontFamily: "var(--font-queenellie-display), sans-serif",
                fontSize: "clamp(120px, 22vw, 240px)",
                fontWeight: 400,
                letterSpacing: "0.03em",
                color: "#d83068",
                transform: "translate(6px, 6px)",
                WebkitTextStroke: "0",
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            >
              <span style={{ letterSpacing: "0.08em" }}>Q</span>ueenellie
            </h1>

            {/* Main white text with pink stroke outline */}
            <h1
              className="leading-[0.88] relative"
              style={{
                fontFamily: "var(--font-queenellie-display), sans-serif",
                fontSize: "clamp(120px, 22vw, 240px)",
                fontWeight: 400,
                letterSpacing: "0.03em",
                color: "#ffffff",
                WebkitTextStroke: "2px #f0407a",
                zIndex: 1,
              }}
            >
              <span style={{ letterSpacing: "0.08em" }}>Q</span>ueenellie
            </h1>
          </div>

          {/* Bio on the right */}
          <div className="w-full lg:w-auto lg:max-w-[25vw] lg:pr-[6vw]">
            {bio.map((line, i) => (
              <p
                key={i}
                className="text-[20px] leading-[1.6]"
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  paddingBottom: "24px",
                  marginBottom: "24px",
                  borderBottom: i < bio.length - 1 ? "2px solid rgba(255,255,255,0.3)" : "none"
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
