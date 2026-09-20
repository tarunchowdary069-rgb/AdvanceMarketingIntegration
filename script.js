const updates = [
  {
    date: "2026-09-20",
    title: "The Verifiability Revolution",
    text:
      "Why next-generation AI go-to-market systems may require " +
      "quantum-accelerated QA and zero-knowledge attestation.",
    link: "verifiability-revolution.html"
  },
  {
    date: "2026-09-19",
    title: "Marketing resource added",
    text:
      "A new practical resource has been added for visitors."
  },
  {
    date: "2026-09-18",
    title: "Mobile design improved",
    text:
      "The website now works smoothly on phones, tablets, " +
      "and computers."
  }
];

const list = document.getElementById("updateList");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyMessage");

function safe(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function render(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = updates.filter((update) => {
    const searchableText =
      `${update.title} ${update.text}`.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  list.innerHTML = filtered
    .map(
      (update) => `
        <article class="card">
          <time datetime="${safe(update.date)}">
            ${formatDate(update.date)}
          </time>

          <h3>${safe(update.title)}</h3>
          <p>${safe(update.text)}</p>

          ${
            update.link
              ? `
                <a href="${safe(update.link)}" class="card-link"> 
                  Read full article →
                </a>
              `
              : ""
          }
        </article>
      `
    )
    .join("");

  empty.hidden = filtered.length !== 0;
}

const featuredUpdate = updates[0];

document.getElementById("featuredTitle").textContent =
  featuredUpdate.title;

document.getElementById("featuredText").textContent =
  featuredUpdate.text;

search.addEventListener("input", (event) => {
  render(event.target.value);
});

const menuButton = document.getElementById("menuButton");
const mainNavigation = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
  const isOpen = mainNavigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.getElementById("year").textContent =
  new Date().getFullYear();

render();