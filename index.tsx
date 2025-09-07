// --- Embedded Content Store ---
// By embedding the JSON data directly into the script, we eliminate the need for network requests (fetch)
// which can fail on some deployment platforms like Vercel if the file paths are not correctly resolved.
// This makes the app more robust and guarantees the content will always load.

const embeddedTextContent = {
  "header": {
    "logo": "BotDev Pro",
    "nav_home": "Home",
    "nav_about": "About",
    "nav_services": "Services",
    "nav_portfolio": "Portfolio",
    "nav_contact": "Contact",
    "services_dropdown": [
      { "name": "Bot Building", "href": "#building" },
      { "name": "Bot Rentals", "href": "#renting" },
      { "name": "Bot Hosting", "href": "#hosting" },
      { "name": "Account Trading", "href": "#accounts" },
      { "name": "ISP Store Bots", "href": "#isp-store" },
      { "name": "Language Bots", "href": "#language" }
    ]
  },
  "home": {
    "title": "Expert Telegram Bot Developer",
    "subtitle": "Creating powerful, intelligent, and seamless bots to automate your business and engage your audience.",
    "cta": "Explore Services",
    "meta": {
      "title": "Expert Telegram Bot Developer | BotDev Pro",
      "description": "Top-rated Telegram bot developer specializing in custom bots for business automation, e-commerce, and user engagement. Get a free quote for your project.",
      "keywords": "Telegram bot developer, custom Telegram bots, bot development, BotDev Pro, Python bot, Node.js bot, aiogram developer, telegraf developer, hire bot developer"
    }
  },
  "about_page": {
    "title": "About Me & My Skills",
    "description": "With over 5 years of experience, I specialize in building custom Telegram bots tailored to your unique needs. From simple notification bots to complex integrated systems with payment gateways and external APIs, I deliver robust and scalable solutions.",
    "skills": [
      "Python (aiogram)",
      "Node.js (Telegraf.js)",
      "REST & GraphQL APIs",
      "Database Design (SQL/NoSQL)",
      "Payment Gateway Integration",
      "Custom Webhooks",
      "Bot Hosting & Deployment",
      "Natural Language Processing"
    ],
    "testimonials_title": "What My Clients Say",
    "meta": {
      "title": "About Me & Skills | Professional Telegram Developer",
      "description": "Learn about my 5+ years of experience as a professional Telegram Bot developer. My skills include Python (aiogram), Node.js (Telegraf), API integration, and database design.",
      "keywords": "about telegram developer, skills, telegram bot expert, aiogram, telegraf.js, API integration, python, node.js, bot developer portfolio"
    }
  },
  "services_page": {
    "title": "My Services",
    "meta": {
      "title": "Telegram Bot Development Services | BotDev Pro",
      "description": "Explore a full range of Telegram bot services: custom bot building, bot rentals, managed hosting, and account trading bots. Get a tailored solution for your business.",
      "keywords": "telegram bot services, custom bot building, telegram bot rental, telegram bot hosting, e-commerce bot, subscription bot, telegram automation"
    }
  },
  "portfolio_page": {
    "title": "My Work",
    "meta": {
      "title": "Telegram Bot Portfolio | BotDev Pro",
      "description": "Browse my portfolio of custom Telegram bots, including advanced e-commerce bots, automated support desk bots, and content subscription management systems.",
      "keywords": "telegram bot portfolio, bot examples, e-commerce bot telegram, support bot, subscription bot, bot development work, botdev pro projects"
    }
  },
  "contact_page": {
    "title": "Get In Touch",
    "description": "Have a project in mind? I'd love to hear about it. Fill out the form below or reach out via my social channels and let's create something amazing.",
    "form": {
      "name_label": "Your Name",
      "email_label": "Your Email",
      "message_label": "Your Message",
      "submit_button": "Send Message",
      "success_message": "Thank you! Your message has been sent successfully."
    },
    "meta": {
      "title": "Contact a Telegram Developer | BotDev Pro",
      "description": "Get in touch to discuss your Telegram bot project. I'm available for new projects and collaborations. Let's build your bot together.",
      "keywords": "contact telegram developer, hire bot developer, project inquiry, botdev pro contact, get a quote, telegram bot consultation"
    }
  },
  "footer": {
    "copyright": "&copy; 2024 BotDev Pro. All Rights Reserved."
  }
};

