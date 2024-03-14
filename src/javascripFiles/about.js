// Import necessary resources
import '../cssFiles/about.css';
import jermaine from '../images/jermaine.jpg'; // Replace 'my-image.jpg' with your image file path

// Function to create the "About Me" section
export default function createAboutMeSection() {
    // Create the section element
    const aboutSection = document.createElement('section');
    aboutSection.classList.add('about-section');
    aboutSection.id = "about";

    // Add the title
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = "About Me";
    aboutSection.appendChild(sectionTitle);

    // Create the container for content
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    // Create and add the image
    const aboutImage = document.createElement('img');
    aboutImage.src = jermaine;
    aboutImage.alt = "My Image";
    contentContainer.appendChild(aboutImage);

    // Create and add the content
    const aboutContent = document.createElement('div');
    aboutContent.classList.add('about-content');

    const paragraph1 = document.createElement('p');
    paragraph1.textContent = "Since a young age, my interest in learning people's passions and what drives them hasn't changed.";

    const paragraph2 = document.createElement('p');
    paragraph2.textContent = "Sure, i know we are all different, some chase money and status while others family and compassion,";

    const paragraph3 = document.createElement('p');
    paragraph3.textContent = "But at the end of the day we are all connected whether by blood, relationships or networks.";

    const paragraph4 = document.createElement('p');
    paragraph4.textContent = "Thus began my journey in marketing...";


    aboutContent.appendChild(paragraph1)
    aboutContent.appendChild(paragraph2);
    aboutContent.appendChild(paragraph3);
    aboutContent.appendChild(paragraph4);
    contentContainer.appendChild(aboutContent);

    // Append content container to about section
    aboutSection.appendChild(contentContainer);

    // Append the about section to the body
    document.body.appendChild(aboutSection);
}
