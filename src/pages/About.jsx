import React from "react";

const values = [
  {
    number: "01",
    title: "Skin Respect",
    description:
      "We prioritize skin health, formulate for compatibility, and believe that great skincare begins with respect for every skin type.",
  },
  {
    number: "02",
    title: "Radical Clarity",
    description:
      "We demystify skincare ingredients. We share what works, why it works, and how to use it with confidence.",
  },
  {
    number: "03",
    title: "Quiet Responsibility",
    description:
      "Thoughtfully made products, responsible sourcing, and mindful choices guide everything we create.",
  },
];

const team = [
  {
    name: "LM Namel",
    role: "Founder & Creative Director",
    image: "/images/team-1.jpg",
  },
  {
    name: "LM Namel",
    role: "Founder & Creative Director",
    image: "/images/team-2.jpg",
  },
  {
    name: "LM Namel",
    role: "Founder & Creative Director",
    image: "/images/team-3.jpg",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#f9d9e5] font-sans text-[#292323]">

      {/* OUR STORY */}
      <section className="px-5 py-8 text-center sm:py-12">
        <p className="mb-2 text-[10px] font-medium tracking-wide text-[#986c7c]">
          Our story
        </p>

        <h1 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Beauty begins when skin feels
          <br className="hidden sm:block" /> understood.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-[10px] leading-relaxed text-[#765d65] sm:text-xs">
          We believe skincare is more than just a routine. It is a journey
          toward understanding yourself, embracing your natural beauty,
          and finding confidence in your own skin.
        </p>
      </section>

      <section className="w-full overflow-hidden">
        <img
          src="src/assets/about1.png"
          alt="Skincare founder in a bright, natural skincare studio"
          className="h-[260px] w-full object-cover object-center sm:h-[380px] md:h-[580px]"
        />
      </section>

      
      <section className="grid grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 sm:gap-10 sm:px-10 sm:py-12 md:px-16 lg:px-24">

        <div className="flex flex-col ml-10 justify-center">
          <p className="mb-3 text-[10px] font-medium text-[#986c7c]">
            From Minjoo
          </p>

          <h2 className="max-w-sm text-2xl font-medium leading-snug sm:text-3xl">
            A personal search for calm became a new kind of care.
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs leading-relaxed text-[#69545b] sm:text-sm">
            After years of frustration, sensationalized claims, and
            overwhelming skincare advice, founder Kim MinJoo began
            exploring the fundamentals of skin health and the importance
            of gentle, consistent care.
          </p>

          <p className="mt-4 text-xs leading-relaxed text-[#69545b] sm:text-sm">
            In 2018, she opened a small formulation studio in Seoul.
            Through thoughtful observation and careful research, she
            discovered that the best skincare begins with listening,
            understanding, and trust.
          </p>

          <p className="mt-4 text-xs font-semibold">
            Kim MinJoo
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 bg-[#fff7fa] md:grid-cols-2">

        <div className="min-h-[250px] overflow-hidden sm:min-h-[350px]">
          <img
            src="src/assets/about2.png"
            alt="Natural skincare products with botanical ingredients"
            className="h-full min-h-[250px] w-full object-cover sm:min-h-[350px]"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16">

          <p className="mb-3 text-[10px] font-medium text-[#986c7c]">
            Our mission
          </p>

          <h2 className="max-w-md text-2xl font-medium leading-snug sm:text-3xl">
            To make skincare a source of confidence, not correction.
          </h2>

          <p className="mt-4 max-w-md text-xs leading-relaxed text-[#69545b] sm:text-sm">
            We create effective, mindful formulas that work with your
            skin's natural rhythm. Our goal is to make skincare simple,
            thoughtful, and accessible for everyone, without unnecessary
            complexity or pressure.
          </p>

          <div className="mt-5">
            <a
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-[#df5685] px-5 py-2 text-[11px] bg-pink-500 text-white font-medium transition hover:bg-[#df5685]"
            >
              Explore our formulas
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-10 sm:py-14 md:px-16 lg:px-24">

        <div className="mb-7 text-center sm:mb-10">
          <p className="mb-2 text-[10px] font-medium text-[#986c7c]">
            What guides us
          </p>

          <h2 className="text-2xl font-semibold sm:text-3xl">
            Values held in every formula
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {values.map((value) => (
            <article
              key={value.number}
              className="rounded-xl bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <p className="mb-4 text-[10px] font-medium text-[#bd8197]">
                {value.number}
              </p>

              <h3 className="mb-3 text-base font-semibold">
                {value.title}
              </h3>

              <p className="text-xs leading-relaxed text-[#806d73]">
                {value.description}
              </p>
            </article>
          ))}

        </div>
      </section>

      <section className="px-5 pb-12 sm:px-10 sm:pb-16 md:px-16 lg:px-24">

        <div className="mb-7">
          <p className="mb-2 text-[10px] font-medium text-[#986c7c]">
            The people
          </p>

          <h2 className="text-2xl font-semibold sm:text-3xl">
            Made by thoughtful hands 
          </h2>

          <p className="mt-2 text-xs text-[#806d73]">
            A close-knit team across formulation, ritual, and responsible design.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {team.map((person, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src="src/assets/about3.jpg"
                alt={person.name}
                className="h-[280px] w-full object-cover object-top sm:h-[240px] md:h-[300px]"
              />

              <div className="px-4 py-4">
                <h3 className="text-xs font-semibold">
                   Ratanak
                </h3>

                <p className="mt-1 text-[10px] text-[#806d73]">
                  {person.role}
                </p>
              </div>
            </article>
          ))}

        </div>
      </section>

    </main>
  );
}