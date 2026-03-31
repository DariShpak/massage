document.addEventListener('DOMContentLoaded', () => {
  const floatingCta = document.querySelector('.floating-cta');
  const ctaButtons = document.querySelectorAll('.cta-button, .floating-cta');
  const formContainer = document.querySelector('.form-container');

  if (!floatingCta) {
    return;
  }

  // Показувати/ховати floating кнопку при прокрутці
  const toggleFloatingCta = () => {
    if (window.scrollY > 500) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  };

  // Підсвічування форми при переході по якірному посиланню
  const highlightForm = () => {
    if (formContainer) {
      // Чекаємо поки доскролить до форми
      setTimeout(() => {
        formContainer.classList.add('highlight');

        // Видаляємо клас після завершення анімації
        setTimeout(() => {
          formContainer.classList.remove('highlight');
        }, 1500);
      }, 800);
    }
  };

  // Слухачі подій
  window.addEventListener('scroll', toggleFloatingCta);

  ctaButtons.forEach(button => {
    button.addEventListener('click', highlightForm);
  });

  // Перевірка при завантаженні сторінки
  toggleFloatingCta();
});
