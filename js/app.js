
document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  render(location.hash || "#home", true);
});

function initRouter() {
  window.addEventListener("hashchange", () => {
    render(location.hash);
  });
}

function render(route, first = false) {
  const content = document.querySelector(".content");

  setActiveMenu(route);

  // 初回はアニメなし
  if (first) {
    content.innerHTML = getPage(route);
    return;
  }

  // フェードアウト
  content.classList.add("is-leaving");

  setTimeout(() => {
    // 中身差し替え
    content.innerHTML = getPage(route);

    // フェードイン準備
    content.classList.remove("is-leaving");
    content.classList.add("is-entering");

    requestAnimationFrame(() => {
      content.classList.remove("is-entering");
    });

  }, 180);
}

/* ---------- ルーティング ---------- */

function getPage(route) {
  switch (route) {
    case "#notices":
      return noticesPage();

    case "#support":
      return supportPage();

    case "#status":
      return statusPage();

    case "#files":
      return filesPage();

    default:
      return homePage();
  }
}

/* ---------- pages ---------- */

function homePage() {
  return `
    <h1>ようこそ！</h1>
    <p>Staff Portalへようこそ。</p>

    <div class="notice-grid">
      <div class="notice-card">
        <h3>ダッシュボード</h3>
        <p>最新情報がここに表示されます</p>
      </div>
    </div>
  `;
}

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

/* ---------- active管理 ---------- */

function setActiveMenu(route) {
  const links = document.querySelectorAll(".sidebar nav a");

  links.forEach(link => {
    link.classList.remove("active");

    if (
      (route === "#home" && link.getAttribute("href") === "#home") ||
      (route === "#notices" && link.getAttribute("href") === "#notices") ||
      (route === "#support" && link.getAttribute("href") === "#support") ||
      (route === "#status" && link.getAttribute("href") === "#status") ||
      (route === "#files" && link.getAttribute("href") === "#files")
    ) {
      link.classList.add("active");
    }
  });
}
