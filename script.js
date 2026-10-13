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

    const dialog = document.querySelector("#uploadDialog");
    document.querySelector("#openUploadDialog").addEventListener("click", () => dialog.showModal());
    document.querySelector("#closeUploadDialog").addEventListener("click", () => dialog.close());
    document.querySelector("#cancelUpload").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
    document.querySelector("#articleUploadForm").addEventListener("submit", e => {
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
    });
    document.querySelector("#year").textContent = new Date().getFullYear();
