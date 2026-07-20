const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    galleryItems.forEach((item) => {
      const categories = item.dataset.category?.split(' ') ?? [];
      const visible = filter === 'all' || categories.includes(filter);
      item.hidden = !visible;
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxButtons = Array.from(document.querySelectorAll('[data-lightbox]'));
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-nav--prev');
const nextButton = document.querySelector('.lightbox-nav--next');
let currentIndex = 0;

function getVisibleLightboxButtons() {
  return lightboxButtons.filter((button) => !button.closest('.gallery-item')?.hidden);
}

function renderLightbox(index) {
  const visibleButtons = getVisibleLightboxButtons();
  if (!visibleButtons.length) {
    return;
  }

  currentIndex = (index + visibleButtons.length) % visibleButtons.length;
  const currentButton = visibleButtons[currentIndex];
  const img = currentButton.querySelector('img');
  const src = currentButton.dataset.lightbox;
  const caption = currentButton.dataset.caption || img?.alt || '';
  const alt = img?.alt || caption;

  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxCaption.textContent = caption;
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = '';
  document.body.classList.remove('lightbox-open');
}

lightboxButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const visibleButtons = getVisibleLightboxButtons();
    const index = visibleButtons.indexOf(button);
    openLightbox(index === -1 ? 0 : index);
  });
});

closeButton?.addEventListener('click', closeLightbox);

prevButton?.addEventListener('click', () => {
  renderLightbox(currentIndex - 1);
});

nextButton?.addEventListener('click', () => {
  renderLightbox(currentIndex + 1);
});

lightbox?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.dataset.closeLightbox === 'true') {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (lightbox?.hidden) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    renderLightbox(currentIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    renderLightbox(currentIndex + 1);
  }
});

const reviewsTrack = document.querySelector('[data-reviews-track]');
const reviewNavButtons = document.querySelectorAll('[data-reviews-nav]');

if (reviewsTrack && reviewNavButtons.length) {
  const getScrollAmount = () => Math.min(reviewsTrack.clientWidth * 0.88, 420);

  reviewNavButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.reviewsNav === 'prev' ? -1 : 1;
      reviewsTrack.scrollBy({
        left: getScrollAmount() * direction,
        behavior: 'smooth',
      });
    });
  });
}
