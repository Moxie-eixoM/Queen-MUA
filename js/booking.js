/* ==========================================================================
   Queen Makeup Artistry - Booking Wizard Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('stepContent-1')) {
    initBookingWizard();
  }
});

function initBookingWizard() {
  // Booking State
  const bookingData = {
    serviceId: '',
    serviceName: '',
    servicePrice: 0,
    serviceDuration: 0,
    date: null, // Date object
    time: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientNotes: '',
    ref: ''
  };
  
  let currentStep = 1;
  
  // DOM Elements
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const wizardControls = document.getElementById('wizardControls');
  
  const clientNameInput = document.getElementById('clientName');
  const clientEmailInput = document.getElementById('clientEmail');
  const clientPhoneInput = document.getElementById('clientPhone');
  const clientNotesInput = document.getElementById('clientNotes');
  
  // Initialize Wizard Event Listeners
  prevBtn.addEventListener('click', handlePrevStep);
  nextBtn.addEventListener('click', handleNextStep);
  
  // Step 1: Service Card Selection
  const serviceCards = document.querySelectorAll('.service-select-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      // Clear previous selection
      serviceCards.forEach(c => c.classList.remove('selected'));
      
      // Select current card
      card.classList.add('selected');
      
      // Update state
      bookingData.serviceId = card.getAttribute('data-id');
      bookingData.serviceName = card.getAttribute('data-name');
      bookingData.servicePrice = parseInt(card.getAttribute('data-price'), 10);
      bookingData.serviceDuration = parseInt(card.getAttribute('data-duration'), 10);
      
      updateControlsState();
    });
  });
  
  // Step 2: Calendar Setup
  let currentCalendarDate = new Date(); // Tracks calendar month/year viewed
  initCalendar(currentCalendarDate);
  
  // ==========================================================================
  // Navigation & Control States
  // ==========================================================================
  
  function goToStep(step) {
    // Hide all step content
    for (let i = 1; i <= 4; i++) {
      const stepContent = document.getElementById(`stepContent-${i}`);
      const stepIndicator = document.getElementById(`stepInd-${i}`);
      
      stepContent.classList.remove('active');
      stepIndicator.classList.remove('active');
      
      if (i < step) {
        stepIndicator.classList.add('completed');
      } else {
        stepIndicator.classList.remove('completed');
      }
    }
    
    // Activate target step
    document.getElementById(`stepContent-${step}`).classList.add('active');
    document.getElementById(`stepInd-${step}`).classList.add('active');
    
    currentStep = step;
    
    // Scroll smoothly to top of wizard card for good UX
    const wizardCard = document.querySelector('.glass-card');
    if (wizardCard) {
      wizardCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    updateControlsState();
  }
  
  function handlePrevStep() {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }
  
  function handleNextStep() {
    if (currentStep === 1) {
      if (bookingData.serviceId) {
        goToStep(2);
      }
    } else if (currentStep === 2) {
      if (bookingData.date && bookingData.time) {
        goToStep(3);
      }
    } else if (currentStep === 3) {
      if (validateForm()) {
        processBooking();
      }
    }
  }
  
  function updateControlsState() {
    // Back Button state
    if (currentStep === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    
    // Next/Continue Button state
    if (currentStep === 1) {
      nextBtn.disabled = !bookingData.serviceId;
      nextBtn.textContent = 'Continue';
    } else if (currentStep === 2) {
      nextBtn.disabled = !(bookingData.date && bookingData.time);
      nextBtn.textContent = 'Continue';
    } else if (currentStep === 3) {
      nextBtn.disabled = false;
      nextBtn.textContent = 'Confirm Booking';
    } else if (currentStep === 4) {
      // Hide navigation entirely in step 4
      wizardControls.style.display = 'none';
    }
  }
  
  // ==========================================================================
  // Step 3 Form Validation & Step 4 Processing
  // ==========================================================================
  
  function validateForm() {
    const form = document.getElementById('bookingForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    
    // Save to state
    bookingData.clientName = clientNameInput.value.trim();
    bookingData.clientEmail = clientEmailInput.value.trim();
    bookingData.clientPhone = clientPhoneInput.value.trim();
    bookingData.clientNotes = clientNotesInput.value.trim();
    
    return true;
  }
  
  function processBooking() {
    // Generate random reference
    const randomRef = 'QMA-' + Math.floor(1000 + Math.random() * 9000);
    bookingData.ref = randomRef;
    
    // Save to LocalStorage for persistence
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));
    
    // Populate step 4 layout
    document.getElementById('bookingRefVal').textContent = bookingData.ref;
    document.getElementById('summaryService').textContent = bookingData.serviceName;
    document.getElementById('summaryPrice').textContent = `£${bookingData.servicePrice}`;
    document.getElementById('summaryClientName').textContent = bookingData.clientName;
    
    // Format Date & Time for display
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateStr = bookingData.date.toLocaleDateString('en-US', options);
    document.getElementById('summaryDateTime').textContent = `${dateStr} @ ${bookingData.time}`;
    
    // Go to step 4
    goToStep(4);
  }
  
  // ==========================================================================
  // Calendar Generation Core
  // ==========================================================================
  
  function initCalendar(date) {
    const calendarMonthTitle = document.getElementById('calendarMonthTitle');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    
    if (!calendarMonthTitle || !calendarDays) return;
    
    // Month/Year string representation
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    calendarMonthTitle.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
    // Clear days
    calendarDays.innerHTML = '';
    
    // Calculate calendar parameters
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay(); // Weekday index for 1st of month
    const totalDays = new Date(year, month + 1, 0).getDate(); // Number of days in month
    
    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 1. Render empty cells/offset days from previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const dayNum = prevMonthTotalDays - i + 1;
      const cell = document.createElement('div');
      cell.classList.add('calendar-day-cell', 'disabled');
      cell.textContent = dayNum;
      calendarDays.appendChild(cell);
    }
    
    // 2. Render actual month days
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-day-cell');
      cell.textContent = day;
      
      const cellDate = new Date(year, month, day);
      cellDate.setHours(0, 0, 0, 0);
      
      // Highlight today
      if (cellDate.getTime() === today.getTime()) {
        cell.classList.add('today');
      }
      
      // Disable past dates
      if (cellDate.getTime() < today.getTime()) {
        cell.classList.add('disabled');
      } else {
        // Day selection click event
        cell.addEventListener('click', () => {
          // Remove active class from previous days
          const activeDays = calendarDays.querySelectorAll('.calendar-day-cell.active');
          activeDays.forEach(d => d.classList.remove('active'));
          
          cell.classList.add('active');
          
          // Save date to state
          bookingData.date = cellDate;
          bookingData.time = ''; // Reset time selection
          
          generateTimeSlots(cellDate);
          updateControlsState();
        });
        
        // Keep active cell highlighted if calendar is re-rendered
        if (bookingData.date && bookingData.date.getTime() === cellDate.getTime()) {
          cell.classList.add('active');
        }
      }
      
      calendarDays.appendChild(cell);
    }
    
    // Month navigation clicks
    prevMonthBtn.onclick = () => {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
      initCalendar(currentCalendarDate);
    };
    
    nextMonthBtn.onclick = () => {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
      initCalendar(currentCalendarDate);
    };
  }
  
  // ==========================================================================
  // Time Slots Renderer
  // ==========================================================================
  
  function generateTimeSlots(selectedDate) {
    const timeslotsGrid = document.getElementById('timeslotsGrid');
    if (!timeslotsGrid) return;
    
    timeslotsGrid.innerHTML = '';
    
    // Available slots array template
    const slots = ["09:00 AM", "10:30 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:30 PM"];
    
    slots.forEach(slotTime => {
      const btn = document.createElement('button');
      btn.classList.add('timeslot-btn');
      btn.textContent = slotTime;
      
      // Simulate busy status (randomize so the calendar feels alive and functional)
      // We will seed the randomizer based on the date so it remains consistent for that day.
      const seed = selectedDate.getDate() + selectedDate.getMonth();
      const isBooked = (Math.sin(seed + slotTime.charCodeAt(0)) > 0.4);
      
      if (isBooked) {
        btn.classList.add('disabled');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          // Clear active slots styles
          const activeSlots = timeslotsGrid.querySelectorAll('.timeslot-btn.selected');
          activeSlots.forEach(s => s.classList.remove('selected'));
          
          btn.classList.add('selected');
          bookingData.time = slotTime;
          
          updateControlsState();
        });
        
        // Re-highlight if match
        if (bookingData.time === slotTime) {
          btn.classList.add('selected');
        }
      }
      
      timeslotsGrid.appendChild(btn);
    });
  }
}
