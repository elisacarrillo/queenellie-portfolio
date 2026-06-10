import Image from "next/image";

const stats = [
  { value: "375M+", label: "Users Reached" },
  { value: "+1.89%", label: "View Time" },
  { value: "+$40K", label: "Raised" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f0407a] min-h-screen w-screen">

      {/* Desktop: photo absolutely positioned on the left */}
      <div
        className="absolute inset-y-0 left-10 hidden lg:block bg-[#f0407a]"
        style={{ width: "42%" }}
      >
        <Image
          src="/photo_cartoon_1.png?v=5"
          alt="Elisa Carrillo"
          fill
          sizes="42vw"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Mobile: stacked layout */}
      <div
        className="flex flex-col lg:block lg:h-full"
      >
        {/* Mobile photo — above wordmark, hidden on desktop */}
        <div className="relative w-2/3 mx-auto lg:hidden -mb-8 mt-8" style={{ height: "90vw", maxHeight: "520px" }}>
          <Image
            src="/photo_cartoon_1.png?v=5"
            alt="Elisa Carrillo"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Content */}
        <div
          className="relative flex flex-col justify-center px-8 lg:px-14 xl:px-20 py-10 lg:py-0 lg:h-screen lg:ml-[42vw]"
        >
          {/* Queenellie wordmark */}
          <h1
            className="leading-none text-[#111] mb-8 lg:mb-10 text-center"
            style={{
              fontFamily: "var(--font-queenellie-display), serif",
              fontSize: "clamp(60px, 14vw, 200px)",
              fontWeight: 400,
            }}
          >
            Queenellie
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-8 lg:mb-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-inter font-extrabold text-[#111] leading-tight tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)" }}
                >
                  {s.value}
                </div>
                <div className="font-inter text-[13px] font-normal text-[#222] mt-1 tracking-wide uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p
            className="text-[#111] leading-relaxed max-w-[520px] text-center lg:text-right mx-auto lg:ml-auto lg:mr-12 mt-8 lg:mt-16 italic"
            style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 300, fontSize: "clamp(1rem, 2.2vw, 1.8rem)" }}
          >
            building products that spark joy, invoke creativity, and empower community
          </p>
        </div>
      </div>
    </section>
  );
}
