(() => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenuBtn || !mobileMenu) {
    return;
  }

  const toggleMenu = () => {
    const isOpen = mobileMenuBtn.classList.contains('is-open');

    mobileMenuBtn.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open');

    // Блокування прокрутки body коли меню відкрите
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Закриття меню при кліку на посилання
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // Закриття меню при зміні розміру вікна (якщо перейшли на десктоп)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('is-open')) {
      toggleMenu();
    }
  });
})();
