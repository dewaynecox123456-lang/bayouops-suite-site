document.getElementById('year').textContent = new Date().getFullYear();

const screenshotImages = Array.from(document.querySelectorAll('.shot-card img'));
const lightbox = document.getElementById('screenshot-lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const closeButton = lightbox.querySelector('.lightbox-close');
const prevButton = lightbox.querySelector('.lightbox-prev');
const nextButton = lightbox.querySelector('.lightbox-next');

let activeScreenshotIndex = 0;

function showScreenshot(index) {
  activeScreenshotIndex = (index + screenshotImages.length) % screenshotImages.length;
  const screenshot = screenshotImages[activeScreenshotIndex];
  const caption = screenshot.closest('.shot-card').querySelector('p');

  lightboxImage.src = screenshot.currentSrc || screenshot.src;
  lightboxImage.alt = screenshot.alt;
  lightboxCaption.textContent = caption ? caption.textContent : screenshot.alt;
}

function openLightbox(index) {
  showScreenshot(index);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxImage.removeAttribute('src');
  screenshotImages[activeScreenshotIndex].focus();
}

function showPreviousScreenshot() {
  showScreenshot(activeScreenshotIndex - 1);
}

function showNextScreenshot() {
  showScreenshot(activeScreenshotIndex + 1);
}

screenshotImages.forEach((screenshot, index) => {
  screenshot.setAttribute('tabindex', '0');
  screenshot.setAttribute('role', 'button');
  screenshot.setAttribute('aria-label', `Open screenshot: ${screenshot.alt}`);

  screenshot.addEventListener('click', () => openLightbox(index));
  screenshot.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(index);
    }
  });
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', showPreviousScreenshot);
nextButton.addEventListener('click', showNextScreenshot);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    showPreviousScreenshot();
  }

  if (event.key === 'ArrowRight') {
    showNextScreenshot();
  }
});
