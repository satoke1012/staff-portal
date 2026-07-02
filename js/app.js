/* =========================
   掲示板ロジック
   localStorage版
========================= */

const STORAGE_KEY = "bbs_posts";

// 投稿する
function postMessage() {
  const nameEl = document.getElementById("name");
  const msgEl = document.getElementById("message");

  const name = nameEl.value.trim() || "名無し";
  const message = msgEl.value.trim();

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

  msgEl.value = "";
}

// 投稿取得
function getPosts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// 保存
function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// 表示
function renderPosts() {
  const postList = document.getElementById("postList");
  const posts = getPosts();

  postList.innerHTML = posts.map((p, i) => `
    <div class="post">
      <div class="meta">
        #${posts.length - i} / ${p.name} / ${p.time}
      </div>
      <div class="text">${escapeHtml(p.message)}</div>
    </div>
  `).join("");
}

// HTMLエスケープ（最低限の安全対策）
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// 初期表示
document.addEventListener("DOMContentLoaded", renderPosts);
