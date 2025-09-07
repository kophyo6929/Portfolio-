// --- Global Content Store ---
let allTextContent: any;
let allServicesContent: any[];
let allPortfolioContent: any[];
let allContactContent: any;
let allTestimonialsContent: any[];

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load all content from JSON files simultaneously
        const [text, services, portfolio, contact, testimonials] = await Promise.all([
            fetch('/text.json').then(res => res.json()),
            fetch('/services.json').then(res => res.json()),
            fetch('/portfolio.json').then(res => res.json()),
            fetch('/contact.json').then(res => res.json()),
            fetch('/testimonials.json').then(res => res.json())
        ]);

        // Store content in global variables for easy access
        allTextContent = text;
        allServicesContent = services;
        allPortfolioContent = portfolio;
        allContactContent = contact;
        allTestimonialsContent = testimonials;

        // Populate the entire application structure
        populateSharedContent();
        populateAllPageSpecificContent();
        
        // Set up navigation and interactivity
        setupAppNavigation();
        setupBackToTopButton();
        setupContactForm();

    } catch (error) {
        console.error("Failed to load website content:", error);
        document.body.innerHTML = '<p style="text-align: center; padding: 2rem;">Sorry, the content could not be loaded. Please try again later.</p>';
    }
});

// --- Content Population Functions ---

/**
 * Populates elements shared across all pages (header, footer, etc.).
 */
function populateSharedContent() {
    populateText(allTextContent);
    populateHeader(allTextContent.header);
}

/**
 * Populates all page-specific sections which are initially hidden.
 */
function populateAllPageSpecificContent() {
    populateAboutPage(allTextContent.about_page, allTestimonialsContent);
    populateServicesPage();
    populatePortfolioPage(allPortfolioContent);
    populateContactPage(allContactContent);
}

/**
 * Populates elements with a `data-text` attribute from the main text JSON.
 */
function populateText(content: any) {
    document.querySelectorAll('[data-text]').forEach(el => {
        const key = el.getAttribute('data-text');
        if (!key) return;
        
        const value = key.split('.').reduce((acc, k) => acc && acc[k], content);

        if (typeof value === 'string') {
            (el as HTMLElement).innerHTML = value;
        }
    });
}

/**
 * Populates the header navigation dropdown.
 */
function populateHeader(headerContent: any) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu && headerContent.services_dropdown) {
        dropdownMenu.innerHTML = headerContent.services_dropdown.map((item: {name: string, href: string}) =>
            // Add data-page attribute to ensure SPA routing works for dropdown items
            `<li><a href="${item.href}" data-page="services">${item.name}</a></li>`
        ).join('');
    }
}

/**
 * Populates the About page skills grid and testimonials.
 */
function populateAboutPage(aboutContent: { skills: string[] }, testimonialsContent: any[]) {
    const skillsGrid = document.querySelector('#page-about .skills-grid');
    if (skillsGrid && aboutContent.skills) {
        skillsGrid.innerHTML = aboutContent.skills.map(skill =>
            `<div class="skill-card">${skill}</div>`
        ).join('');
    }

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid && testimonialsContent) {
        testimonialsGrid.innerHTML = testimonialsContent.map(testimonial => `
            <div class="testimonial-card">
                <blockquote>${testimonial.quote}</blockquote>
                <footer>
                    ${testimonial.name}
                    <span>${testimonial.company}</span>
                </footer>
            </div>
        `).join('');
    }
}

/**
 * Populates the interactive Services page.
 */
function populateServicesPage() {
    const servicesNav = document.querySelector('.services-nav');
    if (!servicesNav || !allServicesContent) return;

    // Create navigation buttons for each service
    servicesNav.innerHTML = allServicesContent.map(service => 
        `<button class="service-nav-btn" data-service-id="${service.id}">${service.title}</button>`
    ).join('');

    // Add click listeners to the navigation buttons
    servicesNav.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('.service-nav-btn');
        if (button) {
            const serviceId = button.getAttribute('data-service-id');
            if (serviceId) {
                displayServiceDetails(serviceId);
            }
        }
    });

    // Display the first service by default
    if (allServicesContent.length > 0) {
        displayServiceDetails(allServicesContent[0].id);
    } else {
         const contentDisplay = document.querySelector('.service-content-display');
         if(contentDisplay) contentDisplay.innerHTML = ""; // Clear loader if no services
    }
}

