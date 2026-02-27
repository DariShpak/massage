// Testimonials slider
const testimonialsList = document.querySelector('.testimonials-list');
const testimonialItems = document.querySelectorAll('.testimonials-item');
const leftArrow = document.querySelector('.slider-arrow-left');
const rightArrow = document.querySelector('.slider-arrow-right');
const slider = document.querySelector('.testimonials-slider');

let currentIndex = 0;
const totalSlides = testimonialItems.length;
let autoPlayInterval;

function updateSlider() {
  const offset = -currentIndex * 100;
  testimonialsList.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// Автоматична прокрутка кожні 5 секунд
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Запускаємо автопрокрутку
startAutoPlay();

// Пауза при наведенні миші
slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// Кнопки
leftArrow.addEventListener('click', () => {
  stopAutoPlay();
  prevSlide();
  startAutoPlay();
});

rightArrow.addEventListener('click', () => {
  stopAutoPlay();
  nextSlide();
  startAutoPlay();
});
