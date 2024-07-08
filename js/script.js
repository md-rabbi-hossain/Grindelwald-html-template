/* ==========================================================================
   Testimonial Slider
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".center-slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentIndex = 0;
  const slidesToShow = 3;
  const totalSlides = slides.length;

  //**  Function to clone slides for infinite looping **//
  function cloneSlides() {
    for (let i = 0; i < slidesToShow; i++) {
      let cloneFirst = slides[i].cloneNode(true);
      let cloneLast = slides[totalSlides - 1 - i].cloneNode(true);
      slider.appendChild(cloneFirst);
      slider.insertBefore(cloneLast, slider.firstChild);
    }
  }

  cloneSlides();
  const newTotalSlides = slider.children.length;

  function updateSlider() {
    slider.style.transition = "transform 0.4s ease-in-out";
    slider.style.transform = `translateX(${
      -(currentIndex + slidesToShow) * (100 / slidesToShow)
    }%)`;
  }
  //**  Function to set active button state **//
  function setActiveButton(button) {
    prevButton.classList.remove("active-button");
    nextButton.classList.remove("active-button");
    button.classList.add("active-button");
  }

  function nextSlide() {
    setActiveButton(nextButton);
    if (currentIndex >= totalSlides) {
      slider.style.transition = "none";
      currentIndex = 0;
      slider.style.transform = `translateX(${
        -(currentIndex + slidesToShow) * (100 / slidesToShow)
      }%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          currentIndex++;
          updateSlider();
        });
      });
    } else {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    setActiveButton(prevButton);
    if (currentIndex <= 0) {
      slider.style.transition = "none";
      currentIndex = totalSlides;
      slider.style.transform = `translateX(${
        -(currentIndex + slidesToShow) * (100 / slidesToShow)
      }%)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          currentIndex--;
          updateSlider();
        });
      });
    } else {
      currentIndex--;
      updateSlider();
    }
  }
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  setInterval(nextSlide, 5000);
  slider.style.transform = `translateX(${
    -(currentIndex + slidesToShow) * (100 / slidesToShow)
  }%)`;
});

/* ==========================================================================
   Smooth Scroll Behavior
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
