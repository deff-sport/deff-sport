
function toggleMenu() {
  const nav = document.getElementById('navlinks');
  nav.classList.toggle('open');
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const objective = document.getElementById('objective').value;
    const message = document.getElementById('message').value.trim();

    const status = document.getElementById('formStatus');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = "Merci d'indiquer un email valide.";
      status.style.color = '#ffb4b4';
      return;
    }
    if (!objective) {
      status.textContent = "Choisis un objectif.";
      status.style.color = '#ffb4b4';
      return;
    }

    const payload = {
      name, email, phone, objective, message, submittedAt: new Date().toISOString()
    };
    localStorage.setItem('activezone_last_form', JSON.stringify(payload));
    status.textContent = "Merci ! Ton inscription a été prise en compte. Nous revenons vers toi très vite.";
    status.style.color = '#e09200';

    form.reset();
  });
}
