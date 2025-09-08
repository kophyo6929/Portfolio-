
import { GoogleGenAI, Chat } from "@google/genai";

// --- Global Content Store ---
let allTextContent: any;
let allServicesContent: any[];
let allPortfolioContent: any[];
let allContactContent: any;
let allTestimonialsContent: any[];

// --- Global Animation Observer ---
let animationObserver: IntersectionObserver | null = null;

// --- Global Chatbot Store ---
let chat: Chat | null = null;


// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Setup the Intersection Observer for scroll animations
    animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    // Observe static elements that need animation
    document.querySelectorAll('.animate-in').forEach(el => {
        if (animationObserver) {
            animationObserver.observe(el);
        }
    });
    
    loadContentAndInitializeApp();
});


/**
 * Fetches all content from JSON files and then initializes the application.
 */
async function loadContentAndInitializeApp() {
    try {
        const [
            textContentRes, 
            servicesContentRes, 
            portfolioContentRes, 
            contactContentRes, 
            testimonialsContentRes
        ] = await Promise.all([
            fetch('/text.json'),
            fetch('/services.json'),
            fetch('/portfolio.json'),
            fetch('/contact.json'),
            fetch('/testimonials.json')
        ]);

        // Check if all responses are successful
        const responses = [textContentRes, servicesContentRes, portfolioContentRes, contactContentRes, testimonialsContentRes];
        for (const res of responses) {
            if (!res.ok) {
                throw new Error(`Failed to fetch ${res.url}: ${res.statusText}`);
            }
        }

        // Parse JSON from responses
        [
            allTextContent, 
            allServicesContent, 
            allPortfolioContent, 
            allContactContent, 
            allTestimonialsContent
        ] = await Promise.all(responses.map(res => res.json()));

        // Once content is loaded, populate and set up the app
        populateSharedContent();
        populateAllPageSpecificContent();
        
        setupAppNavigation();
        setupBackToTopButton();
        setupThemeToggle();
        setupContactForm();
        setupChatbot();

    } catch (error) {
        console.error("Failed to load website content:", error);
        document.body.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--error-color);">Sorry, an error occurred while loading website content. Please try again later.</p>';
    }
}

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
        skillsGrid.innerHTML = aboutContent.skills.map((skill, index) =>
            `<div class="skill-card" style="--anim-order: ${index};">${skill}</div>`
        ).join('');

        if (animationObserver) {
            skillsGrid.querySelectorAll('.skill-card').forEach(card => {
                animationObserver.observe(card);
            });
        }
    }

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid && testimonialsContent) {
        testimonialsGrid.innerHTML = testimonialsContent.map((testimonial, index) => `
            <div class="testimonial-card" style="--anim-order: ${index};">
                <blockquote>${testimonial.quote}</blockquote>
                <footer>
                    ${testimonial.name}
                    <span>${testimonial.company}</span>
                </footer>
            </div>
        `).join('');

        if (animationObserver) {
            testimonialsGrid.querySelectorAll('.testimonial-card').forEach(card => {
                animationObserver.observe(card);
            });
        }
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
 * Displays the details for a specific service in separate animated cards.
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
    
    let animOrder = 0;
    let detailsHtml = '';

    const addCard = (content: string, cardClasses: string = '') => {
        const direction = animOrder % 2 === 0 ? 'left' : 'right';
        detailsHtml += `
            <div class="service-card ${cardClasses} anim-slide-${direction}" style="--anim-order: ${animOrder};">
                ${content}
            </div>
        `;
        animOrder++;
    };

    // Card: Image (if it exists)
    if (service.image) {
        addCard(
            `<img src="${service.image}" alt="${service.title}" class="service-image" loading="lazy">`,
            'service-image-card'
        );
    }

    // Card: Title & Description
    addCard(`
        <h3>${service.title}</h3>
        <p>${service.description}</p>
    `);
    
    // Card: Price
    addCard(`
        <h4>Price</h4>
        <p class="service-price">${service.price}</p>
    `);

    // Card: Features
    if (service.features && service.features.length > 0) {
        addCard(`
            <h4>Features</h4>
            <ul>
                ${service.features.map((feature: string) => `<li>${feature}</li>`).join('')}
            </ul>
        `);
    }

    // Card: How It Works
    if (service.instructions) {
        addCard(`
            <h4>How It Works</h4>
            <p>${service.instructions}</p>
        `);
    }
    
    // Card: Actions
    const botLinkHtml = service.bot_link 
        ? `<a href="${service.bot_link}" class="btn" target="_blank" rel="noopener noreferrer">View Bot</a>` 
        : '';
    
    addCard(`
         <div class="service-actions">
            ${botLinkHtml}
            <a href="${allContactContent.telegram}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Contact Admin</a>
        </div>
    `, 'service-actions-card');

    contentDisplay.innerHTML = `<div class="service-details-container">${detailsHtml}</div>`;

    // Observe the newly created cards for animation
    if (animationObserver) {
        contentDisplay.querySelectorAll('.service-card').forEach(card => {
            animationObserver.observe(card);
        });
    }
}


/**
 * Populates the Portfolio page grid.
 */
