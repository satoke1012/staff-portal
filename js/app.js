
document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();

  if (!user) {
    showLogin();
  } else {
    showApp();
  }
});

/* =========================
   ユーザー
========================= */

function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

/* =========================
   お知らせデータ（localStorage）
========================= */

function getNotices() {
  return JSON.parse(localStorage.getItem("notices") || "[]");
}

function saveNotices(data) {
  localStorage.setItem("notices", JSON.stringify(data));
}

/* 初期データ投入 */
function initNotices() {
  if (localStorage.getItem("notices")) return;

  const base = [
    { id: 1, title: "本部メンテナンス", text: "22:00〜", facility: "hq" },
    { id: 2, title: "施設A連絡", text: "提出期限", facility: "a" },
    { id: 3, title: "施設B連絡", text: "備品更新", facility: "b" }
  ];

  saveNotices(base);
}

initNotices();

/* =========================
   ログイン
========================= */

function showLogin() {
  document.body.innerHTML = `
    <div class="login-screen">
      <div class="login-box">
        <h2>施設ログイン</h2>

        <select id="facility">
          <option value="hq">本部</option>
          <option value="a">施設A</option>
          <option value="b">施設B</option>
        </select>

        <button onclick="login()">ログイン</button>
      </div>
    </div>
  `;
}

function login() {
  const facility = document.getElementById("facility").value;
  localStorage.setItem("user", JSON.stringify({ facility }));
  location.reload();
}

/* =========================
   アプリ起動
========================= */

function showApp() {
  const user = getUser();

  document.body.innerHTML = `
    <div class="layout">

      <aside class="sidebar">
        <div class="logo">
          <h2>Staff Portal</h2>
          <span>${user.facility === "hq" ? "本部（管理者）" : "施設ユーザー"}</span>
        </div>

        <nav>
          <a href="#home">ホーム</a>
          <a href="#notices">お知らせ</a>
          ${user.facility === "hq"
            ? `<a href="#admin">管理画面</a>`
            : ""
          }
          <a href="#logout" onclick="logout()">ログアウト</a>
        </nav>
      </aside>

      <main class="content">
        <h1>読み込み中...</h1>
      </main>

    </div>
  `;

  window.addEventListener("hashchange", render);
  render();
}

/* =========================
   ルーティング
========================= */

function render() {
  const content = document.querySelector(".content");
  const route = location.hash || "#home";
  const user = getUser();

  if (route === "#logout") {
    logout();
    return;
  }

  if (route === "#notices") {
    content.innerHTML = renderNotices(user);
  }

  else if (route === "#admin") {
    if (user.facility !== "hq") {
      content.innerHTML = `<h1>権限がありません</h1>`;
      return;
    }

    content.innerHTML = renderAdmin();
  }

  else {
    content.innerHTML = `
      <h1>ホーム</h1>
      <p>ようこそ ${user.facility}</p>
    `;
  }
}

/* =========================
   お知らせ（施設制御）
========================= */

function renderNotices(user) {
  const notices = getNotices();

  const filtered = notices.filter(n => {
    return user.facility === "hq"
      ? true
      : n.facility === user.facility;
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
   管理画面
========================= */

function renderAdmin() {
  return `
    <h1>管理画面（本部専用）</h1>

    <div class="admin-box">
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

/* 追加処理 */
function addNotice() {
  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;
  const facility = document.getElementById("facility").value;

  const notices = getNotices();

  notices.push({
    id: Date.now(),
    title,
    text,
    facility
  });

  saveNotices(notices);

  alert("追加しました");
  location.hash = "#notices";
  render();
}

/* =========================
   ログアウト
========================= */

function logout() {
  localStorage.removeItem("user");
  location.reload();
}
