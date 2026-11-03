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
  const submitButton = contactForm.querySelector('.form-submit');
  const buttonText = submitButton.innerHTML;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.classList.remove('error');
    status.textContent = 'Sending your enquiry…';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(`Form service returned an unreadable response (HTTP ${response.status}).`);
      }

      if (!response.ok || String(result.success).toLowerCase() !== 'true') {
        throw new Error(result.message || `Form service rejected the enquiry (HTTP ${response.status}).`);
      }

      contactForm.reset();
      status.textContent = 'Thanks! Your enquiry was sent. Yusuf can reply to the email address you provided.';
    } catch (error) {
      status.classList.add('error');
      if (error instanceof TypeError) {
        status.textContent = 'Could not connect to FormSubmit. Check your internet connection and try again, or email yusuadeyeye@gmail.com.';
      } else {
        status.textContent = `FormSubmit could not send this enquiry: ${error.message} Please email yusuadeyeye@gmail.com if it keeps happening.`;
      }
      console.error('Contact form submission failed:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = buttonText;
    }
  });
}

