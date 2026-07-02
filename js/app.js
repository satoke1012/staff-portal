
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", render);
  render();
});

function render() {
  const content = document.querySelector(".content");
  const route = location.hash || "#home";

  content.classList.add("fade-out");

  setTimeout(() => {

    let html = "";

    switch (route) {

      case "#notices":
        html = `<h1>お知らせ</h1>`;
        break;

      case "#support":
        html = `<h1>問い合わせ</h1>`;
        break;

      case "#status":
        html = `<h1>対応状況</h1>`;
        break;

      case "#files":
        html = `<h1>ファイル共有</h1>`;
        break;

      default:
        html = `<h1>ホーム</h1>`;
        break;
    }

    content.innerHTML = html;

    content.classList.remove("fade-out");

    setActive(route);

  }, 150);
}

function setActive(route) {
  document.querySelectorAll(".sidebar nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === route);
  });
}
