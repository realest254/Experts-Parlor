import '../cssFiles/main.css';
import homeBg from '../images/homeBg.jpeg';
import logo from '../images/logo.jpg';
import upArrow from '../images/arrow-up.svg';
import createServicesSection from './services.js';
import createAboutMeSection from './about.js';
import createContactSection from './contact.js';
import createTestimonialSection from './testimony.js';
import createFooter from './footer.js';

function createHomePage() {
    const section = document.createElement('section');
    section.classList.add('homepage');
    section.style.backgroundImage = `url(${homeBg}`;

    const navigationDiv = document.createElement('div');
    navigationDiv.classList.add('navigation');

    const companyInfo = document.createElement('div');
    companyInfo.classList.add('home');

    // Create and append h1 and p elements for company name and description
    const companyName = document.createElement('h1');
    companyName.innerHTML = 'JEERMASCRIPT<br>MARKETING<br><span>AGENCY</>';

    const companyDescription = document.createElement('p');
    companyDescription.textContent = 'Monetizing idea\'s through words.';

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
    logoImage.src = logo; // Replace 'path_to_your_logo_image' with the actual path to your logo image
    logoImage.alt = 'Company Logo'; // Set the alt attribute for accessibility
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    handleScroll(); // Call handleScroll once to initialize arrow visibility


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
}

function smoothScroll(target) {
    const targetElement = document.getElementById(target);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

createHomePage();
createServicesSection();
createAboutMeSection();
createTestimonialSection();
createContactSection();
createFooter();