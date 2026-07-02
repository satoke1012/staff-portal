const STORAGE_KEY = "bbs_posts";

function postMessage() {
  const name = document.getElementById("name").value.trim() || "名無し";
  const message = document.getElementById("message").value.trim();

  if (!message) return;

  const post = {
    name,
    message,
    time: new Date().toLocaleString("ja-JP")
  };

  const posts = getPosts();
  posts.unshift(post);

  savePosts(posts);
  renderPosts();

  document.getElementById("message").value = "";
}

function getPosts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function renderPosts() {
  const postList = document.getElementById("postList");
  const posts = getPosts();

  postList.innerHTML = posts.map((p, i) => `
    <div class="post">
      <div class="meta">#${posts.length - i} / ${p.name} / ${p.time}</div>
      <div class="text">${escapeHtml(p.message)}</div>
    </div>
  `).join("");
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

document.addEventListener("DOMContentLoaded", renderPosts);
