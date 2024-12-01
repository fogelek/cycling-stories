const switches = document.getElementsByClassName("switch");

function store(mode) {
  if (window.localStorage.getItem(cookieConsentName) === "1") {
    window.localStorage.setItem(darkmodeName, mode);
  }
}

const sw = switches[0];
if (sw) {
  sw.onclick = () => {
    if (sw.classList.contains("init")) {
      sw.classList.remove("init");
    }
    if (sw.classList.contains("on")) {
      sw.classList.remove("on");
      sw.classList.add("off");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      store("light");
    } else {
      sw.classList.remove("off");
      sw.classList.add("on");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      store("dark");
    }
  };
}

function execDarkMode() {
  if (window.localStorage.getItem(darkmodeName) === "dark") {
    document.getElementsByTagName("body")[0].classList.add("dark");
  }
  if (window.localStorage.getItem(darkmodeName) === "light") {
    document.getElementsByTagName("body")[0].classList.add("light");
  } else {
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkTheme.matches) {
      const sw = switches[0];
      if (sw) {
        sw.classList.remove("off");
        sw.classList.add("on");
      }
    }
  }
}
execDarkMode();
