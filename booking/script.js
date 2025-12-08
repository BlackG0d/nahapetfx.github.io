// Языковые переводы
const translations = {
    ru: {
        'nav.home': 'Главная',
        'nav.about': 'О фокуснике',
        'nav.shows': 'Шоу',
        'nav.programs': 'Программы',
        'nav.gallery': 'Галерея',
        'nav.contact': 'Заказать',
        'hero.description': 'Магия, которая завораживает и удивляет',
        'hero.stats.performances': 'Выступлений',
        'hero.stats.experience': 'Лет опыта',
        'hero.stats.satisfaction': '% Удовлетворённости',
        'hero.cta': 'Заказать выступление',
        'about.title': 'О Фокуснике',
        'about.nahapet.lead': 'Добро пожаловать в мир невероятных иллюзий и магии!',
        'about.nahapet.text1': 'Я — Nahapet Arshakyan, профессиональный фокусник с многолетним опытом создания незабываемых магических представлений. Мои выступления сочетают классические техники иллюзионизма с современными элементами, создавая уникальный опыт для зрителей любого возраста.',
        'about.nahapet.text2': 'Специализируюсь на карточных фокусах, манипуляциях, исчезновениях и появлениях предметов, а также интерактивных представлениях, где зрители становятся частью магии.',
        'about.nahapet.skill1.title': 'Профессионализм',
        'about.nahapet.skill1.desc': 'Многолетний опыт и отточенное мастерство',
        'about.nahapet.skill2.title': 'Уникальность',
        'about.nahapet.skill2.desc': 'Каждое выступление — это неповторимое шоу',
        'about.nahapet.skill3.title': 'Интерактивность',
        'about.nahapet.skill3.desc': 'Зрители становятся частью магии',
        'about.sillis.lead': 'Мастер иллюзий и волшебства!',
        'about.sillis.text1': 'Sillis Kopen — талантливый фокусник, создающий незабываемые магические моменты. Специализируется на уникальных иллюзиях и интерактивных представлениях, которые завораживают зрителей всех возрастов.',
        'about.sillis.text2': 'Каждое выступление Sillis Kopen — это сочетание классического мастерства и современных техник, создающее неповторимый опыт для аудитории.',
        'about.sillis.skill1.title': 'Мастерство',
        'about.sillis.skill1.desc': 'Профессиональное исполнение и техника',
        'about.sillis.skill2.title': 'Креативность',
        'about.sillis.skill2.desc': 'Уникальные и оригинальные представления',
        'about.sillis.skill3.title': 'Энергия',
        'about.sillis.skill3.desc': 'Захватывающие и динамичные выступления',
        'shows.title': 'Виды Выступлений',
        'shows.cards.title': 'Карточные Фокусы',
        'shows.cards.desc': 'Завораживающие манипуляции с картами, невозможные предсказания и удивительные трансформации.',
        'shows.illusions.title': 'Классические Иллюзии',
        'shows.illusions.desc': 'Исчезновения, появления, левитация и другие классические элементы магического искусства.',
        'shows.stage.title': 'Сценические Шоу',
        'shows.stage.desc': 'Полноценные театрализованные представления для больших мероприятий и праздников.',
        'shows.corporate.title': 'Корпоративные События',
        'shows.corporate.desc': 'Развлечение для бизнес-мероприятий, конференций и корпоративных праздников.',
        'shows.family.title': 'Детские Праздники',
        'shows.family.desc': 'Волшебные представления для детей с интерактивными элементами и весельем.',
        'shows.events.title': 'Свадьбы и События',
        'shows.events.desc': 'Уникальные выступления для особых моментов, которые запомнятся навсегда.',
        'programs.title': 'Наши Программы',
        'programs.duration': '/ 1 час',
        'programs.program1.badge': 'Интерактивная',
        'programs.program1.intro': 'В Программе <strong>ФОКУСЫ</strong>, которые не нуждаются в сцене. Все фокусы интерактивные и делаются с гостями в постоянном взаимодействии.',
        'programs.program1.text1': 'CloseUp сверх гибкая программа, которая зависит от многих факторов, начиная от настроения зрителей, ситуации и их реакции на происходящее.',
        'programs.program1.highlight': 'В следствии этого эмоции и впечатления будут очень яркими',
        'programs.program1.feature1': 'На протяжении 10 лет именно наш CloseUP является самой востребованной и трендовой программой',
        'programs.program1.feature2': 'Все наши программы постоянно обновляются, в зависимости от всех вышедших новинок в мире фокусов',
        'programs.program1.feature3': 'На данный момент смело можем утверждать, что в мире не существует трюков, которые бы мы не смогли показать',
        'programs.program2.badge': '2 Фокусника',
        'programs.program2.intro': 'Программа фокусов с двумя магами — двойная энергия, двойная магия, двойной восторг.',
        'programs.program2.text1': 'Двое профессионалов способны охватить то, что физически невозможно одному фокуснику. Если на мероприятии, например, около 100 гостей, один артист просто не успеет уделить внимание каждому и показать весь спектр эффектов. А вот двое фокусников работают синхронно в разных зонах, что позволяет без спешки, качественно и красиво поработать со всеми гостями, гарантируя одинаково сильные впечатления каждому.',
        'programs.program2.highlight': 'Результат — максимально яркие эмоции и впечатления, которые надолго остаются в памяти.',
        'programs.program2.feature1': 'Более 10 лет наши CloseUp-программы остаются самыми востребованными и трендовыми. В дуэтном формате мы работаем уже 1.5 года, отточив синхронность до совершенства',
        'programs.program2.feature2': 'Все программы постоянно обновляются, в зависимости от всех вышедших новинок в мире фокусов',
        'programs.program2.feature3': 'Два фокусника — гарантия восторга всех гостей. Мы способны легко охватить более 100 человек за короткое время',
        'programs.cta': 'Заказать программу',
        'trusted.title': 'Нам доверяют:',
        'gallery.title': 'Галерея Выступлений',
        'gallery.item1.title': 'Сценическое шоу',
        'gallery.item2.title': 'Корпоративное мероприятие',
        'gallery.item3.title': 'Карточные фокусы',
        'gallery.item4.title': 'Магическое выступление',
        'gallery.item5.title': 'Театральное представление',
        'gallery.item6.title': 'Интерактивное шоу',
        'contact.title': 'Заказать Выступление',
        'contact.info.title': 'Свяжитесь со мной',
        'contact.info.text': 'Готов создать незабываемое магическое шоу для вашего события. Просто напишите мне в WhatsApp, и я свяжусь с вами в ближайшее время.',
        'contact.location': 'Дубай, ОАЭ и весь мир',
        'contact.whatsapp.text': 'Для заказа программы просто напишите мне:',
        'contact.whatsapp.note': 'Нажмите на кнопку, чтобы открыть чат',
        'footer.tagline': 'Магия, которая завораживает'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.shows': 'Shows',
        'nav.programs': 'Programs',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Book',
        'hero.description': 'Magic that captivates and amazes',
        'hero.stats.performances': 'Performances',
        'hero.stats.experience': 'Years of Experience',
        'hero.stats.satisfaction': '% Satisfaction',
        'hero.cta': 'Book a Performance',
        'about.title': 'About the Magician',
        'about.nahapet.lead': 'Welcome to the world of incredible illusions and magic!',
        'about.nahapet.text1': 'I am Nahapet Arshakyan, a professional magician with years of experience creating unforgettable magical performances. My shows combine classic illusion techniques with modern elements, creating a unique experience for audiences of all ages.',
        'about.nahapet.text2': 'I specialize in card tricks, manipulations, disappearances and appearances of objects, as well as interactive performances where the audience becomes part of the magic.',
        'about.nahapet.skill1.title': 'Professionalism',
        'about.nahapet.skill1.desc': 'Years of experience and refined mastery',
        'about.nahapet.skill2.title': 'Uniqueness',
        'about.nahapet.skill2.desc': 'Each performance is an unforgettable show',
        'about.nahapet.skill3.title': 'Interactivity',
        'about.nahapet.skill3.desc': 'The audience becomes part of the magic',
        'about.sillis.lead': 'Master of Illusions and Magic!',
        'about.sillis.text1': 'Sillis Kopen is a talented magician creating unforgettable magical moments. Specializes in unique illusions and interactive performances that captivate audiences of all ages.',
        'about.sillis.text2': 'Each Sillis Kopen performance is a combination of classical mastery and modern techniques, creating a unique experience for the audience.',
        'about.sillis.skill1.title': 'Mastery',
        'about.sillis.skill1.desc': 'Professional execution and technique',
        'about.sillis.skill2.title': 'Creativity',
        'about.sillis.skill2.desc': 'Unique and original performances',
        'about.sillis.skill3.title': 'Energy',
        'about.sillis.skill3.desc': 'Captivating and dynamic performances',
        'shows.title': 'Types of Performances',
        'shows.cards.title': 'Card Tricks',
        'shows.cards.desc': 'Captivating card manipulations, impossible predictions, and amazing transformations.',
        'shows.illusions.title': 'Classic Illusions',
        'shows.illusions.desc': 'Disappearances, appearances, levitation, and other classic elements of magical art.',
        'shows.stage.title': 'Stage Shows',
        'shows.stage.desc': 'Full theatrical performances for large events and celebrations.',
        'shows.corporate.title': 'Corporate Events',
        'shows.corporate.desc': 'Entertainment for business events, conferences, and corporate celebrations.',
        'shows.family.title': 'Children\'s Parties',
        'shows.family.desc': 'Magical performances for children with interactive elements and fun.',
        'shows.events.title': 'Weddings and Events',
        'shows.events.desc': 'Unique performances for special moments that will be remembered forever.',
        'programs.title': 'Our Programs',
        'programs.duration': '/ 1 hour',
        'programs.program1.badge': 'Interactive',
        'programs.program1.intro': 'The program features <strong>TRICKS</strong> that don\'t require a stage. All tricks are interactive and performed with guests in constant interaction.',
        'programs.program1.text1': 'CloseUp is an extremely flexible program that depends on many factors, starting from the mood of the audience, the situation, and their reaction to what\'s happening.',
        'programs.program1.highlight': 'As a result, emotions and impressions will be very vivid',
        'programs.program1.feature1': 'For over 10 years, our CloseUP has been the most in-demand and trending program',
        'programs.program1.feature2': 'All our programs are constantly updated, depending on all the latest innovations in the world of magic',
        'programs.program1.feature3': 'At the moment, we can confidently say that there are no tricks in the world that we cannot perform',
        'programs.program2.badge': '2 Magicians',
        'programs.program2.intro': 'A magic program with two magicians — double energy, double magic, double delight.',
        'programs.program2.text1': 'Two professionals can cover what is physically impossible for one magician. If there are, for example, about 100 guests at an event, one artist simply won\'t have time to give attention to everyone and show the full range of effects. But two magicians work synchronously in different zones, which allows them to work with all guests without haste, quality and beautifully, guaranteeing equally strong impressions to everyone.',
        'programs.program2.highlight': 'The result — maximum vivid emotions and impressions that remain in memory for a long time.',
        'programs.program2.feature1': 'For over 10 years, our CloseUp programs have remained the most in-demand and trending. We\'ve been working in duo format for 1.5 years, perfecting synchronization to perfection',
        'programs.program2.feature2': 'All programs are constantly updated, depending on all the latest innovations in the world of magic',
        'programs.program2.feature3': 'Two magicians — a guarantee of delight for all guests. We can easily cover more than 100 people in a short time',
        'programs.cta': 'Book Program',
        'trusted.title': 'Trusted By:',
        'gallery.title': 'Performance Gallery',
        'gallery.item1.title': 'Stage Show',
        'gallery.item2.title': 'Corporate Event',
        'gallery.item3.title': 'Card Tricks',
        'gallery.item4.title': 'Magic Performance',
        'gallery.item5.title': 'Theatrical Performance',
        'gallery.item6.title': 'Interactive Show',
        'contact.title': 'Book a Performance',
        'contact.info.title': 'Contact Me',
        'contact.info.text': 'Ready to create an unforgettable magic show for your event. Just write to me on WhatsApp, and I\'ll get back to you as soon as possible.',
        'contact.location': 'Dubai, UAE and Worldwide',
        'contact.whatsapp.text': 'To book a program, just write to me:',
        'contact.whatsapp.note': 'Click the button to open chat',
        'footer.tagline': 'Magic that captivates'
    }
};

