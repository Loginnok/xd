document.addEventListener("DOMContentLoaded", () => {

  // Мобильное меню
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuButton.classList.toggle("active");
    });
  }


  // Анимация появления элементов
  const animatedElements = document.querySelectorAll(
    ".product-card, .feature-card, .intro, .details, .specs"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add("animate");
    observer.observe(element);
  });


  // Плавные переходы между страницами
  document.querySelectorAll("a").forEach((link) => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:")
    ) {
      return;
    }

    link.addEventListener("click", (event) => {

      event.preventDefault();

      document.body.classList.add("page-loading");

      setTimeout(() => {
        window.location.href = href;
      }, 180);

    });

  });

});


// Обработка формы заказа
function submitOrder(event) {

  event.preventDefault();

  const form = event.target;
  const message = document.getElementById("formMessage");

  if (!message) {
    return false;
  }

  message.textContent =
    "✓ Заявка отправлена. Мы скоро свяжемся с вами.";

  message.style.opacity = "1";

  form.reset();

  return false;
}