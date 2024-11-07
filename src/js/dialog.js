const dialog = document.querySelector("dialog");
const previous = dialog.querySelector("dialog .previous");
const next = dialog.querySelector("dialog .next");
const closeButton = document.querySelector("dialog .close");

const images = [];
let selectedImage = 0;

// Variables to track the touch positions
let touchStartX = 0;
let touchEndX = 0;
const touchBuffer = 20;

const selectImage = (image) => {
  dialog.querySelector("p").innerText = image.caption;
  dialog.querySelector("img").src = image.url;
  dialog.querySelector("img").alt = image.url;
  selectedImage = images.indexOf(image);
  previous.disabled = selectedImage === 0;
  next.disabled = selectedImage === images.length - 1;
};

const previousImage = () => {
  if (selectedImage > 0) {
    selectImage(images[selectedImage - 1]);
    return true;
  }
  return false;
};

const nextImage = () => {
  if (selectedImage < images.length - 1) {
    selectImage(images[selectedImage + 1]);
    return true;
  }
  return false;
};

// "Show the dialog" button opens the dialog modally
document.querySelectorAll(".image, .image-single").forEach((img) => {
  const element = img.querySelector("img");
  const image = {
    url: element.src,
    caption: element.alt,
  };
  images.push(image);
  img.addEventListener("click", () => {
    selectImage(image);
    dialog.showModal();
  });
});

previous.addEventListener("click", previousImage);
next.addEventListener("click", nextImage);

dialog.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    if (previousImage()) {
      previous.focus();
    } else {
      closeButton.focus();
    }
  } else if (event.key === "ArrowRight") {
    if (nextImage()) {
      next.focus();
    } else {
      closeButton.focus();
    }
  }
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// Function to handle touch start
const handleTouchStart = (event) => {
  touchStartX = event.changedTouches[0].screenX;
};

// Function to handle touch end
const handleTouchEnd = (event) => {
  touchEndX = event.changedTouches[0].screenX;

  // Detect swipe direction
  if (touchEndX + touchBuffer < touchStartX) {
    nextImage();
  } else if (touchEndX > touchStartX + touchBuffer) {
    previousImage();
  }
};

// Add event listeners for touch events
dialog.addEventListener("touchstart", handleTouchStart, false);
dialog.addEventListener("touchend", handleTouchEnd, false);
