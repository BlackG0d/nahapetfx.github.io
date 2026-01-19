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
    url: "https://pay.ziina.com/nahapetfx/PYnPdF5Qp",
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
}

function applyPromoCode() {
  const promoInput = qs("#promoCode");
  const applyBtn = qs("#applyPromo");
  const promoMessage = qs("#promoMessage");
  const modalTitle = qs(".modal__title");

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

// Language translations
const translations = {
  en: {
    nav_license: "License",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    tutorial: "Tutorial",
    license_btn: "License $129",
    appstore_btn: "App Store (Free)",
    hero_subtitle_1: "MyPasSwordX is not just an app.",
    hero_subtitle_2: "It represents a new generation of digital magic, designed for performers who value elegance, precision, and complete invisibility of method.",
    hero_subtitle_3: "Download it free on the App Store — activate with a license key.",
    key_features: "Key Features",
    built_for: "Built for clean, modern performances.",
    feature_1: "Free to download on the App Store — activate with a license key",
    feature_2: "Full support for iOS 17–26 with advanced Full Liquid Glass UI",
    feature_3: "Any language, fully customizable — match your show, audience, and style",
    feature_4: "Perform without touching the phone — spectator can hold the device from start to finish",
    feature_5: "The spectator never enters their real passcode on the magician's phone.",
    feature_6: "A method that cannot be discovered — engineered to eliminate exposure",
    feature_7: "Integrated with Inject and other professional tools",
    feature_8: "Multiple modes for every performance style",
    feature_9: "URL Scheme & Shortcuts support — automate routines and build workflows",
    feature_10: "Works entirely offline — reliable anywhere you perform",
    get_license_key: "Get License Key",
    free_value: "Free",
    free_download: "Free download",
    pricing_title: "Free download. One‑time activation.",
    pricing_subtitle: "MyPasSwordX is free to download from the App Store. Activate with a license key for $129.",
    license: "License",
    license_key: "License Key",
    one_time: "one‑time",
    activate_full: "Activate the full experience",
    designed_professional: "Designed for professional performance",
    works_offline: "Works offline",
    app_store: "App Store",
    download_free: "Download the app for free",
    install_seconds: "Install in seconds",
    activate_later: "Activate later with a key",
    open_app_store: "Open App Store",
    fineprint: "By clicking \"Get License Key\", you'll be redirected to a secure checkout page. Your key is typically delivered instantly.",
    faq_title: "FAQ",
    faq_subtitle: "",
    faq_1_q: "Does the app require an internet connection?",
    faq_1_a: "No. MyPasSwordX works entirely offline. All features and modes function without Wi‑Fi or mobile data.",
    faq_2_q: "Is the app free in the App Store?",
    faq_2_a: "Yes. MyPasSwordX is free to download. Activation requires a one‑time $129 license key.",
    faq_3_q: "Is the app suitable for professional performances?",
    faq_3_a: "Yes. MyPasSwordX is built specifically for magicians, mentalists, and illusionists performing close‑up, stage, and casual magic.",
    faq_4_q: "Can I customize the language and appearance?",
    faq_4_a: "Yes. The app supports any language and includes multiple appearance options to match your show and style.",
    faq_5_q: "Does the app integrate with other magic tools?",
    faq_5_a: "Yes. MyPasSwordX integrates with Inject and other professional tools via URL Schemes and Shortcuts.",
    faq_6_q: "Can MyPasSwordX unlock a phone during a performance?",
    faq_6_a: "Yes. MyPasSwordX allows you to perform an effect where you can unlock a phone — the spectator's or the performer's — without touching the device and without knowing the real passcode. The spectator may never enter their actual code at any moment, yet you will still be able to know it, name it, or unlock the phone as part of the routine.",
    cta_title: "Ready to perform with total confidence?",
    cta_subtitle: "Download for free — activate with a $129 license key.",
    contact_title: "Contact Us",
    contact_subtitle: "Get in touch if you have questions or need assistance",
    email: "Email",
    whatsapp: "WhatsApp",
    technical_support: "Technical Support",
    modal_title: "License Key • $129",
    modal_subtitle: "One‑time activation for MyPasSwordX",
    secure_checkout: "Secure Checkout",
    checkout_text: "Click the button below to proceed to secure checkout.",
    checkout: "Checkout",
    powered_by: "Powered by",
    promo_code: "Promo Code",
    enter_promo: "Enter promo code",
    apply: "Apply",
    what_happens: "What happens next",
    complete_payment: "Complete the payment",
    receive_key: "Receive your license key within 24 hours",
    enter_key: "Enter the key in MyPasSwordX to activate",
    tip: "Tip: If you don't receive your key within 24 hours, please email us and include your transaction ID.",
    support: "Support:",
    tutorial_modal_title: "Tutorial Access",
    tutorial_modal_subtitle: "Answer the question to continue",
    tutorial_question: "What is The Professor's surname?",
    enter_answer: "Enter your answer...",
    submit_answer: "Submit Answer",
    footer_rights: "All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    payment_methods: "Payment methods:",
    privacy_title: "Privacy Policy",
    privacy_effective_date: "Effective Date:",
    privacy_intro: "NahapetFX (\"we,\" \"our,\" or \"us\") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how information is collected, used, and protected when you visit this website or use our services, including the purchase of digital products.",
    privacy_section1_title: "1. Information We Collect",
    privacy_section1_intro: "We may collect the following types of information:",
    privacy_contact_label: "Contact Information:",
    privacy_contact_desc: "Email address for order processing and customer support",
    privacy_payment_label: "Payment Information:",
    privacy_payment_desc: "Payment-related identifiers (such as transaction IDs) processed through secure third-party providers",
    privacy_license_label: "License Data:",
    privacy_license_desc: "License key status, activation information, and related metadata",
    privacy_technical_label: "Technical Information:",
    privacy_technical_desc: "Browser type, device information, IP address, and operating system data collected automatically",
    privacy_no_collect_label: "Information We Do Not Collect:",
    privacy_no_collect_desc: "We do not collect real passcodes, personal phone data, or other sensitive personal information beyond what is necessary for service delivery.",
    privacy_section2_title: "2. Payment Processing",
    privacy_section2_text: "All payments are processed securely through trusted third-party payment providers, including PayPal, credit/debit card processors, and Apple Pay. We do not store, process, or have access to your full payment card details or banking information. All payment data is handled exclusively by our certified payment processors in accordance with industry security standards.",
    privacy_section3_title: "3. How We Use Your Information",
    privacy_section3_intro: "We use your information solely for the following purposes:",
    privacy_use1: "To process and complete your payment transactions",
    privacy_use2: "To generate and deliver your license keys",
    privacy_use3: "To provide customer support and respond to inquiries",
    privacy_use4: "To prevent fraud, abuse, and unauthorized access",
    privacy_use5: "To improve our services, website functionality, and user experience",
    privacy_sharing_label: "Data Sharing:",
    privacy_sharing_text: "We do not sell, rent, or share your personal data with third parties for marketing or advertising purposes. We may share information only with service providers who assist in payment processing, and only to the extent necessary to provide our services.",
    privacy_section4_title: "4. Digital Products & Licensing",
    privacy_section4_text: "License keys are issued after successful payment verification and are associated with your account for activation and support purposes only. License data is used strictly to ensure proper product functionality, verify authenticity, and prevent unauthorized distribution or use. This information helps us provide technical support and maintain the integrity of our licensing system.",
    privacy_section5_title: "5. Cookies & Analytics",
    privacy_section5_text: "Our website may use basic cookies and analytics tools to enhance performance, analyze usage patterns, and improve user experience. These technologies do not collect personally identifiable information and are used solely for website optimization purposes. You can manage cookie preferences through your browser settings.",
    privacy_section6_title: "6. Data Security",
    privacy_section6_text: "We implement reasonable technical and organizational security measures to protect your information against unauthorized access, loss, alteration, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.",
    privacy_section7_title: "7. Your Rights",
    privacy_section7_intro: "Depending on your jurisdiction, you may have the following rights regarding your personal data:",
    privacy_right_access_label: "Access:",
    privacy_right_access_desc: "Request access to the personal data we hold about you",
    privacy_right_correction_label: "Correction:",
    privacy_right_correction_desc: "Request correction of inaccurate or incomplete data",
    privacy_right_deletion_label: "Deletion:",
    privacy_right_deletion_desc: "Request deletion of your personal data, subject to legal and operational requirements",
    privacy_right_withdrawal_label: "Withdrawal:",
    privacy_right_withdrawal_desc: "Withdraw consent where processing is based on consent",
    privacy_right_portability_label: "Portability:",
    privacy_right_portability_desc: "Request transfer of your data to another service provider where applicable",
    privacy_section7_footer: "To exercise any of these rights, please contact us using the information provided in the Contact section below.",
    privacy_section8_title: "8. Third-Party Services",
    privacy_section8_text: "Our website may contain links to third-party websites or integrate with third-party services (such as payment processors). We are not responsible for the privacy practices, content, or security of these external websites or services. We encourage you to review the privacy policies of any third-party services you interact with.",
    privacy_section9_title: "9. Data Retention",
    privacy_section9_text: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. License-related data may be retained for the duration of your license validity and for a reasonable period thereafter for support and verification purposes.",
    privacy_section10_title: "10. Children's Privacy",
    privacy_section10_text: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete such information.",
    privacy_section11_title: "11. Changes to This Policy",
    privacy_section11_text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Any material changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.",
    privacy_section12_title: "12. Contact Information",
    privacy_section12_intro: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
    privacy_email_label: "Email:",
    privacy_website_label: "Website:",
    terms_title: "Terms of Use",
    terms_effective_date: "Effective Date:",
    terms_effective_date_value: "December 15, 2025",
    terms_intro: "Welcome to NahapetFX. By accessing or using https://nahapetfx.com/ShopFX, purchasing a digital product, or using any related services, you agree to these Terms of Use. If you do not agree with these terms, please do not use our website or services.",
    terms_section1_title: "1. Digital Products & Licensing",
    terms_section1_text: "All products sold on this website are digital products and require a valid license key for activation.",
    terms_section1_item1: "License keys are issued after successful payment",
    terms_section1_item2: "Each license is intended for use by a single purchaser unless explicitly stated otherwise",
    terms_section1_item3: "Licenses are non-transferable and may not be resold or shared",
    terms_section1_item4: "We reserve the right to suspend or revoke any license in cases of abuse, fraud, or violation of these Terms of Use.",
    terms_section2_title: "2. Payments & Delivery",
    terms_section2_item1: "Payments are processed securely through third-party payment providers, including but not limited to PayPal, credit/debit card processors, and Apple Pay.",
    terms_section2_item2: "License keys are typically delivered within 24 hours after successful payment",
    terms_section2_item3: "We are not responsible for delays caused by payment providers, incorrect contact information, or technical issues outside our control",
    terms_section3_title: "3. Refund Policy",
    terms_section3_intro: "Due to the digital nature of our products:",
    terms_section3_item1: "All sales are final",
    terms_section3_item2: "Refunds are not provided once a license key has been issued, except where required by applicable law",
    terms_section3_item3: "If you experience technical issues, please contact support before initiating a chargeback or dispute.",
    terms_section4_title: "4. Acceptable Use",
    terms_section4_intro: "You agree not to:",
    terms_section4_item1: "Share, distribute, or resell license keys",
    terms_section4_item2: "Attempt to reverse-engineer, modify, decompile, or bypass any security mechanisms",
    terms_section4_item3: "Use our products for unlawful, unethical, or misleading purposes",
    terms_section4_item4: "Misrepresent our products, methods, or brand",
    terms_section4_text1: "Users may not intentionally distribute false or misleading statements presented as facts about the Application, its functionality, or its performance, where such statements may cause reputational or commercial harm.",
    terms_section4_text2: "Any violation may result in immediate license termination without refund.",
    terms_section5_title: "5. License Suspension and Termination",
    terms_section5_text: "The Developer reserves the right to suspend or revoke access to the Application and any associated licenses if a user is found to be in material breach of these Terms, including intentional misrepresentation or misuse of the Application.",
    terms_section6_title: "6. Good Faith and Free Expression",
    terms_section6_text: "Nothing in these Terms restricts the user's right to express honest opinions, share personal experiences, leave reviews, or provide fair and constructive criticism.",
    terms_section7_title: "7. No Refunds After Revocation",
    terms_section7_text: "If access is revoked due to a material breach of these Terms, any associated fees or license payments are non-refundable.",
    terms_section8_title: "8. Intellectual Property",
    terms_section8_text1: "All software, content, designs, text, graphics, trademarks, logos, and digital products available on this website are the exclusive property of NahapetFX.",
    terms_section8_text2: "You may not copy, reproduce, distribute, or exploit any part of our products or content without prior written permission.",
    terms_section9_title: "9. Disclaimer",
    terms_section9_text1: "All products and services are provided \"as is\" and \"as available.\"",
    terms_section9_text2: "We make no warranties or guarantees regarding:",
    terms_section9_item1: "Uninterrupted or error-free operation",
    terms_section9_item2: "Compatibility with all devices or future software updates",
    terms_section9_item3: "Specific performance outcomes or results",
    terms_section9_text3: "Use of our products is at your own risk.",
    terms_section10_title: "10. Limitation of Liability",
    terms_section10_text: "To the maximum extent permitted by law, NahapetFX shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use or inability to use our products or services.",
    terms_section11_title: "11. Third-Party Services",
    terms_section11_text: "Our products or website may integrate with or reference third-party services or tools. We are not responsible for the availability, functionality, or policies of any third-party services.",
    terms_section12_title: "12. Changes to These Terms",
    terms_section12_text: "We reserve the right to modify or update these Terms of Use at any time. Any changes will become effective immediately upon being posted on this page.",
    terms_section13_title: "13. Governing Law",
    terms_section13_text: "These Terms of Use shall be governed by and interpreted in accordance with applicable international laws, without regard to conflict of law principles.",
    terms_contact_intro: "If you have any questions regarding these Terms of Use, please contact us:"
  },
  ru: {
    nav_license: "Лицензия",
    nav_faq: "FAQ",
    nav_contact: "Контакты",
    tutorial: "Обучение",
    license_btn: "Лицензия $129",
    appstore_btn: "App Store (Бесплатно)",
    hero_subtitle_1: "MyPasSwordX — это не просто приложение.",
    hero_subtitle_2: "Это новое поколение цифровой магии, созданное для исполнителей, которые ценят элегантность, точность и полную невидимость метода.",
    hero_subtitle_3: "Скачайте бесплатно в App Store — активируйте с помощью лицензионного ключа.",
    key_features: "Ключевые возможности",
    built_for: "Создано для чистых, современных выступлений.",
    feature_1: "Бесплатная загрузка в App Store — активация с помощью лицензионного ключа",
    feature_2: "Полная поддержка iOS 17–26 с продвинутым интерфейсом Full Liquid Glass UI",
    feature_3: "Любой язык, полностью настраиваемый — подходит для вашего шоу, аудитории и стиля",
    feature_4: "Выступление без прикосновения к телефону — зритель может держать устройство от начала до конца",
    feature_5: "Зритель никогда не вводит свой настоящий пароль на телефоне фокусника.",
    feature_6: "Метод, который невозможно обнаружить — разработан для исключения разоблачения",
    feature_7: "Интеграция с Inject и другими профессиональными инструментами",
    feature_8: "Несколько режимов для любого стиля выступления",
    feature_9: "Поддержка URL Scheme и Shortcuts — автоматизация рутин и создание рабочих процессов",
    feature_10: "Работает полностью офлайн — надежно везде, где вы выступаете",
    get_license_key: "Получить лицензионный ключ",
    free_value: "Бесплатно",
    free_download: "Бесплатная загрузка",
    pricing_title: "Бесплатная загрузка. Одноразовая активация.",
    pricing_subtitle: "MyPasSwordX можно бесплатно скачать из App Store. Активируйте с помощью лицензионного ключа за $129.",
    license: "Лицензия",
    license_key: "Лицензионный ключ",
    one_time: "одноразовая",
    activate_full: "Активировать полный функционал",
    designed_professional: "Создано для профессиональных выступлений",
    works_offline: "Работает офлайн",
    app_store: "App Store",
    download_free: "Скачайте приложение бесплатно",
    install_seconds: "Установка за секунды",
    activate_later: "Активируйте позже с помощью ключа",
    open_app_store: "Открыть App Store",
    fineprint: "Нажав \"Получить лицензионный ключ\", вы будете перенаправлены на защищенную страницу оплаты. Ваш ключ обычно доставляется мгновенно.",
    faq_title: "FAQ",
    faq_subtitle: "",
    faq_1_q: "Требуется ли приложению подключение к интернету?",
    faq_1_a: "Нет. MyPasSwordX работает полностью офлайн. Все функции и режимы работают без Wi‑Fi или мобильных данных.",
    faq_2_q: "Приложение бесплатное в App Store?",
    faq_2_a: "Да. MyPasSwordX можно бесплатно скачать. Активация требует одноразовый лицензионный ключ за $129.",
    faq_3_q: "Подходит ли приложение для профессиональных выступлений?",
    faq_3_a: "Да. MyPasSwordX создано специально для фокусников, менталистов и иллюзионистов, выступающих в жанрах близкого контакта, сцены и казуальной магии.",
    faq_4_q: "Могу ли я настроить язык и внешний вид?",
    faq_4_a: "Да. Приложение поддерживает любой язык и включает несколько вариантов внешнего вида, соответствующих вашему шоу и стилю.",
    faq_5_q: "Интегрируется ли приложение с другими инструментами для магии?",
    faq_5_a: "Да. MyPasSwordX интегрируется с Inject и другими профессиональными инструментами через URL Schemes и Shortcuts.",
    faq_6_q: "Может ли MyPasSwordX разблокировать телефон во время выступления?",
    faq_6_a: "Да. MyPasSwordX позволяет выполнить эффект, при котором вы можете разблокировать телефон — зрителя или исполнителя — без прикосновения к устройству и без знания настоящего пароля. Зритель может никогда не вводить свой настоящий код, но вы все равно сможете узнать его, назвать или разблокировать телефон как часть рутины.",
    cta_title: "Готовы выступать с полной уверенностью?",
    cta_subtitle: "Скачайте бесплатно — активируйте с помощью лицензионного ключа за $129.",
    contact_title: "Свяжитесь с нами",
    contact_subtitle: "Свяжитесь с нами, если у вас есть вопросы или нужна помощь",
    email: "Email",
    whatsapp: "WhatsApp",
    technical_support: "Техническая поддержка",
    modal_title: "Лицензионный ключ • $129",
    modal_subtitle: "Одноразовая активация для MyPasSwordX",
    secure_checkout: "Безопасная оплата",
    checkout_text: "Нажмите кнопку ниже, чтобы перейти на защищенную страницу оплаты.",
    checkout: "Оплатить",
    powered_by: "Работает на",
    promo_code: "Промокод",
    enter_promo: "Введите промокод",
    apply: "Применить",
    what_happens: "Что дальше",
    complete_payment: "Завершите оплату",
    receive_key: "Получите лицензионный ключ в течение 24 часов",
    enter_key: "Введите ключ в MyPasSwordX для активации",
    tip: "Совет: Если вы не получили ключ в течение 24 часов, пожалуйста, напишите нам по электронной почте и укажите идентификатор транзакции.",
    support: "Поддержка:",
    tutorial_modal_title: "Доступ к обучению",
    tutorial_modal_subtitle: "Ответьте на вопрос, чтобы продолжить",
    tutorial_question: "Какова фамилия Профессора?",
    enter_answer: "Введите ваш ответ...",
    submit_answer: "Отправить ответ",
    footer_rights: "Все права защищены.",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия использования",
    payment_methods: "Способы оплаты:",
    privacy_title: "Политика конфиденциальности",
    privacy_effective_date: "Дата вступления в силу:",
    privacy_intro: "NahapetFX («мы», «наш» или «нас») уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. Настоящая Политика конфиденциальности объясняет, как собирается, используется и защищается информация при посещении этого веб-сайта или использовании наших услуг, включая покупку цифровых продуктов.",
    privacy_section1_title: "1. Информация, которую мы собираем",
    privacy_section1_intro: "Мы можем собирать следующие типы информации:",
    privacy_contact_label: "Контактная информация:",
    privacy_contact_desc: "Адрес электронной почты для обработки заказов и поддержки клиентов",
    privacy_payment_label: "Платежная информация:",
    privacy_payment_desc: "Идентификаторы, связанные с платежами (такие как идентификаторы транзакций), обрабатываемые через безопасных сторонних поставщиков",
    privacy_license_label: "Данные лицензии:",
    privacy_license_desc: "Статус лицензионного ключа, информация об активации и связанные метаданные",
    privacy_technical_label: "Техническая информация:",
    privacy_technical_desc: "Тип браузера, информация об устройстве, IP-адрес и данные операционной системы, собираемые автоматически",
    privacy_no_collect_label: "Информация, которую мы не собираем:",
    privacy_no_collect_desc: "Мы не собираем реальные пароли, личные данные телефона или другую конфиденциальную личную информацию сверх того, что необходимо для предоставления услуг.",
    privacy_section2_title: "2. Обработка платежей",
    privacy_section2_text: "Все платежи обрабатываются безопасно через надежных сторонних поставщиков платежных услуг, включая PayPal, процессоры кредитных/дебетовых карт и Apple Pay. Мы не храним, не обрабатываем и не имеем доступа к полным данным вашей платежной карты или банковской информации. Все платежные данные обрабатываются исключительно нашими сертифицированными процессорами платежей в соответствии с отраслевыми стандартами безопасности.",
    privacy_section3_title: "3. Как мы используем вашу информацию",
    privacy_section3_intro: "Мы используем вашу информацию исключительно для следующих целей:",
    privacy_use1: "Для обработки и завершения ваших платежных транзакций",
    privacy_use2: "Для создания и доставки ваших лицензионных ключей",
    privacy_use3: "Для предоставления поддержки клиентам и ответа на запросы",
    privacy_use4: "Для предотвращения мошенничества, злоупотреблений и несанкционированного доступа",
    privacy_use5: "Для улучшения наших услуг, функциональности веб-сайта и пользовательского опыта",
    privacy_sharing_label: "Обмен данными:",
    privacy_sharing_text: "Мы не продаем, не сдаем в аренду и не передаем ваши персональные данные третьим лицам в маркетинговых или рекламных целях. Мы можем делиться информацией только с поставщиками услуг, которые помогают в обработке платежей, и только в той степени, в какой это необходимо для предоставления наших услуг.",
    privacy_section4_title: "4. Цифровые продукты и лицензирование",
    privacy_section4_text: "Лицензионные ключи выдаются после успешной проверки платежа и связаны с вашим аккаунтом исключительно для целей активации и поддержки. Данные лицензии используются строго для обеспечения надлежащей функциональности продукта, проверки подлинности и предотвращения несанкционированного распространения или использования. Эта информация помогает нам предоставлять техническую поддержку и поддерживать целостность нашей системы лицензирования.",
    privacy_section5_title: "5. Файлы cookie и аналитика",
    privacy_section5_text: "Наш веб-сайт может использовать базовые файлы cookie и аналитические инструменты для повышения производительности, анализа моделей использования и улучшения пользовательского опыта. Эти технологии не собирают лично идентифицируемую информацию и используются исключительно для целей оптимизации веб-сайта. Вы можете управлять настройками cookie через настройки вашего браузера.",
    privacy_section6_title: "6. Безопасность данных",
    privacy_section6_text: "Мы применяем разумные технические и организационные меры безопасности для защиты вашей информации от несанкционированного доступа, потери, изменения или неправомерного использования. Однако ни один метод передачи через интернет или электронного хранения не является на 100% безопасным. Хотя мы стремимся защитить ваши данные, мы не можем гарантировать абсолютную безопасность.",
    privacy_section7_title: "7. Ваши права",
    privacy_section7_intro: "В зависимости от вашей юрисдикции, вы можете иметь следующие права в отношении ваших персональных данных:",
    privacy_right_access_label: "Доступ:",
    privacy_right_access_desc: "Запросить доступ к персональным данным, которые мы храним о вас",
    privacy_right_correction_label: "Исправление:",
    privacy_right_correction_desc: "Запросить исправление неточных или неполных данных",
    privacy_right_deletion_label: "Удаление:",
    privacy_right_deletion_desc: "Запросить удаление ваших персональных данных, с учетом правовых и операционных требований",
    privacy_right_withdrawal_label: "Отзыв:",
    privacy_right_withdrawal_desc: "Отозвать согласие, когда обработка основана на согласии",
    privacy_right_portability_label: "Портативность:",
    privacy_right_portability_desc: "Запросить передачу ваших данных другому поставщику услуг, где это применимо",
    privacy_section7_footer: "Для осуществления любого из этих прав, пожалуйста, свяжитесь с нами, используя информацию, предоставленную в разделе Контакты ниже.",
    privacy_section8_title: "8. Сторонние сервисы",
    privacy_section8_text: "Наш веб-сайт может содержать ссылки на сторонние веб-сайты или интегрироваться со сторонними сервисами (такими как процессоры платежей). Мы не несем ответственности за практики конфиденциальности, содержание или безопасность этих внешних веб-сайтов или сервисов. Мы рекомендуем вам ознакомиться с политиками конфиденциальности любых сторонних сервисов, с которыми вы взаимодействуете.",
    privacy_section9_title: "9. Хранение данных",
    privacy_section9_text: "Мы храним ваши персональные данные только в течение времени, необходимого для выполнения целей, изложенных в настоящей Политике конфиденциальности, соблюдения правовых обязательств, разрешения споров и обеспечения соблюдения наших соглашений. Данные, связанные с лицензией, могут храниться в течение срока действия вашей лицензии и в течение разумного периода после этого для целей поддержки и верификации.",
    privacy_section10_title: "10. Конфиденциальность детей",
    privacy_section10_text: "Наши услуги не предназначены для лиц младше 18 лет. Мы не собираем намеренно личную информацию от детей. Если вы считаете, что мы случайно собрали информацию от ребенка, пожалуйста, немедленно свяжитесь с нами, чтобы мы могли удалить такую информацию.",
    privacy_section11_title: "11. Изменения в этой политике",
    privacy_section11_text: "Мы можем время от времени обновлять эту Политику конфиденциальности, чтобы отражать изменения в наших практиках, технологиях, правовых требованиях или других факторах. Любые существенные изменения будут размещены на этой странице с обновленной датой вступления в силу. Мы рекомендуем вам периодически просматривать эту Политику конфиденциальности, чтобы быть в курсе того, как мы защищаем вашу информацию.",
    privacy_section12_title: "12. Контактная информация",
    privacy_section12_intro: "Если у вас есть вопросы, опасения или запросы относительно этой Политики конфиденциальности или наших практик работы с данными, пожалуйста, свяжитесь с нами:",
    privacy_email_label: "Email:",
    privacy_website_label: "Веб-сайт:",
    terms_title: "Условия использования",
    terms_effective_date: "Дата вступления в силу:",
    terms_effective_date_value: "15 декабря 2025",
    terms_intro: "Добро пожаловать в NahapetFX. Получая доступ или используя https://nahapetfx.com/ShopFX, приобретая цифровой продукт или используя любые связанные услуги, вы соглашаетесь с этими Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не используйте наш веб-сайт или услуги.",
    terms_section1_title: "1. Цифровые продукты и лицензирование",
    terms_section1_text: "Все продукты, продаваемые на этом веб-сайте, являются цифровыми продуктами и требуют действительного лицензионного ключа для активации.",
    terms_section1_item1: "Лицензионные ключи выдаются после успешной оплаты",
    terms_section1_item2: "Каждая лицензия предназначена для использования одним покупателем, если явно не указано иное",
    terms_section1_item3: "Лицензии не подлежат передаче и не могут быть перепроданы или переданы",
    terms_section1_item4: "Мы оставляем за собой право приостановить или отозвать любую лицензию в случаях злоупотребления, мошенничества или нарушения этих Условий использования.",
    terms_section2_title: "2. Платежи и доставка",
    terms_section2_item1: "Платежи обрабатываются безопасно через сторонних поставщиков платежных услуг, включая, но не ограничиваясь, PayPal, процессоры кредитных/дебетовых карт и Apple Pay.",
    terms_section2_item2: "Лицензионные ключи обычно доставляются в течение 24 часов после успешной оплаты",
    terms_section2_item3: "Мы не несем ответственности за задержки, вызванные поставщиками платежных услуг, неверной контактной информацией или техническими проблемами, находящимися вне нашего контроля",
    terms_section3_title: "3. Политика возврата",
    terms_section3_intro: "В связи с цифровой природой наших продуктов:",
    terms_section3_item1: "Все продажи являются окончательными",
    terms_section3_item2: "Возврат средств не предоставляется после выдачи лицензионного ключа, за исключением случаев, предусмотренных применимым законодательством",
    terms_section3_item3: "Если вы столкнулись с техническими проблемами, пожалуйста, свяжитесь со службой поддержки перед инициацией возврата платежа или спора.",
    terms_section4_title: "4. Допустимое использование",
    terms_section4_intro: "Вы соглашаетесь не:",
    terms_section4_item1: "Делиться, распространять или перепродавать лицензионные ключи",
    terms_section4_item2: "Пытаться реконструировать, модифицировать, декомпилировать или обойти любые механизмы безопасности",
    terms_section4_item3: "Использовать наши продукты в незаконных, неэтичных или вводящих в заблуждение целях",
    terms_section4_item4: "Искажать наши продукты, методы или бренд",
    terms_section4_text1: "Пользователи не могут намеренно распространять ложные или вводящие в заблуждение заявления, представленные как факты о Приложении, его функциональности или производительности, где такие заявления могут причинить репутационный или коммерческий вред.",
    terms_section4_text2: "Любое нарушение может привести к немедленному прекращению лицензии без возврата средств.",
    terms_section5_title: "5. Приостановка и прекращение лицензии",
    terms_section5_text: "Разработчик оставляет за собой право приостановить или отозвать доступ к Приложению и любым связанным лицензиям, если пользователь будет признан существенно нарушающим эти Условия, включая умышленное искажение или неправомерное использование Приложения.",
    terms_section6_title: "6. Добросовестность и свобода выражения",
    terms_section6_text: "Ничто в этих Условиях не ограничивает право пользователя выражать честные мнения, делиться личным опытом, оставлять отзывы или предоставлять справедливую и конструктивную критику.",
    terms_section7_title: "7. Отсутствие возврата после отзыва",
    terms_section7_text: "Если доступ отозван из-за существенного нарушения этих Условий, любые связанные сборы или платежи за лицензию не подлежат возврату.",
    terms_section8_title: "8. Интеллектуальная собственность",
    terms_section8_text1: "Все программное обеспечение, контент, дизайн, текст, графика, товарные знаки, логотипы и цифровые продукты, доступные на этом веб-сайте, являются исключительной собственностью NahapetFX.",
    terms_section8_text2: "Вы не можете копировать, воспроизводить, распространять или эксплуатировать любую часть наших продуктов или контента без предварительного письменного разрешения.",
    terms_section9_title: "9. Отказ от ответственности",
    terms_section9_text1: "Все продукты и услуги предоставляются \"как есть\" и \"по мере доступности\".",
    terms_section9_text2: "Мы не даем никаких гарантий или обещаний относительно:",
    terms_section9_item1: "Бесперебойной или безошибочной работы",
    terms_section9_item2: "Совместимости со всеми устройствами или будущими обновлениями программного обеспечения",
    terms_section9_item3: "Конкретных результатов производительности или результатов",
    terms_section9_text3: "Использование наших продуктов осуществляется на ваш собственный риск.",
    terms_section10_title: "10. Ограничение ответственности",
    terms_section10_text: "В максимальной степени, разрешенной законом, NahapetFX не несет ответственности за любые прямые, косвенные, случайные, последующие или особые убытки, возникающие в результате использования или невозможности использования наших продуктов или услуг.",
    terms_section11_title: "11. Сторонние сервисы",
    terms_section11_text: "Наши продукты или веб-сайт могут интегрироваться с или ссылаться на сторонние сервисы или инструменты. Мы не несем ответственности за доступность, функциональность или политику любых сторонних сервисов.",
    terms_section12_title: "12. Изменения в этих Условиях",
    terms_section12_text: "Мы оставляем за собой право изменять или обновлять эти Условия использования в любое время. Любые изменения вступают в силу немедленно после публикации на этой странице.",
    terms_section13_title: "13. Применимое право",
    terms_section13_text: "Эти Условия использования регулируются и толкуются в соответствии с применимыми международными законами, без учета принципов коллизионного права.",
    terms_contact_intro: "Если у вас есть вопросы относительно этих Условий использования, пожалуйста, свяжитесь с нами:"
  },
  hy: {
    nav_license: "Լիցենզիա",
    nav_faq: "Հաճախակի հարցեր",
    nav_contact: "Կապ",
    tutorial: "Ուսուցում",
    license_btn: "Լիցենզիա $129",
    appstore_btn: "App Store (Անվճար)",
    hero_subtitle_1: "MyPasSwordX-ը պարզապես հավելված չէ։",
    hero_subtitle_2: "Այն թվային մոգության նոր սերնդի լուծում է՝ ստեղծված պրոֆեսիոնալ կատարողների համար, ովքեր կարևորում են նրբագեղությունը, ճշգրտությունը և մեթոդի լիակատար անտեսանելիությունը։",
    hero_subtitle_3: "Հավելվածը հասանելի է App Store-ում անվճար ներբեռնման համար և ակտիվացվում է լիցենզիայի բանալիով։",
    key_features: "Հիմնական հնարավորություններ",
    built_for: "Ստեղծված է մաքուր, ժամանակակից և էսթետիկ կատարումների համար",
    feature_1: "Անվճար ներբեռնում App Store-ից, ակտիվացում՝ լիցենզիայի բանալիով",
    feature_2: "Լիարժեք աջակցություն iOS 17–26 համակարգերին՝ առաջադեմ Full Liquid Glass UI ինտերֆեյսով",
    feature_3: "Աշխատում է ցանկացած լեզվով, ամբողջությամբ կարգավորվող՝ համապատասխանեցրեք ձեր շոուին, հանդիսատեսին և ոճին",
    feature_4: "Կատարում առանց հեռախոսին դիպչելու․ դիտողը կարող է պահել սարքը սկզբից մինչև վերջ",
    feature_5: "Դիտողը երբեք չի մուտքագրում իր իրական գաղտնաբառը մոգի հեռախոսի վրա",
    feature_6: "Մեթոդ, որը հնարավոր չէ բացահայտել․ նախագծված է բացառելու ցանկացած «exposure»",
    feature_7: "Ինտեգրում Inject-ի և այլ պրոֆեսիոնալ գործիքների հետ",
    feature_8: "Բազմաթիվ ռեժիմներ՝ ցանկացած կատարողական ոճի համար",
    feature_9: "URL Scheme և Shortcuts աջակցություն՝ ավտոմատացման և workflow-ների կառուցման համար",
    feature_10: "Աշխատում է ամբողջությամբ offline՝ վստահելի ցանկացած վայրում, որտեղ կատարում եք",
    get_license_key: "Ստանալ լիցենզիայի բանալի",
    free_value: "Անվճար",
    free_download: "Անվճար ներբեռնում",
    pricing_title: "Անվճար ներբեռնում։ Մեկանգամյա ակտիվացում։",
    pricing_subtitle: "MyPasSwordX-ը հասանելի է անվճար ներբեռնման համար App Store-ում։ Ակտիվացումը կատարվում է մեկանգամյա լիցենզիայի բանալիով՝ $129 արժեքով։",
    license: "Լիցենզիա",
    license_key: "Լիցենզիայի բանալի",
    one_time: "մեկանգամյա վճարում",
    activate_full: "Ակտիվացրեք ամբողջական փորձառությունը",
    designed_professional: "Ստեղծված է պրոֆեսիոնալ կատարումների համար",
    works_offline: "Աշխատում է ամբողջությամբ offline",
    app_store: "App Store",
    download_free: "Ներբեռնեք հավելվածը անվճար",
    install_seconds: "Տեղադրեք մի քանի վայրկյանում",
    activate_later: "Ակտիվացրեք ավելի ուշ՝ լիցենզիայի բանալիով",
    open_app_store: "Բացել App Store",
    fineprint: "Սեղմելով «Ստանալ լիցենզիայի բանալի» կոճակը՝ դուք կտեղափոխվեք անվտանգ վճարման էջ։ Լիցենզիայի բանալին սովորաբար տրամադրվում է ակնթարթորեն։",
    faq_title: "Հաճախ տրվող հարցեր",
    faq_subtitle: "",
    faq_1_q: "Արդյո՞ք հավելվածը պահանջում է ինտերնետ կապ։",
    faq_1_a: "Ոչ։ MyPasSwordX-ը աշխատում է ամբողջությամբ offline ռեժիմում։ Բոլոր հնարավորություններն ու ռեժիմները հասանելի են առանց Wi-Fi-ի կամ բջջային տվյալների։",
    faq_2_q: "Արդյո՞ք հավելվածը անվճար է App Store-ում։",
    faq_2_a: "Այո։ MyPasSwordX-ը հասանելի է անվճար ներբեռնման համար։ Լիարժեք ակտիվացման համար անհրաժեշտ է մեկանգամյա լիցենզիայի բանալի՝ $129 արժեքով։",
    faq_3_q: "Արդյո՞ք հավելվածը հարմար է պրոֆեսիոնալ կատարումների համար։",
    faq_3_a: "Այո։ MyPasSwordX-ը ստեղծված է հատուկ աճպարարների, մենտալիստների և իլյուզիոնիստների համար՝ թե՛ close-up, թե՛ բեմական և թե՛ ոչ ֆորմալ կատարումների ընթացքում օգտագործելու համար։",
    faq_4_q: "Կարո՞ղ եմ հարմարեցնել լեզուն և տեսքը։",
    faq_4_a: "Այո։ Հավելվածը աջակցում է ցանկացած լեզվի և առաջարկում է տեսքի բազմաթիվ կարգավորումներ՝ ձեր շոուին և ոճին համապատասխանեցնելու համար։",
    faq_5_q: "Արդյո՞ք հավելվածը ինտեգրվում է այլ մոգական գործիքների հետ։",
    faq_5_a: "Այո։ MyPasSwordX-ը ինտեգրվում է Inject-ի և այլ պրոֆեսիոնալ գործիքների հետ՝ URL Scheme-ների և Shortcuts-ի միջոցով։",
    faq_6_q: "Կարո՞ղ է MyPasSwordX-ը բացել հեռախոսը ներկայացման ժամանակ:",
    faq_6_a: "Այո: MyPasSwordX-ը թույլ է տալիս կատարել էֆեկտ, որտեղ դուք կարող եք բացել հեռախոս — հանդիսատեսի կամ կատարողի — առանց սարքին դիպչելու և առանց իրական գաղտնաբառը իմանալու: Հանդիսատեսը կարող է երբեք չմուտքագրել իր իրական կոդը, բայց դուք դեռ կկարողանաք իմանալ այն, անվանել կամ բացել հեռախոսը որպես ռուտինի մաս:",
    cta_title: "Պատրա՞ստ եք վստահորեն ցուցադրել ելույթի ընթացքում։",
    cta_subtitle: "Ներբեռնեք անվճար և ակտիվացրեք մեկանգամյա $129 արժողությամբ լիցենզիայի բանալիով։",
    contact_title: "Կապ մեզ հետ",
    contact_subtitle: "Կապվեք մեզ հետ, եթե ունեք հարցեր կամ անհրաժեշտ է աջակցություն։",
    email: "Էլ. փոստ",
    whatsapp: "WhatsApp",
    technical_support: "Տեխնիկական աջակցություն",
    modal_title: "Լիցենզիայի բանալի • $129",
    modal_subtitle: "Միանվագ ակտիվացում MyPasSwordX-ի համար",
    secure_checkout: "Անվտանգ վճարում",
    checkout_text: "Սեղմեք ստորև գտնվող կոճակը անվտանգ վճարման էջին անցնելու համար:",
    checkout: "Վճարել",
    powered_by: "Աշխատում է",
    promo_code: "Պրոմո կոդ",
    enter_promo: "Մուտքագրեք պրոմո կոդ",
    apply: "Կիրառել",
    what_happens: "Ինչ է տեղի ունենում հաջորդիվ",
    complete_payment: "Ավարտեք վճարումը",
    receive_key: "Ստացեք ձեր լիցենզիայի բանալին մինչև 24 ժամվա ընթացքում",
    enter_key: "Մուտքագրեք բանալին MyPasSwordX-ում՝ ակտիվացման համար",
    tip: "Խորհուրդ․ Եթե 24 ժամվա ընթացքում չեք ստացել ձեր բանալին, խնդրում ենք գրել մեզ էլ․փոստով՝ նշելով ձեր գործարքի ID-ն։",
    support: "Աջակցություն:",
    tutorial_modal_title: "Ուսուցման մուտք",
    tutorial_modal_subtitle: "Պատասխանեք հարցին շարունակելու համար",
    tutorial_question: "Ո՞րն է Պրոֆեսորի ազգանունը:",
    enter_answer: "Մուտքագրեք ձեր պատասխանը...",
    submit_answer: "Ուղարկել պատասխան",
    footer_rights: "Բոլոր իրավունքները պաշտպանված են:",
    footer_privacy: "Գաղտնիության քաղաքականություն",
    footer_terms: "Օգտագործման պայմաններ",
    payment_methods: "Վճարման եղանակներ:",
    privacy_title: "Գաղտնիության քաղաքականություն",
    privacy_effective_date: "Գործողության մեկնարկի ամսաթիվ՝",
    privacy_intro: "NahapetFX-ը («մենք», «մեր» կամ «մեզ») հարգում է ձեր գաղտնիությունը և պարտավորվում է պաշտպանել ձեր անձնական տվյալները։ Սույն Գաղտնիության քաղաքականությունը բացատրում է, թե ինչպես են տվյալները հավաքվում, օգտագործվում և պաշտպանվում այս վեբ կայք այցելելիս կամ մեր ծառայություններից օգտվելիս, ներառյալ թվային ապրանքների գնումը։",
    privacy_section1_title: "1. Մեզ կողմից հավաքվող տեղեկությունները",
    privacy_section1_intro: "Մենք կարող ենք հավաքել հետևյալ տեսակի տեղեկություններ․",
    privacy_contact_label: "Կոնտակտային տվյալներ",
    privacy_contact_desc: "էլ․փոստի հասցե՝ պատվերի մշակման և հաճախորդների աջակցություն տրամադրելու նպատակով",
    privacy_payment_label: "Վճարային տվյալներ",
    privacy_payment_desc: "վճարման հետ կապված նույնացուցիչներ (օրինակ՝ գործարքի ID), որոնք մշակվում են անվտանգ երրորդ կողմի վճարային ծառայությունների միջոցով",
    privacy_license_label: "Լիցենզիայի տվյալներ",
    privacy_license_desc: "լիցենզիայի բանալու կարգավիճակ, ակտիվացման տեղեկություններ և դրանց հետ կապված մետատվյալներ",
    privacy_technical_label: "Տեխնիկական տվյալներ",
    privacy_technical_desc: "դիտարկիչի տեսակը, սարքի վերաբերյալ տվյալներ, IP հասցե և օպերացիոն համակարգի մասին տեղեկություններ, որոնք հավաքվում են ավտոմատ կերպով",
    privacy_no_collect_label: "Տվյալներ, որոնք մենք չենք հավաքում",
    privacy_no_collect_desc: "մենք չենք հավաքում իրական գաղտնաբառեր, հեռախոսի անձնական տվյալներ կամ այլ զգայուն անձնական տեղեկատվություն, բացի այն նվազագույն տվյալներից, որոնք անհրաժեշտ են ծառայության տրամադրման համար։",
    privacy_section2_title: "2. Վճարումների մշակումը",
    privacy_section2_text: "Բոլոր վճարումները մշակվում են անվտանգ եղանակով՝ վստահելի երրորդ կողմի վճարային ծառայությունների միջոցով, ներառյալ PayPal-ը, բանկային քարտերի (կրեդիտ/դեբետ) մշակման համակարգերը և Apple Pay-ը։ Մենք չենք պահպանում, չենք մշակում և մուտք չունենք ձեր ամբողջական քարտային տվյալներին կամ բանկային տեղեկատվությանը։ Վճարային բոլոր տվյալները մշակվում են բացառապես հավաստագրված վճարային պրովայդերների կողմից՝ ոլորտի անվտանգության ստանդարտներին համապատասխան։",
    privacy_section3_title: "3. Ինչպես ենք օգտագործում ձեր տվյալները",
    privacy_section3_intro: "Մենք օգտագործում ենք ձեր տվյալները բացառապես հետևյալ նպատակներով․",
    privacy_use1: "Վճարային գործարքների մշակման և ավարտման համար",
    privacy_use2: "Լիցենզիայի բանալիների ստեղծման և տրամադրման համար",
    privacy_use3: "Հաճախորդների աջակցություն ապահովելու և հարցումներին պատասխանելու համար",
    privacy_use4: "Խարդախությունը, չարաշահումները և չարտոնված մուտքը կանխելու համար",
    privacy_use5: "Մեր ծառայությունների, կայքի գործառույթների և օգտագործողի փորձի բարելավման համար",
    privacy_sharing_label: "Տվյալների փոխանցում",
    privacy_sharing_text: "մենք չենք վաճառում, չենք վարձակալում և չենք փոխանցում ձեր անձնական տվյալները երրորդ կողմերին մարքեթինգային կամ գովազդային նպատակներով։ Տվյալները կարող են փոխանցվել միայն այն ծառայություններ մատուցողներին, որոնք ներգրավված են վճարումների մշակման գործընթացում, և միայն այն չափով, որքան անհրաժեշտ է մեր ծառայությունները մատուցելու համար։",
    privacy_section4_title: "4. Թվային ապրանքներ և լիցենզավորում",
    privacy_section4_text: "Լիցենզիայի բանալիները տրամադրվում են հաջողված վճարման հաստատումից հետո և կապված են ձեր հաշվին՝ բացառապես ակտիվացման և աջակցություն տրամադրելու նպատակով։ Լիցենզիայի տվյալները օգտագործվում են միայն հավելվածի ճիշտ աշխատանքը ապահովելու, իսկության ստուգման և չարտոնված տարածումը կամ օգտագործումը կանխելու համար։ Այս տեղեկությունները մեզ օգնում են տրամադրել տեխնիկական աջակցություն և պահպանել լիցենզավորման համակարգի ամբողջականությունը։",
    privacy_section5_title: "5. Թխուկներ (Cookies) և վերլուծություն",
    privacy_section5_text: "Մեր վեբ կայքը կարող է օգտագործել հիմնական թխուկներ և վերլուծական գործիքներ՝ կայքի աշխատանքը բարելավելու, օգտագործման օրինաչափությունները վերլուծելու և օգտագործողի փորձը զարգացնելու նպատակով։ Այս տեխնոլոգիաները չեն հավաքում անձը նույնականացնող տվյալներ և կիրառվում են բացառապես կայքի օպտիմալացման համար։ Թխուկների կարգավորումները կարող եք կառավարել ձեր դիտարկչի միջոցով։",
    privacy_section6_title: "6. Տվյալների անվտանգություն",
    privacy_section6_text: "Մենք կիրառում ենք համապատասխան տեխնիկական և կազմակերպչական անվտանգության միջոցներ՝ ձեր տվյալները չարտոնված մուտքից, կորստից, փոփոխումից կամ չարաշահումից պաշտպանելու համար։ Այնուամենայնիվ, ինտերնետի միջոցով փոխանցվող կամ էլեկտրոնային եղանակով պահպանվող տվյալների անվտանգությունը երբեք չի կարող լիովին երաշխավորվել։ Չնայած մեր ջանքերին՝ մենք չենք կարող ապահովել տվյալների բացարձակ անվտանգություն։",
    privacy_section7_title: "7. Ձեր իրավունքները",
    privacy_section7_intro: "Կախված ձեր իրավազորությունից՝ դուք կարող եք ունենալ հետևյալ իրավունքները ձեր անձնական տվյալների վերաբերյալ․",
    privacy_right_access_label: "Մուտք",
    privacy_right_access_desc: "պահանջել մուտք ձեր մասին պահպանվող տվյալներին",
    privacy_right_correction_label: "Ուղղում",
    privacy_right_correction_desc: "պահանջել սխալ կամ թերի տվյալների ուղղում",
    privacy_right_deletion_label: "Ջնջում",
    privacy_right_deletion_desc: "պահանջել ձեր անձնական տվյալների ջնջում՝ օրենքով և գործառնական պահանջներով սահմանված սահմաններում",
    privacy_right_withdrawal_label: "Հետկանչ",
    privacy_right_withdrawal_desc: "հետ կանչել ձեր համաձայնությունը այն դեպքերում, երբ տվյալների մշակումը հիմնված է համաձայնության վրա",
    privacy_right_portability_label: "Փոխանցելիություն",
    privacy_right_portability_desc: "պահանջել տվյալների փոխանցում այլ ծառայություն մատուցողին՝ կիրառելի դեպքերում",
    privacy_section7_footer: "Այս իրավունքներից որևէ մեկը իրացնելու համար խնդրում ենք կապ հաստատել մեզ հետ ստորև նշված կոնտակտային տվյալներով։",
    privacy_section8_title: "8. Երրորդ կողմի ծառայություններ",
    privacy_section8_text: "Մեր վեբ կայքը կարող է պարունակել հղումներ դեպի երրորդ կողմի կայքեր կամ ինտեգրվել երրորդ կողմի ծառայությունների հետ (օրինակ՝ վճարային պրովայդերներ)։ Մենք պատասխանատվություն չենք կրում այդ արտաքին կայքերի կամ ծառայությունների գաղտնիության քաղաքականության, բովանդակության կամ անվտանգության համար։ Խորհուրդ ենք տալիս ծանոթանալ այն երրորդ կողմի ծառայությունների գաղտնիության քաղաքականությանը, որոնց հետ փոխգործակցում եք։",
    privacy_section9_title: "9. Տվյալների պահպանման ժամկետ",
    privacy_section9_text: "Մենք պահպանում ենք ձեր անձնական տվյալները միայն այնքան ժամանակ, որքան անհրաժեշտ է սույն Գաղտնիության քաղաքականությամբ սահմանված նպատակները իրականացնելու, իրավական պարտավորությունները կատարելու, վեճերը լուծելու և մեր համաձայնագրերը կիրառելու համար։ Լիցենզիայի հետ կապված տվյալները կարող են պահպանվել լիցենզիայի գործողության ողջ ընթացքում և դրանից հետո՝ ողջամիտ ժամկետ՝ աջակցություն և վավերացում ապահովելու նպատակով։",
    privacy_section10_title: "10. Երեխաների գաղտնիություն",
    privacy_section10_text: "Մեր ծառայությունները նախատեսված չեն 18 տարեկանից ցածր անձանց համար։ Մենք գիտակցաբար չենք հավաքում երեխաների անձնական տվյալներ։ Եթե կարծում եք, որ մենք պատահաբար հավաքել ենք երեխայի վերաբերյալ տեղեկություններ, խնդրում ենք անմիջապես կապվել մեզ հետ, որպեսզի կարողանանք ջնջել այդ տվյալները։",
    privacy_section11_title: "11. Քաղաքականության փոփոխություններ",
    privacy_section11_text: "Մենք կարող ենք ժամանակ առ ժամանակ թարմացնել սույն Գաղտնիության քաղաքականությունը՝ մեր գործելակերպի, տեխնոլոգիաների, իրավական պահանջների կամ այլ գործոնների փոփոխության արդյունքում։ Բոլոր էական փոփոխությունները կհրապարակվեն այս էջում՝ թարմացված գործողության մեկնարկի ամսաթվով։ Խորհուրդ ենք տալիս պարբերաբար վերանայել այս քաղաքականությունը՝ տեղեկացված մնալու համար, թե ինչպես ենք պաշտպանում ձեր տվյալները։",
    privacy_section12_title: "12. Կոնտակտային տվյալներ",
    privacy_section12_intro: "Եթե ունեք հարցեր, մտահոգություններ կամ պահանջներ սույն Գաղտնիության քաղաքականության կամ տվյալների մշակման վերաբերյալ, կարող եք կապ հաստատել մեզ հետ՝",
    privacy_email_label: "Էլ. փոստ:",
    privacy_website_label: "Կայք:",
    terms_title: "Օգտագործման պայմաններ",
    terms_effective_date: "Գործողության մեկնարկի ամսաթիվ՝",
    terms_effective_date_value: "15 դեկտեմբերի, 2025",
    terms_intro: "Բարի գալուստ NahapetFX։ Մուտք գործելով կամ օգտագործելով https://nahapetfx.com/ShopFX կայքը, ձեռք բերելով թվային արտադրանք կամ օգտվելով դրա հետ կապված ծառայություններից՝ դուք համաձայնում եք սույն Օգտագործման պայմաններին։ Եթե չեք համաձայնում այս պայմանների հետ, խնդրում ենք չօգտվել մեր կայքից կամ ծառայություններից։",
    terms_section1_title: "1. Թվային ապրանքներ և լիցենզավորում",
    terms_section1_text: "Այս կայքում վաճառվող բոլոր ապրանքները թվային են և ակտիվացման համար պահանջում են վավեր լիցենզիայի բանալի։",
    terms_section1_item1: "Լիցենզիայի բանալիները տրամադրվում են հաջողված վճարումից հետո",
    terms_section1_item2: "Յուրաքանչյուր լիցենզիա նախատեսված է մեկ գնորդի համար, եթե հստակ նշված չէ այլ կերպ",
    terms_section1_item3: "Լիցենզիաները չեն կարող փոխանցվել, վերավաճառվել կամ տարածվել",
    terms_section1_item4: "Մենք իրավունք ենք վերապահում կասեցնել կամ չեղարկել ցանկացած լիցենզիա՝ չարաշահման, խարդախության կամ սույն պայմանների խախտման դեպքում",
    terms_section2_title: "2. Վճարումներ և տրամադրում",
    terms_section2_item1: "Վճարումները մշակվում են անվտանգ կերպով երրորդ կողմի վճարային ծառայությունների միջոցով, ներառյալ (բայց չսահմանափակվելով) PayPal-ը, բանկային քարտերի մշակման համակարգերը և Apple Pay-ը",
    terms_section2_item2: "Լիցենզիայի բանալիները սովորաբար տրամադրվում են վճարումից հետո մինչև 24 ժամվա ընթացքում",
    terms_section2_item3: "Մենք պատասխանատվություն չենք կրում ուշացումների համար, որոնք առաջացել են վճարային պրովայդերների, սխալ կոնտակտային տվյալների կամ մեր վերահսկողությունից դուրս տեխնիկական խնդիրների պատճառով",
    terms_section3_title: "3. Վերադարձի քաղաքականություն",
    terms_section3_intro: "Թվային արտադրանքների բնույթից ելնելով՝",
    terms_section3_item1: "Բոլոր վաճառքները վերջնական են",
    terms_section3_item2: "Լիցենզիայի բանալիի տրամադրումից հետո վերադարձ չի իրականացվում, բացառությամբ օրենքով նախատեսված դեպքերի",
    terms_section3_item3: "Տեխնիկական խնդիրների դեպքում խնդրում ենք նախ կապվել աջակցությանը՝ նախքան chargeback կամ վեճ նախաձեռնելը",
    terms_section4_title: "4. Թույլատրելի օգտագործում",
    terms_section4_intro: "Դուք համաձայնում եք չանել հետևյալը․",
    terms_section4_item1: "Կիսվել, տարածել կամ վերավաճառել լիցենզիայի բանալիներ",
    terms_section4_item2: "Փորձել ապակոդավորել, փոփոխել, դեկոմպիլացնել կամ շրջանցել անվտանգության մեխանիզմները",
    terms_section4_item3: "Օգտագործել մեր արտադրանքը անօրինական, ոչ էթիկական կամ մոլորեցնող նպատակներով",
    terms_section4_item4: "Սխալ ներկայացնել մեր արտադրանքը, մեթոդները կամ բրենդը",
    terms_section4_text1: "Օգտատերերին արգելվում է դիտավորյալ տարածել կեղծ կամ մոլորեցնող հայտարարություններ, որոնք ներկայացվում են որպես փաստեր հավելվածի, դրա գործառույթների կամ աշխատանքի վերաբերյալ և կարող են պատճառել հեղինակային կամ առևտրային վնաս։",
    terms_section4_text2: "Ցանկացած խախտում կարող է հանգեցնել լիցենզիայի անմիջական դադարեցման՝ առանց գումարի վերադարձի։",
    terms_section5_title: "5. Լիցենզիայի կասեցում և դադարեցում",
    terms_section5_text: "Մշակողը իրավունք ունի կասեցնել կամ չեղարկել հավելվածի և դրա հետ կապված լիցենզիաների հասանելիությունը, եթե օգտատերը հայտնաբերվի սույն պայմանների էական խախտման մեջ, ներառյալ դիտավորյալ սխալ ներկայացումը կամ հավելվածի չարաշահումը։",
    terms_section6_title: "6. Բարի հավատ և ազատ արտահայտում",
    terms_section6_text: "Սույն պայմանները չեն սահմանափակում օգտատիրոջ իրավունքը արտահայտելու անկեղծ կարծիքներ, կիսվելու անձնական փորձով, թողնելու կարծիքներ կամ ներկայացնելու արդար և կառուցողական քննադատություն։",
    terms_section7_title: "7. Վերադարձի բացակայություն դադարեցման դեպքում",
    terms_section7_text: "Եթե հասանելիությունը դադարեցվում է սույն պայմանների էական խախտման պատճառով, վճարված որևէ գումար կամ լիցենզիայի վճար վերադարձման ենթակա չէ։",
    terms_section8_title: "8. Մտավոր սեփականություն",
    terms_section8_text1: "Այս կայքում հասանելի բոլոր ծրագրային ապահովումները, բովանդակությունը, դիզայնը, տեքստերը, գրաֆիկաները, ապրանքանիշերը, լոգոները և թվային արտադրանքները հանդիսանում են NahapetFX-ի բացառիկ սեփականությունը։",
    terms_section8_text2: "Առանց նախնական գրավոր թույլտվության արգելվում է դրանց որևէ մասի պատճենումը, վերարտադրումը, տարածումը կամ առևտրային օգտագործումը։",
    terms_section9_title: "9. Պատասխանատվության մերժում",
    terms_section9_text1: "Բոլոր արտադրանքներն ու ծառայությունները տրամադրվում են «ինչպես կա» և «ըստ հասանելիության» սկզբունքով։",
    terms_section9_text2: "Մենք որևէ երաշխիք չենք տալիս՝",
    terms_section9_item1: "Անխափան կամ սխալազերծ աշխատանքի վերաբերյալ",
    terms_section9_item2: "Բոլոր սարքերի կամ ապագա ծրագրային թարմացումների հետ համատեղելիության վերաբերյալ",
    terms_section9_item3: "Կոնկրետ արդյունքների կամ կատարողական ցուցանիշների վերաբերյալ",
    terms_section9_text3: "Արտադրանքի օգտագործումը կատարվում է ձեր սեփական ռիսկով։",
    terms_section10_title: "10. Պատասխանատվության սահմանափակում",
    terms_section10_text: "Օրենքով թույլատրելի առավելագույն չափով NahapetFX-ը պատասխանատվություն չի կրում որևէ ուղղակի, անուղղակի, պատահական, հետևանքային կամ հատուկ վնասների համար, որոնք առաջանում են մեր արտադրանքներից կամ ծառայություններից օգտվելու կամ դրանցից օգտվել չկարողանալու արդյունքում։",
    terms_section11_title: "11. Երրորդ կողմի ծառայություններ",
    terms_section11_text: "Մեր արտադրանքները կամ կայքը կարող են ինտեգրվել կամ հղում պարունակել երրորդ կողմի ծառայությունների կամ գործիքների։ Մենք պատասխանատվություն չենք կրում այդ ծառայությունների հասանելիության, գործառույթների կամ քաղաքականության համար։",
    terms_section12_title: "12. Պայմանների փոփոխություններ",
    terms_section12_text: "Մենք իրավունք ենք վերապահում ցանկացած պահի փոփոխել կամ թարմացնել սույն Օգտագործման պայմանները։ Փոփոխությունները ուժի մեջ են մտնում անմիջապես այս էջում հրապարակվելուց հետո։",
    terms_section13_title: "13. Կիրառելի իրավունք",
    terms_section13_text: "Սույն Օգտագործման պայմանները կարգավորվում և մեկնաբանվում են համապատասխան միջազգային օրենքներին համաձայն՝ անկախ իրավական հակասությունների սկզբունքներից։",
    terms_contact_intro: "Եթե ունեք հարցեր սույն Օգտագործման պայմանների վերաբերյալ, խնդրում ենք կապ հաստատել մեզ հետ:"
  }
};

// Language management
let currentLang = localStorage.getItem('lang') || 'en';

function getLangCode() {
  return currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateLangSelector();
  translatePage();
}

function updateLangSelector() {
  const button = qs('#langButton');
  const current = qs('#langCurrent');
  const dropdown = qs('#langDropdown');
  const options = qsa('.lang-selector__option');
  
  if (current) {
    const langCodes = { en: 'EN', ru: 'RU', hy: 'HY' };
    current.textContent = langCodes[currentLang] || 'EN';
  }
  
  options.forEach(opt => {
    opt.setAttribute('data-active', opt.getAttribute('data-lang') === currentLang);
  });
}

function translatePage() {
  const lang = translations[currentLang];
  if (!lang) return;
  
  // Translate elements with data-i18n attribute
  qsa('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang[key]) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = lang[key];
      } else {
        el.textContent = lang[key];
      }
    }
  });
  
  // Translate placeholders with data-i18n-placeholder attribute
  qsa('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (lang[key]) {
      el.placeholder = lang[key];
    }
  });
  
  // Translate hero subtitle (special handling for multi-line)
  const heroSubtitle = qs('.hero__subtitle');
  if (heroSubtitle && lang.hero_subtitle_1) {
    heroSubtitle.innerHTML = `<span class="hero__detailsTitle">${lang.hero_subtitle_1}</span><br />${lang.hero_subtitle_2}<br />${lang.hero_subtitle_3}`;
  }
  
  // Translate feature list
  const featureList = qs('.hero__detailsList');
  if (featureList) {
    const items = featureList.querySelectorAll('li');
    const featureKeys = ['feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5', 'feature_6', 'feature_7', 'feature_8', 'feature_9', 'feature_10'];
    items.forEach((item, index) => {
      if (lang[featureKeys[index]]) {
        const text = lang[featureKeys[index]];
        // Preserve <strong> tags if they exist
        const strongMatch = item.innerHTML.match(/<strong>(.*?)<\/strong>/);
        if (strongMatch && text.includes(strongMatch[1])) {
          item.innerHTML = text.replace(strongMatch[1], `<strong>${strongMatch[1]}</strong>`);
        } else {
          item.innerHTML = text;
        }
      }
    });
  }
  
  // Translate pricing section
  const pricingTitle = qs('#pricing .section__title');
  const pricingSubtitle = qs('#pricing .section__subtitle');
  if (pricingTitle && lang.pricing_title) pricingTitle.textContent = lang.pricing_title;
  if (pricingSubtitle && lang.pricing_subtitle) {
    pricingSubtitle.innerHTML = lang.pricing_subtitle.replace('$129', '<strong>$129</strong>');
  }
  
  // Translate FAQ
  const faqTitle = qs('#faq .section__title');
  const faqSubtitle = qs('#faq .section__subtitle');
  if (faqTitle && lang.faq_title) faqTitle.textContent = lang.faq_title;
  if (faqSubtitle && lang.faq_subtitle) faqSubtitle.textContent = lang.faq_subtitle;
  
  const faqItems = qsa('#faq .faqItem');
  const faqKeys = [
    { q: 'faq_1_q', a: 'faq_1_a' },
    { q: 'faq_2_q', a: 'faq_2_a' },
    { q: 'faq_3_q', a: 'faq_3_a' },
    { q: 'faq_4_q', a: 'faq_4_a' },
    { q: 'faq_5_q', a: 'faq_5_a' },
    { q: 'faq_6_q', a: 'faq_6_a' }
  ];
  faqItems.forEach((item, index) => {
    const summary = item.querySelector('summary');
    const p = item.querySelector('p');
    if (summary && lang[faqKeys[index].q]) summary.textContent = lang[faqKeys[index].q];
    if (p && lang[faqKeys[index].a]) p.textContent = lang[faqKeys[index].a];
  });
  
  // Translate CTA
  const ctaTitle = qs('.cta__title');
  const ctaSubtitle = qs('.cta__subtitle');
  if (ctaTitle && lang.cta_title) ctaTitle.textContent = lang.cta_title;
  if (ctaSubtitle && lang.cta_subtitle) ctaSubtitle.textContent = lang.cta_subtitle;
  
  // Translate contact section
  const contactTitle = qs('.contact-box__title');
  const contactSubtitle = qs('.contact-box__subtitle');
  if (contactTitle && lang.contact_title) contactTitle.textContent = lang.contact_title;
  if (contactSubtitle && lang.contact_subtitle) contactSubtitle.textContent = lang.contact_subtitle;
  
  // Translate modal
  const modalTitle = qs('#buyModal .modal__title');
  const modalSubtitle = qs('#buyModal .modal__subtitle');
  if (modalTitle && lang.modal_title) modalTitle.textContent = lang.modal_title;
  if (modalSubtitle && lang.modal_subtitle) modalSubtitle.textContent = lang.modal_subtitle;
  
  // Update document language
  document.documentElement.lang = currentLang;
}

function wireLanguageSelector() {
  const button = qs('#langButton');
  const dropdown = qs('#langDropdown');
  const options = qsa('.lang-selector__option');
  
  if (!button || !dropdown) return;
  
  // Initialize dropdown state - ensure it's closed on load
  dropdown.setAttribute('aria-hidden', 'true');
  button.setAttribute('aria-expanded', 'false');
  
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.getAttribute('aria-hidden') === 'false';
    dropdown.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
  
  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      if (lang) {
        setLang(lang);
        dropdown.setAttribute('aria-hidden', 'true');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Initialize
  updateLangSelector();
  translatePage();
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
wireLanguageSelector();

