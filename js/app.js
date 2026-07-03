
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
          <span>${user.facility === "hq" ? "本部（全権限）" : "施設ユーザー"}</span>
        </div>

        <nav>
          <a href="#home" class="active">ホーム</a>
          <a href="#notices">お知らせ</a>
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
   データ
========================= */

const notices = [
  { title: "本部メンテナンス", text: "22:00〜", facility: "hq" },
  { title: "施設A連絡", text: "提出期限", facility: "a" },
  { title: "施設B連絡", text: "備品更新", facility: "b" },
  { title: "全体通達", text: "重要通知", facility: "hq" }
];

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
  } else {
    content.innerHTML = `
      <h1>ホーム</h1>
      <p>ようこそ ${user.facility}</p>
    `;
  }
}

/* =========================
   権限制御コア
========================= */

function renderNotices(user) {

  const filtered = notices.filter(n => {
    return user.facility === "hq" ? true : n.facility === user.facility;
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
   ログアウト
========================= */

function logout() {
  localStorage.removeItem("user");
  location.reload();
}
