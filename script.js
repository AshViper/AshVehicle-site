// ハンバーガーメニューの開閉
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const imgElement = document.getElementById("slideshow-image");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// スライドショー
fetch("image-list.php")
  .then((res) => {
    if (!res.ok) throw new Error("画像リストの取得に失敗しました");
    return res.json();
  })
  .then((files) => {
    if (!Array.isArray(files) || files.length === 0) {
      imgElement.alt = "画像がありません";
      return;
    }

    const images = files.map((file) => `images/${file}`);
    let current = 0;

    // 初回表示
    imgElement.src = images[current];
    current++;

    setInterval(() => {
      imgElement.src = images[current];
      current = (current + 1) % images.length;
    }, 3000);
  })
  .catch((error) => {
    console.error(error);
    imgElement.alt = "スライドショーの読み込みに失敗しました";
  });
