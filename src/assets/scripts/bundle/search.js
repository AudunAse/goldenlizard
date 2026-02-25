// Search Modal functionality with Pagefind

(function() {
  const modal = document.getElementById('search-modal');
  const openButtons = document.querySelectorAll('[data-search-open]');
  const closeButtons = document.querySelectorAll('[data-search-close]');

  let pagefindUI = null;
  let pagefindLoaded = false;

  // Load Pagefind UI script
  function loadPagefindScript() {
    return new Promise((resolve, reject) => {
      if (pagefindLoaded) {
        resolve();
        return;
      }

      // Load CSS
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/pagefind/pagefind-ui.css';
      document.head.appendChild(css);

      // Load JS
      const script = document.createElement('script');
      script.src = '/pagefind/pagefind-ui.js';
      script.onload = () => {
        pagefindLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Initialize Pagefind UI
  async function initializeSearch() {
    if (pagefindUI) return;

    try {
      await loadPagefindScript();

      if (window.PagefindUI) {
        pagefindUI = new window.PagefindUI({
          element: '#search',
          showSubResults: true,
          showImages: false,
          excerptLength: 15,
          resetStyles: false,
          bundlePath: '/pagefind/'
        });

        // Auto-focus the search input after a brief delay
        setTimeout(() => {
          const input = document.querySelector('.pagefind-ui__search-input');
          if (input) {
            input.focus();
          }
        }, 200);
      }
    } catch (error) {
      console.error('Failed to load Pagefind:', error);
    }
  }

  // Open modal
  function openModal() {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    initializeSearch();
  }

  // Close modal
  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // Event listeners for open buttons
  openButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  // Event listeners for close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }

    // ESC to close search
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  // Close modal when clicking backdrop
  const backdrop = modal?.querySelector('.search-modal__backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
})();
