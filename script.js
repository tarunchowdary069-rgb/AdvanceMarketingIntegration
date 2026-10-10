/*
  Advance Marketing Integration
  Navigation, dark mode, and footer year
*/

document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.documentElement;

  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle
    ? themeToggle.querySelector(".theme-icon")
    : null;

  const themeLabel = themeToggle
    ? themeToggle.querySelector(".theme-label")
    : null;

  const yearElement = document.getElementById("year");

  /*
    Theme management
  */

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem("ami-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";

    rootElement.setAttribute("data-theme", theme);

    /*
      Stop here when the current page does not contain
      a theme-toggle button.
    */

    if (!themeToggle) {
      return;
    }

    themeToggle.setAttribute(
      "aria-pressed",
      String(isDark)
    );

    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light" : "Dark";
    }
  }

  applyTheme(getPreferredTheme());

  /*
    Theme-toggle click
  */

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme =
        rootElement.getAttribute("data-theme");

      const nextTheme =
        currentTheme === "dark" ? "light" : "dark";

      localStorage.setItem("ami-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  /*
    Follow operating-system theme changes only when
    the visitor has not saved a manual preference.
  */

  const systemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  function handleSystemThemeChange(event) {
    const savedTheme =
      localStorage.getItem("ami-theme");

    if (!savedTheme) {
      applyTheme(event.matches ? "dark" : "light");
    }
  }

  if (typeof systemTheme.addEventListener === "function") {
    systemTheme.addEventListener(
      "change",
      handleSystemThemeChange
    );
  } else if (typeof systemTheme.addListener === "function") {
    /*
      Compatibility fallback for older browsers.
    */

    systemTheme.addListener(handleSystemThemeChange);
  }

  /*
    Mobile navigation
  */

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
      const isOpen =
        mainNav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

      menuButton.textContent = isOpen ? "×" : "☰";
    });

    mainNav
      .querySelectorAll("a")
      .forEach(function (link) {
        link.addEventListener("click", function () {
          mainNav.classList.remove("open");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          menuButton.setAttribute(
            "aria-label",
            "Open navigation"
          );

          menuButton.textContent = "☰";
        });
      });
  }

  /*
    Footer year
  */

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }
});