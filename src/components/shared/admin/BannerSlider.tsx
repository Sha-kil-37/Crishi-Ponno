"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sprout,
  Tractor,
  TreePine,
  Apple,
  Wheat,
} from "lucide-react";
//
const slides = [
  {
    eyebrow: "Your complete agriculture marketplace",
    title: "Everything you need to grow, farm & live naturally.",
    description:
      "Discover quality seeds, saplings, fresh produce, agricultural equipment, farm tools, and everyday agricultural essentials—all in one place.",
    action: "Explore all products",
    href: "/?view=categories",
    offer: "Seeds • Plants • Produce • Equipment",
    badge: "Complete agriculture",
    icon: Sprout,
    image:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1800&q=88",
  },
  {
    eyebrow: "Start something green",
    title: "Quality seeds & saplings for your next harvest.",
    description:
      "Choose from carefully selected seeds, fruit plants, vegetable seeds, flowering plants, and healthy saplings for farms, gardens, and homes.",
    action: "Shop seeds & plants",
    href: "/?category=seeds",
    offer: "Seeds • Saplings • Plants • Gardening",
    badge: "Grow something better",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1800&q=88",
  },
  {
    eyebrow: "Built for modern farming",
    title: "The right tools make every farming job easier.",
    description:
      "Find practical agricultural equipment, farming tools, irrigation supplies, and essential products designed to help you work smarter.",
    action: "Explore farm equipment",
    href: "/?category=equipment",
    offer: "Equipment • Tools • Irrigation • Supplies",
    badge: "Farm smarter",
    icon: Tractor,
    image:
      "https://images.unsplash.com/photo-1592982537447-6f7a7b6a2c6b?auto=format&fit=crop&w=1800&q=88",
  },
  {
    eyebrow: "Fresh from trusted sources",
    title: "Fresh fruits, greens & agricultural produce.",
    description:
      "Bring home fresh fruits, leafy greens, vegetables, and other natural products sourced from trusted growers and agricultural sellers.",
    action: "Shop fresh produce",
    href: "/?category=fruits",
    offer: "Fruits • Greens • Vegetables • Natural produce",
    badge: "Fresh & natural",
    icon: Apple,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=88",
  },
  {
    eyebrow: "From farm to your home",
    title: "Better products for farmers, gardeners & families.",
    description:
      "Whether you are growing commercially, starting a home garden, or simply looking for fresh agricultural products, Crishi Ponno brings everything together.",
    action: "Discover Crishi Ponno",
    href: "/?view=categories",
    offer: "For farmers • Gardeners • Families",
    badge: "One marketplace",
    icon: Wheat,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1800&q=88",
  },
];

function BannerSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = slides[activeSlide];
  const Icon = slide.icon;

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#123b25]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured agriculture products"
    >
      {/* Background image */}
      <div
        key={slide.image}
        className="absolute inset-0 -z-20 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
        role="img"
        aria-label={slide.title}
      />

      {/* Main dark green overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,45,27,0.96)_0%,rgba(7,45,27,0.88)_35%,rgba(7,45,27,0.55)_65%,rgba(7,45,27,0.25)_100%)]" />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(0deg,rgba(5,31,20,0.72),transparent)]" />

      {/* Subtle green glow */}
      <div className="absolute left-1/3 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-green-400/10 blur-3xl" />

      <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between px-5 py-10 sm:min-h-[620px] sm:px-8 sm:py-14 lg:min-h-[660px] lg:px-12 lg:py-16">
        {/* Content */}
        <div className="max-w-3xl pt-4 text-white sm:pt-8 lg:pt-10">
          {/* Category badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              <Icon size={15} />
              {slide.badge}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-[#f6c453] sm:block" />

            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#f6d28b] sm:text-sm">
              {slide.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {slide.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={slide.href}
              className="group inline-flex items-center gap-3 rounded-xl bg-[#f6c453] px-6 py-3.5 font-bold text-[#123b2c] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffd875]"
            >
              {slide.action}

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/?view=categories"
              className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20"
            >
              Browse categories
            </Link>
          </div>

          {/* Product categories */}
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              "Seeds",
              "Saplings",
              "Fruits",
              "vegetables",
              "Greens",
              "Equipment",
              "Farm Tools",
              "More"
            ].map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/15 bg-black/10 px-3.5 py-1.5 text-xs font-medium text-white/75 backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Current offer */}
          <div className="w-fit border-l-2 border-[#f6c453] pl-4 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">
              Featured categories
            </p>

            <p className="mt-1 font-semibold text-white/90">{slide.offer}</p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3">
            {/* Previous */}
            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-white hover:bg-white/15"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicators */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Choose featured slide"
            >
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-10 bg-[#f6c453]"
                      : "w-5 bg-white/35 hover:bg-white/70"
                  }`}
                  role="tab"
                  aria-selected={index === activeSlide}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-white hover:bg-white/15"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Pause / Play */}
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-white hover:bg-white/15"
              aria-label={isPaused ? "Resume slider" : "Pause slider"}
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerSlider;
