// Page Loader
const loader = document.querySelector('.page-loader');
if (!loader) return;

// Перевіряємо чи лоадер вже був показаний в цій сесії
const hasSeenLoader = sessionStorage.getItem('loaderShown');

if (hasSeenLoader) {
  // Якщо вже бачили лоадер в цій сесії - одразу видаляємо
  loader.remove();
} else {
  // Перший раз - показуємо лоадер і чекаємо повного завантаження
  window.addEventListener('load', () => {
    // Позначаємо що лоадер було показано
    sessionStorage.setItem('loaderShown', 'true');

    // Додаємо невеликий мінімальний час показу лоадера (500ms)
    // щоб він не мигав занадто швидко
    setTimeout(() => {
      loader.classList.add('hidden');

      // Видаляємо лоадер з DOM після завершення анімації
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });
}
