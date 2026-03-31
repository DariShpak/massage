document.addEventListener('DOMContentLoaded', () => {
  // Знаходимо всі елементи з класами fade-in
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  // Налаштування Intersection Observer
  const observerOptions = {
    threshold: 0.15, // Елемент має бути видимий на 15%
    rootMargin: '0px 0px -50px 0px' // Трохи раніше запускаємо анімацію
  };

  // Callback функція
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Додаємо клас visible для запуску анімації
        entry.target.classList.add('visible');

        // Можна відписатись від елемента після анімації (опціонально)
        // observer.unobserve(entry.target);
      }
    });
  };

  // Створюємо observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Спостерігаємо за всіма елементами
  fadeElements.forEach(element => {
    observer.observe(element);
  });
});
