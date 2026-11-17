// ============================================================
// SHARED SITE SCRIPT — loaded by every page
// Handles: mobile nav toggle, active-link highlighting,
// contact/feedback form validation.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // ---- Active link highlighting based on current page ----
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- Contact / feedback form validation ----
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');
      var status = form.querySelector('.form-status');

      [name, email, message].forEach(function (field) {
        var errorEl = field.parentElement.querySelector('.form-error');
        if (!field.value.trim()) {
          errorEl.textContent = 'This field is required.';
          errorEl.style.display = 'block';
          valid = false;
        } else if (field === email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.style.display = 'block';
          valid = false;
        } else {
          errorEl.style.display = 'none';
        }
      });

      if (valid) {
        status.textContent = 'Thanks! Your message has been noted (demo only — connect a backend or mail service to actually send it).';
        status.className = 'form-status success';
        status.style.display = 'block';
        form.reset();
      } else {
        status.textContent = 'Please fix the highlighted fields.';
        status.className = 'form-status error';
        status.style.display = 'block';
      }
    });
  }

});
