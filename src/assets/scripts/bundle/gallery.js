(() => {
  const dialogs = Array.from(document.querySelectorAll('.gallery-modal'));
  const thumbs = document.querySelectorAll('.gallery-thumb');
  let currentIndex = 0;

  // Open modal when clicking thumbnail
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentIndex = index;
      dialogs[index].showModal();
      dialogs[index].focus();
    });
  });

  // Setup each modal
  dialogs.forEach((dialog, index) => {
    const closeBtn = dialog.querySelector('.gallery-close');
    
    // Close button
    closeBtn?.addEventListener('click', () => dialog.close());
    
    // Keyboard navigation
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dialog.close();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        dialog.close();
        currentIndex = (index + 1) % dialogs.length;
        dialogs[currentIndex].showModal();
        dialogs[currentIndex].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        dialog.close();
        currentIndex = (index - 1 + dialogs.length) % dialogs.length;
        dialogs[currentIndex].showModal();
        dialogs[currentIndex].focus();
      }
    });
  });

  // Close modal when clicking backdrop
  window.addEventListener('click', (e) => {
    dialogs.forEach(dialog => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  });
})();
