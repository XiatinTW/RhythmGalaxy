const input = document.getElementById("search_Input");
const searchBox = document.getElementById("SearchBox");
if (input && searchBox) {
  input.addEventListener("focus", () => {
    searchBox.style.display = "block";
  });
  document.addEventListener("click", (event) => {
    if (
      !input.contains(event.target) &&
      !searchBox.contains(event.target)
    ) {
      searchBox.style.display = "none";
    }
  });
}
// medium版搜尋
const input1 = document.getElementById("Search_medium");
const searchBox1 = document.getElementById("SearchBox_medium");

if (input1 && searchBox1) {
  let isBoxVisible = false;

  input1.addEventListener("click", (event) => {
    event.stopPropagation();
    isBoxVisible = !isBoxVisible;
    searchBox1.style.display = isBoxVisible ? "block" : "none";
  });

  document.addEventListener("click", (event) => {
    if (
      !input1.contains(event.target) &&
      !searchBox1.contains(event.target)
    ) {
      searchBox1.style.display = "none";
      isBoxVisible = false;
    }
  });
}

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
const card = document.querySelector('.PlayBarCard_body'); // ⚠️ 注意 class 改對

if (topBtn && card) {
  topBtn.addEventListener('click', () => {
    const isActive = card.classList.toggle('active');

    // 根據狀態改變按鈕樣式（例如箭頭方向）
    topBtn.classList.toggle('Down', isActive);
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
// 篩選按鈕 顯示/隱藏
const activitySearchBtn = document.querySelector('.ActivitySearch_bt');
const activitySearchBox = document.querySelector('.ActivitySearchBox');

if (activitySearchBtn && activitySearchBox) {
  activitySearchBtn.addEventListener('click', () => {
    activitySearchBox.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!activitySearchBox.contains(e.target) && !activitySearchBtn.contains(e.target)) {
      activitySearchBox.classList.remove('active');
    }
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
  // 點擊其他地方自動關閉
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !siginInMedium.contains(e.target)) {
      nav.classList.remove('active');
    }
  });
}
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
