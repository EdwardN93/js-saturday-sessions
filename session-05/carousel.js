const generateCarousel = (
  parentElem,
  images,
  title = "Carousel",
  cssClasses = ["aspect"]
) => {
  const carouselId = `carousel-${Date.now()}`;

  const html = `
    <div class="image-change" id="${carouselId}">
        <h3>${title}</h3>
        <div class="image ${cssClasses}" id="image-${carouselId}"></div>
        <div class="btn-group">
          <button class="prev-img" data-carousel-id="${carouselId}">&laquo;</button>
          <button class="next-img" data-carousel-id="${carouselId}">&raquo;</button>
        </div>
      </div>
    `;

  parentElem.insertAdjacentHTML("beforeend", html);

  const nextImg = document.querySelector(`#${carouselId} .next-img`);
  const prevImg = document.querySelector(`#${carouselId} .prev-img`);
  const imgSrc = document.querySelector(`#${carouselId} .image`);

  let indexNumber = 0;

  const updateImage = () => {
    imgSrc.style.backgroundImage = `url(${images[indexNumber]})`;
  };

  updateImage();

  nextImg.addEventListener("click", () => {
    indexNumber = (indexNumber + 1) % images.length;
    updateImage();
  });

  prevImg.addEventListener("click", () => {
    indexNumber = (indexNumber - 1 + images.length) % images.length;
    updateImage();
  });
};
