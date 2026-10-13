const menuButton = document.querySelector("#menuButton");
    const mainNav = document.querySelector("#mainNav");
    menuButton.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mainNav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
    }));

    const themeToggle = document.querySelector("#themeToggle");
    const themeIcon = document.querySelector("#themeIcon");
    function updateThemeIcon() { themeIcon.textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "☾"; }
    updateThemeIcon();
    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next; localStorage.setItem("ami-theme", next); updateThemeIcon();
    });

    const searchInput = document.querySelector("#searchInput");
    const emptyMessage = document.querySelector("#emptyMessage");
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim(); let visible = 0;
      document.querySelectorAll("#articleGrid .card").forEach(card => {
        const show = card.textContent.toLowerCase().includes(q) || card.dataset.search.includes(q);
        card.hidden = !show; if (show) visible++;
      });
      emptyMessage.hidden = visible !== 0;
    });

   const uploadForm = document.querySelector("#articleUploadForm");
const articleGrid = document.querySelector("#articleGrid");
const uploadDialog = document.querySelector("#uploadDialog");

if (uploadForm && articleGrid && uploadDialog) {
  uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document
      .querySelector("#articleTitle")
      .value
      .trim();

    const summary = document
      .querySelector("#articleSummary")
      .value
      .trim();

    const category =
      document
        .querySelector("#articleCategory")
        .value
        .trim() || "Research article";

    const file =
      document.querySelector("#articleFile").files[0];

    const status =
      document.querySelector("#uploadStatus");

    if (!title || !summary || !file) {
      if (status) {
        status.textContent =
          "Enter the title, description, and article file.";
      }

      return;
    }

    const allowedExtensions = [
      ".html",
      ".htm",
      ".pdf",
      ".md",
      ".txt"
    ];

    const filename = file.name.toLowerCase();

    const validFile = allowedExtensions.some((extension) =>
      filename.endsWith(extension)
    );

    if (!validFile) {
      if (status) {
        status.textContent =
          "Select an HTML, PDF, Markdown, or text file.";
      }

      return;
    }

    const articleURL = URL.createObjectURL(file);

    const card = document.createElement("article");
    card.className = "card uploaded-card";

    card.dataset.search =
      `${title} ${summary} ${category}`.toLowerCase();

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = category;

    const time = document.createElement("time");
    const currentDate = new Date();

    time.dateTime =
      currentDate.toISOString().slice(0, 10);

    time.textContent =
      currentDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

    const heading = document.createElement("h3");
    heading.textContent = title;

    const description = document.createElement("p");
    description.textContent = summary;

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const openLink = document.createElement("a");
    openLink.className = "card-link";
    openLink.href = articleURL;
    openLink.target = "_blank";
    openLink.rel = "noopener";
    openLink.textContent = "Open preview →";

    const deleteButton =
      document.createElement("button");

    deleteButton.className = "delete-article";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete article";

    deleteButton.setAttribute(
      "aria-label",
      `Delete uploaded article: ${title}`
    );

    deleteButton.addEventListener("click", () => {
      const confirmed = window.confirm(
        `Delete the preview article "${title}"?`
      );

      if (!confirmed) {
        return;
      }

      URL.revokeObjectURL(articleURL);
      card.remove();

      const searchInput =
        document.querySelector("#searchInput");

      if (searchInput) {
        searchInput.dispatchEvent(
          new Event("input")
        );
      }
    });

    actions.append(openLink, deleteButton);

    card.append(
      tag,
      time,
      heading,
      description,
      actions
    );

    articleGrid.prepend(card);
    uploadForm.reset();

    if (status) {
      status.textContent = "";
    }

    uploadDialog.close();

    card.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}
      e.preventDefault();
      const title = document.querySelector("#articleTitle").value.trim();
      const summary = document.querySelector("#articleSummary").value.trim();
      const category = document.querySelector("#articleCategory").value.trim() || "Research article";
      const file = document.querySelector("#articleFile").files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const card = document.createElement("article"); card.className = "card"; card.dataset.search = `${title} ${summary} ${category}`.toLowerCase();
      const tag = document.createElement("span"); tag.className = "tag"; tag.textContent = category;
      const time = document.createElement("time"); time.dateTime = new Date().toISOString().slice(0,10); time.textContent = new Date().toLocaleDateString("en-IN", {day:"numeric", month:"long", year:"numeric"});
      const h3 = document.createElement("h3"); h3.textContent = title;
      const p = document.createElement("p"); p.textContent = summary;
      const a = document.createElement("a"); a.className = "card-link"; a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Open preview →";
      card.append(tag, time, h3, p, a); document.querySelector("#articleGrid").prepend(card);
      e.target.reset(); dialog.close(); card.scrollIntoView({behavior:"smooth", block:"center"});
    ;
    document.querySelector("#year").textContent = new Date().getFullYear();
