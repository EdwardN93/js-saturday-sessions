const addCarousel = document.querySelector(".add-carousel");
const carousel1 = [
  "assets/pexels-1.jpg",
  "assets/pexels-2.jpg",
  "assets/pexels-3.jpg",
  "assets/pexels-4.jpg",
];

const landscapeImages = [
  "assets/imgs/leopard-landscape.jpg",
  "assets/imgs/elephant-landscape.jpg",
  "assets/imgs/panda-landscape.jpg",
  "assets/imgs/squirrel-landscape.jpg",
  "assets/imgs/parrot-landscape.jpg",
];
// CAROUSEL 2
const portraitImages = [
  "assets/imgs/flamingo-portrait.jpg",
  "assets/imgs/leopard-portrait.jpg",
  "assets/imgs/lion-portrait.jpg",
  "assets/imgs/rabbit-portrait.jpg",
  "assets/imgs/colibri-portrait.jpg",
];

const carouselContainer = document.querySelector(".main");

addCarousel.addEventListener("click", () => {
  generateCarousel(carouselContainer, carousel1);
});

// generateCarousel(carouselContainer, landscapeImages);
// generateCarousel(
//   carouselContainer,
//   portraitImages.concat(landscapeImages),
//   "Portrait images",
//   "aspect-3-2"
// );
generateCarousel(
  carouselContainer,
  portraitImages,
  "Portrait(2/3)",
  "aspect-2-3"
);
