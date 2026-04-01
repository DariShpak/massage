// Плавний скрол до якорів
let isScrollingToAnchor = false;

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ігноруємо порожні якорі
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      e.stopPropagation(); // Зупиняємо спливання події

      // Прибираємо старий клас target-section з усіх секцій
      document.querySelectorAll('.target-section').forEach(el => {
        el.classList.remove('target-section');
      });

      // Додаємо клас до цільової секції
      target.classList.add('target-section');

      // Позначаємо що йде програмний скрол
      isScrollingToAnchor = true;
      document.body.classList.add('is-scrolling-to-anchor');

      // Список секцій які краще скролити до початку (великі, з багатьма елементами)
      const scrollToStartSections = ['#methods', '#help', '#about'];

      // Для великих секцій - до початку, для інших - центруємо
      const scrollPosition = scrollToStartSections.includes(href) ? 'start' : 'center';

      // Дуже плавний скрол
      target.scrollIntoView({
        behavior: 'smooth',
        block: scrollPosition
      });

      // Оновлюємо URL
      history.pushState(null, null, href);

      // Якщо це посилання на контакти - підсвічуємо форму
      if (href === '#contacts') {
        setTimeout(() => {
          const formContainer = document.querySelector('.form-container');
          if (formContainer) {
            formContainer.classList.add('highlight');
            setTimeout(() => {
              formContainer.classList.remove('highlight');
            }, 2500);
          }
        }, 800);
      }

      // Знімаємо позначки через 2 секунди (час достатній для скролу)
      setTimeout(() => {
        isScrollingToAnchor = false;
        document.body.classList.remove('is-scrolling-to-anchor');
        target.classList.remove('target-section');
      }, 2000);
    });
  });
}

// Запускаємо після завантаження DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSmoothScroll);
} else {
  setupSmoothScroll();
}

// Плавний скрол при завантаженні сторінки з якорем
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      // Додаємо клас до цільової секції
      target.classList.add('target-section');

      isScrollingToAnchor = true;
      document.body.classList.add('is-scrolling-to-anchor');

      // Невелика затримка щоб все встигло завантажитись
      setTimeout(() => {
        // Список секцій які краще скролити до початку
        const scrollToStartSections = ['#methods', '#help', '#about'];
        const scrollPosition = scrollToStartSections.includes(window.location.hash) ? 'start' : 'center';

        target.scrollIntoView({
          behavior: 'smooth',
          block: scrollPosition
        });

        // Знімаємо позначки
        setTimeout(() => {
          isScrollingToAnchor = false;
          document.body.classList.remove('is-scrolling-to-anchor');
          target.classList.remove('target-section');
        }, 2000);
      }, 300);
    }
  }
});
