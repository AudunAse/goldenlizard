import '@11ty/is-land/is-land';
import '@11ty/is-land/is-land-autoinit.js';

// View Transitions
function on(event, selector, callback) {
  document.addEventListener(event, e => {
    if (e.target.closest(selector)) {
      callback(e, e.target.closest(selector));
    }
  });
}

on('click', 'a[href]', function (e, el) {
  const href = el.href;

  if (href.startsWith(window.location.origin)) {
    e.preventDefault();

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = href;
      });
    } else {
      window.location.href = href;
    }
  }
});

window.addEventListener('popstate', () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {});
  }
});