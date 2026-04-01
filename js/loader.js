// Page Loader
const loader = document.querySelector('.page-loader');

if (loader) {
  let loaderHidden = false;

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;

    loader.classList.add('hidden');
    setTimeout(() => {
      loader.remove();
    }, 500);
  }

  // Якщо є якір в URL (#methods, #contacts тощо) - ховаємо швидше
  const hasHash = window.location.hash;
  const maxWaitTime = hasHash ? 1500 : 3000;

  // Ховаємо лоадер після завантаження
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 500);
  });

  // Fallback: ховаємо через максимальний час в будь-якому випадку
  setTimeout(hideLoader, maxWaitTime);

  // Додатковий fallback: як тільки DOM готовий і є якір - ховаємо
  if (hasHash && document.readyState === 'interactive') {
    setTimeout(hideLoader, 800);
  }
}
