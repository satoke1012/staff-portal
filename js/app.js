
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", render);

  render(); // 初回
});

function render() {
  const content = document.querySelector(".content");

  if (!content) {
    console.error("contentが見つからない");
    return;
  }

  const route = location.hash || "#home";

  let html = "";

  switch (route) {

    case "#notices":
      html = `
        <h1>お知らせ</h1>
        <p>最新情報一覧</p>

        <div class="notice-grid">
          <div class="notice-card">メンテナンス情報</div>
          <div class="notice-card">提出期限リマインド</div>
        </div>
      `;
      break;

    case "#support":
      html = `
        <h1>問い合わせ</h1>

        <div class="welcome-card">
          <input placeholder="名前">
          <input placeholder="件名">
          <textarea placeholder="内容"></textarea>
          <button>送信</button>
        </div>
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

    case "#home":
    default:
      html = `
        <h1>ようこそ！</h1>
        <p>Staff Portalへようこそ。</p>

        <div class="notice-card">
          ダッシュボード
        </div>
      `;
      break;
  }

  content.innerHTML = html;

  setActive(route);
}

function setActive(route) {
  const links = document.querySelectorAll(".sidebar nav a");

  links.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === route) {
      link.classList.add("active");
    }
  });
}
