document.addEventListener('DOMContentLoaded', () => {
  const floatingCta = document.querySelector('.floating-cta');
  const ctaButtons = document.querySelectorAll('.cta-button, .floating-cta');
  const formContainer = document.querySelector('.form-container');

  if (!floatingCta) {
    return;
  }

  let hasAnimatedOnce = false; // Щоб анімувати тільки один раз при появі

  // Показувати/ховати floating кнопку при прокрутці
  const toggleFloatingCta = () => {
    if (window.scrollY > 500) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
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
