import '../cssFiles/main.css';
import homeBg from '../images/homeBg1.jpeg';
import logo from '../images/latestLogo.jpg';
import upArrow from '../images/arrow-up.svg';
import createServicesSection from './services.js';
import createAboutMeSection from './about.js';
import createContactSection from './contact.js';
import createTestimonialSection from './testimony.js';
import createFooter from './footer.js';


function createHomePage() {
    const section = document.createElement('section');
    section.classList.add('homepage');

    // Initially set a background color to match the expected background color
    section.style.backgroundColor = '#222121';

    const navigationDiv = document.createElement('div');
    navigationDiv.classList.add('navigation');

    const companyInfo = document.createElement('div');
    companyInfo.classList.add('home');

    // Create and append h1 and p elements for company name and description
    const companyName = document.createElement('h1');
    companyName.innerHTML = 'JEERMASCRIPT<br>MARKETING<br><span>AGENCY</span>';

    const companyDescription = document.createElement('p');
    companyDescription.textContent = 'Monetizing ideas through words.';

    const companySeparator = document.createElement('div');
    companySeparator.classList.add('separator');

    companyInfo.appendChild(companyName);
    companyInfo.appendChild(companySeparator);
    companyInfo.appendChild(companyDescription);

    const nav = document.createElement('nav');
    nav.classList.add('large-screen');

    const ul = document.createElement('ul');

    const navList = ['Services', 'About', 'Testimonials', 'Contacts'];

    navList.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + item.toLowerCase();
        a.textContent = item;
        a.addEventListener('click', function(event) {
            event.preventDefault();
            smoothScroll(item.toLowerCase());
            this.classList.toggle('clicked');
        });
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    navigationDiv.appendChild(nav);

    // Create the image container
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container');

    // Create the logo image element
    const logoImage = document.createElement('img');
    logoImage.src = logo;
    logoImage.alt = 'Company Logo';
    logoImage.style.width = '50px';
    logoImage.style.height = '50px';

    // Append the logo image to the logo container
    logoContainer.appendChild(logoImage);

    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.classList.add('hamburger-menu');
    hamburgerMenu.innerHTML = `
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    `;
    hamburgerMenu.onclick = toggleMenu;

    // Create back to top icon
    const backToTopIcon = document.createElement('div');
    backToTopIcon.classList.add('back-to-top');

    const upImage = document.createElement('img');
    upImage.src = upArrow;
    upImage.alt = 'up arrow'; // Set the alt attribute for accessibility
    upImage.style.width = '40px';
    upImage.style.height = '40px';

    backToTopIcon.appendChild(upImage);

    document.body.appendChild(backToTopIcon);

    function scrollToTop() {
        const startOffset = window.pageYOffset;
        const distance = -startOffset; // Distance to scroll is negative of current scroll position
        const duration = 1600;
        const startTime = performance.now();
    
        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
            const interpolatedValue = startOffset + distance * easeInOutCubic(progress); // Linear interpolation
            window.scrollTo(0, interpolatedValue);
        
            if (elapsed < duration) {
                window.requestAnimationFrame(scrollStep);
            }
        }
    
        // Easing function for smooth acceleration and deceleration
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t ** 3 : 1 - ((-2 * t + 2) ** 3) / 2;
        }
    
        window.requestAnimationFrame(scrollStep);
    }
    

    // Add logic to toggle visibility of back-to-top arrow based on scroll position
    function handleScroll() {
        const backToTopIcon = document.querySelector('.back-to-top');
        const homepageSection = document.querySelector('.homepage');
        const scrollPosition = window.scrollY;

        // Check if the user is on the home page or has scrolled down
        if (homepageSection && scrollPosition > homepageSection.offsetHeight / 2) {
            backToTopIcon.style.display = 'block'; // Show the back-to-top arrow
        } else {
            backToTopIcon.style.display = 'none'; // Hide the back-to-top arrow
        }
    }

    window.addEventListener('scroll', handleScroll); // Listen for scroll events to handle arrow visibility
    handleScroll(); 


    // Add click event listener to back to top icon
    backToTopIcon.addEventListener('click', scrollToTop);

    navigationDiv.appendChild(hamburgerMenu);
    section.appendChild(navigationDiv);
    section.appendChild(logoContainer);
    section.appendChild(companyInfo);

    document.body.appendChild(section);

    function toggleMenu() {
        const nav = document.querySelector('.navigation nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');

        if (nav.classList.contains('inactive')) {
            nav.classList.remove('inactive');
            hamburgerMenu.classList.remove('inactive');
            hamburgerMenu.classList.add('active');

        } else {
            nav.classList.add('inactive');
            hamburgerMenu.classList.remove('active');
            hamburgerMenu.classList.add('inactive');
        }
    }

    // Lazy loading for background image
    const bgImage = new Image();
    bgImage.src = ''; // Set an empty source initially

    const bgImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bgImage.src = homeBg; // Set the source only when the image is in view
                observer.unobserve(entry.target); // Stop observing once the image is loaded
            }
        });
    });

    bgImageObserver.observe(section); // Start observing the section containing the background image

    bgImage.onload = function() {
        section.style.transition = 'background-image 0.1s'; // Adjust the transition duration as needed
        section.style.backgroundColor = 'none';
        section.style.backgroundImage = `url(${homeBg})`;
    };

    function adjustLayout() {
        const nav = document.querySelector('.navigation nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const section = document.querySelector('.homepage');

        if (window.innerWidth < 769) {
            nav.classList.remove('large-screen');
            nav.classList.add('small-screen');
            nav.classList.add('inactive');
            hamburgerMenu.style.display = 'block';
            hamburgerMenu.classList.remove('active');
        } else {
            nav.classList.remove('small-screen');
            nav.classList.add('large-screen');
            nav.classList.remove('inactive');
            hamburgerMenu.style.display = 'none';
        }
    }

    function handleItemClick() {
        const nav = document.querySelector('.navigation nav');
        const hamburgerMenu = document.querySelector('.hamburger-menu');

        const listItems = document.querySelectorAll('.navigation nav ul li a');
        listItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth < 769) {
                    nav.classList.add('inactive');
                    hamburgerMenu.classList.remove('active');
                }
            });
        });
    }

    window.addEventListener('DOMContentLoaded', adjustLayout);
    window.addEventListener('resize', adjustLayout);
    handleItemClick();

    createServicesSection();
    createAboutMeSection();
    createTestimonialSection();
    createContactSection();
    createFooter();
}

