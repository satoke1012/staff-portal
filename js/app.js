// ==============================
// Staff Portal
// app.js
// ==============================

console.log("Staff Portal 起動");

// アプリ初期化
document.addEventListener("DOMContentLoaded", () => {

    console.log("画面を読み込みました");

    init();

});

// 初期処理
function init() {

    setVersion();

}

// バージョン表示
function setVersion() {

    const version = "Ver.1.0.0";

    console.log(version);

}
