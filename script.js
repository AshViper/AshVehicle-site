// ハンバーガーメニューの開閉
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const imgElement = document.getElementById("slideshow-image");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// 画像ファイル名を手動で配列に記述
const images = [
  "images/image1.png",
  "images/image2.png",
  "images/image3.png",
  // 必要に応じて増やしてください
];

let current = 0;

// 最初の画像を表示
imgElement.src = images[current];
current++;

// 3秒ごとに画像を切り替え
setInterval(() => {
  imgElement.src = images[current];
  current = (current + 1) % images.length;
}, 3000);
