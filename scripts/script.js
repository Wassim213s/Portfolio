// Smooth scrolling for anchors within the current page.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Expandable project process lists.
document.querySelectorAll('.step-title').forEach(title => {
    const list = title.parentElement.querySelector('.step-list');
    if (!list) return;
    title.setAttribute('role', 'button');
    title.setAttribute('tabindex', '0');
    title.setAttribute('aria-expanded', 'false');

    const toggle = () => {
        const isOpen = title.classList.toggle('open');
        list.classList.toggle('open', isOpen);
        title.setAttribute('aria-expanded', String(isOpen));
        list.style.maxHeight = isOpen ? `${list.scrollHeight}px` : '0px';
    };
    title.addEventListener('click', toggle);
    title.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
        }
    });
});

// Open the visitor's email application with the contact message prefilled.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(contactForm);
        const recipient = 'w.siffer' + String.fromCharCode(64) + 'outlook.fr';
        const subject = String(data.get('subject') || 'Message depuis mon portfolio');
        const body = [
            `Nom : ${data.get('name')}`,
            `Adresse e-mail : ${data.get('email')}`,
            '',
            String(data.get('message') || '')
        ].join('\n');
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
