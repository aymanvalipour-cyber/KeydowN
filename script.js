const textArea = document.querySelector(".commentTypeSection");
const counter = document.querySelector(".counter");
const tagContainer = document.querySelector(".hashtagContainer");
const formEl = document.querySelector(".form");
const feedbackArea = document.querySelector(".feedbackArea");
const themeSwitcher = document.querySelector(".themeSwitcher");
const menuBtn = document.querySelector(".menuBtn");
const dropdownList = document.querySelector(".dropdownList");
const modalOverlay = document.getElementById("modalOverlay");
const loginModal = document.getElementById("loginModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const searchArea = document.getElementById("searchBar");
const searchAreaInputSection = document.querySelector("#searchInput");
const searchInput = document.getElementById("searchInput");
const tagBtns = document.querySelectorAll(".tagBtn");

// اسامی و آواتار
const profiles = [
  { name: "Ayman", avatar: "https://i.pravatar.cc/36?img=1" },
  { name: "Sara", avatar: "https://i.pravatar.cc/36?img=5" },
  { name: "Mahdi", avatar: "https://i.pravatar.cc/36?img=3" },
  { name: "Reza", avatar: "https://i.pravatar.cc/36?img=4" },
  { name: "Ahmad", avatar: "https://i.pravatar.cc/36?img=2" },
  { name: "Mina", avatar: "https://i.pravatar.cc/36?img=16" },
  { name: "Sina", avatar: "https://i.pravatar.cc/36?img=7" },
  { name: "Artin", avatar: "https://i.pravatar.cc/36?img=8" },
  { name: "Daniel", avatar: "https://i.pravatar.cc/36?img=9" },
  { name: "Mani", avatar: "https://i.pravatar.cc/36?img=10" },
  { name: "Mohammed", avatar: "https://i.pravatar.cc/36?img=11" },
];

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}
function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}
// ----------------- Character Counter -----------------
textArea.addEventListener("input", () => {
  const length = textArea.value.length;
  counter.textContent = 200 - length;
  counter.style.color = length > 200 ? "rgba(218, 56, 56, 0.83)" : "#2360a5";
});

// ----------------- Hashtag Click -----------------
tagContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("tagList")) {
    textArea.value += " " + e.target.textContent + " ";
    const length = textArea.value.length;
    counter.textContent = 200 - length;
  }
});

// ----------------- LocalStorage -----------------
const loadComments = () => {
  const data = localStorage.getItem("comments");
  if (data) {
    feedbackArea.innerHTML = data; // فقط innerHTML بذار
  }
};
loadComments();

// Save comments
const saveComments = () => {
  localStorage.setItem("comments", feedbackArea.innerHTML);
};

// ----------------- Submit Comment -----------------
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addComment(textArea.value.trim());
});

textArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addComment(textArea.value.trim());
  }
});

function addComment(value) {
  if (value === "" || !value.includes("#") || value.length > 200) return;

  const name = profiles[Math.floor(Math.random() * profiles.length)].name;
  const avatar = profiles[Math.floor(Math.random() * profiles.length)].avatar;

  const card = `
    <div class="commentContainer">
      <div class="userInfo">
        <img src="${avatar}" alt="profile" class="userAvatar">
        <span class="userName">${name}</span>
      </div>
      <div class="showComment">${value}</div>
      <div class="commentActions">
        <button class="likeBtn"><span class="material-symbols-outlined">favorite</span></button>
        <button class="replyBtn"><span class="material-symbols-outlined">reply</span></button>
        <button class="deleteBtn"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  `;
  const firstCard = feedbackArea.querySelector(".commentContainer");
  if (firstCard) {
    firstCard.classList.add("animate__animated", "animate__bounceIn");
  }
  feedbackArea.insertAdjacentHTML("afterbegin", card);
  textArea.value = "";
  counter.textContent = 200;
  saveComments();
}

// ----------------- Event Delegation for Like / Reply / Delete -----------------
feedbackArea.addEventListener("click", (e) => {
  const card = e.target.closest(".commentContainer");
  if (!card) return;

  // Like
  if (e.target.closest(".likeBtn")) {
    e.target.closest(".likeBtn").classList.toggle("liked");
  }

  // Delete
  if (e.target.closest(".deleteBtn")) {
    card.remove();
    saveComments();
  }

  // Reply
  if (e.target.closest(".replyBtn")) {
    if (!card.querySelector(".replySection")) {
      const replySection = `
        <div class="replySection">
          <textarea class="replyTextArea" placeholder="Write a reply..."></textarea>
          <button class="submitReplyBtn">Submit</button>
        </div>
      `;
      card.insertAdjacentHTML("beforeend", replySection);
    }
  }

  // Submit Reply
  if (e.target.closest(".submitReplyBtn")) {
    const replyTextarea =
      e.target.closest(".submitReplyBtn").previousElementSibling;
    const replyText = replyTextarea.value.trim();
    if (replyText === "") return;
    const replyHTML = `<div class="replyCard">${replyText}</div>`;
    card.insertAdjacentHTML("beforeend", replyHTML);
    e.target.closest(".submitReplyBtn").parentElement.remove();
    saveComments();
  }
});

