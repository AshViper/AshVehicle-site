// Translations
const translations = {
  en: {
    "nav.about": "About",
    "nav.screenshots": "Screenshots",
    "nav.changelog": "Changelog",
    "nav.vehicles": "Vehicles",
    "hero.tagline": "Minecraft vehicle mod",
    "about.title": "About",
    "about.text":
      "AshVehicle adds various vehicles to Minecraft, allowing players to travel across the world in style.",
    "screenshots.title": "Screenshots",
    "changelog.title": "Changelog",
    "changelog.initial": "Initial release",
    "sidebar.new": "What's New",
    "sidebar.new1": "New logo design",
    "sidebar.new2": "Navigation improvements",
    "sidebar.new3": "Dark mode optimization",
    "sidebar.issues": "Known Issues",
    "sidebar.issue1": "Mobile layout issues",
    "sidebar.issue2": "Loading speed improvements",
    "sidebar.links": "Links",
    "vehicles.title": "Vehicle List",
    "legend.added": "Added",
    "legend.remake": "Remake",
    "legend.retexture": "Retexture",
    "legend.planned": "Not yet started",
    "cat.helicopters": "Helicopters",
    "cat.fighters": "Fighters / Attack Aircraft",
    "cat.bombers": "Bombers",
    "cat.ground": "Ground Vehicles",
    "cat.naval": "Naval / Other",
    "cat.weapons": "Weapons (Missiles / Bombs)",
  },
  ru: {
    "nav.about": "О моде",
    "nav.screenshots": "Скриншоты",
    "nav.changelog": "История изменений",
    "nav.vehicles": "Техника",
    "hero.tagline": "Мод на транспорт для Minecraft",
    "about.title": "О моде",
    "about.text":
      "AshVehicle добавляет различные транспортные средства в Minecraft, позволяя игрокам путешествовать по миру со стилем.",
    "screenshots.title": "Скриншоты",
    "changelog.title": "История изменений",
    "changelog.initial": "Первый релиз",
    "sidebar.new": "Что нового",
    "sidebar.new1": "Новый дизайн логотипа",
    "sidebar.new2": "Улучшения навигации",
    "sidebar.new3": "Оптимизация тёмной темы",
    "sidebar.issues": "Известные проблемы",
    "sidebar.issue1": "Проблемы с мобильной версткой",
    "sidebar.issue2": "Улучшение скорости загрузки",
    "sidebar.links": "Ссылки",
    "vehicles.title": "Список техники",
    "legend.added": "Добавлено",
    "legend.remake": "Переделка",
    "legend.retexture": "Ретекстур",
    "legend.planned": "Ещё не начато",
    "cat.helicopters": "Вертолёты",
    "cat.fighters": "Истребители / Штурмовики",
    "cat.bombers": "Бомбардировщики",
    "cat.ground": "Наземная техника",
    "cat.naval": "Морская техника",
    "cat.weapons": "Оружие (Ракеты / Бомбы)",
  },
  ja: {
    "nav.about": "概要",
    "nav.screenshots": "スクリーンショット",
    "nav.changelog": "変更履歴",
    "nav.vehicles": "車両",
    "hero.tagline": "Minecraft乗り物MOD",
    "about.title": "概要",
    "about.text":
      "AshVehicleはMinecraftに様々な乗り物を追加し、プレイヤーがスタイリッシュに世界を旅することができます。",
    "screenshots.title": "スクリーンショット",
    "changelog.title": "変更履歴",
    "changelog.initial": "初回リリース",
    "sidebar.new": "新機能",
    "sidebar.new1": "新しいロゴデザイン",
    "sidebar.new2": "ナビゲーション改善",
    "sidebar.new3": "ダークモード最適化",
    "sidebar.issues": "既知の問題",
    "sidebar.issue1": "モバイル表示の問題",
    "sidebar.issue2": "読み込み速度の改善",
    "sidebar.links": "リンク",
    "vehicles.title": "車両リスト",
    "legend.added": "追加済み",
    "legend.remake": "リメイク",
    "legend.retexture": "リテクスチャ",
    "legend.planned": "未着手",
    "cat.helicopters": "ヘリコプター",
    "cat.fighters": "戦闘機 / 攻撃機",
    "cat.bombers": "爆撃機",
    "cat.ground": "地上車両",
    "cat.naval": "海軍 / その他",
    "cat.weapons": "武器 (ミサイル / 爆弾)",
  },
};

const langNames = { en: "EN", ru: "RU", ja: "JA" };

// Detect language
function detectLanguage() {
  // Check saved preference
  const saved = localStorage.getItem("lang");
  if (saved && translations[saved]) return saved;

  const lang = navigator.language || navigator.userLanguage;
  const code = lang.split("-")[0].toLowerCase();

  // CIS countries
  if (
    ["ru", "uk", "be", "kk", "uz", "ky", "tg", "az", "hy", "ka"].includes(code)
  ) {
    return "ru";
  }
  // Japanese
  if (code === "ja") {
    return "ja";
  }
  // Default to English
  return "en";
}

// Apply translations
function applyTranslations(lang) {
  const t = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  document.documentElement.lang = lang;
  document.getElementById("lang-btn").textContent = langNames[lang] || "EN";
  localStorage.setItem("lang", lang);
}

// Language selector
const langBtn = document.getElementById("lang-btn");
const langDropdown = document.getElementById("lang-dropdown");

langBtn.addEventListener("click", () => {
  langDropdown.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".lang-selector")) {
    langDropdown.classList.remove("open");
  }
});

langDropdown.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    applyTranslations(lang);
    langDropdown.classList.remove("open");
  });
});

// Hamburger menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Slideshow
const images = [
  "images/image1.png",
  "images/image2.png",
  "images/2025-07-29_20.02.33.png",
  "images/2025-07-29_19.39.21.png",
  "images/2025-07-29_18.46.40.png",
  "images/2025-07-29_18.01.39.png",
];

let currentSlide = 0;
const slideshowImg = document.getElementById("slideshow-image");

setInterval(() => {
  currentSlide = (currentSlide + 1) % images.length;
  slideshowImg.src = images[currentSlide];
}, 4000);

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const galleryItems = document.querySelectorAll(".gallery-item");

let lightboxIndex = 0;

function openLightbox(index) {
  lightboxIndex = index;
  lightboxImg.src = images[index];
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[lightboxIndex];
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex + 1) % images.length;
  lightboxImg.src = images[lightboxIndex];
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxPrev.click();
  if (e.key === "ArrowRight") lightboxNext.click();
});

// Init
applyTranslations(detectLanguage());
