
document.addEventListener("DOMContentLoaded", () => {
  init();
  window.addEventListener("hashchange", render);
  render();
});

/* =========================
   施設決定（仮固定）
   ※後でURLパラメータ化できる構造
========================= */

function getFacility() {
  // 今は固定（後で ?facility= に変更可能）
  return "hq"; // ← 一旦本部扱い
}

/* =========================
   データ
========================= */

function getNotices() {
  return JSON.parse(localStorage.getItem("notices") || "[]");
}

function saveNotices(data) {
  localStorage.setItem("notices", JSON.stringify(data));
}

/* 初期化 */
function init() {
  if (localStorage.getItem("notices")) return;

  saveNotices([
    { id: 1, title: "本部連絡", text: "メンテ予定", facility: "hq" },
    { id: 2, title: "施設A", text: "提出期限", facility: "a" },
    { id: 3, title: "施設B", text: "備品更新", facility: "b" }
  ]);
}

/* =========================
   ルーティング
========================= */

function render() {
  const content = document.querySelector(".content");
  const route = location.hash || "#home";

  const facility = getFacility();

  if (route === "#notices") {
    content.innerHTML = renderNotices(facility);
  }

  else if (route === "#admin") {
    content.innerHTML = renderAdmin();
  }

  else {
    content.innerHTML = `
      <h1>ホーム</h1>
      <p>現在：${facility}</p>
    `;
  }
}

/* =========================
   お知らせ
========================= */

function renderNotices(facility) {
  const notices = getNotices();

  const filtered = notices.filter(n => {
    return facility === "hq" ? true : n.facility === facility;
  });

  return `
    <h1>お知らせ</h1>

    <div class="notice-grid">
      ${filtered.map(n => `
        <div class="notice-card">
          <h3>${n.title}</h3>
          <p>${n.text}</p>
        </div>
      `).join("")}
    </div>
  `;
}

/* =========================
   管理画面（本部想定）
========================= */

function renderAdmin() {
  return `
    <h1>管理画面</h1>

    <div class="notice-card">
      <input id="title" placeholder="タイトル">
      <input id="text" placeholder="内容">

      <select id="facility">
        <option value="hq">本部</option>
        <option value="a">施設A</option>
        <option value="b">施設B</option>
      </select>

      <button onclick="addNotice()">追加</button>
    </div>
  `;
}

/* =========================
   追加
========================= */

function addNotice() {
  const notices = getNotices();

  notices.push({
    id: Date.now(),
    title: document.getElementById("title").value,
    text: document.getElementById("text").value,
    facility: document.getElementById("facility").value
  });

  saveNotices(notices);

  location.hash = "#notices";
  render();
}
