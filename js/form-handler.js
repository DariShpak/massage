// Обробка відправки форми через Ajax для Formspree
const form = document.getElementById('my-form');
const statusDiv = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Блокуємо кнопку під час відправки
    submitButton.disabled = true;
    submitButton.textContent = 'Відправляємо...';

    // Приховуємо попереднє повідомлення, якщо воно є
    statusDiv.classList.remove('show');
    statusDiv.classList.add('hidden');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Успіх
        showStatus('Дякую! Ваше повідомлення надіслано. Я зв\'яжуся з вами найближчим часом.', 'success');
        form.reset();
      } else {
        // Помилка
        showStatus('Щось пішло не так. Спробуйте ще раз або зв\'яжіться зі мною через соцмережі.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showStatus('Помилка з\'єднання. Перевірте інтернет та спробуйте ще раз.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `form-status ${type}`;
  statusDiv.classList.remove('hidden');

  // Додаємо клас show після невеликої затримки для анімації
  setTimeout(() => {
    statusDiv.classList.add('show');
  }, 10);

  // Автоматично приховуємо через 8 секунд
  setTimeout(() => {
    statusDiv.classList.remove('show');
    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 300);
  }, 8000);
}
