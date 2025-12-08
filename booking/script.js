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
    const curtains = document.querySelectorAll('.curtain');
    curtains.forEach((curtain, index) => {
        setTimeout(() => {
            curtain.style.transition = 'transform 2s ease-out';
            curtain.style.transform = index === 0 ? 'translateX(-100%)' : 'translateX(100%)';
        }, 500);
    });
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

