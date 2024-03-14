import '../cssFiles/services.css';
import img1 from '../images/seo.jpg';
import img2 from '../images/webdes2.0.jpg';
import img3 from '../images/webdesign.jpg';
import img4 from '../images/copywrite.jpg'; 

export default function createServicesSection() {
    const servicesSection = document.createElement('section');
    servicesSection.classList.add('services-section');
    servicesSection.id = 'services';

    // Add the title
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = "We upscale your business by:";
    servicesSection.appendChild(sectionTitle);

    // Create a main div to house the cards
    const servicesContainer = document.createElement('div');
    servicesContainer.classList.add('services-container');

    // Service 1
    const service1 = createService("Copywriting", "We boost your business with tailored email marketing with compelling content that fits your brands voice and increasing sales and conversions with persuasive messaging.Let's drive growth together.", img4);
    servicesContainer.appendChild(service1);

    // Service 2
    const service2 = createService("Website design", "We make websites that captivate and climb search ranking.Our SEO and design guarantees leads, from keywords search to responsive layouts, and we create standout sites for organic traffic for your business whether it's a startup or established.", img2);
    servicesContainer.appendChild(service2);

    // Service 3
    const service3 = createService("Digital Marketing", "Our agency provides detailed online marketing services, including SEO, PPC, social media and content creation.We customize strategies to meet your goals, driving traffic, leads and conversions with measurable outcomes.", img3);
    servicesContainer.appendChild(service3);

    // Service 4
    const service4 = createService("SEO", "We specialize in boosting website visibility through tailored strategies, including audits and link building.We've got you covered, whether global or local let's unlock your online potential.", img1);
    servicesContainer.appendChild(service4);

    // Append the services container to the services section
    servicesSection.appendChild(servicesContainer);

    // Append the services section to the body
    document.body.appendChild(servicesSection);
}

// Helper function to create a service container
function createService(title, description, imagePath) {
    const serviceContainer = document.createElement('div');
    serviceContainer.classList.add('service-container');

    // Image div
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('service-image');

    const serviceImage = document.createElement('img');
    serviceImage.src = imagePath;
    serviceImage.alt = title;

    imageDiv.appendChild(serviceImage);

    // Description div
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('service-description');

    const serviceTitle = document.createElement('h4'); // Changed to h4 for service titles
    serviceTitle.textContent = title;

    const serviceDesc = document.createElement('p');
    serviceDesc.textContent = description;

    descriptionDiv.appendChild(serviceTitle);
    descriptionDiv.appendChild(serviceDesc);

    // Append image and description to service container
    serviceContainer.appendChild(imageDiv);
    serviceContainer.appendChild(descriptionDiv);

    return serviceContainer;
}