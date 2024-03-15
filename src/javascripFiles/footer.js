import '../cssFiles/footer.css';
import twiterIcon from '../images/x-twitter.svg'; 
import instagramIcon from '../images/instagram.svg';

export default function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContent = document.createElement('div');
    footerContent.classList.add('footer-content');

    // Create social media icons
    const socialMediaIcons = document.createElement('div');
    socialMediaIcons.classList.add('social-media-icons');

    const socialMediaLinks = [
        { name: 'Twitter', icon: twiterIcon, url: 'https://twitter.com/Jermaine_writes' },
        { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/jeermascript' },
    ];

    socialMediaLinks.forEach(link => {
        const icon = document.createElement('a');
        icon.href = link.url;
        icon.target = '_blank';
        icon.classList.add('social-media-icon');

        // Create image element for the icon
        const img = document.createElement('img');
        img.src = link.icon;
        img.alt = link.name + ' icon'; 

        // Append image to the icon element
        icon.appendChild(img);

        socialMediaIcons.appendChild(icon);
    });

    footerContent.appendChild(socialMediaIcons);

    // Add company info
    const companyInfo = document.createElement('div');
    companyInfo.classList.add('company-info');
    companyInfo.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} JEERMASCRIPT AGENCY</p>
        <p>All rights reserved.</p>
    `;
    footerContent.appendChild(companyInfo);

    footer.appendChild(footerContent);
    document.body.appendChild(footer);
}