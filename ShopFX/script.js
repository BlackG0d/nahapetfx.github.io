/*
  Configure links:
  - APP_STORE_URL: your App Store link
  - PAYPAL_HOSTED_BUTTON_ID: PayPal hosted button id for the license purchase
*/

const APP_STORE_URL = "https://apps.apple.com/us/app/mypasswordx/id6751013547";

const PAYPAL_HOSTED_BUTTON_ID = "NE3PMSABAYPQL";

const CONTACT_EMAIL = "Support@NahapetFX.com";
let paypalRendered = false;

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setYear() {
  const el = qs("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function wireAppStoreLinks() {
  qsa("[data-appstore]").forEach((a) => {
    if (a.tagName.toLowerCase() === "a") {
      a.href = APP_STORE_URL;
      a.target = "_blank";
      a.rel = "noreferrer";
    }
  });
}

function renderPayPalButton() {
  if (paypalRendered) return;

  const mount = qs("#paypal-container-NE3PMSABAYPQL");
  if (!mount) return;
  const loading = qs("#paypal-loading");

  const tryRender = (attempt = 0) => {
    if (paypalRendered) return;
    if (window.paypal && paypal.HostedButtons) {
      paypal
        .HostedButtons({
          hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
        })
        .render("#paypal-container-NE3PMSABAYPQL");
      paypalRendered = true;
      if (loading) loading.style.display = "none";
      return;
    }

    if (attempt >= 40) return; // ~8s max
    window.setTimeout(() => tryRender(attempt + 1), 200);
  };

  tryRender();
}

// Promo code functionality
const PROMO_CODES = {
  // Add your promo codes here: "CODE": { discount: percentage, url: "special_url" (optional), message: "custom_message" (optional) }
  "WELCOME10": { discount: 10 },
  "SAVE20": { discount: 20 },
  "MAGIC15": { discount: 15 },
  "DEMIAN15": { 
    discount: 15, 
    url: "https://pay.ziina.com/nahapet/CJ2XaTUKE",
    message: "Congratulations! Your promo code was successfully applied. You received a 15% discount."
  },
  "NEW26": { 
    discount: 26,
    url: "https://pay.ziina.com/nahapetfx/EEYXg5MHO4"
  },
};

let appliedPromo = null;
let originalPrice = 129;

function resetPromoCode() {
  appliedPromo = null;
  const promoInput = qs("#promoCode");
  const applyBtn = qs("#applyPromo");
  const promoMessage = qs("#promoMessage");
  const modalTitle = qs(".modal__title");
  const checkoutLink = qs(".paypalHostedWrap a[href*='ziina']");

  if (promoInput) {
    promoInput.value = "";
    promoInput.disabled = false;
  }
  if (applyBtn) {
    applyBtn.disabled = false;
    applyBtn.textContent = "Apply";
  }
  if (promoMessage) {
    promoMessage.textContent = "";
  }
  if (modalTitle) {
    modalTitle.textContent = `License Key • $${originalPrice}`;
  }
  if (checkoutLink) {
    // Reset to original URL
    checkoutLink.setAttribute("href", "https://pay.ziina.com/nahapet/zC11unsaA");
  }
}

function applyPromoCode() {
  const promoInput = qs("#promoCode");
  const applyBtn = qs("#applyPromo");
  const promoMessage = qs("#promoMessage");
  const modalTitle = qs(".modal__title");
  const checkoutLink = qs(".paypalHostedWrap a[href*='ziina']");

  if (!promoInput || !applyBtn || !promoMessage) return;

  const checkPromo = () => {
    const code = promoInput.value.trim().toUpperCase();
    
    if (!code) {
      promoMessage.textContent = "";
      promoMessage.style.color = "";
      return;
    }

    if (PROMO_CODES[code]) {
      appliedPromo = code;
      const promoData = PROMO_CODES[code];
      const discount = typeof promoData === 'number' ? promoData : promoData.discount;
      const discountedPrice = originalPrice * (1 - discount / 100);
      
      // Update price display
      if (modalTitle) {
        modalTitle.textContent = `License Key • $${Math.round(discountedPrice)}`;
      }
      
      // Show success message
      if (typeof promoData === 'object' && promoData.message) {
        promoMessage.textContent = promoData.message;
      } else {
        promoMessage.textContent = `✓ Promo code applied! ${discount}% discount`;
      }
      promoMessage.style.color = "#4ade80";
      
      // Disable input and button
      promoInput.disabled = true;
      applyBtn.disabled = true;
      applyBtn.textContent = "Applied";
      
      // Update checkout link
      if (checkoutLink) {
        if (typeof promoData === 'object' && promoData.url) {
          // Use special URL for this promo code
          checkoutLink.setAttribute("href", promoData.url);
        } else {
          // Add promo code as parameter to existing URL
          const baseUrl = checkoutLink.getAttribute("href");
          const separator = baseUrl.includes("?") ? "&" : "?";
          checkoutLink.setAttribute("href", `${baseUrl}${separator}promo=${code}`);
        }
      }
    } else {
      // Invalid code
      promoMessage.textContent = "Invalid promo code. Please try again.";
      promoMessage.style.color = "#ff4d00";
      promoInput.value = "";
      promoInput.focus();
    }
  };

  applyBtn.addEventListener("click", checkPromo);
  
  promoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !promoInput.disabled) {
      e.preventDefault();
      checkPromo();
    }
  });
}

