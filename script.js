// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add active class to navigation on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Optional: Add typing effect to hero title
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typing effect when page loads
  window.addEventListener("load", typeWriter);
}

// Optional: Fade in animation for project cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// TODO: Initialize EmailJS during workshop
emailjs.init("cZvYq-4jqm8pazMGa");

// TODO: Add floating contact button functionality during workshop

const floatingContactBtn = document.getElementById("floatingContactBtn");
const emailModal = document.getElementById("emailModal");
const modalClose = document.getElementById("modalClose");
const quickContactForm = document.getElementById("quickContactForm");

// Open modal when floating button is clicked
floatingContactBtn.addEventListener("click", () => {
  emailModal.classList.add("active");
});

// Close modal when X is clicked
modalClose.addEventListener("click", () => {
  emailModal.classList.remove("active");
});

// Close modal when clicking outside
emailModal.addEventListener("click", (e) => {
  if (e.target === emailModal) {
    emailModal.classList.remove("active");
  }
});

// Handle form submission with EmailJS
quickContactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const email = quickContactForm.querySelector('input[type="email"]').value;
  const subject = quickContactForm.querySelector('input[type="text"]').value;
  const message = quickContactForm.querySelector("textarea").value;

  // Show loading state
  const submitBtn = quickContactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email using EmailJS
  // Replace 'service_id' and 'template_id' with your actual IDs
  emailjs
    .send("service_2q9gvlg", "template_o2n5wpu", {
      from_email: email,
      subject: subject,
      message: message,
      to_name: "Your Name",
    })
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Message sent successfully! Thanks for reaching out.");
      emailModal.classList.remove("active");
      quickContactForm.reset();
    })
    .catch((error) => {
      console.log("FAILED...", error);
      alert("Failed to send message. Please try again or email directly.");
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// Hide floating button when contact section is visible
const contactSection = document.getElementById("contact");
const floatingBtnObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        floatingContactBtn.classList.add("hidden");
      } else {
        floatingContactBtn.classList.remove("hidden");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

floatingBtnObserver.observe(contactSection);
