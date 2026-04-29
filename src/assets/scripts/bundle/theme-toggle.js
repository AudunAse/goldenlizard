const storageKey = 'theme-preference';
const themeColors = {
  dark: '{{ meta.themeLight }}',
  light: '{{ meta.themeDark }}'
};

const theme = {
  value: getColorPreference()
};

window.onload = () => {
  const toggleBtn = document.querySelector('[data-theme-toggle]');

  if (!toggleBtn) {
    return;
  }

  reflectPreference();
  updateMetaThemeColor();

  toggleBtn.addEventListener('click', () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
    updateMetaThemeColor();
  });
};

// sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
  updateMetaThemeColor();
});

function getColorPreference() {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return 'light';
  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
  updateMetaThemeColor();
}

function reflectPreference() {
  document.firstElementChild.setAttribute('data-theme', theme.value);
}

function updateMetaThemeColor() {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const newColor = theme.value === 'dark' ? themeColors.dark : themeColors.light;
  metaThemeColor.setAttribute('content', newColor);
}

// set early so no page flashes / CSS is made aware
reflectPreference();
