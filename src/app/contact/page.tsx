"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs: FAQItem[] = [
    {
      question: "How far in advance should I book my makeup session?",
      answer: "For general soft glam bookings, we recommend booking 2 to 4 weeks in advance. For weddings and bridal packages, dates are often booked 6 to 12 months in ahead. We operate strictly on a first-come, first-served basis.",
    },
    {
      question: "What is the \"Signature Soft Glam\" style?",
      answer: "The Signature Soft Glam is my specialty. It focuses on creating a seamless, filter-like complexion that looks like skin rather than heavy makeup. We use soft, blended neutral brown, rose-gold, or champagne tones on the eyes, natural-looking lashes, and a beautifully balanced lip.",
    },
    {
      question: "Do you offer bridal makeup trials, and are they required?",
      answer: "Yes, bridal trials are highly recommended! A trial session allows us to experiment with styles, check how the cosmetics wear on your skin over several hours, and coordinate with your veil or hair details. Trials are typically booked 2 to 3 months before the wedding day.",
    },
    {
      question: "How should I prepare my skin before my appointment?",
      answer: "Arrive with a clean, freshly washed face, free of any makeup. Do your usual gentle morning skincare routine (cleanser, lightweight moisturizer). Avoid any aggressive facial treatments, peels, or new products at least 5 days prior to prevent irritation.",
    },
    {
      question: "Do you travel for individual appointments, and what are the fees?",
      answer: "Individual studio appointments take place at my Derby location. Mobile services are reserved exclusively for bridal bookings, group sessions (3+ clients), and commercial shoots. Travel fees depend on the mileage and time required to reach your location.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. Queen will get back to you shortly.");
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="font-sans">
      {/* Contact & FAQ Hero */}
      <section className="pt-40 pb-16 text-center bg-champagne">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-4 block">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian mb-6">Connect With Us</h1>
          <p className="max-w-[600px] mx-auto text-muted leading-relaxed">
            Have questions regarding destination bookings, group packages, or event dates? Send us an inquiry or explore the frequently asked questions below.
          </p>
        </div>
      </section>

      {/* Inquiry Grid Section */}
      <section className="bg-cream py-16">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Inquiry Form Left */}
            <div className="glass-card-base backdrop-blur-lg border border-white/35 shadow-glass rounded-lg p-10">
              <h3 className="text-2xl font-serif text-obsidian mb-8 font-semibold">Send An Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    autoComplete="name"
                    className="w-full py-3 bg-transparent border-none border-b-2 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                      formState.name
                        ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                        : "top-[12px] text-[0.9rem]"
                    } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                  >
                    Your Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    autoComplete="email"
                    className="w-full py-3 bg-transparent border-none border-b-2 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                      formState.email
                        ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                        : "top-[12px] text-[0.9rem]"
                    } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                  >
                    Email Address
                  </label>
                </div>

                {/* Subject Dropdown */}
                <div className="relative">
                  <select
                    id="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full border-none border-b-2 border-light-gray py-3 bg-transparent focus:border-accent-copper focus:outline-none cursor-pointer text-dark-gray font-sans text-[0.9rem] rounded-none appearance-none"
                    style={{ borderBottom: "1.5px solid var(--color-light-gray)" }}
                  >
                    <option value="" disabled>
                      Select Subject
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="bridal">Bridal Package / Quote</option>
                    <option value="commercial">Commercial / Photoshoot</option>
                    <option value="collab">Collaboration</option>
                  </select>
                  {/* Dropdown Custom Arrow */}
                  <div className="absolute right-2 top-[18px] pointer-events-none text-muted text-xs">
                    &#9660;
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="w-full py-3 bg-transparent border-none border-b-2 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian min-h-[100px] resize-y"
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                      formState.message
                        ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                        : "top-[12px] text-[0.9rem]"
                    } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                  >
                    Your Message (Include event date & location if applicable)
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-gradient w-full py-4 text-[0.8rem] font-semibold text-white tracking-[0.18em] uppercase rounded-sm shadow-sm transition-all duration-smooth hover:scale-102 hover:shadow-md cursor-pointer border-none"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Studio Details Right */}
            <div className="lg:pl-10 text-left flex flex-col justify-center">
              <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-6 block">
                Studio Details
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-obsidian mb-6 font-normal">Studio Location & Hours</h2>
              <p className="text-dark-gray leading-relaxed mb-10">
                My primary studio is located in Derby, Midlands. We also operate by appointment in select partner locations across London. Travel is available for bridal parties and corporate bookings.
              </p>

              <div className="space-y-6">
                {/* Details Item 1 */}
                <div className="flex items-center gap-6">
                  <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-accent-peach/15 text-accent-copper text-lg flex items-center justify-center">
                    <i className="fa-solid fa-clock" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-obsidian tracking-wide">Studio Hours</h4>
                    <p className="text-[0.9rem] text-muted mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM | Sun: Bridal Bookings Only</p>
                  </div>
                </div>

                {/* Details Item 2 */}
                <div className="flex items-center gap-6">
                  <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-accent-peach/15 text-accent-copper text-lg flex items-center justify-center">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-obsidian tracking-wide">Email</h4>
                    <p className="text-[0.9rem] text-muted mt-0.5">
                      <a href="mailto:queenmakeupartistry@gmail.com" className="hover:text-accent-copper transition-colors">
                        queenmakeupartistry@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Details Item 3 */}
                <div className="flex items-center gap-6">
                  <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-accent-peach/15 text-accent-copper text-lg flex items-center justify-center">
                    <i className="fa-solid fa-map-pin" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-obsidian tracking-wide">Primary Area</h4>
                    <p className="text-[0.9rem] text-muted mt-0.5">Derby, Midlands, London UK (National Travel Available)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-[800px] mx-auto py-24 lg:py-32 px-4 text-center">
        <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-4 block">
          Your Questions
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-obsidian mb-12 font-normal">Frequently Asked Questions</h2>

        <div className="faq-accordion text-left border-t border-light-gray">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div key={index} className="faq-item border-b border-light-gray py-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full bg-transparent border-none text-left font-serif text-[1.25rem] sm:text-[1.35rem] font-semibold text-obsidian cursor-pointer flex justify-between items-center focus:outline-none"
                >
                  {faq.question}
                  <span
                    className={`text-accent-copper text-base font-normal transform transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    &#43;
                  </span>
                </button>
                <div
                  className="faq-panel overflow-hidden transition-all duration-500 ease-smooth"
                  style={{
                    maxHeight: isOpen ? "200px" : "0", // Safe overflow-y height clamp
                  }}
                >
                  <p className="pt-4 text-muted text-[0.95rem] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
