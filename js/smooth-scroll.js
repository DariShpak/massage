// Плавний скрол до якорів
let isScrollingToAnchor = false;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Ігноруємо порожні якорі
    if (href === '#' || href === '#!') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // Позначаємо що йде програмний скрол
    isScrollingToAnchor = true;
    document.body.classList.add('is-scrolling-to-anchor');

    // Дуже плавний скрол - центруємо елемент на екрані
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Оновлюємо URL
    history.pushState(null, null, href);

    // Знімаємо позначку через 2 секунди (час достатній для скролу)
    setTimeout(() => {
      isScrollingToAnchor = false;
      document.body.classList.remove('is-scrolling-to-anchor');
    }, 2000);
  });
});

// Плавний скрол при завантаженні сторінки з якорем
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      isScrollingToAnchor = true;
      document.body.classList.add('is-scrolling-to-anchor');

      // Невелика затримка щоб все встигло завантажитись
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Знімаємо позначку
        setTimeout(() => {
          isScrollingToAnchor = false;
          document.body.classList.remove('is-scrolling-to-anchor');
        }, 2000);
      }, 300);
    }
  }
});
