"use client";
//
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
//
// slider data
const slides = [
  {
    id: 1,
    title: "Fresh Vegetables",
    subtitle: "Fresh vegetables directly from local farms.",
    heroImage: "/images/vegetables-banner.jpg",

    cards: [
      {
        id: 11,
        title: "Fresh Vegetables",
        description: "Fresh vegetables directly from local farms.",
        image: "/images/vegetables.jpg",
      },
      {
        id: 12,
        title: "Organic Fruits",
        description: "Naturally grown seasonal fruits.",
        image: "/images/fruits.jpg",
      },
      {
        id: 13,
        title: "Plants & Gardening",
        description: "Healthy plants for your garden.",
        image: "/images/plants.jpg",
      },
      {
        id: 14,
        title: "Seeds",
        description: "Quality seeds for better cultivation.",
        image: "/images/seeds.jpg",
      },
    ],
  },

  {
    id: 2,
    title: "Plants & Gardening",
    subtitle: "Healthy plants for your home and farm.",
    heroImage: "/images/plants-banner.jpg",

    cards: [
      {
        id: 21,
        title: "Plants & Gardening",
        description: "Healthy plants for your garden.",
        image: "/images/plants.jpg",
      },
      {
        id: 22,
        title: "Agriculture Equipment",
        description: "Modern tools for farmers.",
        image: "/images/equipment.jpg",
      },
      {
        id: 23,
        title: "Organic Products",
        description: "Natural products from rural producers.",
        image: "/images/organic.jpg",
      },
      {
        id: 24,
        title: "Seeds",
        description: "Quality seeds for better cultivation.",
        image: "/images/seeds.jpg",
      },
    ],
  },

  {
    id: 3,
    title: "Organic & Rural Products",
    subtitle: "Natural products from trusted local producers.",
    heroImage: "/images/organic-banner.jpg",

    cards: [
      {
        id: 31,
        title: "Organic Products",
        description: "Natural products from rural producers.",
        image: "/images/organic.jpg",
      },
      {
        id: 32,
        title: "Fish Production",
        description: "Products for modern fish farming.",
        image: "/images/fish.jpg",
      },
      {
        id: 33,
        title: "Poultry & Livestock",
        description: "Products and solutions for livestock.",
        image: "/images/livestock.jpg",
      },
      {
        id: 34,
        title: "Agriculture Advice",
        description: "Helpful information for farmers.",
        image: "/images/advice.jpg",
      },
    ],
  },
];
export default function MultiSlider() {
  /* =========================================================
     SLIDER DATA
  ========================================================= */

  /* =========================================================
     STATE
  ========================================================= */

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  /* =========================================================
     ANIMATION CONFIGURATION
  ========================================================= */

  /*
   * Bottom slider:
   * Starts immediately and moves faster.
   */
  const bottomTransition = {
    duration: 0.65,
    delay: 0,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  };

  /*
   * Top slider:
   * Starts slightly later and moves slower.
   */
  const topTransition = {
    duration: 1.15,
    delay: 0.15,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  };

  /*
   * Time between automatic slides.
   */
  const AUTOPLAY_DURATION = 5000;

  /* =========================================================
     NEXT SLIDE
  ========================================================= */

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */

  const previousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  /* =========================================================
     SELECT SLIDE
  ========================================================= */

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  /* =========================================================
     AUTOPLAY
  ========================================================= */

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, AUTOPLAY_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPlaying]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="mx-auto w-full ">
        {/* =====================================================
            TOP HERO SLIDER
        ===================================================== */}

        <div className="relative overflow-hidden">
          <motion.div
            className="flex will-change-transform"
            animate={{
              x: `-${activeIndex * 100}%`,
            }}
            transition={topTransition}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="min-w-full">
                <article className="group relative aspect-[2.4/1] min-h-[280px] overflow-hidden  bg-[#F5F5F5] md:aspect-[3/1]">
                  {/* Hero Image */}
                  <Image
                    src={slide.heroImage}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Dark Overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" /> */}

                  {/* Hero Content */}
                  <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center px-7  md:px-12 lg:px-16">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em]  md:text-sm">
                      Crishi Ponno
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6  md:text-base">
                      {slide.subtitle}
                    </p>

                    <button
                      type="button"
                      className="mt-5 w-fit rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                    >
                      Explore now
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM CARD SLIDER
        ===================================================== */}

        <div className="mt-3 overflow-hidden">
          <motion.div
            className="flex will-change-transform"
            animate={{
              x: `-${activeIndex * 100}%`,
            }}
            transition={bottomTransition}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                  {slide.cards.map((card) => (
                    <article
                      key={card.id}
                      className="group relative aspect-[1.7/1] overflow-hidden bg-[#F5F5F5]"
                    >
                      {/* Card Image */}
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Card Gradient */}
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" /> */}

                      {/* Card Content */}
                      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                        <h3 className="">
                          {card.title}
                        </h3>

                        <p className="mt-1 line-clamp-1 ">
                          {card.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* =====================================================
            ONE SHARED CONTROL
        ===================================================== */}

        <div className="mt-5 flex items-center justify-center gap-4">
          {/* Previous Button */}
          {/* <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button> */}

          {/* Pagination */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className="flex h-5 items-center justify-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-1.5 w-7 bg-black"
                        : "h-1.5 w-1.5 bg-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {/* <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button> */}

          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100"
          >
            {isPlaying ? (
              <Pause size={15} strokeWidth={1.8} />
            ) : (
              <Play size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
