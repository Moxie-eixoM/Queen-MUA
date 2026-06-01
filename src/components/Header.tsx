"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Book", href: "/book" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-100 w-full z-[1000] transition-all duration-smooth ease-smooth ${
        isScrolled
          ? "py-4 bg-champagne/85 backdrop-blur-lg border-b border-white/40 shadow-sm"
          : "py-7 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] w-[90%] mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="font-serif text-3xl font-semibold tracking-wider text-obsidian z-[1001]" onClick={closeMobileMenu}>
          QUEEN <span className="font-light text-accent-copper">MUA</span>
        </Link>

        {/* Mobile Burger Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-between w-[30px] h-6 bg-transparent border-none cursor-pointer z-[1001] focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation"
        >
          <span
            className={`block w-full h-[2px] bg-obsidian transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-[11px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-obsidian transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-obsidian transition-all duration-300 ${
              isMobileMenuOpen ? "-translate-y-[11px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Navigation Menu */}
        <nav
          className={`fixed lg:relative top-0 right-0 h-screen lg:h-auto w-4/5 max-w-[400px] lg:w-auto lg:max-w-none bg-champagne lg:bg-transparent shadow-xl lg:shadow-none flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-12 lg:gap-12 transition-all duration-500 ease-smooth z-[1000] ${
            isMobileMenuOpen ? "right-0" : "-right-full lg:right-0"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-[0.85rem] font-medium tracking-[0.15em] uppercase relative py-2 text-obsidian after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-accent-copper after:transition-all after:duration-smooth after:ease-smooth hover:after:w-full ${
                  isActive ? "after:w-full font-semibold" : "after:w-0"
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/book"
            className="btn btn-outline-custom relative overflow-hidden inline-block bg-transparent text-obsidian border border-accent-copper py-3 px-7 text-[0.75rem] font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-smooth hover:text-white"
            onClick={closeMobileMenu}
          >
            Book Glam
          </Link>
        </nav>
      </div>
    </header>
  );
}
