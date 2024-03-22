import '../cssFiles/contact.css'; // Import the CSS file for styling
import accessKey from '../../utils.js';

// Helper function to create input elements
function createInput(type, placeholder, name, hidden = false) {
    if (type === 'tel') {
        // Create input element for telephone number
        const input = document.createElement('input');
        input.type = 'tel';
        input.placeholder = placeholder;
        input.name = name;
        input.classList.add('input-field');
        if (hidden) {
            input.style.display = 'none'; // Hide the hidden field
        }
        // Add validation for tel input
        input.addEventListener('input', function() {
            const telInputs = document.querySelectorAll('input[type="tel"]');
            const telErrorMessage = document.getElementById('tel-error-message');

            // Check if there are two tel inputs
            if (telInputs.length === 2) {
                // Display error message for bot submission
                telErrorMessage.textContent = 'Invalid form submission';
            } else {
                // Clear error message
                telErrorMessage.textContent = '';

                // Validate length of telephone number
                if (this.value.length < 8 || this.value.length > 15) {
                    this.setCustomValidity('Telephone number must be between 8 and 15 characters');
                } else {
                    this.setCustomValidity(''); // Clear custom validity
                }
            }
        });

        return input;
    } else {
        // Handle other input types (fallback)
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.name = name;
        input.classList.add('input-field');
        if (hidden) {
            input.style.display = 'none'; // Hide the hidden field
        }
        return input;
    }
}

// Function to create the contact section
export default function createContactSection() {
    const sectionsHolder = document.querySelector('.sections-holder'); // Assuming sectionsHolder is accessible globally

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
    emailContent.textContent = 'info@jeermascriptagency.africa';
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
    accessKeyInput.value = accessKey;
    form.appendChild(accessKeyInput);

    const nameInput = createInput('text', 'Name', 'name');
    form.appendChild(nameInput);

    const emailInput = createInput('email', 'Email', 'email');
    form.appendChild(emailInput);

    const telInput1 = createInput('tel', 'Telephone', 'tel', true); // Hidden tel input
    form.appendChild(telInput1);

    const telInput2 = createInput('tel', 'Telephone', 'tel'); // Visible tel input
    form.appendChild(telInput2);

    const messageInput = createInput('textarea', 'Message', 'message');
    form.appendChild(messageInput);

    const telErrorMessage = document.createElement('span');
    telErrorMessage.id = 'tel-error-message'; // Element to show error message
    contactFormDiv.appendChild(telErrorMessage);

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
    sectionsHolder.appendChild(contactSection);

    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Additional validation for required fields
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            return;
        }

        // Submit the form if validation passes
        submitForm();
    });

    // Function to submit the form
    function submitForm() {
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        const result = document.createElement('div');
        result.id = 'result';
        result.innerHTML = 'Please wait...';
        contactFormDiv.appendChild(result);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: json,
        })
            .then(async (response) => {
                console.log(response);
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    result.innerHTML = 'Form submitted successfully';
                } else {
                    result.innerHTML = jsonResponse.message;
                }
            })
            .catch(() => {
                result.innerHTML = 'Something went wrong!';
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = 'none';
                }, 3000);
            });
    }
}
