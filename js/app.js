
document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();

  if (!user) {
    showLogin();
  } else {
    showApp();
  }
});

/* =========================
   ユーザー取得
========================= */

function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

/* =========================
   ログイン画面
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

  const user = {
    facility
  };

  localStorage.setItem("user", JSON.stringify(user));
  location.reload();
}

/* =========================
   アプリ本体
========================= */

function showApp() {
  document.body.innerHTML = `
    <div class="layout">

      <aside class="sidebar">
        <div class="logo">
          <h2>Staff Portal</h2>
          <span>Facility: ${getUser().facility}</span>
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
    content.innerHTML = renderNotices(user.facility);
  } else {
    content.innerHTML = `
      <h1>ホーム</h1>
      <p>ようこそ ${user.facility}</p>
    `;
  }
}

/* =========================
   データ
========================= */

const notices = [
  { title: "本部メンテ", text: "22:00〜", facility: "hq" },
  { title: "施設A連絡", text: "提出期限", facility: "a" },
  { title: "施設B連絡", text: "備品更新", facility: "b" },
];

/* =========================
   フィルタ（施設制御）
========================= */

function renderNotices(facility) {
  const filtered = notices.filter(n =>
    facility === "hq" ? true : n.facility === facility
  );

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
