// Lightbox — full-screen image overlay for post images
(function () {
  const postBody = document.querySelector('.post-body');
  if (!postBody) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Image preview');
  overlay.innerHTML = '<img class="lightbox__img" alt="" />';
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox__img');

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  // Click on post images to open
  postBody.addEventListener('click', function (e) {
    const img = e.target.closest('img');
    if (!img) return;
    open(img.src, img.alt);
  });

  // Close on overlay click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === lightboxImg) {
      close();
    }
  });

  // Close on Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('lightbox--open')) {
      close();
    }
  });
})();
