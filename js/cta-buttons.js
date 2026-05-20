document.addEventListener('DOMContentLoaded', () => {
  const floatingCtaDropdown = document.querySelector('.floating-cta-dropdown');
  const floatingCta = floatingCtaDropdown?.querySelector('.floating-cta');
  const ctaDropdowns = document.querySelectorAll('.cta-dropdown, .floating-cta-dropdown, .contact-dropdown');
  const formContainer = document.querySelector('.form-container');

  if (!floatingCtaDropdown) {
    return;
  }

  let hasAnimatedOnce = false; // Щоб анімувати тільки один раз при появі

  // Toggle для випадаючих меню CTA кнопок
  ctaDropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.cta-button, .floating-cta, .contact-dropdown-btn');

    if (!button) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Закриваємо всі інші dropdown
      ctaDropdowns.forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('active');
        }
      });

      // Toggle поточний dropdown
      dropdown.classList.toggle('active');
    });
  });

  // Закриття dropdown при кліку поза ними
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.cta-dropdown, .floating-cta-dropdown, .contact-dropdown')) {
      ctaDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Закриття dropdown при натисканні Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ctaDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Показувати/ховати floating кнопку при прокрутці
  const toggleFloatingCta = () => {
    if (window.scrollY > 500) {
      floatingCtaDropdown.classList.add('visible');
    } else {
      floatingCtaDropdown.classList.remove('visible');
    }
  };

  // Підсвічування форми
  const highlightForm = () => {
    if (formContainer) {
      formContainer.classList.add('highlight');

      // Видаляємо клас після завершення анімації (1.2s × 2 = 2.4s)
      setTimeout(() => {
        formContainer.classList.remove('highlight');
      }, 2500);
    }
  };

  // Підсвічування форми при переході по якірному посиланню
  const highlightFormWithDelay = () => {
    if (formContainer) {
      // Чекаємо поки доскролить до форми
      setTimeout(() => {
        highlightForm();
      }, 800);
    }
  };

  // Intersection Observer для автоматичного підсвічування при з'явленні в полі зору
  if (formContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedOnce) {
          highlightForm();
          hasAnimatedOnce = true;
        }
      });
    }, {
      threshold: 0.3 // Запустити коли 30% форми видно
    });

    observer.observe(formContainer);
  }

  // Слухачі подій
  window.addEventListener('scroll', toggleFloatingCta);

  // Обробка кліків тепер в smooth-scroll.js щоб уникнути конфліктів
  // ctaButtons.forEach(button => {
  //   button.addEventListener('click', highlightFormWithDelay);
  // });

  // Перевірка при завантаженні сторінки
  toggleFloatingCta();
});