const embeddedServicesContent = [
  {
    "id": "building",
    "title": "Bot Building",
    "price": "Starts at $250",
    "description": "From concept to deployment, I create bespoke Telegram bots designed to meet your specific business needs. Whether you need a bot for customer service, e-commerce, content delivery, or process automation, I build reliable and scalable solutions.",
    "instructions": "Contact me with your project idea. We'll have a consultation to define the scope, features, and timeline. Once agreed, I'll begin development, providing regular updates until the final bot is delivered and deployed.",
    "features": [
      "Full workflow mapping & design",
      "Integration with external APIs and databases",
      "Custom keyboard layouts and inline commands",
      "User authentication and management"
    ],
    "bot_link": null
  },
  {
    "id": "renting",
    "title": "Bot Rentals",
    "price": "$50 / month",
    "description": "Get immediate access to powerful, ready-to-use bots for a low monthly fee. Ideal for businesses that need a proven solution without the upfront development cost. All rental bots include maintenance and support.",
    "instructions": "Browse my portfolio of available rental bots. Choose the one that fits your needs and contact me to set up your subscription. The bot will be configured for your channel or group within 24 hours.",
    "features": [
      "E-commerce & Store Bots",
      "Subscription & Content Management Bots",
      "Support & Ticketing Systems",
      "Affordable monthly subscription plans"
    ],
    "bot_link": null
  },
  {
    "id": "hosting",
    "title": "Bot Hosting",
    "price": "$15 / month per bot",
    "description": "Ensure your bot is always online and responsive with my managed hosting service. I provide a secure, high-performance environment specifically optimized for Telegram bots, so you can focus on your business, not on server maintenance.",
    "instructions": "Provide me with your bot's source code or token. I will deploy it on a secure, private server and provide you with logs and a control panel to monitor its status. All maintenance and security updates are handled by me.",
    "features": [
      "99.9% Uptime Guarantee",
      "Secure and scalable infrastructure",
      "Automated backups and monitoring",
      "Technical support included"
    ],
    "bot_link": null
  },
  {
    "id": "selling-bot",
    "title": "Account Selling Bot",
    "price": "10% Commission Fee",
    "description": "A fully automated bot to facilitate the secure selling of Telegram accounts. List your accounts for sale, set your price, and let the bot handle the transaction with a secure escrow service to protect both buyer and seller.",
    "instructions": "Start a chat with the bot, choose the 'Sell Account' option, and follow the on-screen instructions to list your account. The bot will notify you when a buyer is found and guide you through the secure transfer process.",
    "features": [
      "Automated listing process",
      "Secure escrow system",
      "Anonymity and privacy protection",
      "Automatic payment release upon successful transfer"
    ],
    "bot_link": "#"
  },
   {
    "id": "receiver-bot",
    "title": "Account Receiver Bot",
    "price": "Free to Use",
    "description": "A utility bot for developers and power users to securely receive and manage Telegram account session files (TData). The bot provides a safe, private, and organized way to handle multiple account authentications.",
    "instructions": "Start the bot, generate a unique receiving address, and use this address in your account generation scripts. The bot will securely store the session files, allowing you to download them anytime.",
    "features": [
      "Secure and private session storage",
      "One-time receiving addresses",
      "Organized file management",
      "Easy download of account data"
    ],
    "bot_link": "#"
  },
  {
    "id": "isp-store",
    "title": "ISP Store Bots",
    "price": "Contact for Quote",
    "description": "A specialized e-commerce bot for Internet Service Providers (ISPs). Allow your customers to browse plans, check for service availability, sign up, and pay their bills directly through Telegram, streamlining your sales and support.",
    "instructions": "This is a custom-built solution. Contact me to discuss your ISP's specific requirements, such as service plans, coverage areas, and payment gateways. I will build a tailored bot for your business.",
    "features": [
      "Automated plan browsing and subscription",
      "Integrated payment gateways",
      "Customer account management",
      "Automated billing reminders and support"
    ],
    "bot_link": null
  },
  {
    "id": "language",
    "title": "Language Bots",
    "price": "$10 / month Subscription",
    "description": "An interactive bot designed to make learning a new language engaging and effective. This bot offers daily lessons, vocabulary quizzes, pronunciation help, and cultural insights, acting as a personal tutor available 24/7.",
    "instructions": "Find the bot on Telegram, press 'Start', and choose your learning path. The bot will guide you through daily lessons and interactive exercises. Use the /progress command to see how far you've come!",
    "features": [
      "Support for multiple languages (e.g. Chinese)",
      "Interactive quizzes and flashcards",
      "Pinyin and character practice",
      "Progress tracking and gamification"
    ],
    "bot_link": "#"
  }
];

const embeddedPortfolioContent = [
  {
    "title": "E-commerce Bot",
    "description": "A complete shopping bot with product catalog, cart, and Stripe integration.",
    "link": "#"
  },
  {
    "title": "Support Desk Bot",
    "description": "Automates customer support by creating tickets and answering common questions.",
    "link": "#"
  },
  {
    "title": "Content Subscription Bot",
    "description": "Manages paid subscriptions for exclusive content in a private channel.",
    "link": "#"
  }
];

const embeddedContactContent = {
  "email": "hello@botdevpro.com",
  "telegram": "#",
  "facebook": "#",
  "messenger": "#",
  "youtube": "#",
  "tiktok": "#",
  "telegram_channel": "#"
};

const embeddedTestimonialsContent = [
  {
    "quote": "The e-commerce bot developed by BotDev Pro has transformed our sales process. It's reliable, fast, and our customers love the convenience. Highly recommended!",
    "name": "Jane Doe",
    "company": "CEO, Online Retail Co."
  },
  {
    "quote": "I needed a complex bot with API integrations and a payment gateway. The final product exceeded my expectations. Professional service from start to finish.",
    "name": "John Smith",
    "company": "Founder, Tech Startup"
  },
  {
    "quote": "Our support ticket volume has decreased by 40% since implementing the support desk bot. It's an incredible tool that has freed up our team to focus on more complex issues.",
    "name": "Emily White",
    "company": "Customer Support Manager"
  }
];

// --- Global Content Store ---
let allTextContent: any;
let allServicesContent: any[];
let allPortfolioContent: any[];
let allContactContent: any;
let allTestimonialsContent: any[];

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Load content from the embedded objects instead of fetching JSON files
        allTextContent = embeddedTextContent;
        allServicesContent = embeddedServicesContent;
        allPortfolioContent = embeddedPortfolioContent;
        allContactContent = embeddedContactContent;
        allTestimonialsContent = embeddedTestimonialsContent;

        // Populate the entire application structure
        populateSharedContent();
        populateAllPageSpecificContent();
        
        // Set up navigation and interactivity
        setupAppNavigation();
        setupBackToTopButton();
        setupContactForm();

    } catch (error) {
        console.error("Failed to load website content:", error);
        document.body.innerHTML = '<p style="text-align: center; padding: 2rem;">Sorry, an unexpected error occurred while displaying the page.</p>';
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
