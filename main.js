document.addEventListener('DOMContentLoaded', () => {
  // 1. Валидация формы и отправка
  const form = document.querySelector('.horizontal-form');
  const toast = document.getElementById('form-toast');

  if (form) {
    // Динамически добавляем контейнеры для ошибок
    form.querySelectorAll('.form-group-inline input').forEach(input => {
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-msg')) {
        const errDiv = document.createElement('div');
        errDiv.className = 'error-msg';
        errDiv.textContent = 'Пожалуйста, заполните это поле';
        input.parentElement.insertBefore(errDiv, input.nextSibling);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input');

      inputs.forEach(input => {
        const errEl = input.nextElementSibling;
        errEl.classList.remove('visible');
        input.classList.remove('error');

        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          errEl.classList.add('visible');
        }
      });

      if (isValid) {
        toast.classList.add('show');
        form.reset();
        setTimeout(() => toast.classList.remove('show'), 4000);
      }
    });
  }

  // 2. Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});