import '../cssFiles/testimony.css';
import oldman from '../images/oldman.jpg';
import fitness from '../images/fitnes.jpg';
import technician from '../images/technician.jpg';

export default function createTestimonialSection() {
    const sectionsHolder = document.querySelector('.sections-holder'); // Assuming sectionsHolder is accessible globally

    let startX = null;
    let startY = null;
    let distX = 0;
    let distY = 0;
    const threshold = 50;

    const testimonialContainer = document.createElement('section');
    testimonialContainer.id = 'testimonials';
    testimonialContainer.classList.add('testimonial-container');

    const sectionHeader = document.createElement('h2');
    sectionHeader.textContent = 'DON\'T TAKE OUR WORD ...';
    testimonialContainer.appendChild(sectionHeader);

    const testimonialData = [
        {
            imageSrc: oldman,
            name: 'ANDREW EARL',
            content: '"My previous website was struggling, but this new one is a high performance machine. The speed, responsiveness, and results it delivers are incredible."'
        },
        {
            imageSrc: technician,
            name: 'WHITNEY BROWN',
            content: '"Sales have soared, and conversion rates have gone through the roof. Customers didn\'t just open my emails, they acted on them - making purchases and really engaging with my content."'
        },
        {
            imageSrc: fitness,
            name: 'ISAIAH JEVONTE',
            content: 'I can\'t recommend this agency enough, they truly captured the essence of my business and made impactful copy that delivered results. They have been instrumental in transforming my gym\'s success.'
        }
    ];

    // Create testimonial elements using document fragment for better performance
    const fragment = document.createDocumentFragment();

    testimonialData.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('testimonial');

        const image = document.createElement('img');
        image.src = testimonial.imageSrc;
        image.alt = `Testimonial ${index + 1}`;

        const descHolder = document.createElement('div');
        descHolder.classList.add('inner-card');

        const [firstName, lastName] = testimonial.name.split(' ');
        const nameHead = document.createElement('h4');
        nameHead.innerHTML = `${firstName}<br>${lastName}`;

        const content = document.createElement('p');
        content.textContent = testimonial.content;

        descHolder.appendChild(nameHead);
        descHolder.appendChild(content);

        testimonialCard.appendChild(image);
        testimonialCard.appendChild(descHolder);

        fragment.appendChild(testimonialCard);
    });

    testimonialContainer.appendChild(fragment);

    const testimonials = testimonialContainer.querySelectorAll('.testimonial');
    let currentIndex = Math.floor(testimonialData.length / 2);

    function showPrevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonials();
        updateIndicators();
    }

    function showNextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonials();
        updateIndicators();
    }

    function updateTestimonials() {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[currentIndex].classList.add('active');
    }

    function createArrow(className, clickHandler) {
        const arrow = document.createElement('div');
        arrow.classList.add(className, 'arrow');
        arrow.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        arrow.addEventListener('click', clickHandler);
        return arrow;
    }

    function createIndicators() {
        const indicators = document.createElement('div');
        indicators.classList.add('indicators');
        for (let i = 0; i < testimonialData.length; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.dataset.index = i;
            indicators.appendChild(indicator);
        }
        return indicators;
    }

    function updateIndicators() {
        const indicators = testimonialContainer.querySelector('.indicators');
        if (indicators) {
            const indicatorElements = indicators.querySelectorAll('.indicator');
            indicatorElements.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }

    function handleResize() {
        testimonialContainer.querySelectorAll('.indicators, .prevBtn, .nextBtn').forEach(el => el.remove());
        if (window.innerWidth < 769) {
            const arrows = testimonialContainer.querySelectorAll('.arrow');
            arrows.forEach(arrow => arrow.removeEventListener('click', showPrevTestimonial));
            arrows.forEach(arrow => arrow.removeEventListener('click', showNextTestimonial));
            const indicators = createIndicators();
            testimonialContainer.appendChild(indicators);
        } else {
            const indicators = testimonialContainer.querySelector('.indicators');
            if (indicators) {
                indicators.remove();
            }
            const prevButton = createArrow('prevBtn', showPrevTestimonial);
            const nextButton = createArrow('nextBtn', showNextTestimonial);
            testimonialContainer.appendChild(prevButton);
            testimonialContainer.appendChild(nextButton);
        }
    }

    function handleTouchStart(event) {
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    }

    function handleTouchMove(event) {
        if (!startX || !startY) return;
        const touch = event.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
        if (Math.abs(distX) > Math.abs(distY)) {
            if (distX > threshold) {
                showPrevTestimonial();
                resetTouch();
            } else if (distX < -threshold) {
                showNextTestimonial();
                resetTouch();
            }
        }
    }

    function resetTouch() {
        startX = null;
        startY = null;
        distX = 0;
        distY = 0;
    }

    sectionsHolder.appendChild(testimonialContainer);

    updateTestimonials();

    handleResize();

    window.addEventListener('resize', handleResize);

    testimonialContainer.addEventListener('touchstart', handleTouchStart, false);
    testimonialContainer.addEventListener('touchmove', handleTouchMove, false);
}