// Check if the device is a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to handle smooth scrolling with reduced speed
function smoothScroll(target) {
    // Define easing function
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t ** 3 : 1 - ((-2 * t + 2) ** 3) / 2;
    }

    const targetElement = document.getElementById(target);
    if (targetElement) {
        const targetOffset = targetElement.getBoundingClientRect().top;
        const startOffset = window.pageYOffset;
        const distance = targetOffset - startOffset;
        let duration = 1550; // Default duration

        // Reduce duration for finger-scrolling on mobile devices
        if (isMobileDevice() && isFingerScroll()) {
            duration = 3000; // Adjust duration for finger-scrolling on mobile devices
        }

        const startTime = performance.now();

        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); 
            window.scrollTo(0, startOffset + distance * easeInOutCubic(progress));

            if (elapsed < duration) {
                window.requestAnimationFrame(scrollStep);
            }
        }

        window.requestAnimationFrame(scrollStep);
    }
}

// Function to detect finger-scrolling on mobile devices
function isFingerScroll() {
    let lastTouchY;
    document.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const deltaY = Math.abs(currentY - lastTouchY);
        lastTouchY = currentY;
        if (deltaY > 5) { // Adjust the threshold as needed
            return true; // Finger-scrolling detected
        }
    });
    return false;
}

// Add smooth scrolling behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('href').substring(1); // Remove the '#' character
        smoothScroll(target);
    });
});

createHomePage();