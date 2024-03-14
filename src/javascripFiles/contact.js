import '../cssFiles/contact.css'; // Import the CSS file for styling

// Function to create the contact section
export default function createContactSection() {
    // Create the contact section element
    const contactSection = document.createElement('section');
    contactSection.classList.add('contact-section');
    contactSection.id = 'contacts'; // Set the id for the section
    contactSection.setAttribute('aria-labelledby', 'contact-heading'); // Accessibility: Set aria-labelledby attribute

    // Create the contact info div
    const contactInfoDiv = document.createElement('div');
    contactInfoDiv.classList.add('contact-info');

    // Add contact info
    const contactHeader = document.createElement('h2');
    contactHeader.textContent = 'CONTACT  US';
    contactHeader.id = 'contact-heading'; // Accessibility: Set id for heading
    contactInfoDiv.appendChild(contactHeader);

    // Email heading
    const emailHeading = document.createElement('h4');
    emailHeading.textContent = 'Email:';
    contactInfoDiv.appendChild(emailHeading);

    // Email content
    const emailContent = document.createElement('span');
    emailContent.textContent = ' jeermascriptt@gmail.com';
    contactInfoDiv.appendChild(emailContent);

    // Telephone heading
    const telephoneHeading = document.createElement('h4');
    telephoneHeading.textContent = 'Telephone:';
    contactInfoDiv.appendChild(telephoneHeading);

    // Telephone content
    const telephoneContent = document.createElement('span');
    telephoneContent.textContent = ' +254 716517964';
    contactInfoDiv.appendChild(telephoneContent);

    // Script
    const scriptParagraph = document.createElement('p');
    scriptParagraph.textContent = 'Please feel free to contact us for any inquiries.';
    contactInfoDiv.appendChild(scriptParagraph);

    // Create the contact form div
    const contactFormDiv = document.createElement('div');
    contactFormDiv.classList.add('contact-form');

    // Add contact form elements
    const formHeader = document.createElement('h2');
    formHeader.textContent = 'CONTACT  FORM';
    contactFormDiv.appendChild(formHeader);

    const form = document.createElement('form'); // Accessibility: Use <form> element for form controls
    form.setAttribute('role', 'form'); // Accessibility: Set role attribute
    form.setAttribute('aria-labelledby', 'contact-form-heading'); // Accessibility: Set aria-labelledby attribute
    formHeader.id = 'contact-form-heading'; // Accessibility: Set id for heading
    form.action = 'https://api.web3forms.com/submit'; // Set action attribute for form submission

    // Add form inputs
    const accessKeyInput = document.createElement('input');
    accessKeyInput.type = 'hidden';
    accessKeyInput.name = 'access_key';
    accessKeyInput.value = 'bb8fe42b-bc68-49fc-93b8-cad10639e2b2';
    form.appendChild(accessKeyInput);

    const nameInput = createInput('text', 'Name', 'name');
    form.appendChild(nameInput);

    const emailInput = createInput('email', 'Email', 'email');
    form.appendChild(emailInput);

    const telInput = createInput('tel', 'Telephone', 'tel');
    form.appendChild(telInput);

    const messageInput = createInput('textarea', 'Message', 'message');
    form.appendChild(messageInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Send Message';
    submitButton.classList.add('submit-button');
    form.appendChild(submitButton);

    // Add form element to contact form div
    contactFormDiv.appendChild(form);

    // Append contact info div and contact form div to the contact section
    contactSection.appendChild(contactInfoDiv);
    contactSection.appendChild(contactFormDiv);

    // Append the contact section to the body
    document.body.appendChild(contactSection);

    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        const result = document.createElement('div');
        result.id = 'result';
        result.innerHTML = "Please wait...";
        contactFormDiv.appendChild(result);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            console.log(response);
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                result.innerHTML = json.message;
            }
        })
        .catch(() => {
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
    });
}

// Helper function to create input elements
function createInput(type, placeholder, name) {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.name = name;
    input.classList.add('input-field');
    if (type === 'textarea') {
        input.classList.add('textarea-field');
    }
    return input;
}