// ----------------- Enter برای ریپلای -----------------
feedbackArea.addEventListener("keydown", (e) => {
  if (
    e.target.classList.contains("replyTextArea") &&
    e.key === "Enter" &&
    !e.shiftKey
  ) {
    e.preventDefault();
    e.target.nextElementSibling.click();
  }
});
// انتخاب دکمه‌های تم

const themeButtons = document.querySelectorAll(".themeBtn");
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "navy") {
    root.style.setProperty(
      "--body-bg",
      "linear-gradient(135deg, #0a1a2b, #1b1f3b)",
    );
    root.style.setProperty("--area-bg", "rgba(10, 20, 43, 0.8)");
    root.style.setProperty(
      "--card-bg",
      "linear-gradient(135deg, #0d2137, #1a3a5c)",
    );
    root.style.setProperty("--textarea-bg", "rgba(20, 35, 60, 0.7)");
    root.style.setProperty("--reply-bg", "rgba(13, 33, 55, 0.8)");
    root.style.setProperty(
      "--btn-bg",
      "linear-gradient(135deg, #0d2137, #1a3a5c)",
    );
    root.style.setProperty("--hover-color", "#3399ff");
    root.style.setProperty("--text-color", "#e0e0ff");
    root.style.setProperty(
      "--logo-gradient",
      "linear-gradient(45deg, #3399ff, #b366ff)",
    );
  }
  if (theme === "cyber") {
    root.style.setProperty(
      "--body-bg",
      "linear-gradient(135deg, #001a0f, #002b1a)",
    );
    root.style.setProperty("--area-bg", "rgba(0, 20, 12, 0.85)");
    root.style.setProperty(
      "--card-bg",
      "linear-gradient(135deg, #003320, #005c38)",
    );
    root.style.setProperty("--textarea-bg", "rgba(0, 30, 18, 0.8)");
    root.style.setProperty("--reply-bg", "rgba(0, 40, 25, 0.8)");
    root.style.setProperty(
      "--btn-bg",
      "linear-gradient(135deg, #003320, #005c38)",
    );
    root.style.setProperty("--hover-color", "#00ff9c");
    root.style.setProperty("--text-color", "#ccffe8");
    root.style.setProperty(
      "--logo-gradient",
      "linear-gradient(45deg, #00ff9c, #00b36b)",
    );
  }
  if (theme === "sunset") {
    root.style.setProperty(
      "--body-bg",
      "linear-gradient(135deg, #1a0010, #2b0020)",
    );
    root.style.setProperty("--area-bg", "rgba(30, 0, 20, 0.85)");
    root.style.setProperty(
      "--card-bg",
      "linear-gradient(135deg, #3d0020, #6b0035)",
    );
    root.style.setProperty("--textarea-bg", "rgba(40, 0, 25, 0.8)");
    root.style.setProperty("--reply-bg", "rgba(50, 0, 30, 0.8)");
    root.style.setProperty(
      "--btn-bg",
      "linear-gradient(135deg, #ff7a18, #ff0066)",
    );
    root.style.setProperty("--hover-color", "#ff7a18");
    root.style.setProperty("--text-color", "#ffe0f0");
    root.style.setProperty(
      "--logo-gradient",
      "linear-gradient(45deg, #ff7a18, #ff0066)",
    );
  }
  localStorage.setItem("theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      if (!theme) return;
      applyTheme(theme);
    });
  });

  const savedTheme = localStorage.getItem("theme") || "navy";
  applyTheme(savedTheme);
});

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownList.classList.toggle("show");
  if (dropdownList.classList.contains("show")) {
    dropdownList.classList.add("animate__animated", "animate__fadeInDown");
  }
});

document.addEventListener("click", () => {
  dropdownList.classList.remove("show");
});
document.querySelector(".loginLink").addEventListener("click", () => {
  openModal();
});

function openModal() {
  loginModal.classList.add("show");
  modalOverlay.classList.add("show");
  loginModal.classList.add("animate__animated", "animate__zoomIn");
}

function closeModal() {
  loginModal.classList.add("animate__animated", "animate__zoomOut");
  setTimeout(() => {
    loginModal.classList.remove("show");
    modalOverlay.classList.remove("show");
    loginModal.classList.remove("animate__animated", "animate__zoomOut");
  }, 400);
}

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.getElementById("searchToggleBtn").addEventListener("click", () => {
  document.getElementById("searchBar").classList.toggle("hidden");
});

searchArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("tagBtn")) {
    searchAreaInputSection.value = e.target.textContent;
  }
});
// Search & Filter

let activeTag = "all";
let searchQuery = "";

function filterComments() {
  const comments = document.querySelectorAll(".commentContainer");

  comments.forEach((comment) => {
    const text = comment
      .querySelector(".showComment")
      .textContent.toLowerCase();

    const matchesSearch = text.includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === "all" || text.includes("#" + activeTag);

    if (matchesSearch && matchesTag) {
      comment.style.display = "block";
    } else {
      comment.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  filterComments();
});

tagBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tagBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeTag = btn.dataset.tag;
    filterComments();
  });
});

