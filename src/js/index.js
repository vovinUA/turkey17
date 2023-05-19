import { gsap } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { preloadImages } from "./utils";
import { Slide } from "./slide";
import { Observer } from "gsap/Observer.js";
gsap.registerPlugin(Observer);
import "./modal-day4vid1.js";
import "./modal-gear.js";
import "./modal-map.js";
// import "./fullscr.js";

Splitting();

const DOM = {
  slides: [...document.querySelectorAll(".slide")],
  navigationItems: document.querySelectorAll(".frame__nav > .frame__nav-button"),
};

// total number of slides
const totalSlides = DOM.slides.length;

let slidesArr = [];
DOM.slides.forEach((slide) => {
  slidesArr.push(new Slide(slide));
});

// current slide position
let current = -1;
// check if animation is in progress
let isAnimating = false;

const setCurrentSlide = (position) => {
  if (current !== -1) {
    slidesArr[current].DOM.el.classList.remove("slide--current");
  }

  current = position;
  slidesArr[current].DOM.el.classList.add("slide--current");

  DOM.navigationItems[current].classList.add("frame__nav-button--current");
};

const next = () => {
  const newPosition = current < totalSlides - 1 ? current + 1 : 0;
  navigate(newPosition);
};

const prev = () => {
  const newPosition = current > 0 ? current - 1 : totalSlides - 1;
  navigate(newPosition);
};

const navigate = (newPosition) => {
  isAnimating = true;

  // change navigation current class
  DOM.navigationItems[current].classList.remove("frame__nav-button--current");
  DOM.navigationItems[newPosition].classList.add("frame__nav-button--current");

  // navigation direction
  const direction = current < newPosition ? (current === 0 && newPosition === totalSlides - 1 ? "prev" : "next") : current === totalSlides - 1 && newPosition === 0 ? "next" : "prev";

  const currentSlide = slidesArr[current];
  current = newPosition;
  const upcomingSlide = slidesArr[current];

  gsap
    .timeline({
      defaults: {
        duration: 1.5,
        ease: "power3.inOut",
      },
      onComplete: () => {
        currentSlide.DOM.el.classList.remove("slide--current");
        // Close the current slide if it was open
        if (currentSlide.isOpen) {
          hideContent(currentSlide);
        }

        isAnimating = false;
      },
    })
    .addLabel("start", 0)

    .set(
      [currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner],
      {
        transformOrigin: direction === "next" ? "0% 50%" : "100% 50%",
      },
      "start"
    )

    // Place coming slide either above (translate -100%) or below (translate 100%) and the slide__inner to the opposite translate.
    .set(
      upcomingSlide.DOM.el,
      {
        xPercent: direction === "next" ? 100 : -100,
      },
      "start"
    )
    .set(
      upcomingSlide.DOM.inner,
      {
        xPercent: direction === "next" ? -100 : 100,
      },
      "start"
    )

    // Add current class
    .add(() => {
      upcomingSlide.DOM.el.classList.add("slide--current");
    }, "start")

    // Current slide moves either up or down (translate 100% or -100%)
    .to(
      currentSlide.DOM.el,
      {
        xPercent: direction === "next" ? -100 : 100,
      },
      "start"
    )
    .to(
      currentSlide.DOM.imgInner,
      {
        scaleX: 2,
      },
      "start"
    )
    // Upcoming slide translates to 0
    .to(
      [upcomingSlide.DOM.el, upcomingSlide.DOM.inner],
      {
        xPercent: 0,
      },
      "start"
    )
    .to(
      upcomingSlide.DOM.imgInner,
      {
        ease: "power2.inOut",
        startAt: { scaleX: 2 },
        scaleX: 1,
      },
      "start"
    );
};

const initEvents = () => {
  // Links navigation
  [...DOM.navigationItems].forEach((item, position) => {
    item.addEventListener("click", () => {
      if (current === position || isAnimating) return;
      navigate(position);
    });
  });

  // Initialize the GSAP Observer plugin
  Observer.create({
    type: "wheel,touch,pointer",
    onDown: () => !isAnimating && prev(),
    onUp: () => !isAnimating && next(),
    // invert the mouse wheel delta
    wheelSpeed: -1,
    tolerance: 10,
  });

  // for (const [position, slide] of slidesArr.entries()) {
  //   slide.DOM.img.addEventListener("click", () => {
  //     showContent(position);
  //   });
  // }
};

// Set current slide
setCurrentSlide(0);

// Initialize the events
initEvents();

// Preload images and initialize scrolling animations
preloadImages(".slide__img-inner").then((_) => {
  document.body.classList.remove("loading");
});

const day2Vid2 = document.getElementById("day2-vid2-mp4");
const playBtn = document.getElementById("day2-vid2-btn");
const hint1 = document.getElementById("video-hint1");
const hint2 = document.getElementById("video-hint2");

day2Vid2.addEventListener("timeupdate", function () {
  if (day2Vid2.currentTime >= 30 && day2Vid2.currentTime <= 35) {
    hint1.style.opacity = "1";
    hint1.style.transition = "opacity 0.5s";
    setTimeout(function () {
      hint1.style.opacity = "0";
      hint1.style.transition = "opacity 0.5s";
    }, 5000);
  } else if (day2Vid2.currentTime >= 60 && day2Vid2.currentTime <= 65) {
    hint2.style.opacity = "1";
    hint2.style.transition = "opacity 0.5s";
    setTimeout(function () {
      hint2.style.opacity = "0";
      hint2.style.transition = "opacity 0.5s";
    }, 5000);
  }
});

playBtn.addEventListener("click", function () {
  day2Vid2.play();
  playBtn.style.display = "none";
});

day2Vid2.addEventListener("ended", function () {
  day2Vid2.currentTime = 0;
  playBtn.style.display = "block";
});
