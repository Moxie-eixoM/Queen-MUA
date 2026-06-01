import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { icon: "fa-brands fa-instagram", url: "https://www.instagram.com/queenmuastudios" },
    { icon: "fa-solid fa-ring", url: "https://www.instagram.com/queenmuabrides" },
    { icon: "fa-solid fa-signature", url: "https://www.instagram.com/queenbamiyo" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Bamiyo", href: "/about" },
    { name: "Glam Portfolio", href: "/gallery" },
    { name: "Book Appointment", href: "/book" },
    { name: "Contact & FAQs", href: "/contact" },
  ];

  return (
    <footer className="bg-obsidian text-white pt-20 pb-12 border-t border-white/5 font-sans">
      <div className="max-w-[1400px] w-[90%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          {/* Logo & Description */}
          <div>
            <div className="font-serif text-[2.2rem] font-semibold mb-4 tracking-wider">
              QUEEN <span className="font-light text-accent-peach">MUA</span>
            </div>
            <p className="text-light-gray/80 text-[0.9rem] leading-relaxed mb-6 max-w-[320px]">
              Sophisticated makeup artistry combining advanced skin preparation with custom cosmetics for a weightless, radiant finish.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white transition-all duration-fast hover:bg-gradient-to-r hover:from-accent-peach hover:to-accent-copper hover:-translate-y-1 hover:shadow-lg"
                  aria-label="Instagram Social Link"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-white text-xl font-medium mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-light-gray/80 hover:text-accent-peach text-[0.9rem] transition-all duration-fast hover:pl-2.5 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Details */}
          <div>
            <h3 className="font-serif text-white text-xl font-medium mb-6 tracking-wide">MUA Studio Details</h3>
            <ul className="space-y-4 text-light-gray/80 text-[0.9rem] leading-relaxed">
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-map-pin text-accent-peach mt-1 text-[1.1rem] w-[18px] text-center" />
                <span>Derby, Midlands | London, United Kingdom</span>
              </li>
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-envelope text-accent-peach mt-1 text-[1.1rem] w-[18px] text-center" />
                <a href="mailto:queenmakeupartistry@gmail.com" className="hover:text-accent-peach transition-colors">
                  queenmakeupartistry@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-plane text-accent-peach mt-1 text-[1.1rem] w-[18px] text-center" />
                <span>Available for national & international travel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-muted text-[0.8rem]">&copy; 2026 Queen Makeup Artistry. All Rights Reserved.</p>
          <p className="text-muted text-[0.8rem]">Designed by Moxie.</p>
        </div>
      </div>
    </footer>
  );
}
