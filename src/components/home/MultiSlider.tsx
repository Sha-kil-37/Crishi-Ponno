"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// =========================================================
// SLIDER DATA
// =========================================================

const slides = [
  {
    id: 1,
    title: "Discover Freshness, Save 20%",
    subtitle:
      "Explore fresh fruits, vegetables, plants, and trusted agricultural products—now at special prices",
    background:
      "linear-gradient(135deg, #F8FBF3 0%, #E8F3DF 50%, #C8E6B8 100%)",
    cards: [
      {
      
        title: "Fresh Vegetables",
        description: "Fresh vegetables directly from local farms.",
        image: "/images/vegetables.jpg",
      },
      {
       
        title: "Organic Fruits",
        description: "Naturally grown seasonal fruits.",
        image: "/images/fruits.jpg",
      },
      {
       
        title: "Plants & Gardening",
        description: "Healthy plants for your garden.",
        image: "/images/plants.jpg",
      },
      {
      
        title: "Seeds",
        description: "Quality seeds for better cultivation.",
        image: "/images/seeds.jpg",
      },
    ],
  },

  {
    id: 2,
    title: "Find something affordable for every need.",
    subtitle: "Quality agricultural products at prices you’ll love.",
    background:
      "linear-gradient(135deg, #FFF8E7 0%, #F4E7C1 50%, #DCE8B8 100%)",
    cards: [
      {
       
        title: "Plants & Gardening",
        description: "Healthy plants for your garden.",
        image: "/images/plants.jpg",
      },
      {
       
        title: "Agriculture Equipment",
        description: "Modern tools for farmers.",
        image: "/images/equipment.jpg",
      },
      {
       
        title: "Organic Products",
        description: "Natural products from rural producers.",
        image: "/images/organic.jpg",
      },
      {
      
        title: "Seeds",
        description: "Quality seeds for better cultivation.",
        image: "/images/seeds.jpg",
      },
    ],
  },

  {
    id: 3,
    title: "Get more with an Crishi Ponno account",
    subtitle:
      "Enjoy exclusive deals, easy ordering, and more with your Crishi Ponno account.",
    background:
      "linear-gradient(135deg, #EEF8F5 0%, #D3ECE0 50%, #A8D5C0 100%)",
    cards: [
      {
        
        title: "Organic Products",
        description: "Natural products from rural producers.",
        image: "/images/organic.jpg",
      },
      {
       
        title: "Fish Production",
        description: "Products for modern fish farming.",
        image: "/images/fish.jpg",
      },
      {
        
        title: "Poultry & Livestock",
        description: "Products and solutions for livestock.",
        image: "/images/livestock.jpg",
      },
      {
       
        title: "Agriculture Advice",
        description: "Helpful information for farmers.",
        image: "/images/advice.jpg",
      },
    ],
  },
];

export default function MultiSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // =========================================================
  // MEASURE SLIDER WIDTH
  // =========================================================

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const updateWidth = () => {
      setContainerWidth(element.offsetWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // =========================================================
  // AUTOPLAY
  // =========================================================

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPlaying]);

  // =========================================================
  // SLIDE POSITION
  //
  // 15% left space
  // 70% active slide
  // 15% right space
  // =========================================================

  const slideWidth = containerWidth * 0.7;

  const translateX = containerWidth * 0.15 - activeIndex * slideWidth;

  // =========================================================
  // SELECT SLIDE
  // =========================================================

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="w-full">
        {/* =====================================================
            HERO SLIDER
        ===================================================== */}

        <div ref={containerRef} className="relative w-full overflow-hidden">
          <motion.div
            className="flex will-change-transform"
            animate={{
              x: translateX,
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={slide.id}
                  className="shrink-0"
                  style={{
                    width: "70%",
                  }}
                >
                  <motion.article
                    animate={{
                      scale: isActive ? 1 : 0.94,
                      opacity: isActive ? 1 : 0.55,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="group relative mx-0 aspect-[2.4/1] min-h-[280px] overflow-hidden md:aspect-[3/1]"
                    style={{
                      background: slide.background,
                    }}
                  >
                    {/* =================================================
                        DECORATIVE BACKGROUND
                    ================================================= */}

                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

                    {/* =================================================
                        HERO CONTENT
                    ================================================= */}

                    <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center px-7 md:px-12 lg:px-16">
                      <h2 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        {slide.title}
                      </h2>

                      <p className="mt-3 max-w-md text-sm leading-6 md:text-base">
                        {slide.subtitle}
                      </p>

                      <button
                        type="button"
                        className="mt-5 w-fit rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-sm transition hover:bg-white/90"
                      >
                        Explore now
                      </button>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </motion.div>

          {/* =========================================================
              LEFT / RIGHT SLIDE FADE
          ========================================================= */}

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%] bg-gradient-to-r from-white/70 to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%] bg-gradient-to-l from-white/70 to-transparent" />
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
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                  {slide.cards.map((card) => (
                    <article
                      key={card.id}
                      className="group relative aspect-[1.7/1] overflow-hidden bg-[#F5F5F5]"
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-4">
                        <h3 className="text-sm font-semibold md:text-base">
                          {card.title}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-xs text-white/80 md:text-sm">
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
            CONTROLS
        ===================================================== */}

        <div className="mt-5 flex items-center justify-center gap-4">
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
