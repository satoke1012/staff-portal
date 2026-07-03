
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", render);
  render();
});

/* =========================
   🧾 データ（JSON化部分）
========================= */

const notices = [
  {
    title: "システムメンテナンス",
    text: "本日22:00〜実施予定",
    type: "high"
  },
  {
    title: "提出期限",
    text: "明日までに対応してください",
    type: "medium"
  },
  {
    title: "備品申請",
    text: "新規ルールが追加されました",
    type: "low"
  }
];

/* =========================
   ルーティング
========================= */

function render() {
  const content = document.querySelector(".content");
  const route = location.hash || "#home";

  let html = "";

  switch (route) {

    case "#notices":
      html = `
        <h1>お知らせ</h1>

        <div class="notice-grid">
          ${notices.map(n => `
            <div class="notice-card ${n.type}">
              <h3>${n.title}</h3>
              <p>${n.text}</p>
            </div>
          `).join("")}
        </div>
      `;
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

        <div class="notice-card">
          ダッシュボード
        </div>
      `;
      break;
  }

  content.innerHTML = html;
  setActive(route);
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
