const stats = [
  { value: "375M+", label: ["Users Reached"] },
  { value: "+1.89%", label: ["Friend Story", "View Time"] },
  { value: "$20K", label: ["Raised as", "Founder"] },
];

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col overflow-hidden bg-[#f0407a]"
      style={{ minHeight: "85vh" }}
    >
      {/* Wordmark — grows to fill, anchored to bottom */}
      <div className="relative z-10 flex-1 flex items-end w-full min-w-0 overflow-hidden pl-3 sm:pl-5">
        <div className="relative">
          {/* Offset black shadow copy */}
          <h1
            aria-hidden="true"
            className="leading-[0.85] absolute select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-queenellie-display), sans-serif",
              fontSize: "clamp(100px, 22vw, 300px)",
              fontWeight: 400,
              color: "#111111",
              transform: "translate(6px, 6px)",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          >
            <span style={{ letterSpacing: "0.08em" }}>Q</span>ueenellie
          </h1>

          {/* Main text: white fill, black stroke */}
          <h1
            className="leading-[0.85] relative"
            style={{
              fontFamily: "var(--font-queenellie-display), sans-serif",
              fontSize: "clamp(100px, 22vw, 300px)",
              fontWeight: 400,
              color: "#ffffff",
              WebkitTextStroke: "3px #111111",
              zIndex: 1,
            }}
          >
            <span style={{ letterSpacing: "0.08em" }}>Q</span>ueenellie
          </h1>
        </div>
      </div>

      {/* Stats row at bottom */}
      <div className="relative z-10 pl-3 sm:pl-5 pr-4 pb-8 pt-5 flex gap-10 sm:gap-14">
        {stats.map((stat, i) => (
          <div key={i}>
            <div
              className="font-syne font-extrabold text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
            >
              {stat.value}
            </div>
            <div
              className="mt-1 text-[12px] sm:text-[13px] leading-tight"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {stat.label.map((l, j) => (
                <div key={j}>{l}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