// Функция переключения языка
function switchLanguage(lang) {
    // Сохраняем выбранный язык
    localStorage.setItem('selectedLanguage', lang);
    
    // Обновляем атрибут lang у html
    document.documentElement.setAttribute('lang', lang);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'SPAN' && element.parentElement.tagName === 'A') {
                // Для текста внутри ссылок
                element.textContent = translations[lang][key];
            } else {
                // Для обычных элементов, поддерживаем HTML
                element.innerHTML = translations[lang][key];
            }
        }
    });
}

// Инициализация языка при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем сохраненный язык или используем английский по умолчанию
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    switchLanguage(savedLang);
    
    // Обработчики для кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Предотвращаем прокрутку страницы когда меню открыто
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрываем меню при клике вне его области
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Закрываем мобильное меню после клика
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к элементам
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.show-card, .feature, .about-content, .contact-content, .gallery-item, .program-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Анимация прогресс-баров навыков
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                const percentageElement = progressBar.closest('.feature').querySelector('.skill-percentage');
                
                // Анимация прогресс-бара
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);

                // Анимация процентов
                if (percentageElement) {
                    const targetPercent = parseInt(percentageElement.getAttribute('data-percent'));
                    let currentPercent = 0;
                    const increment = targetPercent / 50;
                    const timer = setInterval(() => {
                        currentPercent += increment;
                        if (currentPercent >= targetPercent) {
                            currentPercent = targetPercent;
                            clearInterval(timer);
                        }
                        percentageElement.textContent = Math.round(currentPercent) + '%';
                    }, 30);
                }

                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    // Наблюдаем за прогресс-барами
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Анимация счетчиков статистики
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const duration = 2000; // 2 секунды
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.round(current);
                }, stepTime);

                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    // Наблюдаем за счетчиками
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Обработка формы заказа
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        // Валидация
        if (!data.name || !data.email || !data.phone) {
            alert('Пожалуйста, заполните все обязательные поля (отмечены *)');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        // Например, через fetch API или email service
        
        // Показываем сообщение об успехе
        showSuccessMessage();
        
        // Очищаем форму
        bookingForm.reset();
    });
}

