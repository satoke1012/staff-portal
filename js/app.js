
/* =====================================================
   Staff Portal JS
   Ver 0.3
   - お知らせ表示
   - サイドバー状態管理
   - 仮データ駆動
===================================================== */

/* ---------- 仮データ ---------- */

const notices = [
  {
    title: "システムメンテナンス",
    text: "本日22:00〜23:00にメンテナンスがあります。",
    level: "high",
    time: "2026/07/02"
  },
  {
    title: "提出期限リマインド",
    text: "月次レポートの提出期限は明日です。",
    level: "medium",
    time: "2026/07/02"
  },
  {
    title: "新機能追加",
    text: "ファイル共有機能を追加しました。",
    level: "low",
    time: "2026/07/01"
  }
];

/* ---------- 初期化 ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderNotices();
  setActiveMenu();
});

/* ---------- お知らせ描画 ---------- */

function renderNotices() {
  const container = document.querySelector(".content");

  const html = `
    <h1>ようこそ！</h1>
    <p>Staff Portalへようこそ。</p>

    <div class="notice-grid">
      ${notices.map(n => noticeCard(n)).join("")}
    </div>
  `;

  container.innerHTML = html;
}

/* ---------- カード生成 ---------- */

function noticeCard(n) {
  return `
    <div class="notice-card ${n.level}">
      <div class="notice-header">
        <h3>${n.title}</h3>
        <span class="badge ${n.level}">${levelLabel(n.level)}</span>
      </div>
      <p>${n.text}</p>
      <div class="notice-time">${n.time}</div>
    </div>
  `;
}

/* ---------- レベル表示 ---------- */

function levelLabel(level) {
  switch (level) {
    case "high": return "重要";
    case "medium": return "通常";
    case "low": return "情報";
    default: return "";
  }
}

/* ---------- サイドバー状態 ---------- */

function setActiveMenu() {
  const links = document.querySelectorAll(".sidebar nav a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}
