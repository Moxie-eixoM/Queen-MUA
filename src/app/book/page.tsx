"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  desc: string;
}

interface BookingData {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: Date | null;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNotes: string;
  ref: string;
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: "",
    serviceName: "",
    servicePrice: 0,
    serviceDuration: 0,
    date: null,
    time: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientNotes: "",
    ref: "",
  });

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedDayCell, setSelectedDayCell] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: "softglam",
      name: "Signature Soft Glam",
      price: 65,
      duration: 60,
      desc: "Flawless skin finish, neutral eyeshadow styling, custom brow design, and custom lash application. Perfect for nights out or special celebrations.",
    },
    {
      id: "bridal",
      name: "Luxury Bridal Glam",
      price: 150,
      duration: 90,
      desc: "Exclusive wedding day beauty transformation. Includes extended skin prep therapy, custom waterproof blending, chest/shoulder glow, and premium silk lashes.",
    },
    {
      id: "editorial",
      name: "Editorial Fashion Glam",
      price: 90,
      duration: 75,
      desc: "Custom editorial lookbook styles. Ideal for portfolio shoots, content creators, modeling packages, and media productions. Includes lashes.",
    },
    {
      id: "lesson",
      name: "1-on-1 Makeup Lesson",
      price: 120,
      duration: 120,
      desc: "Master the soft glam. A full tutorial covering products matching your skin tone, blending techniques, and proper skin prep guidelines.",
    },
  ];

  const timeslotTemplates = ["09:00 AM", "10:30 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:30 PM"];

  // ==========================================================================
  // Calendar Render Helpers
  // ==========================================================================
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday=0, Monday=1
  const totalDays = new Date(year, month + 1, 0).getDate(); // Days in current month
  const prevMonthTotalDays = new Date(year, month, 0).getDate(); // Days in prev month

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (dayNum: number) => {
    const selectedDate = new Date(year, month, dayNum);
    selectedDate.setHours(0, 0, 0, 0);

    setBookingData((prev) => ({
      ...prev,
      date: selectedDate,
      time: "", // Reset time
    }));

    setSelectedDayCell(dayNum);
  };

  // Generate dynamic timeslots with seed-based busy flags
  useEffect(() => {
    if (!bookingData.date) return;
    const selectedDate = bookingData.date;

    // Seed calculation matches booking.js exactly
    const seed = selectedDate.getDate() + selectedDate.getMonth();
    
    // Check busy flags
    const slots = timeslotTemplates.map((slot) => {
      // Deterministic pseudo-randomness based on date seed
      const value = Math.sin(seed + slot.charCodeAt(0));
      return {
        time: slot,
        isBooked: value > 0.4,
      };
    });

    setAvailableSlots(slots.map(s => s.isBooked ? `${s.time} (Busy)` : s.time));
  }, [bookingData.date]);

  // Scroll to wizard on step change
  useEffect(() => {
    const wizardCard = document.getElementById("wizardContainer");
    if (wizardCard && step > 1) {
      wizardCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step]);

  // ==========================================================================
  // Form validations & confirmations
  // ==========================================================================
  const handleSelectService = (srv: Service) => {
    setBookingData((prev) => ({
      ...prev,
      serviceId: srv.id,
      serviceName: srv.name,
      servicePrice: srv.price,
      serviceDuration: srv.duration,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1 && bookingData.serviceId) {
      setStep(2);
    } else if (step === 2 && bookingData.date && bookingData.time) {
      setStep(3);
    } else if (step === 3) {
      // Simple HTML verification
      if (!bookingData.clientName || !bookingData.clientEmail || !bookingData.clientPhone) {
        alert("Please fill out all required fields.");
        return;
      }
      processBooking();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const processBooking = () => {
    // Generate invoice ref
    const randomRef = "QMA-" + Math.floor(1000 + Math.random() * 9000);
    const finalData = {
      ...bookingData,
      ref: randomRef,
    };

    setBookingData(finalData);

    // Save to local storage
    localStorage.setItem("lastBooking", JSON.stringify(finalData));

    setStep(4);
  };

  // Render Day Cells
  const renderCalendarDays = () => {
    const cells: React.ReactNode[] = [];

    // 1. Offsets from prev month
    for (let i = firstDayIndex; i > 0; i--) {
      const dayNum = prevMonthTotalDays - i + 1;
      cells.push(
        <div
          key={`prev-${dayNum}`}
          className="aspect-square flex items-center justify-center rounded-full text-light-gray text-sm cursor-not-allowed select-none font-medium"
        >
          {dayNum}
        </div>
      );
    }

    // 2. Main active days
    for (let d = 1; d <= totalDays; d++) {
      const cellDate = new Date(year, month, d);
      cellDate.setHours(0, 0, 0, 0);

      const isPast = cellDate.getTime() < today.getTime();
      const isToday = cellDate.getTime() === today.getTime();
      const isActive = bookingData.date && bookingData.date.getTime() === cellDate.getTime();

      cells.push(
        <div
          key={`day-${d}`}
          onClick={() => !isPast && handleSelectDay(d)}
          className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all duration-fast select-none cursor-pointer ${
            isPast
              ? "text-light-gray cursor-not-allowed"
              : isActive
              ? "bg-accent-copper text-white shadow-md font-semibold"
              : isToday
              ? "border border-accent-copper text-obsidian"
              : "hover:bg-accent-peach/15 text-obsidian"
          }`}
        >
          {d}
        </div>
      );
    }

    return cells;
  };

  const formatDateStr = (date: Date | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="font-sans">
      {/* Booking Hero */}
      <section className="pt-40 pb-8 text-center bg-champagne">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          <span className="text-[0.9rem] font-semibold uppercase tracking-[0.3em] text-accent-copper mb-4 block">
            Online Portal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian">Reserve Your Glam Experience</h1>
          <p className="text-muted max-w-[600px] mx-auto mt-4 leading-relaxed">
            Our interactive scheduling system allows you to select your service, verify available dates, and secure your session seamlessly.
          </p>
        </div>
      </section>

      {/* Main Wizard Layout */}
      <section className="bg-cream py-16 pb-32">
        <div className="max-w-[1400px] w-[90%] mx-auto px-4">
          {/* Step Indicators Bar */}
          <div className="flex justify-between items-center max-w-[600px] mx-auto mb-16 relative">
            <div className="absolute top-[16px] left-0 w-full h-[1px] bg-light-gray z-[1]" />
            {[1, 2, 3, 4].map((sNum) => {
              const labels = ["Service", "Date & Time", "Details", "Done"];
              const isActive = step === sNum;
              const isCompleted = step > sNum;

              return (
                <div key={sNum} className="flex flex-col items-center z-10 relative">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold tracking-wide transition-all duration-smooth ${
                      isActive
                        ? "bg-obsidian border-obsidian text-white"
                        : isCompleted
                        ? "bg-accent-copper border-accent-copper text-white"
                        : "bg-champagne border-light-gray text-muted"
                    }`}
                  >
                    {sNum}
                  </div>
                  <span
                    className={`text-[0.7rem] uppercase tracking-[0.1em] mt-2.5 font-medium transition-colors ${
                      isActive ? "text-obsidian font-semibold" : "text-muted"
                    }`}
                  >
                    {labels[sNum - 1]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main Wizard Glass Card */}
          <div
            id="wizardContainer"
            className="glass-card-base backdrop-blur-lg border border-white/35 shadow-glass rounded-lg p-10 max-w-[1000px] mx-auto min-h-[500px] relative flex flex-col justify-between"
          >
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <div className="animate-[fadeInStep_0.4s_ease_forwards]">
                <h3 className="text-2xl font-serif border-b border-black/5 pb-4 mb-8 text-obsidian font-medium">
                  Select a Service
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((srv) => {
                    const isSelected = bookingData.serviceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => handleSelectService(srv)}
                        className={`border rounded-lg p-8 bg-cream cursor-pointer transition-all duration-smooth flex flex-col relative ${
                          isSelected
                            ? "border-2 border-accent-copper bg-white"
                            : "border-black/5 hover:-translate-y-[3px] hover:shadow-medium hover:border-accent-peach"
                        }`}
                      >
                        {/* Selector Indicator */}
                        <div
                          className={`absolute top-8 right-8 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-fast ${
                            isSelected ? "border-accent-copper bg-accent-copper" : "border-light-gray"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>

                        <h4 className="text-xl font-serif text-obsidian mb-2 font-medium">{srv.name}</h4>
                        <div className="flex gap-4 text-xs font-semibold text-accent-copper uppercase tracking-wider mb-4 items-center">
                          <span>
                            <i className="fa-regular fa-clock mr-1.5" /> {srv.duration} Min
                          </span>
                          <span>&bull;</span>
                          <span className="text-accent-copper">£{srv.price}</span>
                        </div>
                        <p className="text-muted text-[0.95rem] leading-relaxed">{srv.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SELECTION */}
            {step === 2 && (
              <div className="animate-[fadeInStep_0.4s_ease_forwards]">
                <h3 className="text-2xl font-serif border-b border-black/5 pb-4 mb-8 text-obsidian font-medium">
                  Select Date & Time
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
                  {/* Calendar Left */}
                  <div className="bg-cream rounded-lg p-8 shadow-soft border border-black/5">
                    <div className="flex justify-between items-center mb-8">
                      <button
                        onClick={handlePrevMonth}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-accent-copper text-lg bg-transparent hover:bg-accent-peach/15 transition-colors border-none cursor-pointer"
                        aria-label="Previous Month"
                      >
                        &lt;
                      </button>
                      <h4 className="font-serif text-xl font-semibold text-obsidian">
                        {monthNames[month]} {year}
                      </h4>
                      <button
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-accent-copper text-lg bg-transparent hover:bg-accent-peach/15 transition-colors border-none cursor-pointer"
                        aria-label="Next Month"
                      >
                        &gt;
                      </button>
                    </div>

                    <div className="grid grid-cols-7 text-center text-[0.75rem] font-semibold uppercase tracking-wider text-muted mb-4">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
                  </div>

                  {/* Timeslots Right */}
                  <div className="bg-cream rounded-lg p-8 shadow-soft border border-black/5 flex flex-col">
                    <h4 className="font-serif text-lg text-obsidian mb-6 font-semibold">Available Slots</h4>
                    {bookingData.date ? (
                      <div className="grid grid-cols-2 gap-4">
                        {availableSlots.map((slot) => {
                          const isBusy = slot.includes("(Busy)");
                          const slotTime = slot.replace(" (Busy)", "");
                          const isSelected = bookingData.time === slotTime;

                          return (
                            <button
                              key={slot}
                              disabled={isBusy}
                              onClick={() =>
                                setBookingData((prev) => ({ ...prev, time: slotTime }))
                              }
                              className={`py-4 px-2 border rounded-md text-center text-[0.85rem] font-medium transition-all duration-fast focus:outline-none ${
                                isBusy
                                  ? "bg-light-gray opacity-45 cursor-not-allowed border-none text-muted"
                                  : isSelected
                                  ? "bg-obsidian text-white border-obsidian"
                                  : "bg-white border-light-gray hover:border-accent-copper hover:bg-accent-peach/5 text-obsidian"
                              }`}
                            >
                              {slotTime}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-muted text-[0.9rem] leading-relaxed">
                        Please select a date to view available time slots.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS FORM */}
            {step === 3 && (
              <div className="animate-[fadeInStep_0.4s_ease_forwards]">
                <h3 className="text-2xl font-serif border-b border-black/5 pb-4 mb-8 text-obsidian font-medium">
                  Your Information
                </h3>
                <form className="max-w-[600px] mx-auto space-y-10" onSubmit={(e) => e.preventDefault()}>
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="clientName"
                      value={bookingData.clientName}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      autoComplete="name"
                      className="w-full py-3 bg-transparent border-none border-b-1.5 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian border-b-2"
                    />
                    <label
                      htmlFor="clientName"
                      className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                        bookingData.clientName
                          ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                          : "top-[12px] text-[0.9rem]"
                      } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      id="clientEmail"
                      value={bookingData.clientEmail}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      autoComplete="email"
                      className="w-full py-3 bg-transparent border-none border-b-1.5 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian border-b-2"
                    />
                    <label
                      htmlFor="clientEmail"
                      className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                        bookingData.clientEmail
                          ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                          : "top-[12px] text-[0.9rem]"
                      } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <input
                      type="tel"
                      id="clientPhone"
                      value={bookingData.clientPhone}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      autoComplete="tel"
                      className="w-full py-3 bg-transparent border-none border-b-1.5 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian border-b-2"
                    />
                    <label
                      htmlFor="clientPhone"
                      className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                        bookingData.clientPhone
                          ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                          : "top-[12px] text-[0.9rem]"
                      } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                    >
                      Phone Number
                    </label>
                  </div>

                  {/* Notes TextArea */}
                  <div className="relative group">
                    <textarea
                      id="clientNotes"
                      value={bookingData.clientNotes}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="w-full py-3 bg-transparent border-none border-b-1.5 border-light-gray focus:border-accent-copper outline-none transition-all duration-fast font-sans text-base text-obsidian border-b-2 min-h-[100px] resize-y"
                    />
                    <label
                      htmlFor="clientNotes"
                      className={`absolute left-0 pointer-events-none transition-all duration-fast text-muted ${
                        bookingData.clientNotes
                          ? "top-[-1.2rem] text-[0.75rem] font-semibold uppercase tracking-wider text-accent-copper"
                          : "top-[12px] text-[0.9rem]"
                      } group-focus-within:top-[-1.2rem] group-focus-within:text-[0.75rem] group-focus-within:font-semibold group-focus-within:uppercase group-focus-within:tracking-wider group-focus-within:text-accent-copper`}
                    >
                      Special Requests / Bridal Notes / Location details
                    </label>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 4: CONFIRMATION */}
            {step === 4 && (
              <div className="animate-[fadeInStep_0.4s_ease_forwards] max-w-[600px] mx-auto text-center py-6">
                <div className="w-20 h-20 rounded-full bg-accent-copper/15 text-accent-copper text-4xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <i className="fa-solid fa-check" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-obsidian font-normal leading-tight mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-muted leading-relaxed">
                  Thank you. Your glam session is reserved. A confirmation email has been sent.
                </p>

                {/* Ref display box */}
                <div className="inline-block bg-accent-peach/15 border border-dashed border-accent-copper rounded px-6 py-2.5 font-sans font-bold text-lg text-accent-copper tracking-wider mt-6">
                  {bookingData.ref}
                </div>

                {/* Summary Table */}
                <ul className="text-left list-none bg-white p-8 rounded-md border border-black/5 mt-10 space-y-4">
                  <li className="flex justify-between pb-4 border-b border-black/5">
                    <span className="text-muted font-medium text-[0.9rem]">Service</span>
                    <span className="text-obsidian font-semibold text-[0.9rem]">{bookingData.serviceName}</span>
                  </li>
                  <li className="flex justify-between pb-4 border-b border-black/5">
                    <span className="text-muted font-medium text-[0.9rem]">Date & Time</span>
                    <span className="text-obsidian font-semibold text-[0.9rem]">
                      {formatDateStr(bookingData.date)} @ {bookingData.time}
                    </span>
                  </li>
                  <li className="flex justify-between pb-4 border-b border-black/5">
                    <span className="text-muted font-medium text-[0.9rem]">Price</span>
                    <span className="text-accent-copper font-bold text-[0.9rem]">£{bookingData.servicePrice}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted font-medium text-[0.9rem]">Client</span>
                    <span className="text-obsidian font-semibold text-[0.9rem]">{bookingData.clientName}</span>
                  </li>
                </ul>

                <Link
                  href="/"
                  className="btn btn-outline-custom relative overflow-hidden inline-block bg-transparent text-obsidian border border-accent-copper py-4 px-10 text-[0.8rem] font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-smooth hover:text-white mt-8"
                >
                  Back to Home
                </Link>
              </div>
            )}

            {/* Navigation Controls (except step 4) */}
            {step < 4 && (
              <div className="flex justify-between border-t border-black/5 pt-8 mt-12">
                <button
                  disabled={step === 1}
                  onClick={handleBack}
                  className="btn border border-accent-copper text-obsidian bg-transparent py-3.5 px-8 text-[0.75rem] font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-smooth hover:bg-accent-peach/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer focus:outline-none"
                >
                  Back
                </button>
                <button
                  disabled={
                    (step === 1 && !bookingData.serviceId) ||
                    (step === 2 && !(bookingData.date && bookingData.time))
                  }
                  onClick={handleNext}
                  className="btn btn-primary-gradient py-3.5 px-8 text-[0.75rem] font-semibold text-white tracking-[0.18em] rounded-sm shadow-sm transition-all duration-smooth hover:scale-103 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-sm cursor-pointer focus:outline-none"
                >
                  {step === 3 ? "Confirm Booking" : "Continue"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