function showSuccessMessage() {
    // Создаем элемент сообщения
    const message = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
        color: #3d2817;
        padding: ${isMobile ? '1.5rem 1.5rem' : '2rem 3rem'};
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        border: 3px solid #3d2817;
        font-size: ${isMobile ? '1rem' : '1.2rem'};
        font-weight: 600;
        animation: fadeIn 0.3s ease;
        max-width: ${isMobile ? '90%' : '500px'};
        width: ${isMobile ? '90%' : 'auto'};
    `;
    message.innerHTML = `
        <div style="font-size: ${isMobile ? '2rem' : '3rem'}; margin-bottom: 1rem;">✨</div>
        <div>Спасибо за вашу заявку!</div>
        <div style="margin-top: 0.5rem; font-size: ${isMobile ? '0.8rem' : '0.9rem'}; opacity: 0.9;">Я свяжусь с вами в ближайшее время</div>
    `;
    
    document.body.appendChild(message);
    
    // Удаляем сообщение через 3 секунды
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Добавляем CSS анимации для сообщения
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Параллакс эффект для карт (только для устройств с мышью)
let mouseX = 0;
let mouseY = 0;
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.5;
            card.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });
}

// Анимация занавесов при загрузке
window.addEventListener('load', () => {
    const leftCurtain = document.querySelector('.curtain.left');
    const rightCurtain = document.querySelector('.curtain.right');
    
    if (leftCurtain) {
        setTimeout(() => {
            leftCurtain.style.transition = 'transform 2s ease-out';
            leftCurtain.style.transform = 'translateX(-100%)';
        }, 500);
    }
    
    if (rightCurtain) {
        setTimeout(() => {
            rightCurtain.style.transition = 'transform 2s ease-out';
            rightCurtain.style.transform = 'translateX(100%)';
        }, 500);
    }
});

// Эффект печатания для заголовка (опционально)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Добавляем эффект свечения к кнопкам при наведении
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.6)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    });
});

// Изменение прозрачности навбара при прокрутке
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(244, 232, 208, 0.98)';
    } else {
        navbar.style.background = 'rgba(244, 232, 208, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Валидация email в реальном времени
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#8b1a1a';
            this.style.boxShadow = '0 0 10px rgba(139, 26, 26, 0.3)';
        } else {
            this.style.borderColor = '#d4af37';
            this.style.boxShadow = 'none';
        }
    });
}

// Валидация телефона
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        // Удаляем все нецифровые символы кроме +, пробелов, скобок и дефисов
        this.value = this.value.replace(/[^\d+\s\-()]/g, '');
    });
}

// Установка минимальной даты для поля даты (сегодня)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

