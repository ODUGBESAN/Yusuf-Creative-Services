const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(contactForm);
    const subject = 'New project enquiry — Yusuf Creative Services';
    const message = [
      `Name: ${fields.get('name')}`,
      `Email: ${fields.get('email')}`,
      `Service: ${fields.get('service')}`,
      '',
      'Project details:',
      fields.get('message'),
    ].join('\n');
    const emailUrl = `mailto:yusuadeyeye@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    status.textContent = 'Opening your email app. Review the enquiry and press Send to deliver it to Yusuf.';
    window.location.href = emailUrl;
  });
}

