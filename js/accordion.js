// Accordion for osteopath section
const osteoItems = document.querySelectorAll('.osteo-item');

osteoItems.forEach(item => {
  item.addEventListener('click', () => {
    // Закриваємо всі інші відкриті картки
    osteoItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });

    //Togглимо поточну картку
    item.classList.toggle('active');
  });
});
