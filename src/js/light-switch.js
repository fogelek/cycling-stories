const switches = document.getElementsByClassName("switch");
for (const i in switches) {
  const sw = switches[i];
  sw.onclick = () => {
    if (sw.classList.contains("init")) {
      sw.classList.remove("init");
    }
    if (sw.classList.contains("on")) {
      sw.classList.remove("on");
      sw.classList.add("off");
      document.body.classList.remove("dark");
    } else {
      sw.classList.remove("off");
      sw.classList.add("on");
      document.body.classList.add("dark");
    }
  };
}
