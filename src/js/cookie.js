const element = window.document.getElementById("cookie-banner");

if (!window.localStorage.getItem(cookieConsentName)) {
  element.classList.add("visible");
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function cookieConsent(value) {
  if (value === null) {
    window.localStorage.removeItem(cookieConsentName);
    window.localStorage.removeItem(darkmodeName);
    deleteAllCookies();
    element.classList.add("visible");
  } else {
    window.localStorage.setItem(cookieConsentName, value);
    if (element.classList.contains("visible")) {
      element.classList.remove("visible");
    }
  }
}

document
  .getElementById("cookieAccept")
  ?.addEventListener("click", () => cookieConsent(1));
document
  .getElementById("cookieReject")
  ?.addEventListener("click", () => cookieConsent(0));

document
  .getElementById("cookieReset")
  ?.addEventListener("click", () => cookieConsent(null));
