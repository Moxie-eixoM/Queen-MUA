"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const aboutImgFrameRef = useRef<HTMLDivElement>(null);
  const aboutTextContentRef = useRef<HTMLDivElement>(null);
  const philosophyBlockRef = useRef<HTMLDivElement>(null);
  const travelTextRef = useRef<HTMLDivElement>(null);
  const mapGraphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline for profile grid
      if (aboutImgFrameRef.current && aboutTextContentRef.current) {
        gsap.fromTo(
          aboutImgFrameRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: aboutImgFrameRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          aboutTextContentRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: aboutTextContentRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 2. Philosophy quote pop animation
      if (philosophyBlockRef.current) {
        gsap.fromTo(
          philosophyBlockRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            scrollTrigger: {
              trigger: philosophyBlockRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3. Travel Coverage entry animation
      if (mapGraphicRef.current) {
        const nodes = mapGraphicRef.current.querySelectorAll(".map-node");
        gsap.fromTo(
          nodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.3,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: mapGraphicRef.current,
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
      ctx.revert();
    };
  }, []);

  const travelLocations = [
    { area: "Derby & Midlands:", detail: "Local studio sessions & regional travel." },
    { area: "London & South:", detail: "Elite bridal and event bookings." },
    { area: "Destination Weddings:", detail: "Available to fly for international bridal clients." },
  ];

  return (
    <div className="font-sans">
      {/* About Profile Section */}
      <section className="pt-40 pb-24 lg:pb-32 bg-cream">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait Column */}
            <div ref={aboutImgFrameRef} className="relative rounded-lg overflow-hidden shadow-medium h-[400px] sm:h-[550px] group">
              <img
                src="/assets/images/queen.png"
                alt="Queen Bamiyo - Portrait MUA"
                className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-102"
              />
              <div className="absolute top-5 left-5 right-5 bottom-5 border border-white/25 rounded-[12px] pointer-events-none" />
            </div>

            {/* Biography Text Column */}
            <div ref={aboutTextContentRef} className="lg:pl-8 text-left">
              <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-6 block">
                The Artist
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian mb-8 leading-tight">
                Meet Queen Bamiyo
              </h1>
              <p className="text-[1.05rem] leading-relaxed text-dark-gray mb-6">
                Welcome to my space. I am Queen Bamiyo, a professional Makeup Artist and certified Esthetician based in Derby, United Kingdom. Over the past several years, I have dedicated myself to studying facial structures, skin health, and the geometry of cosmetics.
              </p>
              <p className="text-[1.05rem] leading-relaxed text-dark-gray mb-6">
                My style is characterized by what my clients call the <strong className="font-semibold text-accent-copper">&ldquo;Signature Soft Glam&rdquo;</strong>&mdash;an elegant, seamless application that enhances your natural bone structure, highlights your favorite features, and delivers a flawless, weightless, skin-like texture that lasts all day and night.
              </p>
              <p className="text-[1.05rem] leading-relaxed text-dark-gray mb-8">
                With dual training in skincare and cosmetic chemistry, my approach always begins with specialized skin preparation. I believe that makeup should never mask who you are; rather, it should act as a premium frame to showcase your natural radiance.
              </p>
              <Link
                href="/book"
                className="btn btn-primary-gradient py-4 px-10 text-[0.8rem] font-semibold text-white tracking-[0.18em] rounded-sm shadow-md transition-all duration-smooth hover:scale-105 hover:shadow-lg inline-block"
              >
                Book A Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 bg-charcoal text-white text-center">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <div ref={philosophyBlockRef} className="max-w-[800px] mx-auto">
            <div className="text-[2.5rem] text-accent-peach mb-8">
              <i className="fa-solid fa-feather-pointed" />
            </div>
            <h2 className="text-3xl font-serif text-white font-light italic mb-8">The Beauty Philosophy</h2>
            <p className="text-light-gray/95 text-[1.2rem] sm:text-2xl leading-[1.8] font-serif font-light">
              &ldquo;I believe that cosmetics are not meant to recreate a new face, but to reveal the royalty already present. As an esthetician first, my canvas is skin health. When your skin is nourished, prepared, and treated with respect, makeup blends seamlessly, glows from within, and feels completely weightless.&rdquo;
            </p>
            <span className="block mt-8 font-semibold text-[0.8rem] uppercase tracking-[0.15em] text-accent-peach">
              &mdash; Queen Bamiyo
            </span>
          </div>
        </div>
      </section>

      {/* Travel Coverage Section */}
      <section className="py-24 lg:py-32 bg-champagne relative">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Travel details left */}
            <div ref={travelTextRef} className="text-left">
              <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-6 block">
                Mobility & Bridal
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-obsidian mb-6">Travel & Destination Services</h2>
              <p className="text-dark-gray leading-relaxed mb-6">
                While my private studio is located in Derby, I frequently travel to accommodate bridal parties, commercial shoots, and private bookings across the UK.
              </p>
              <ul className="space-y-4 mb-8">
                {travelLocations.map((loc, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[1.1rem] leading-relaxed text-dark-gray">
                    <span className="text-accent-copper text-[1.5rem] font-semibold leading-none">&bull;</span>
                    <span>
                      <strong className="font-semibold">{loc.area}</strong> {loc.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-dark-gray leading-relaxed mb-8">
                Please note that travel fees are calculated based on location and group size. Submit your itinerary on our contact page for a personalized travel quote.
              </p>
              <Link
                href="/contact"
                className="btn btn-outline-custom relative overflow-hidden inline-block bg-transparent text-obsidian border border-accent-copper py-4 px-10 text-[0.8rem] font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-smooth hover:text-white"
              >
                Inquire For Travel
              </Link>
            </div>

            {/* Stylized UK map graphic right */}
            <div
              ref={mapGraphicRef}
              className="map-graphic-container relative w-full h-[400px] bg-accent-peach/5 border border-dashed border-accent-copper/25 rounded-lg overflow-hidden"
            >
              {/* Node Derby */}
              <div className="map-node absolute flex flex-col items-center top-[30%] left-[52%] -translate-x-1/2 -translate-y-1/2">
                <div className="map-node-dot w-3 h-3 bg-accent-copper rounded-full relative map-node-pulse" />
                <div className="map-node-label text-[0.8rem] font-semibold uppercase tracking-[0.1em] mt-2 bg-white py-1 px-2.5 rounded-sm shadow-soft text-obsidian whitespace-nowrap">
                  Derby Studio
                </div>
              </div>

              {/* Node Midlands */}
              <div className="map-node absolute flex flex-col items-center top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2">
                <div className="map-node-dot w-3 h-3 bg-accent-copper rounded-full relative map-node-pulse" />
                <div className="map-node-label text-[0.8rem] font-semibold uppercase tracking-[0.1em] mt-2 bg-white py-1 px-2.5 rounded-sm shadow-soft text-obsidian whitespace-nowrap">
                  Midlands Area
                </div>
              </div>

              {/* Node London */}
              <div className="map-node absolute flex flex-col items-center top-[65%] left-[60%] -translate-x-1/2 -translate-y-1/2">
                <div className="map-node-dot w-3 h-3 bg-accent-copper rounded-full relative map-node-pulse" />
                <div className="map-node-label text-[0.8rem] font-semibold uppercase tracking-[0.1em] mt-2 bg-white py-1 px-2.5 rounded-sm shadow-soft text-obsidian whitespace-nowrap">
                  London Coverage
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