function openModal() {
  const modal = qs("#buyModal");
  if (!modal) return;

  const planEl = qs("#modalPlan");
  if (planEl) planEl.textContent = "One‑time activation for MyPasSwordX";

  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";

  // Focus management
  const closeBtn = qs("[data-close-modal]", modal);
  if (closeBtn) closeBtn.focus();

  // Reset promo code when modal opens
  resetPromoCode();

  // PayPal button rendering (temporarily disabled - using Ziina instead)
  // renderPayPalButton();
}

function closeModal() {
  const modal = qs("#buyModal");
  if (!modal) return;

  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

function wireBuyButtons() {
  qsa("[data-buy-key]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });
}

function wireModalClose() {
  const modal = qs("#buyModal");
  if (!modal) return;

  qsa("[data-close-modal]", modal).forEach((el) => {
    el.addEventListener("click", () => closeModal());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function smoothAnchors() {
  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (href.length < 2) return;

      const target = qs(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setContactEmail() {
  // If you change CONTACT_EMAIL, we’ll update all mailto links from hello@example.com
  qsa('a[href^="mailto:"]').forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href.includes("hello@example.com")) {
      a.setAttribute("href", href.replaceAll("hello@example.com", CONTACT_EMAIL));
    }
  });
}

function openTutorialModal() {
  const modal = qs("#tutorialModal");
  if (!modal) return;

  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";

  // Focus on input
  const input = qs("#tutorialAnswer");
  if (input) {
    setTimeout(() => input.focus(), 100);
  }

  // Clear previous state
  const errorDiv = qs("#tutorialError");
  if (errorDiv) {
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
  }
  if (input) input.value = "";
}

function closeTutorialModal() {
  const modal = qs("#tutorialModal");
  if (!modal) return;

  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

function wireTutorialButton() {
  qsa("[data-tutorial]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openTutorialModal();
    });
  });
}

function wireTutorialModalClose() {
  const modal = qs("#tutorialModal");
  if (!modal) return;

  qsa("[data-close-tutorial-modal]", modal).forEach((el) => {
    el.addEventListener("click", () => closeTutorialModal());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeTutorialModal();
    }
  });
}

function wireTutorialSubmit() {
  const submitBtn = qs("#tutorialSubmit");
  const answerInput = qs("#tutorialAnswer");
  const errorDiv = qs("#tutorialError");
  const correctAnswer = "Vernon";
  const tutorialUrl = "https://nahapetfx.com/tutorial/mypasswordx.html";

  if (!submitBtn || !answerInput || !errorDiv) return;

  const checkAnswer = () => {
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
      errorDiv.textContent = "Please enter an answer.";
      errorDiv.style.display = "block";
      return;
    }

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      // Correct answer - redirect to tutorial
      window.location.href = tutorialUrl;
    } else {
      // Wrong answer - show error
      errorDiv.textContent = "Incorrect answer. Please try again.";
      errorDiv.style.display = "block";
      answerInput.value = "";
      answerInput.focus();
    }
  };

  submitBtn.addEventListener("click", checkAnswer);
  
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer();
    }
  });
}

setYear();
wireAppStoreLinks();
wireBuyButtons();
wireModalClose();
wireTutorialButton();
wireTutorialModalClose();
wireTutorialSubmit();
applyPromoCode();
smoothAnchors();
setContactEmail();

