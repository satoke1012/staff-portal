
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", render);
  render();
});

/* =========================
   データ（施設付き）
========================= */

const notices = [
  { id: 1, title: "本部：システムメンテ", text: "22:00〜実施", facility: "hq" },
  { id: 2, title: "施設A：提出期限", text: "明日まで", facility: "a" },
  { id: 3, title: "施設B：備品申請", text: "ルール変更", facility: "b" },
  { id: 4, title: "本部：全体連絡", text: "重要通知", facility: "hq" }
];

/* =========================
   フィルタ状態
========================= */

let currentFilter = "all";

/* =========================
   ルーティング
========================= */

function render() {
  const content = document.querySelector(".content");
  const route = location.hash || "#home";

  let html = "";

  switch (route) {

    case "#notices":
      html = renderNotices();
      break;

    case "#support":
      html = `
        <h1>問い合わせ</h1>
        <input placeholder="名前">
        <input placeholder="件名">
        <textarea placeholder="内容"></textarea>
        <button>送信</button>
      `;
      break;

    case "#status":
      html = `
        <h1>対応状況</h1>
        <div class="notice-grid">
          <div class="notice-card">対応中</div>
          <div class="notice-card">未対応</div>
          <div class="notice-card">完了</div>
        </div>
      `;
      break;

    case "#files":
      html = `
        <h1>ファイル共有</h1>
        <div class="notice-grid">
          <div class="notice-card">月次報告書.xlsx</div>
          <div class="notice-card">マニュアル.pdf</div>
        </div>
      `;
      break;

    default:
      html = `
        <h1>ホーム</h1>
        <p>Staff Portalへようこそ</p>
        <div class="notice-card">ダッシュボード</div>
      `;
      break;
  }

  content.innerHTML = html;

  setActive(route);
  updateBadge();
}

/* =========================
   お知らせ描画
========================= */

function renderNotices() {
  const filtered = notices.filter(n => {
    return currentFilter === "all" || n.facility === currentFilter;
  });

  return `
    <h1>お知らせ</h1>

    <div class="filter-bar">
      ${filterBtn("all", "全体")}
      ${filterBtn("hq", "本部")}
      ${filterBtn("a", "施設A")}
      ${filterBtn("b", "施設B")}
    </div>

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

function filterBtn(key, label) {
  return `
    <button class="filter-btn ${currentFilter === key ? "active" : ""}"
      onclick="setFilter('${key}')">
      ${label}
    </button>
  `;
}

/* =========================
   フィルタ切替
========================= */

function setFilter(key) {
  currentFilter = key;
  render();
}

/* =========================
   未読バッジ
========================= */

function getUnreadCount() {
  return notices.length; // 簡易版（今は全部未読扱い）
}

function updateBadge() {
  const count = getUnreadCount();
  const link = document.querySelector('a[href="#notices"]');

  let badge = link.querySelector(".badge");

  if (!badge) {
    badge = document.createElement("span");
    badge.className = "badge";
    link.appendChild(badge);
  }

  badge.textContent = count;
}

/* =========================
   active管理
========================= */

function setActive(route) {
  document.querySelectorAll(".sidebar nav a").forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === route) {
      a.classList.add("active");
    }
  });
}
