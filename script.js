// 搜尋框、彈窗等顯示/隱藏控制
const input = document.getElementById("search_Input");
const searchBox = document.getElementById("SearchBox");
if (input && searchBox) {
  input.addEventListener("click", (event) => {
    event.stopPropagation();
    searchBox.style.display = "block";
  });
  searchBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

const input1 = document.getElementById("Search_medium");
const searchBox1 = document.getElementById("SearchBox_medium");
let isBoxVisible = false;
if (input1 && searchBox1) {
  input1.addEventListener("click", (event) => {
    event.stopPropagation();
    isBoxVisible = !isBoxVisible;
    searchBox1.style.display = isBoxVisible ? "block" : "none";
  });
  searchBox1.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

// 篩選按鈕
const activitySearchBtn = document.querySelector('.ActivitySearch_bt');
const activitySearchBox = document.querySelector('.ActivitySearchBox');
if (activitySearchBtn && activitySearchBox) {
  activitySearchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    activitySearchBox.classList.toggle('active');
  });
  activitySearchBox.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// 切換Nav2
const nav = document.getElementById('Nav2');
const siginInMedium = document.getElementById('Nav_medium');
if (nav && siginInMedium) {
  siginInMedium.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.toggle('active');
  });
  nav.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

// 設定視窗
const setringBox = document.querySelector('.setringBox');
const setringBtn = document.querySelector('#search_setring');
if (setringBox && setringBtn) {
  setringBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = !setringBox.classList.contains('colse');
    if (isOpen) {
      setringBox.classList.add('colse');
      document.body.classList.remove('colse');
    } else {
      setringBox.classList.remove('colse');
      document.body.classList.add('colse');
    }
  });
  setringBox.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

// 登入視窗
document.querySelectorAll('#SiginIn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelector('.Login').classList.remove('colse');
    document.body.classList.add('no-scroll');
  });
});
document.querySelector('.Login').addEventListener('click', function (e) {
  // 只在點擊背景時關閉，點擊內容不關閉
  if (e.target === this) {
    this.classList.add('colse');
    document.body.classList.remove('no-scroll');
  }
});

// 統一外部點擊關閉
document.addEventListener('click', function (e) {
  // searchBox
  if (input && searchBox && searchBox.style.display === "block" &&
    !input.contains(e.target) && !searchBox.contains(e.target)) {
    searchBox.style.display = "none";
  }
  // medium 版 searchBox
  if (input1 && searchBox1 && searchBox1.style.display === "block" &&
    !input1.contains(e.target) && !searchBox1.contains(e.target)) {
    searchBox1.style.display = "none";
    isBoxVisible = false;
  }
  // 活動篩選
  if (activitySearchBox && activitySearchBox.classList.contains('active') &&
    !activitySearchBox.contains(e.target) && !activitySearchBtn.contains(e.target)) {
    activitySearchBox.classList.remove('active');
  }
  // Nav2
  if (nav && nav.classList.contains('active') &&
    !nav.contains(e.target) && !siginInMedium.contains(e.target)) {
    nav.classList.remove('active');
  }
  // 設定視窗
  if (setringBox && !setringBox.classList.contains('colse') &&
    !setringBox.contains(e.target) && setringBtn && !setringBtn.contains(e.target)) {
    setringBox.classList.add('colse');
    document.body.classList.remove('colse');
  }
});

// musicCrad 圖片
document.querySelectorAll('.MusicCrad').forEach(parent => {
  const bg = parent.dataset.bg;
  if (!bg) return;

  // 父層背景
  parent.style.backgroundImage = `url(${bg})`;

  // 子層背景
  const child = parent.querySelector('.MusicCrad_2');
  const child2 = parent.querySelector('.CD');
  if (child) {
    child.style.backgroundImage = `url(${bg})`;
    child.style.backgroundSize = 'cover';
    child.style.backgroundPosition = 'center';
    child.style.backgroundRepeat = 'no-repeat';
    child2.style.backgroundImage = `url(${bg})`;
    child2.style.backgroundSize = 'cover';
    child2.style.backgroundPosition = 'center';
    child2.style.backgroundRepeat = 'no-repeat';
  }
});
// 音樂Crad水平滑動
document.querySelectorAll('.MusicCradList').forEach(scrollContainer => {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; // 拖曳速度
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});
// 活動Crad水平滑動
document.querySelectorAll('.ActivityCard_list_wrapper').forEach(scrollContainer => {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; // 拖曳速度
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});
// 活動Crad水平滑動
document.querySelectorAll('.RadioCard').forEach(scrollContainer => {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; // 拖曳速度
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});
// PadioCrad水平滑動
document.querySelectorAll('.PodcastCradList').forEach(scrollContainer => {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; // 拖曳速度
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});
// podcastEpisode水平滑動
document.querySelectorAll('.podcastEpisode').forEach(scrollContainer => {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1; // 拖曳速度
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});

// 切換播放列Card收放
const topBtn = document.querySelector('.Top');
const card = document.querySelector('.PlayBarCard_body');

if (topBtn && card) {
  topBtn.addEventListener('click', () => {
    const isOpen = !card.classList.toggle('colse');
    topBtn.classList.toggle('Down', isOpen);
  });
}

/* 簡單切換 Nav */
const toggleBtn = document.getElementById('NAV_bt');
const sidebar = document.getElementById('Nav');
if (toggleBtn && sidebar) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('Nav_D');
    console.log('clicked!');
  });
}

// 活動Crad背景圖抓取.ActivityCardTab有子元素img取得src，然後把style屬性寫在變數--bg-img讓他讀取。
document.querySelectorAll('.ActivityCardTab').forEach(tab => {
  const img = tab.querySelector('img');
  if (img) {
    const src = img.getAttribute('src');
    tab.style.setProperty('--bg-img', `linear-gradient(0deg, rgba(64,64,64,0.6), rgba(64,64,64,0.6)), url(${src}) center / cover no-repeat`);
  }
});

// 歌詞&相關音樂切換
function toggleSection(showId, hideId) {
  document.getElementById(showId).classList.add('show');
  document.getElementById(showId).classList.remove('hide');
  document.getElementById(hideId).classList.add('hide');
  document.getElementById(hideId).classList.remove('show');
}

document.querySelector('.lyrics_bt').addEventListener('click', () => {
  toggleSection('lyrics', 'related');
});
document.querySelector('.related_bt').addEventListener('click', () => {
  toggleSection('related', 'lyrics');
});
// 活動卡輪播
const track = document.getElementById("carouselTrack");
if (track) {
  const cards = Array.from(track.children);
  const cardWidth = cards[0].offsetWidth + 20; // 卡片寬度 + gap
  let currentIndex = 0;

  // 複製前幾張卡片，接到最後
  cards.slice(0, 2).forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  function autoScroll() {
    currentIndex++;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

    if (currentIndex === cards.length) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        currentIndex = 0;
      }, 500);
    }
  }

  setInterval(autoScroll, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('LoginButton');
  if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // 避免被外部 click 統一關閉邏輯干擾
      window.location.href = 'index_Login.html';
    });
  }
});