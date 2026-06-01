"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePage() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const specialtiesHeaderRef = useRef<HTMLDivElement>(null);
  const specialtiesGridRef = useRef<HTMLDivElement>(null);
  const lookbookCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Hero Entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      if (heroBgRef.current) {
        tl.fromTo(
          heroBgRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8 }
        );
      }

      if (heroContentRef.current) {
        const targets = heroContentRef.current.querySelectorAll(
          ".hero-subtitle, .hero-title, .hero-desc, .hero-btn-group"
        );
        tl.fromTo(
          targets,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15 },
          "-=1.2"
        );
      }

      // 2. Specialties Section Fade-In
      if (specialtiesHeaderRef.current) {
        gsap.fromTo(
          specialtiesHeaderRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: specialtiesHeaderRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (specialtiesGridRef.current) {
        const cards = specialtiesGridRef.current.querySelectorAll(".specialty-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            scrollTrigger: {
              trigger: specialtiesGridRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 3. Lookbook Horizontal slide entrance
      if (lookbookCarouselRef.current) {
        const items = lookbookCarouselRef.current.querySelectorAll(".lookbook-item");
        gsap.fromTo(
          items,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.2,
            scrollTrigger: {
              trigger: lookbookCarouselRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Refresh ScrollTrigger to recalculate all trigger positions after layout settles
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });

    return () => {
      ctx.revert(); // Complete GSAP cleanup
    };
  }, []);

  const specialties = [
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "Signature Soft Glam",
      desc: "Flawless, skin-like complexion work with warm neutral tones. Designed to feel lightweight but photograph beautifully.",
    },
    {
      icon: "fa-solid fa-gem",
      title: "Bridal Luxury",
      desc: "Tailored makeup itineraries for brides, bridesmaids, and wedding events, complete with preliminary trials and skin-prep consultations.",
    },
    {
      icon: "fa-solid fa-sparkles",
      title: "Esthetician Prep",
      desc: "Combining skin therapy expertise to deeply prep and nourish your face before cosmetic application, guaranteeing an enduring, luminous finish.",
    },
  ];

  const lookbookItems = [
    {
      img: "/assets/images/soft_glam_portrait.png",
      alt: "Signature Soft Glam Portrait",
      category: "Soft Glam",
      title: "Luminous Complexion",
    },
    {
      img: "/assets/images/hero_glam_shoot.png",
      alt: "Bridal Glam Look",
      category: "Bridal",
      title: "Royal Gold Bridal Glam",
    },
    {
      img: "/assets/images/editorial_bold_look.png",
      alt: "Editorial Fashion Glam Look",
      category: "Editorial",
      title: "Sleek Winged Liner & Glow",
    },
  ];

  const reviews = [
    {
      text: "Queen did my bridal makeup and it was absolutely flawless. She prepped my skin so well and the makeup didn't budge all day! Absolutely recommend her.",
      author: "Sarah Jenkins",
      type: "Bride",
    },
    {
      text: "The absolute Queen of Soft Glams! I've booked her for two separate gala events in London and she never fails to make me feel beautiful and confident.",
      author: "Olivia Cole",
      type: "Soft Glam",
    },
    {
      text: "Her background as an esthetician makes such a difference. She knew exactly how to prep my dry skin so the foundation looked perfectly skin-like!",
      author: "Amina Bello",
      type: "Maternity Glam",
    },
  ];

  // Duplicate for Infinite scrolling loop
  const infiniteReviews = [...reviews, ...reviews];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-[100px] overflow-hidden bg-champagne">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4 flex items-center z-10">
          <div ref={heroContentRef} className="w-full lg:w-[55%] text-left py-12 lg:py-0">
            <span className="hero-subtitle text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-6 block">
              Queen of Soft Glams
            </span>
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-serif font-normal leading-tight tracking-[0.02em] text-obsidian mb-8">
              Elevating Your <span className="italic font-light text-accent-copper">Natural</span> Radiance
            </h1>
            <p className="hero-desc text-lg text-dark-gray mb-12 max-w-[540px] leading-relaxed">
              Professional makeup artistry specializing in luxury bridal transformations and signature soft glam looks. Based in Derby, travelling across the Midlands and London.
            </p>
            <div className="hero-btn-group flex flex-wrap gap-6 items-center">
              <Link href="/book" className="btn btn-primary-gradient py-4 px-10 text-[0.8rem] font-semibold text-white tracking-[0.18em] rounded-sm shadow-md transition-all duration-smooth hover:scale-105 hover:shadow-lg">
                Book Appointment
              </Link>
              <Link href="/gallery" className="btn-link group flex items-center gap-2 text-[0.85rem] font-semibold text-obsidian uppercase tracking-[0.15em] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3/5 after:h-[1px] after:bg-accent-copper after:transition-all after:duration-smooth hover:after:w-full">
                Explore Gallery{" "}
                <span className="arrow inline-block transition-transform duration-fast group-hover:translate-x-1.5">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
        <div ref={heroBgRef} className="absolute top-0 right-0 w-full lg:w-[50%] h-full z-[1] opacity-25 lg:opacity-95">
          <img
            src="/assets/images/hero_glam_shoot.png"
            alt="Editorial Bridal Makeup Look by Queen MUA"
            className="w-full h-full object-cover lg:mask-gradient"
            style={{
              maskImage: "linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <div ref={specialtiesHeaderRef} className="text-center max-w-[600px] mx-auto mb-20">
            <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-6 block">
              Our Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-obsidian mb-6">Signature Specialties</h2>
            <p className="text-dark-gray leading-relaxed">
              Curated cosmetic and skin services tailored to celebrate and enhance your unique features.
            </p>
          </div>

          <div ref={specialtiesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {specialties.map((spec, index) => (
              <div key={index} className="specialty-card perspective-[1000px] group">
                <div className="bg-cream border border-black/5 rounded-lg py-14 px-10 text-center shadow-soft hover:shadow-heavy transition-all duration-[600ms] ease-smooth group-hover:-translate-y-2.5 group-hover:rotate-x-[4deg] group-hover:rotate-y-[4deg] group-hover:border-accent-copper/20 flex flex-col items-center h-full">
                  <div className="w-[70px] h-[70px] rounded-full bg-accent-peach/15 text-accent-copper text-3xl flex items-center justify-center mb-8 transition-all duration-smooth ease-smooth group-hover:bg-gradient-to-r group-hover:from-accent-peach group-hover:to-accent-copper group-hover:text-white group-hover:rotate-y-180">
                    <i className={spec.icon} />
                  </div>
                  <h3 className="text-xl font-serif text-obsidian font-medium mb-4">{spec.title}</h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section className="py-24 lg:py-32 bg-charcoal text-white">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/5 pb-10 mb-16">
            <div>
              <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-peach mb-4 block">
                Luxe Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
                The <span className="italic font-light text-accent-peach">Glam</span> Lookbook
              </h2>
            </div>
            <Link
              href="/gallery"
              className="btn border border-white/30 text-white py-3 px-8 text-[0.75rem] font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-smooth hover:bg-gradient-to-r hover:from-accent-peach hover:to-accent-copper hover:border-transparent hover:-translate-y-1"
            >
              View All Work
            </Link>
          </div>

          <div
            ref={lookbookCarouselRef}
            className="flex gap-10 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {lookbookItems.map((item, index) => (
              <div
                key={index}
                className="lookbook-item min-w-[290px] w-[290px] sm:min-w-[400px] sm:w-[400px] h-[420px] sm:h-[520px] rounded-lg overflow-hidden relative snap-start group shadow-medium"
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-smooth group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-0 translate-y-5 transition-all duration-smooth ease-smooth group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-[0.75rem] uppercase tracking-[0.2em] text-accent-peach block font-medium">
                    {item.category}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif text-white mt-2 font-medium">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Marquee Section */}
      <section className="py-24 lg:py-32 bg-cream overflow-hidden">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4 mb-16 text-center">
          <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-4 block">
            Client Love
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-obsidian">Client Testimonials</h2>
        </div>

        <div className="marquee-container overflow-hidden py-8 bg-white/35 border-y border-white/40 backdrop-blur-md relative w-full">
          <div className="marquee-inner flex">
            {infiniteReviews.map((rev, index) => (
              <div
                key={index}
                className="marquee-card w-[290px] sm:w-[450px] mx-4 sm:mx-8 shrink-0 bg-cream border border-accent-copper/10 p-8 sm:p-10 rounded-md shadow-soft"
              >
                <div className="review-stars text-accent-gold flex gap-1 mb-4">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </div>
                <p className="italic text-dark-gray text-[0.9rem] sm:text-[0.95rem] leading-relaxed mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div>
                  <span className="review-author font-semibold text-[0.8rem] uppercase tracking-[0.15em] text-accent-copper block">
                    {rev.author}
                  </span>
                  <span className="review-type text-[0.75rem] text-muted block mt-1">{rev.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section
        className="py-32 relative text-white text-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.85), rgba(12, 12, 12, 0.85)), url('/assets/images/artist_studio.png')`,
        }}
      >
        <div className="max-w-[1400px] w-[90%] mx-auto px-4 z-10 relative">
          <div className="max-w-[700px] mx-auto">
            <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-peach mb-4 block">
              Reserve Your Date
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6">Experience The Glam Touch</h2>
            <p className="text-light-gray/80 mb-12 text-lg sm:text-[1.1rem] leading-relaxed">
              Whether you are walking down the aisle, attending a red carpet, or celebrating a special occasion, let's create a custom glam itinerary that represents you.
            </p>
            <Link href="/book" className="btn btn-primary-gradient py-4 px-10 text-[0.8rem] font-semibold text-white tracking-[0.18em] rounded-sm shadow-md transition-all duration-smooth hover:scale-105 hover:shadow-lg inline-block">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
