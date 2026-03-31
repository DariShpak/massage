document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');

    header.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('is-open');

      // Закриваємо всі інші FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
        }
      });

      // Toggle поточного item
      if (isCurrentlyOpen) {
        item.classList.remove('is-open');
      } else {
        item.classList.add('is-open');
      }
    });
  });
});
