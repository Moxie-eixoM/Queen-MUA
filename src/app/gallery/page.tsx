"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PortfolioItem {
  id: number;
  category: "softglam" | "bridal" | "editorial";
  categoryLabel: string;
  img: string;
  title: string;
  desc: string;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "softglam" | "bridal" | "editorial">("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const gridItemsRef = useRef<HTMLDivElement>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      category: "bridal",
      categoryLabel: "Bridal Luxury",
      img: "/assets/images/hero_glam_shoot.png",
      title: "Luminous Gold Bride",
      desc: "Flawless, warm-toned bridal glam with glowing skin finish.",
    },
    {
      id: 2,
      category: "softglam",
      categoryLabel: "Soft Glam",
      img: "/assets/images/soft_glam_portrait.png",
      title: "Classic Soft Glam",
      desc: "Signature soft glam showcasing neutral bronze shades and satin lips.",
    },
    {
      id: 3,
      category: "editorial",
      categoryLabel: "Editorial",
      img: "/assets/images/editorial_bold_look.png",
      title: "Sleek Winged Eyeliner",
      desc: "High fashion editorial close-up with sharp winged liner and wet-skin finish.",
    },
    {
      id: 4,
      category: "bridal",
      categoryLabel: "Bridal Luxury",
      img: "/assets/images/hero_glam_shoot.png",
      title: "Satin Rose Bride",
      desc: "Romantic rose-pink bridal tones with fresh-faced skin prep.",
    },
    {
      id: 5,
      category: "softglam",
      categoryLabel: "Soft Glam",
      img: "/assets/images/soft_glam_portrait.png",
      title: "Everyday Glow",
      desc: "Lightweight weightless glam featuring minimal eyes and maximum skin health highlight.",
    },
    {
      id: 6,
      category: "editorial",
      categoryLabel: "Editorial",
      img: "/assets/images/editorial_bold_look.png",
      title: "Red Carpet Luminous",
      desc: "Glossy lookbook editorial with clean base and nude lips.",
    },
  ];

  // GSAP Filtering Transition Trigger
  useEffect(() => {
    if (!gridItemsRef.current) return;

    const cards = gridItemsRef.current.querySelectorAll(".portfolio-card-item");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Basic instantaneous filtering for reduced motion
      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (activeFilter === "all" || category === activeFilter) {
          (card as HTMLElement).style.display = "block";
          (card as HTMLElement).style.opacity = "1";
          (card as HTMLElement).style.transform = "scale(1)";
        } else {
          (card as HTMLElement).style.display = "none";
        }
      });
      return;
    }

    // High-end GSAP filter transition matching gallery.js exactly
    const tl = gsap.timeline();

    tl.to(cards, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.03,
      onComplete: () => {
        cards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (activeFilter === "all" || category === activeFilter) {
            (card as HTMLElement).style.display = "block";
          } else {
            (card as HTMLElement).style.display = "none";
          }
        });
      },
    });

    tl.to(cards, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.03,
      // Modifier to target elements visible in current DOM
      modifiers: {
        display: (val, target) => {
          return (target as HTMLElement).style.display;
        },
      },
    });

    return () => {
      tl.kill();
    };
  }, [activeFilter]);

  // Lightbox key listener for Escape closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxItem) {
        setLightboxItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxItem]);

  const handleOpenLightbox = (item: PortfolioItem) => {
    setLightboxItem(item);
    document.body.style.overflow = "hidden"; // Stop background scroll
  };

  const handleCloseLightbox = () => {
    setLightboxItem(null);
    document.body.style.overflow = ""; // Re-enable scroll
  };

  const filterButtons = [
    { label: "All Looks", value: "all" },
    { label: "Soft Glam", value: "softglam" },
    { label: "Bridal Luxury", value: "bridal" },
    { label: "Editorial & Fashion", value: "editorial" },
  ] as const;

  return (
    <div className="font-sans">
      {/* Gallery Hero Header */}
      <section className="pt-40 pb-16 bg-champagne text-center">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-6 block">
            Visual Experience
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian mb-6">The Glam Portfolio</h1>
          <p className="max-w-[600px] mx-auto mb-12 text-muted leading-relaxed">
            A curated showcase of professional cosmetic artistry. Filter through our signature soft glams, luxurious bridal sessions, and bold editorial concepts.
          </p>

          {/* Tag Selector Filters */}
          <div className="flex justify-center gap-6 mb-8 flex-wrap">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setActiveFilter(btn.value)}
                className={`font-sans text-[0.8rem] font-semibold uppercase tracking-[0.15em] border-none bg-transparent cursor-pointer py-2 px-6 relative transition-colors duration-fast ${
                  activeFilter === btn.value
                    ? "text-obsidian after:w-10"
                    : "text-muted hover:text-obsidian after:w-0"
                } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:bg-accent-copper after:transition-all after:duration-smooth after:-translate-x-1/2`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="bg-cream py-16 min-h-[50vh]">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          {/* CSS Column Masonry Layout */}
          <div
            ref={gridItemsRef}
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                data-category={item.category}
                onClick={() => handleOpenLightbox(item)}
                className="portfolio-card-item break-inside-avoid relative overflow-hidden rounded-lg shadow-soft cursor-pointer bg-cream transition-all duration-smooth hover:scale-[1.02] hover:shadow-medium group"
              >
                <img src={item.img} alt={item.title} className="w-full object-cover block" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-obsidian/85 to-transparent text-white opacity-0 translate-y-[10px] transition-all duration-smooth group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-[0.7rem] uppercase tracking-[0.15em] text-accent-peach font-medium block">
                    {item.categoryLabel}
                  </span>
                  <h4 className="text-xl font-serif text-white mt-1.5 font-medium">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          onClick={handleCloseLightbox}
          className="fixed top-0 left-0 w-full h-full bg-obsidian/95 backdrop-blur-md z-[2000] flex items-center justify-center transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Stop closing on inner click
            className="max-w-[90%] max-h-[85%] relative flex flex-col items-center"
          >
            <button
              onClick={handleCloseLightbox}
              className="absolute -top-12 right-0 bg-transparent border-none text-white text-4xl cursor-pointer transition-colors hover:text-accent-peach"
              aria-label="Close Lightbox"
            >
              &times;
            </button>
            <img
              src={lightboxItem.img}
              alt={lightboxItem.title}
              className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-heavy"
            />
            <div className="text-white text-center mt-6 max-w-[600px] px-4">
              <h4 className="text-2xl font-serif font-medium">{lightboxItem.title}</h4>
              <p className="text-light-gray text-[0.9rem] mt-2 leading-relaxed">{lightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Teaser Banner */}
      <section className="py-24 lg:py-32 bg-charcoal text-white text-center">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-peach mb-4 block">
            Reserve Your Glam
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">Love What You See?</h2>
          <p className="text-light-gray/80 max-w-[600px] mx-auto mb-12 leading-relaxed">
            Secure your date in our interactive portal and experience our signature makeup care firsthand.
          </p>
          <Link
            href="/book"
            className="btn btn-primary-gradient py-4 px-10 text-[0.8rem] font-semibold text-white tracking-[0.18em] rounded-sm shadow-md transition-all duration-smooth hover:scale-105 hover:shadow-lg inline-block"
          >
            Book Your Glam Session Now
          </Link>
        </div>
      </section>
    </div>
  );
}
