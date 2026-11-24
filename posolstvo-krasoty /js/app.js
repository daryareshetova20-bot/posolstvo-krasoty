document.addEventListener('DOMContentLoaded', () => {
    
    // АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
    const animatedItems = document.querySelectorAll('.service-card, .review-row');
    if (animatedItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        animatedItems.forEach(item => observer.observe(item));
    }

    // ФОРМА
    const modal = document.getElementById('bookingModal');
    const openBtns = document.querySelectorAll('.js-open-modal');
    const closeBtns = document.querySelectorAll('.js-close-modal');

    const resetModal = () => {
        const form = document.getElementById('bookingForm');
        const successMsg = document.getElementById('formSuccess');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');

        if (form) form.style.display = 'block';
        if (successMsg) successMsg.classList.remove('is-active');
        if (modalTitle) modalTitle.textContent = 'Записаться в салон';
        if (modalSubtitle) modalSubtitle.textContent = 'Оставьте свои данные, и мы свяжемся с вами в ближайшее время!';
        if (form) form.reset();
    };

    if (modal) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                resetModal();
                modal.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
                setTimeout(resetModal, 300);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
                setTimeout(resetModal, 300);
            }
        });
    }

    //АДАПТИВНОСТЬ
    const phoneInputs = document.querySelectorAll('.js-phone');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function () {
            let val = this.value.replace(/\D/g, '');
            if (val.startsWith('8')) val = '7' + val.slice(1);
            if (val.length > 0 && !val.startsWith('7')) val = '7' + val;

            let formatted = '';
            if (val.length > 0) {
                formatted = '+7';
                if (val.length > 1) formatted += ' (' + val.slice(1, 4);
                if (val.length > 4) formatted += ') ' + val.slice(4, 7);
                if (val.length > 7) formatted += '-' + val.slice(7, 9);
                if (val.length > 9) formatted += '-' + val.slice(9, 11);
            }
            this.value = formatted;
        });
    });

    //ОТПРАВКА ФОРМЫ
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            const phoneDigits = phone.replace(/\D/g, '');

            if (name.trim().length < 2) {
                alert('Пожалуйста, введите ваше имя (минимум 2 буквы).');
                return;
            }
            if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
                alert('Пожалуйста, введите корректный номер телефона полностью.');
                return;
            }

            const modalTitle = document.getElementById('modalTitle');
            const modalSubtitle = document.getElementById('modalSubtitle');
            const successMsg = document.getElementById('formSuccess');

            form.style.display = 'none';
            if (modalTitle) modalTitle.textContent = 'Заявка отправлена!';
            if (modalSubtitle) modalSubtitle.textContent = 'Мы свяжемся с вами в ближайшее время.';
            if (successMsg) successMsg.classList.add('is-active');

            setTimeout(() => {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
                setTimeout(resetModal, 300);
            }, 3000);
        });
    }

    // КАРУСЕЛЬ
    const track = document.getElementById('teamTrack');
    const btnPrev = document.getElementById('teamPrev');
    const btnNext = document.getElementById('teamNext');
    
    if (track && btnPrev && btnNext) {
        let currentIndex = 0;
        const updateCarousel = () => {
            const card = track.querySelector('.master-card');
            if (!card) return;
            const style = window.getComputedStyle(track);
            const gap = parseInt(style.gap) || 30;
            const scrollAmount = card.offsetWidth + gap;
            const totalCards = track.querySelectorAll('.master-card').length;
            const visibleCards = Math.round(track.parentElement.offsetWidth / scrollAmount);
            const maxIndex = Math.max(0, totalCards - visibleCards);

            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            track.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
        };

        btnNext.addEventListener('click', () => { currentIndex++; updateCarousel(); });
        btnPrev.addEventListener('click', () => { currentIndex--; updateCarousel(); });
        window.addEventListener('resize', () => { currentIndex = 0; updateCarousel(); });
        updateCarousel();
    }

    // УСЛУГИ 
    const showMoreBtn = document.getElementById('showMoreBtn');
    const extraServices = document.getElementById('extraServices');
    
    if (showMoreBtn && extraServices) {
        showMoreBtn.addEventListener('click', () => {
            extraServices.classList.toggle('is-expanded');
            showMoreBtn.classList.toggle('is-open');
            if (extraServices.classList.contains('is-expanded')) {
                showMoreBtn.querySelector('span').textContent = 'Скрыть услуги';
            } else {
                showMoreBtn.querySelector('span').textContent = 'Показать все услуги';
            }
        });
    }

    // МОБИЛЬНОЕ МЕНЮ
    const burger = document.querySelector('.js-burger');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            nav.classList.toggle('is-open');
            document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
        });
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('is-active');
                nav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

});