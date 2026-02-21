const textArea = document.querySelector(".commentTypeSection");
const counter = document.querySelector(".counter");
const tagContainer = document.querySelector(".hashtagContainer");
const formEl = document.querySelector(".form");
const feedbackArea = document.querySelector(".feedbackArea");
const themeSwitcher = document.querySelector(".themeSwitcher");

// اسامی و آواتار
const names = [
  "Ayman",
  "Sara",
  "Mahdi",
  "Reza",
  "Ahmad",
  "Mina",
  "Sina",
  "Artin",
  "Mani",
  "Daniel",
  "Mohammed",
];
const avatars = [
  "https://i.pravatar.cc/36?img=1",
  "https://i.pravatar.cc/36?img=2",
  "https://i.pravatar.cc/36?img=3",
  "https://i.pravatar.cc/36?img=4",
  "https://i.pravatar.cc/36?img=5",
  "https://i.pravatar.cc/36?img=6",
  "https://i.pravatar.cc/36?img=7",
  "https://i.pravatar.cc/36?img=8",
  "https://i.pravatar.cc/36?img=9",
  "https://i.pravatar.cc/36?img=10",
  "https://i.pravatar.cc/36?img=11",
];

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

  const name = names[Math.floor(Math.random() * names.length)];
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];

  const card = `
    <div class="commentContainer">
      <div class="userInfo">
        <img src="${avatar}" alt="profile" class="userAvatar">
        <span class="userName">${name}</span>
      </div>
      <div class="showComment">${value}</div>
      <div class="commentActions">
        <button class="likeBtn">Like</button>
        <button class="replyBtn">Reply</button>
        <button class="deleteBtn">Delete</button>
      </div>
    </div>
  `;
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
  if (e.target.classList.contains("likeBtn")) {
    e.target.classList.toggle("liked");
  }

  // Delete
  if (e.target.classList.contains("deleteBtn")) {
    card.remove();
    saveComments();
  }

  // Reply
  if (e.target.classList.contains("replyBtn")) {
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
  if (e.target.classList.contains("submitReplyBtn")) {
    const replyTextarea = e.target.previousElementSibling;
    const replyText = replyTextarea.value.trim();
    if (replyText === "") return;
    const replyHTML = `<div class="replyCard">${replyText}</div>`;
    card.insertAdjacentHTML("beforeend", replyHTML);
    e.target.parentElement.remove();
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
