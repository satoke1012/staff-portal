
/* =====================================================
   Staff Portal SPA
   Ver 0.5
   - 疑似SPA（ページ遷移なし）
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  render(location.hash || "#home");
});

/* ---------- ルーティング ---------- */

function initRouter() {
  window.addEventListener("hashchange", () => {
    render(location.hash);
  });
}

/* ---------- 画面切り替え ---------- */

function render(route) {
  const content = document.querySelector(".content");

  setActiveMenu(route);

  switch (route) {
    case "#notices":
      content.innerHTML = noticesPage();
      break;

    case "#support":
      content.innerHTML = supportPage();
      break;

    case "#status":
      content.innerHTML = statusPage();
      break;

    case "#files":
      content.innerHTML = filesPage();
      break;

    default:
      content.innerHTML = homePage();
  }
}

/* ---------- ホーム ---------- */

function homePage() {
  return `
    <h1>ようこそ！</h1>
    <p>Staff Portalへようこそ。</p>

    <div class="notice-grid">
      <div class="notice-card">
        <h3>ダッシュボード</h3>
        <p>ここに最新情報が表示されます。</p>
      </div>
    </div>
  `;
}

/* ---------- お知らせ ---------- */

function noticesPage() {
  return `
    <h1>お知らせ</h1>
    <p>最新の連絡事項</p>

    <div class="notice-grid">

      <div class="notice-card high">
        <h3>システムメンテナンス</h3>
        <p>本日22:00〜実施</p>
      </div>

      <div class="notice-card medium">
        <h3>提出期限</h3>
        <p>明日まで</p>
      </div>

    </div>
  `;
}

/* ---------- 問い合わせ ---------- */

function supportPage() {
  return `
    <h1>問い合わせ</h1>

    <div class="welcome-card">
      <input placeholder="名前">
      <input placeholder="件名">
      <textarea placeholder="内容"></textarea>

      <button>送信</button>
    </div>
  `;
}

/* ---------- 対応状況 ---------- */

function statusPage() {
  return `
    <h1>対応状況</h1>

    <div class="notice-grid">
      <div class="notice-card high">ネットワーク障害：対応中</div>
      <div class="notice-card medium">PCセットアップ：未対応</div>
      <div class="notice-card low">備品申請：完了</div>
    </div>
  `;
}

/* ---------- ファイル共有 ---------- */

function filesPage() {
  return `
    <h1>ファイル共有</h1>

    <div class="notice-grid">
      <div class="notice-card">月次報告書.xlsx</div>
      <div class="notice-card">マニュアル.pdf</div>
      <div class="notice-card">設備一覧.docx</div>
    </div>
  `;
}

/* ---------- メニュー状態 ---------- */

function setActiveMenu(route) {
  const links = document.querySelectorAll(".sidebar nav a");

  links.forEach(link => {
    link.classList.remove("active");

    if (
      (route === "#home" && link.getAttribute("href") === "#home") ||
      (route === "#notices" && link.textContent.includes("お知らせ")) ||
      (route === "#support" && link.textContent.includes("問い合わせ")) ||
      (route === "#status" && link.textContent.includes("対応状況")) ||
      (route === "#files" && link.textContent.includes("ファイル"))
    ) {
      link.classList.add("active");
    }
  });
}
