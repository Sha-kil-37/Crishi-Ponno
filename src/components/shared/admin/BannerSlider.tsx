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
type Slide = {
  type: "image" | "video";
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  href: string;
  offer: string;
  badge: string;
  icon: typeof Sprout;
  image?: string;
  video?: string;
};

const slides: Slide[] = [
  {
    type: "image",
    eyebrow: "Your complete agriculture marketplace",
    title: "Everything you need to grow, farm & live naturally.",
    description:
      "Discover quality seeds, saplings, vegetables, fruits, agricultural equipment, farm tools, and everyday agricultural essentials—all in one place.",
    action: "Explore all products",
    href: "/?view=categories",
    offer: "Seeds • Vegetables • Plants • Fruits • Equipment",
    badge: "Complete agriculture",
    icon: Sprout,
    image:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1800&q=88",
  },

  {
    type: "video",
    eyebrow: "Start something green",
    title: "Quality seeds & saplings for your next harvest.",
    description:
      "Choose from carefully selected seeds, fruit plants, vegetable seeds, flowering plants, and healthy saplings for farms, gardens, and homes.",
    action: "Shop seeds & plants",
    href: "/?category=seeds",
    offer: "Seeds • Saplings • Plants • Gardening",
    badge: "Grow something better",
    icon: TreePine,

    // Put your video in /public/videos/
    video: "/videos/seeds-saplings.mp4",

    // Fallback image while video loads
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1800&q=88",
  },

  {
    type: "image",
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
    type: "video",
    eyebrow: "Fresh from trusted growers",
    title: "Fresh vegetables, greens & produce for your table.",
    description:
      "Shop fresh vegetables, leafy greens, seasonal produce, and other natural agricultural products from trusted growers and sellers.",
    action: "Shop vegetables",
    href: "/?category=vegetables",
    offer: "Vegetables • Greens • Seasonal Produce",
    badge: "Fresh vegetables",
    icon: Sprout,

    video: "/videos/fresh-vegetables.mp4",

    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=88",
  },

  {
    type: "image",
    eyebrow: "Fresh fruits & natural produce",
    title: "Fresh fruits and natural products from trusted sellers.",
    description:
      "Bring home fresh fruits and agricultural products sourced from growers and sellers you can trust.",
    action: "Shop fruits",
    href: "/?category=fruits",
    offer: "Fruits • Natural Produce • Seasonal Picks",
    badge: "Fresh & natural",
    icon: Apple,
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1800&q=88",
  },

  {
    type: "video",
    eyebrow: "From farm to your home",
    title: "One marketplace for farmers, gardeners & families.",
    description:
      "Whether you are farming commercially, growing a home garden, or looking for fresh agricultural products, Crishi Ponno brings everything together.",
    action: "Discover Crishi Ponno",
    href: "/?view=categories",
    offer: "For farmers • Gardeners • Families",
    badge: "One marketplace",
    icon: Wheat,

    video: "/videos/agriculture-marketplace.mp4",

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
    }, 5500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <section
      className="relative isolate min-h-[560px] overflow-hidden bg-[#123b25] sm:min-h-[620px] lg:min-h-[660px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured agriculture products"
    >
      {/* =====================================================
          BACKGROUND MEDIA
      ====================================================== */}

      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Image background */}
        {slide.image && (
          <div
            key={`image-${activeSlide}`}
            className="absolute inset-0 animate-[bannerZoom_7s_ease-out_forwards] bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
        )}

        {/* Video background */}
        {slide.type === "video" && slide.video && (
          <video
            key={`video-${activeSlide}`}
            className="absolute inset-0 h-full w-full object-cover animate-[bannerVideoIn_1.2s_ease-out_forwards]"
            src={slide.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={slide.image}
            aria-hidden="true"
          />
        )}
      </div>

      {/* =====================================================
          DARK GREEN OVERLAY
      ====================================================== */}

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,38,23,0.96)_0%,rgba(5,38,23,0.88)_35%,rgba(5,38,23,0.55)_65%,rgba(5,38,23,0.25)_100%)]" />

      {/* Bottom cinematic gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-[linear-gradient(0deg,rgba(4,29,18,0.82),transparent)]" />

      {/* Soft green atmosphere */}
      <div className="absolute left-1/3 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-green-400/10 blur-[120px]" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between px-5 py-10 sm:min-h-[620px] sm:px-8 sm:py-14 lg:min-h-[660px] lg:px-12 lg:py-16">
        <div className="max-w-3xl pt-4 text-white sm:pt-8 lg:pt-10">
          {/* Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="animate-[bannerContentIn_0.7s_ease-out]"
          >
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

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-3 rounded-xl bg-[#f6c453] px-6 py-3.5 font-bold text-[#123b2c] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffd875]"
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

            {/* Categories */}
            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "Seeds",
                "Vegetables",
                "Fruits",
                "Greens",
                "Saplings",
                "Equipment",
                "Farm Tools",
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
        </div>

        {/* =====================================================
            CONTROLS
        ====================================================== */}

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Offer */}
          <div className="w-fit border-l-2 border-[#f6c453] pl-4 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">
              Featured categories
            </p>

            <p className="mt-1 font-semibold text-white/90">{slide.offer}</p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3">
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
                  className={`h-1.5 rounded-full transition-all duration-500 ${
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

            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-white hover:bg-white/15"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

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

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style jsx>{`
        @keyframes bannerZoom {
          from {
            transform: scale(1);
            opacity: 0;
          }

          to {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        @keyframes bannerVideoIn {
          from {
            transform: scale(1.05);
            opacity: 0;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bannerContentIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

export default BannerSlider;
