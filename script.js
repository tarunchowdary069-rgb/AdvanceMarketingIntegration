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
const uploadDialog = document.getElementById("uploadDialog");
const openUploadDialog = document.getElementById("openUploadDialog");
const closeUploadDialog = document.getElementById("closeUploadDialog");
const cancelUpload = document.getElementById("cancelUpload");
const articleUploadForm = document.getElementById("articleUploadForm");
const articleGrid = document.getElementById("articleGrid");
const articleSummary = document.getElementById("articleSummary");
const summaryCount = document.getElementById("summaryCount");
const uploadStatus = document.getElementById("uploadStatus");

if (
  uploadDialog &&
  openUploadDialog &&
  articleUploadForm &&
  articleGrid
) {
  openUploadDialog.addEventListener("click", () => {
    uploadStatus.textContent = "";
    uploadDialog.showModal();
  });

  closeUploadDialog.addEventListener("click", () => {
    uploadDialog.close();
  });

  cancelUpload.addEventListener("click", () => {
    uploadDialog.close();
  });

  uploadDialog.addEventListener("click", (event) => {
    if (event.target === uploadDialog) {
      uploadDialog.close();
    }
  });

  articleSummary.addEventListener("input", () => {
    summaryCount.textContent = articleSummary.value.length;
  });

  articleUploadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document
      .getElementById("articleTitle")
      .value
      .trim();

    const summary = articleSummary.value.trim();

    const category =
      document.getElementById("articleCategory").value.trim() ||
      "Research article";

    const fileInput = document.getElementById("articleFile");
    const file = fileInput.files[0];

    if (!title || !summary || !file) {
      uploadStatus.textContent =
        "Complete the title, description, and file fields.";
      return;
    }

    const permittedExtensions = [
      ".html",
      ".htm",
      ".pdf",
      ".md",
      ".txt"
    ];

    const filename = file.name.toLowerCase();

    const isPermitted = permittedExtensions.some((extension) =>
      filename.endsWith(extension)
    );

    if (!isPermitted) {
      uploadStatus.textContent =
        "Choose an HTML, PDF, Markdown, or text file.";
      return;
    }

    const temporaryFileUrl = URL.createObjectURL(file);

    const articleCard = document.createElement("article");
    articleCard.className = "article-card";

    const articleContent = document.createElement("div");
    articleContent.className = "article-card-content";

    const articleMeta = document.createElement("div");
    articleMeta.className = "article-card-meta";

    const categoryElement = document.createElement("span");
    categoryElement.className = "article-category";
    categoryElement.textContent = category;

    const dateElement = document.createElement("time");
    const currentDate = new Date();

    dateElement.dateTime = currentDate.toISOString().split("T")[0];

    dateElement.textContent = currentDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const heading = document.createElement("h3");
    const titleLink = document.createElement("a");

    titleLink.href = temporaryFileUrl;
    titleLink.target = "_blank";
    titleLink.rel = "noopener";
    titleLink.textContent = title;

    const description = document.createElement("p");
    description.textContent = summary;

    const readLink = document.createElement("a");
    readLink.className = "article-read-link";
    readLink.href = temporaryFileUrl;
    readLink.target = "_blank";
    readLink.rel = "noopener";
    readLink.textContent = "Open uploaded article →";
    readLink.setAttribute(
      "aria-label",
      `Open uploaded article: ${title}`
    );

    articleMeta.append(categoryElement, dateElement);
    heading.appendChild(titleLink);

    articleContent.append(
      articleMeta,
      heading,
      description,
      readLink
    );

    articleCard.appendChild(articleContent);
    articleGrid.prepend(articleCard);

    articleUploadForm.reset();
    summaryCount.textContent = "0";
    uploadStatus.textContent = "The preview article was added successfully.";

    window.setTimeout(() => {
      uploadDialog.close();
      articleCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 500);
  });
}