/**
 * Displays the details for a specific service.
 * @param serviceId The ID of the service to display.
 */
function displayServiceDetails(serviceId: string) {
    const service = allServicesContent.find(s => s.id === serviceId);
    const contentDisplay = document.querySelector('.service-content-display');
    if (!service || !contentDisplay) return;

    // Update active state on navigation buttons
    document.querySelectorAll('.service-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-service-id') === serviceId);
    });

    // Generate the HTML for the service details
    contentDisplay.innerHTML = `
        <div class="service-content">
            <h3>${service.title}</h3>
            <p class="service-price">${service.price}</p>
            <p>${service.description}</p>
            
            ${service.features && service.features.length > 0 ? `
                <h4>Features</h4>
                <ul>
                    ${service.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                </ul>
            ` : ''}

            ${service.instructions ? `
                <h4>How It Works</h4>
                <p>${service.instructions}</p>
            ` : ''}

            <div class="service-actions">
                ${service.bot_link ? `<a href="${service.bot_link}" class="btn" target="_blank" rel="noopener noreferrer">View Bot</a>` : ''}
                <a href="${allContactContent.telegram}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Contact Admin</a>
            </div>
        </div>
    `;
}

/**
 * Populates the Portfolio page grid.
 */
function populatePortfolioPage(portfolioItems: any[]) {
    const portfolioGrid = document.querySelector('#page-portfolio .portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = portfolioItems.map(item => `
            <div class="portfolio-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" class="btn-link" target="_blank" rel="noopener noreferrer">View on Telegram</a>
            </div>
        `).join('');
    }
}

/**
 * Populates the Contact page links and information.
 */
function populateContactPage(contactInfo: any) {
    const links = {
        'contact-telegram': contactInfo.telegram,
        'contact-facebook': contactInfo.facebook,
        'contact-messenger': contactInfo.messenger,
        'contact-youtube': contactInfo.youtube,
        'contact-tiktok': contactInfo.tiktok,
        'contact-telegram-channel': contactInfo.telegram_channel,
    };

    for (const [id, href] of Object.entries(links)) {
        const el = document.getElementById(id) as HTMLAnchorElement;
        if (el) {
            el.href = href;
        }
    }
}

/**
 * Populates meta tags in the document's head for SEO.
 */
function populateMetaTags(metaContent: { title: string, description: string, keywords: string }) {
    if (!metaContent) return;
    document.title = metaContent.title || 'BotDev Pro';
    
    const descriptionTag = document.getElementById('meta-description') as HTMLMetaElement;
    if (descriptionTag) descriptionTag.content = metaContent.description || '';

    const keywordsTag = document.getElementById('meta-keywords') as HTMLMetaElement;
    if (keywordsTag) keywordsTag.content = metaContent.keywords || '';
}

// --- SPA Navigation and UI Logic ---

const pageMetaMap: { [key: string]: string } = {
    'home': 'home',
    'about': 'about_page',
    'services': 'services_page',
    'portfolio': 'portfolio_page',
    'contact': 'contact_page'
};

/**
 * Main function to switch between visible pages.
 * @param pageId - The ID of the page to show (e.g., 'home', 'about').
 */
function showPage(pageId: string) {
    document.querySelectorAll<HTMLElement>('.page-content').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('visible');
    });

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.style.display = 'flex';
        // Force a reflow to ensure the animation plays correctly on display change
        void targetPage.offsetWidth; 
        targetPage.classList.add('visible');
    }

    // Update meta tags for the current page
    const metaKey = pageMetaMap[pageId];
    if (metaKey && allTextContent[metaKey]?.meta) {
        populateMetaTags(allTextContent[metaKey].meta);
    }
    
    // Update active state on navigation links
    document.querySelectorAll('.nav-links a, .logo').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

/**
 * Sets up all navigation interactivity, including SPA routing and mobile menu.
 */
function setupAppNavigation() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    const hamburger = document.getElementById('hamburger-menu') as HTMLButtonElement;
    const dropdown = document.querySelector('.dropdown') as HTMLLIElement;

    // Hamburger menu toggle
    hamburger?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Dropdown menu toggle on mobile
    if (dropdown) {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle') as HTMLAnchorElement;
        dropdownToggle?.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // On mobile, this link should only toggle the dropdown, not navigate.
                e.preventDefault();
                e.stopPropagation(); // Prevent the body click listener from firing.
                dropdown.classList.toggle('open');
            }
        });
    }

    // Main navigation click handler for SPA routing
    document.body.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const navAnchor = target.closest('a[data-page]');

        if (navAnchor) {
            e.preventDefault();
            const pageId = navAnchor.getAttribute('data-page');
            const href = navAnchor.getAttribute('href');

            if (pageId) {
                // If the target page is not already visible, show it
                const targetPage = document.getElementById(`page-${pageId}`);
                if (targetPage && !targetPage.classList.contains('visible')) {
                    showPage(pageId);
                }

                // Handle scrolling to an anchor within the new page
                if (href && href.startsWith('#') && href.length > 1) {
                    const elementId = href.substring(1);
                    
                    // Delay scrolling to ensure the target element is visible after page transition.
                    setTimeout(() => {
                        const elementToScrollTo = document.getElementById(elementId);
                        if (elementToScrollTo) {
                           elementToScrollTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                           // If it's a service, handle it with the detail view function
                           displayServiceDetails(elementId);
                        }
                    }, 150); 
                }

                // If mobile menu is open, close it after navigation
                if (navLinks?.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger?.classList.remove('open');
                    hamburger?.setAttribute('aria-expanded', 'false');

                    // If a dropdown was open, close it too
                    if (dropdown.classList.contains('open')) {
                        dropdown.classList.remove('open');
                    }
                }
            }
        }
    });

    // Show the home page on initial load
    showPage('home');
}

/**
 * Sets up the 'Back to Top' button functionality.
 */
function setupBackToTopButton() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Sets up the contact form, including submission and localStorage logic.
 */
function setupContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const successMessageEl = document.getElementById('form-success-message');
    if (!form || !successMessageEl) return;

    const formFields = {
        name: form.querySelector<HTMLInputElement>('#name'),
        email: form.querySelector<HTMLInputElement>('#email'),
        message: form.querySelector<HTMLTextAreaElement>('#message'),
    };

    const FORM_STORAGE_KEY = 'contactFormData';

    // Pre-fill form from localStorage on load
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if(formFields.name) formFields.name.value = data.name || '';
            if(formFields.email) formFields.email.value = data.email || '';
            if(formFields.message) formFields.message.value = data.message || '';
        } catch (e) {
            console.error("Could not parse saved form data", e);
            localStorage.removeItem(FORM_STORAGE_KEY);
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: formFields.name?.value || '',
            email: formFields.email?.value || '',
            message: formFields.message?.value || '',
        };

        try {
            // Placeholder for actual form submission logic
            // Using a non-existent endpoint to simulate a network error for the 'catch' block
            const response = await fetch('https://example.com/api/this-will-fail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                 // This will trigger the catch block for demo purposes
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // On actual success:
            successMessageEl.textContent = allTextContent.contact_page.form.success_message;
            form.reset();
            localStorage.removeItem(FORM_STORAGE_KEY);

        } catch (error) {
            console.error("Form submission failed, saving to localStorage.", error);
            localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
            // You could display an error message to the user here
            successMessageEl.textContent = "Submission failed. Your message has been saved in this browser.";
            successMessageEl.style.color = "var(--text-color)"; // Make it less alarming than red
        } finally {
             setTimeout(() => { 
                successMessageEl.textContent = '';
                successMessageEl.style.color = "var(--success-color)";
            }, 5000);
        }
    });
}