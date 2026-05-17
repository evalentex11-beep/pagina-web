const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let currentSlide = 0;
  let timerId;

  const setSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentSlide);
    });
  };

  const startCarousel = () => {
    timerId = window.setInterval(() => {
      setSlide(currentSlide + 1);
    }, 5200);
  };

  const restartCarousel = () => {
    window.clearInterval(timerId);
    startCarousel();
  };

  previousButton.addEventListener("click", () => {
    setSlide(currentSlide - 1);
    restartCarousel();
  });

  nextButton.addEventListener("click", () => {
    setSlide(currentSlide + 1);
    restartCarousel();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      setSlide(dotIndex);
      restartCarousel();
    });
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(timerId));
  carousel.addEventListener("mouseleave", startCarousel);

  startCarousel();
}
