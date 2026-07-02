document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", render);
  render();
});

function render() {
  const content = document.querySelector(".content");
  const route = location.hash || "#home";

  /* 🔥 フェードアウト */
  content.classList.add("fade-out");

  setTimeout(() => {

    let html = "";

    switch (route) {

      case "#notices":
        html = `
          <h1>お知らせ</h1>

          <div class="notice-grid">
            <div class="notice-card">メンテナンス情報</div>
            <div class="notice-card">提出期限リマインド</div>
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

    /* 🔥 フェードイン */
    content.classList.remove("fade-out");
    content.classList.add("fade-in");

    requestAnimationFrame(() => {
      content.classList.remove("fade-in");
    });

    setActive(route);

  }, 180);
}

function setActive(route) {
  document.querySelectorAll(".sidebar nav a").forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === route) {
      a.classList.add("active");
    }
  });
}