function populatePortfolioPage(portfolioItems: any[]) {
    const portfolioGrid = document.querySelector('#page-portfolio .portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = portfolioItems.map(item => `
            <div class="portfolio-card">
                <img src="${item.image}" alt="${item.title}" class="portfolio-image" loading="lazy">
                <div class="portfolio-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="btn-link" target="_blank" rel="noopener noreferrer">View on Telegram</a>
                </div>
            </div>
        `).join('');
        
        // Observe the newly created cards for animation
        if (animationObserver) {
            portfolioGrid.querySelectorAll('.portfolio-card').forEach(card => {
                animationObserver.observe(card);
            });
        }
    }
}

/**
 * Populates the Contact page links and information.
 */
function populateContactPage(contactInfo: any) {
    const links = {
        'contact-telegram': contactInfo.telegram,
        'contact-facebook': contactInfo.facebook,
        'contact-youtube': contactInfo.youtube,
        'contact-tiktok': contactInfo.tiktok,
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
 * Sets up the dark mode theme toggle functionality.
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;
    if (!themeToggle) return;

    const setTheme = (theme: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';
    };

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked ? 'dark' : 'light');
    });

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme as 'light' | 'dark');
        return;
    }

    // If no saved theme, check for user's system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

/**
 * Sets up the contact form to open the user's default email client on submission.
 */
function setupContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const messageDisplay = document.getElementById('form-message-display') as HTMLDivElement;

    if (!form || !messageDisplay || !allContactContent) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous message
        messageDisplay.className = 'form-message';
        messageDisplay.textContent = '';
        
        const formData = new FormData(form);
        const name = (formData.get('name') as string).trim();
        const email = (formData.get('email') as string).trim();
        const message = (formData.get('message') as string).trim();
        
        if (!name || !email || !message) {
            messageDisplay.textContent = 'Please fill out all fields.';
            messageDisplay.className = 'form-message error show';
            return;
        }

        const recipientEmail = allContactContent.email;
        if (!recipientEmail) {
            console.error('Recipient email not found in contact content.');
            messageDisplay.textContent = 'An error occurred. Could not find recipient email.';
            messageDisplay.className = 'form-message error show';
            return;
        }

        const subject = `Contact from ${name} via Portfolio`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        
        messageDisplay.textContent = allTextContent.contact_page.form.success_message;
        messageDisplay.className = 'form-message success show';

        form.reset();

        setTimeout(() => {
            messageDisplay.classList.remove('show');
        }, 5000);
    });
}

// --- AI Chatbot ---

/**
 * A simple markdown parser to convert **bold**, `inline code`, and ```code blocks``` to HTML.
 * It also escapes HTML to prevent XSS.
 */
function safeMarkdownParse(text: string): string {
    // Basic HTML escaping
    const escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Markdown parsing
    return escapedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/```([\s\S]*?)```/g, (_match, code) => `<pre><code>${code.trim()}</code></pre>`)
        .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Sets up the AI Chatbot functionality.
 */
function setupChatbot() {
    const fab = document.getElementById('chatbot-fab');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const messagesContainer = document.getElementById('chatbot-messages');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input') as HTMLInputElement;
    const thinkingIndicator = document.getElementById('chatbot-thinking');
    const chatbotContainer = document.getElementById('chatbot-container');

    if (!chatbotContainer || !fab || !chatWindow || !closeBtn || !messagesContainer || !form || !input || !thinkingIndicator) {
        console.error("Chatbot elements not found.");
        return;
    }

    const toggleChatbot = (show: boolean) => {
        chatWindow.classList.toggle('open', show);
        chatWindow.setAttribute('aria-hidden', String(!show));
        fab.classList.toggle('hidden', show);
        if (show) {
            input.focus();
        }
    };
    
    fab.addEventListener('click', () => toggleChatbot(true));
    closeBtn.addEventListener('click', () => toggleChatbot(false));
    
    // Initialize the Gemini Chat
    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set.");
        }
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const systemInstruction = `You are a helpful AI assistant for a portfolio website for a developer named 'BotDev Pro'. Your goal is to answer questions from potential clients about the developer's skills, services, and portfolio based on the provided context. Do not make up information. If you don't know the answer from the context, say you can't find that information. Keep your answers concise and professional, and encourage users to use the contact form for quotes or detailed project discussions. Use simple markdown for formatting (bold, code blocks). CONTEXT: About=${JSON.stringify(allTextContent.about_page)}, Services=${JSON.stringify(allServicesContent)}, Portfolio=${JSON.stringify(allPortfolioContent)}, Contact=${JSON.stringify(allContactContent)}`;

        chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: systemInstruction,
          }
        });

    } catch(error) {
        console.error("Failed to initialize Gemini AI:", error);
        chatbotContainer.style.display = 'none';
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = input.value.trim();
        if (!userMessage || !chat) return;

        appendMessage(userMessage, 'user');
        input.value = '';
        input.focus();
        thinkingIndicator.style.display = 'flex';

        try {
            const result = await chat.sendMessageStream({ message: userMessage });
            thinkingIndicator.style.display = 'none';
            
            const botMessageElem = appendMessage('', 'bot');
            const botParagraph = botMessageElem.querySelector('p')!;
            
            let responseText = '';
            for await (const chunk of result) {
                responseText += chunk.text;
                botParagraph.innerHTML = safeMarkdownParse(responseText);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

        } catch (error) {
            console.error('Gemini API Error:', error);
            thinkingIndicator.style.display = 'none';
            appendMessage("Sorry, I encountered an error. Please try again later.", 'bot', true);
        } finally {
             messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });

    function appendMessage(text: string, sender: 'user' | 'bot', isError: boolean = false): HTMLElement {
        const messageElem = document.createElement('div');
        messageElem.className = `chat-message ${sender}`;
        if (isError) messageElem.classList.add('error');
        
        const p = document.createElement('p');
        p.innerHTML = safeMarkdownParse(text);
        messageElem.appendChild(p);

        messagesContainer.appendChild(messageElem);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return messageElem;
    }
}