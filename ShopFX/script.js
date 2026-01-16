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
    faq_subtitle: "Quick answers before you perform.",
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
    submit_answer: "Submit Answer"
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
    faq_subtitle: "Быстрые ответы перед выступлением.",
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
    submit_answer: "Отправить ответ"
  },
  hy: {
    nav_license: "Լիցենզիա",
    nav_faq: "Հաճախակի հարցեր",
    nav_contact: "Կապ",
    tutorial: "Ուսուցում",
    license_btn: "Լիցենզիա $129",
    appstore_btn: "App Store (Անվճար)",
    hero_subtitle_1: "MyPasSwordX-ը պարզապես հավելված չէ:",
    hero_subtitle_2: "Այն ներկայացնում է թվային մոգության նոր սերունդ, նախագծված կատարողների համար, ովքեր գնահատում են նրբագեղությունը, ճշգրտությունը և մեթոդի ամբողջական անտեսանելիությունը:",
    hero_subtitle_3: "Ներբեռնեք անվճար App Store-ից — ակտիվացրեք լիցենզիայի բանալիով:",
    key_features: "Հիմնական հատկանիշներ",
    built_for: "Ստեղծված մաքուր, ժամանակակից ներկայացումների համար:",
    feature_1: "Անվճար ներբեռնում App Store-ից — ակտիվացում լիցենզիայի բանալիով",
    feature_2: "Ամբողջական աջակցություն iOS 17–26-ի համար առաջադեմ Full Liquid Glass UI-ով",
    feature_3: "Ցանկացած լեզու, ամբողջությամբ հարմարեցվող — համապատասխանեք ձեր շոուին, հանդիսատեսին և ոճին",
    feature_4: "Կատարեք առանց հեռախոսին դիպչելու — հանդիսատեսը կարող է պահել սարքը սկզբից մինչև վերջ",
    feature_5: "Հանդիսատեսը երբեք չի մուտքագրում իր իրական գաղտնաբառը մոգի հեռախոսում:",
    feature_6: "Մեթոդ, որը չի կարող բացահայտվել — նախագծված է բացահայտումը վերացնելու համար",
    feature_7: "Ինտեգրված է Inject-ի և այլ մասնագիտական գործիքների հետ",
    feature_8: "Բազմաթիվ ռեժիմներ ցանկացած կատարման ոճի համար",
    feature_9: "URL Scheme և Shortcuts աջակցություն — ավտոմատացրեք ռուտինները և ստեղծեք աշխատանքային հոսքեր",
    feature_10: "Ամբողջությամբ աշխատում է օֆլայն — հուսալի ամենուր, որտեղ դուք եք կատարում",
    get_license_key: "Ստանալ լիցենզիայի բանալի",
    free_download: "Անվճար ներբեռնում",
    pricing_title: "Անվճար ներբեռնում: Միանվագ ակտիվացում:",
    pricing_subtitle: "MyPasSwordX-ը կարելի է անվճար ներբեռնել App Store-ից: Ակտիվացրեք լիցենզիայի բանալիով $129-ով:",
    license: "Լիցենզիա",
    license_key: "Լիցենզիայի բանալի",
    one_time: "միանվագ",
    activate_full: "Ակտիվացնել ամբողջական փորձը",
    designed_professional: "Նախագծված մասնագիտական կատարման համար",
    works_offline: "Աշխատում է օֆլայն",
    app_store: "App Store",
    download_free: "Ներբեռնեք հավելվածը անվճար",
    install_seconds: "Տեղադրում վայրկյաններում",
    activate_later: "Ակտիվացրեք ավելի ուշ բանալիով",
    open_app_store: "Բացել App Store",
    fineprint: "\"Ստանալ լիցենզիայի բանալի\" սեղմելով, դուք կուղղորդվեք անվտանգ վճարման էջ: Ձեր բանալին սովորաբար առաքվում է ակնթարթորեն:",
    faq_title: "Հաճախակի հարցեր",
    faq_subtitle: "Արագ պատասխաններ նախքան կատարելը:",
    faq_1_q: "Պահանջո՞ւմ է հավելվածը ինտերնետային կապ:",
    faq_1_a: "Ոչ: MyPasSwordX-ը ամբողջությամբ աշխատում է օֆլայն: Բոլոր հատկանիշները և ռեժիմները գործում են առանց Wi‑Fi-ի կամ բջջային տվյալների:",
    faq_2_q: "Հավելվածը անվճար է App Store-ում:",
    faq_2_a: "Այո: MyPasSwordX-ը կարելի է անվճար ներբեռնել: Ակտիվացումը պահանջում է միանվագ $129 լիցենզիայի բանալի:",
    faq_3_q: "Հարմար է հավելվածը մասնագիտական ներկայացումների համար:",
    faq_3_a: "Այո: MyPasSwordX-ը ստեղծված է հատուկ մոգերի, մենտալիստների և իլյուզիոնիստների համար, ովքեր կատարում են մոտիկ, բեմական և պատահական մոգություն:",
    faq_4_q: "Կարո՞ղ եմ հարմարեցնել լեզուն և արտաքին տեսքը:",
    faq_4_a: "Այո: Հավելվածը աջակցում է ցանկացած լեզու և ներառում է բազմաթիվ արտաքին տեսքի տարբերակներ, որոնք համապատասխանում են ձեր շոուին և ոճին:",
    faq_5_q: "Ինտեգրվո՞ւմ է հավելվածը այլ մոգական գործիքների հետ:",
    faq_5_a: "Այո: MyPasSwordX-ը ինտեգրվում է Inject-ի և այլ մասնագիտական գործիքների հետ URL Schemes և Shortcuts միջոցով:",
    faq_6_q: "Կարո՞ղ է MyPasSwordX-ը բացել հեռախոսը ներկայացման ժամանակ:",
    faq_6_a: "Այո: MyPasSwordX-ը թույլ է տալիս կատարել էֆեկտ, որտեղ դուք կարող եք բացել հեռախոս — հանդիսատեսի կամ կատարողի — առանց սարքին դիպչելու և առանց իրական գաղտնաբառը իմանալու: Հանդիսատեսը կարող է երբեք չմուտքագրել իր իրական կոդը, բայց դուք դեռ կկարողանաք իմանալ այն, անվանել կամ բացել հեռախոսը որպես ռուտինի մաս:",
    cta_title: "Պատրա՞ստ եք կատարել ամբողջական վստահությամբ:",
    cta_subtitle: "Ներբեռնեք անվճար — ակտիվացրեք $129 լիցենզիայի բանալիով:",
    contact_title: "Կապ մեզ հետ",
    contact_subtitle: "Կապ հաստատեք, եթե ունեք հարցեր կամ օգնության կարիք",
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
    what_happens: "Ինչ է լինելու հաջորդը",
    complete_payment: "Ավարտեք վճարումը",
    receive_key: "Ստացեք լիցենզիայի բանալին 24 ժամվա ընթացքում",
    enter_key: "Մուտքագրեք բանալին MyPasSwordX-ում ակտիվացնելու համար",
    tip: "Հուշում: Եթե բանալին չեք ստացել 24 ժամվա ընթացքում, խնդրում ենք գրել մեզ էլ. փոստով և նշել գործարքի ID-ն:",
    support: "Աջակցություն:",
    tutorial_modal_title: "Ուսուցման մուտք",
    tutorial_modal_subtitle: "Պատասխանեք հարցին շարունակելու համար",
    tutorial_question: "Ո՞րն է Պրոֆեսորի ազգանունը:",
    enter_answer: "Մուտքագրեք ձեր պատասխանը...",
    submit_answer: "Ուղարկել պատասխան"
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

