import { Link } from "react-router-dom";
import { Parallax, ParallaxImage, Reveal } from "../components/Parallax";

import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import jisooImage from "../assets/Jisso.png";
import jennieImage from "../assets/jennie.png";
import roseImage from "../assets/Rose.png";
import younjongImage from "../assets/younjong.png";

const values = [
  {
    number: "01",
    icon: "✿",
    title: "Skin Respect",
    description:
      "We prioritize skin health, formulate for compatibility, and believe that great skincare begins with respect for every skin type.",
  },
  {
    number: "02",
    icon: "◌",
    title: "Radical Clarity",
    description:
      "We demystify skincare ingredients. We share what works, why it works, and how to use it with confidence.",
  },
  {
    number: "03",
    icon: "♡",
    title: "Quiet Responsibility",
    description:
      "Thoughtfully made products, responsible sourcing, and mindful choices guide everything we create.",
  },
];

// Edit the names, roles, and images here
const team = [
  { name: "Kim MinJoo", role: "Founder & Creative Director", image: jisooImage },
  { name: "Young BunHaz", role: "Formulation Lead", image: jennieImage },
  { name: "MinJooMol", role: "Brand & Ritual Director", image: roseImage },
  { name: "Team Member", role: "Beauty & Skincare", image: younjongImage },
];

