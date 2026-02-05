/**
 * Add a "Copy" button to each code block in main. On click, copy code to clipboard.
 */
(function () {
  function init() {
    const blocks = document.querySelectorAll('main pre code');
    blocks.forEach((code) => {
      const pre = code.closest('pre');
      if (!pre || pre.querySelector('.copy-code-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');

      btn.addEventListener('click', () => {
        const text = code.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          btn.setAttribute('aria-label', 'Copied to clipboard');
          const t = setTimeout(() => {
            btn.textContent = 'Copy';
            btn.setAttribute('aria-label', 'Copy code to clipboard');
            clearTimeout(t);
          }, 2000);
        }).catch(() => {
          btn.textContent = 'Copy';
        });
      });

      pre.classList.add('has-copy-btn');
      pre.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
