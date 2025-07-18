// 參考 pplayhhpp.js 實作：載入所有 .Music_List[data-song-id]，AJAX 套用資料，點擊才播放
document.addEventListener('DOMContentLoaded', function () {
  // ...existing code...
});
// 點擊 .Music_List（有 data-song-id）自動撈歌並播放
// (已移除重複的 .Music_List[data-song-id] click 綁定，僅保留 DOMContentLoaded 內的事件)
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
    searchBox1.style.display = isBoxVisible ? "flex" : "none";
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
const nav2 = document.getElementById('Nav2');
const siginInMedium = document.getElementById('Nav_medium');
// 新增宣告 Nav_help2
const Nav_help2 = document.getElementById('Nav_help2');
if (nav2 && siginInMedium) {
  siginInMedium.addEventListener('click', function (e) {
    e.stopPropagation();
    nav2.classList.toggle('active');
  });
  nav2.addEventListener('click', function (e) {
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
  if (nav2 && nav2.classList.contains('active') &&
    !nav2.contains(e.target) && !siginInMedium.contains(e.target)) {
    nav2.classList.remove('active');
  }
  // 設定視窗
  if (setringBox && !setringBox.classList.contains('colse') &&
    !setringBox.contains(e.target) && setringBtn && !setringBtn.contains(e.target)) {
    setringBox.classList.add('colse');
    document.body.classList.remove('colse');
  }
  // Nav2
  if (Nav_help2 && Nav_help2.classList.contains('active') &&
    !Nav_help2.contains(e.target) && !siginInMedium.contains(e.target)) {
    Nav_help2.classList.remove('active');
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
    toggleBtn.classList.toggle('active');
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

const lyricsBtn = document.querySelector('.lyrics_bt');
if (lyricsBtn) {
  lyricsBtn.addEventListener('click', () => {
    toggleSection('lyrics', 'related');
  });
}
const relatedBtn = document.querySelector('.related_bt');
if (relatedBtn) {
  relatedBtn.addEventListener('click', () => {
    toggleSection('related', 'lyrics');
  });
}

// 秒數轉 mm:ss 格式
function formatDuration(seconds) {
  if (isNaN(seconds)) return '';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// 動態載入排行榜歌曲 function
function loadHotListMusic() {
  const chartsList = document.querySelector('#Music_Charts_List[playlist="hotlistmusic"]');
  if (chartsList) {
    fetch('api/get_hotlist_songs.php')
      .then(res => res.json())
      .then(json => {
        if (!json.success || !Array.isArray(json.data)) return;
        chartsList.innerHTML = '';
        // 取得 cookie user_id
        function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
        }
        const userId = getCookie('user_id');
        json.data.forEach(row => {
          const songId = row.song_id;
          const title = row.title || '';
          const artist = row.artist || '';
          const cover = row.cover_url || './assets/img/music/Rectangle01.jpg';
          const duration = row.duration ? formatDuration(row.duration) : '';
          // 先建立卡片 DOM
          const div = document.createElement('div');
          div.className = 'Music_List';
          div.setAttribute('data-song-id', songId);
          div.innerHTML = `
            <div class="Music_item_img" style="background-image: url('${cover}');"></div>
            <div class="Music_item_text">
              <h6>${title}</h6>
              <p>${artist}</p>
            </div>
            <p class="Music_item_playtime">${duration}</p>
            ${userId ? `<div class="Music_item2">
              <button class="Music_item_like"><div class="icon_like"></div></button>
              <button class="Music_item_share"><div class="icon_share"></div></button>
            </div>` : ''}
          `;
          chartsList.appendChild(div);
          // 依 song_id 再 AJAX 撈 audio_url
          fetch('api/get_song_info.php?song_id=' + encodeURIComponent(songId))
            .then(res => res.json())
            .then(data => {
              if (data.audio_url) {
                div.setAttribute('data-audio', data.audio_url);
              }
            });
        });
        // 觸發現有的資料補全與事件
        if (typeof window.MusicListEnhance === 'function') window.MusicListEnhance();
        // 綁定收藏按鈕
        bindLikeButtons();
        // 綁定排行榜 .Music_List 播放事件
        bindMusicListPlay();
      });
  }
}

// 綁定排行榜 .Music_List 播放事件
function bindMusicListPlay() {
  document.querySelectorAll('.Music_List[data-song-id]').forEach(function (item) {
    // 避免重複綁定
    if (item.dataset.bindPlay) return;
    item.dataset.bindPlay = '1';
    item.addEventListener('click', function () {
      const audio = document.getElementById('mainAudio');
      const playBtn = document.querySelector('.playing');
      const player = document.getElementById('AudioPlayer');
      const audioSrc = item.getAttribute('data-audio');
      // 取得歌名、歌手、封面
      const title = item.querySelector('.Music_item_text h6')?.textContent || 'Music';
      const artist = item.querySelector('.Music_item_text p')?.textContent || 'Artist';
      const imgDiv = item.querySelector('.Music_item_img');
      let coverUrl = '';
      if (imgDiv) {
        const bg = imgDiv.style.backgroundImage;
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        if (match) coverUrl = match[1];
      }
      // 新增：呼叫 add_play_history.php 寫入觀聽紀錄
      // 取得 cookie user_id
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
      const userId = getCookie('user_id');
      if (userId) {
        fetch('api/add_play_history.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ song_id: item.getAttribute('data-song-id') })
        })
        .then(res => res.json())
        .then(data => {
          // 可依需求處理回應
        });
      }
      if (audio && audioSrc) {
        audio.pause();
        audio.src = audioSrc;
        audio.load();
        audio.play().then(()=>{
          // ...existing code...
        }).catch(err => {
          // ...existing code...
        });
      } else {
        // ...existing code...
      }
      // 更新 AudioPlayer UI
      if (player) {
        const titleEl = player.querySelector('.title');
        const artistEl = player.querySelector('.artist');
        const coverEl = player.querySelector('.cover');
        if (titleEl) titleEl.textContent = title;
        if (artistEl) artistEl.textContent = artist;
        if (coverEl) coverEl.style.backgroundImage = coverUrl ? `url(${coverUrl})` : '';
      }
      // 同步 PlayBarCard 中的封面和內部元件
      const card = document.querySelector('.PlayBarCard_body .MusicCrad');
      if (card) {
        card.style.backgroundImage = `url(${coverUrl})`;
        const cardInner = card.querySelector('.MusicCrad_2');
        const cd = card.querySelector('.CD');
        if (cardInner) {
          cardInner.style.backgroundImage = `url(${coverUrl})`;
          cardInner.style.backgroundSize = 'cover';
          cardInner.style.backgroundPosition = 'center';
          cardInner.style.backgroundRepeat = 'no-repeat';
        }
        if (cd) {
          cd.style.backgroundImage = `url(${coverUrl})`;
          cd.style.backgroundSize = 'cover';
          cd.style.backgroundPosition = 'center';
          cd.style.backgroundRepeat = 'no-repeat';
        }
      }
      if (playBtn) playBtn.classList.add('pause');
    });
  });
};

// 收藏功能：動態綁定 .Music_item_like 按鈕
function bindLikeButtons() {
  document.querySelectorAll('.Music_item_like').forEach(function (btn) {
    // 避免重複綁定
    if (btn.dataset.bindLike) return;
    btn.dataset.bindLike = '1';
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // 避免觸發父層播放
      // 找到最近的 .Music_List 並取得 data-song-id
      const musicList = btn.closest('.Music_List');
      if (!musicList) return;
      const songId = musicList.getAttribute('data-song-id');
      if (!songId) {
        alert('找不到歌曲ID');
        return;
      }
      fetch('api/add_favorite.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_id: songId })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('已加入收藏!');
            loadHotListMusic(); // 收藏成功後重新載入排行榜
          } else {
            alert('收藏失敗: ' + (data.error || '未知錯誤'));
          }
        })
        .catch(() => {
          alert('收藏請求失敗');
        });
    });
  });
}
// 頁面載入時自動載入排行榜
document.addEventListener('DOMContentLoaded', function () {
  loadHotListMusic();
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