function Eyebrow({ children, center = false }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full bg-[#fde8ee] px-4 py-1.5 text-xs font-medium tracking-wide text-[#c43d68] ${
        center ? "mx-auto" : ""
      }`}
    >
      <span aria-hidden="true">✿</span>
      {children}
    </p>
  );
}

export default function About() {
  return (
    <main className="overflow-hidden bg-[#fbf8f5] font-['Outfit',sans-serif] text-[#292524]">
      {/* HERO */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-14 md:py-20">
        {/* floating glow behind the text */}
        <Parallax
          distance={90}
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#f9d5df] opacity-60 blur-3xl"
        />

        <Reveal className="relative">
          <Eyebrow>Our story</Eyebrow>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Beauty begins when skin feels{" "}
            <span className="text-[#e94f7d]">understood.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-[#7a6d69]">
            We believe skincare is more than just a routine. It is a journey
            toward understanding yourself, embracing your natural beauty, and
            finding confidence in your own skin.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium !text-white shadow-lg shadow-[#e94f7d]/25 transition hover:bg-[#d93d6c]"
            >
              Shop the collection ↗
            </Link>
            <a
              href="#values"
              className="rounded-full border border-[#e7dcd6] bg-white px-6 py-3 text-sm font-medium transition hover:border-[#e94f7d] hover:text-[#e94f7d]"
            >
              Our values
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-br from-[#f9d5df] to-[#fbe9e4] sm:-inset-4" />

          <ParallaxImage
            src={about1}
            alt="Skincare founder in a bright, natural skincare studio"
            fetchPriority="high"
            loading="eager"
            scale={1.15}
            className="relative aspect-[4/5] w-full rounded-[32px] sm:aspect-square"
          />

          {/* floating flower, drifts up faster than the photo */}
          <Parallax
            distance={70}
            className="absolute -right-3 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-[#e94f7d] shadow-xl sm:-right-6 sm:h-16 sm:w-16"
          >
            <span aria-hidden="true">✿</span>
          </Parallax>

          {/* floating badge, drifts the opposite way */}
          <Parallax
            distance={-35}
            className="absolute -bottom-5 left-4 rounded-2xl bg-white px-5 py-3 shadow-xl sm:-left-6"
          >
            <p className="text-xs text-[#a18491]">Founded in</p>
            <p className="text-lg font-semibold text-[#4A001F]">Seoul, 2018</p>
          </Parallax>
        </Reveal>
      </section>

      {/* FOUNDER NOTE */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-16">
        <Reveal>
          <div className="relative rounded-[32px] bg-white p-7 shadow-sm sm:p-12">
            <span
              className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#e94f7d] text-3xl text-white"
              aria-hidden="true"
            >
              “
            </span>

            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-sm font-medium text-[#c43d68]">
                  From Minjoo
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">
                  A personal search for calm became a new kind of care.
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-[#7a6d69] sm:text-base">
                <p>
                  After years of frustration, sensationalized claims, and
                  overwhelming skincare advice, founder Kim MinJoo began
                  exploring the fundamentals of skin health and the importance
                  of gentle, consistent care.
                </p>
                <p>
                  In 2018, she opened a small formulation studio in Seoul.
                  Through thoughtful observation and careful research, she
                  discovered that the best skincare begins with listening,
                  understanding, and trust.
                </p>
                <p className="font-semibold text-[#4A001F]">— Kim MinJoo</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MISSION */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-14 md:py-20">
        <Reveal className="relative order-2 md:order-1">
          <ParallaxImage
            src={about2}
            alt="Natural skincare products with botanical ingredients"
            className="aspect-[5/4] w-full rounded-[32px]"
          />
          <Parallax
            distance={60}
            className="absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#fde8ee] text-2xl text-[#e94f7d] sm:-right-5 sm:-top-5 sm:h-20 sm:w-20 sm:text-3xl"
          >
            <span aria-hidden="true">✿</span>
          </Parallax>
        </Reveal>

        <Reveal delay={150} className="order-1 md:order-2">
          <Eyebrow>Our mission</Eyebrow>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            To make skincare a source of confidence,{" "}
            <span className="text-[#e94f7d]">not correction.</span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-[#7a6d69]">
            We create effective, mindful formulas that work with your skin's
            natural rhythm. Our goal is to make skincare simple, thoughtful, and
            accessible for everyone, without unnecessary complexity or pressure.
          </p>

          <Link
            to="/categories"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium !text-white shadow-lg shadow-[#e94f7d]/25 transition hover:bg-[#d93d6c]"
          >
            Explore our formulas
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      {/* VALUES */}
      <section
        id="values"
        className="scroll-mt-20 bg-[#f6e9e4] px-5 py-14 sm:px-8 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <Eyebrow center>What guides us</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Values held in every formula
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.number} delay={index * 120}>
                <article className="group h-full rounded-3xl bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fde8ee] text-xl text-[#e94f7d] transition group-hover:bg-[#e94f7d] group-hover:text-white"
                      aria-hidden="true"
                    >
                      {value.icon}
                    </span>
                    <span className="text-3xl font-semibold text-[#f3d3dc]">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#7a6d69]">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <Reveal className="max-w-xl">
          <Eyebrow>The people</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Made by thoughtful hands
          </h2>
          <p className="mt-3 text-base leading-7 text-[#7a6d69]">
            A close-knit team across formulation, ritual, and responsible
            design.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person, index) => (
            <Reveal key={person.name} delay={index * 120}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#eadfe2] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <ParallaxImage
                  src={person.image}
                  alt={person.name}
                  scale={1.08}
                  className="aspect-[4/5] w-full bg-[#f3e9e4]"
                  imgClassName="object-cover object-center"
                />

                <div className="px-5 py-4">
                  <h3 className="text-base font-semibold text-[#4A001F]">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#a18491]">
                    {person.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#F8DCE8] px-7 py-12 text-center text-[#4A001F] sm:px-12 sm:py-16">
            <Parallax
              distance={80}
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#e94f7d] opacity-30 blur-3xl"
            />
            <Parallax
              distance={-60}
              className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-white opacity-60 blur-3xl"
            />

            <h2 className="relative text-2xl font-semibold sm:text-4xl">
              A softer start, every day.
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-[#4A001F]/70 sm:text-base">
              Build a routine around the products your skin loves.
            </p>
            <Link
              to="/shop"
              className="relative mt-7 inline-flex rounded-full bg-[#e94f7d] px-8 py-3 text-sm font-medium !text-white transition hover:bg-[#d93d6c]"
            >
              Shop Now →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}