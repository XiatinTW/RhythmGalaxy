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
// 水平滑動
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
// 水平滑動
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

// 切換 Tab
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // 切換內容顯示
    document.querySelectorAll('.tab-content').forEach(div => {
      div.classList.remove('show');
      div.classList.add('hide');
    });
    const target = this.dataset.target;
    document.getElementById(target).classList.remove('hide');
    document.getElementById(target).classList.add('show');
  });
});

const topBtn = document.querySelector('.Top');
const card = document.querySelector('.PlayBarCard');
if (topBtn && card) {
  topBtn.addEventListener('click', () => {
    const isShow = card.classList.toggle('show');
    card.classList.toggle('hide', !isShow);
    topBtn.classList.toggle('Down', isShow);
  });
}

// 音量調整功能

const volumeBtn = document.querySelector('.Volume');
const volumeBar = document.querySelector('.VolumeBar');
const volumeDot = document.querySelector('.VolumeBar_bu');
const volumeLine = document.querySelector('.VolumeBar_li');

let isDragging = false;

// 1. 滑鼠移入/移出顯示/隱藏 VolumeBar
let volumeHover = false;

function showVolumeBar() {
  volumeBar.style.display = 'block';
}
function hideVolumeBar() {
  if (!volumeHover && !isDragging) {
    volumeBar.style.display = 'none';
  }
}

volumeBtn.addEventListener('mouseenter', () => {
  volumeHover = true;
  showVolumeBar();
});
volumeBtn.addEventListener('mouseleave', () => {
  volumeHover = false;
  setTimeout(hideVolumeBar, 100); // 延遲避免滑鼠快速移動時閃爍
});
volumeBar.addEventListener('mouseenter', () => {
  volumeHover = true;
  showVolumeBar();
});
volumeBar.addEventListener('mouseleave', () => {
  volumeHover = false;
  setTimeout(hideVolumeBar, 100);
});

// 2. 拖拉音量點
volumeDot.addEventListener('mousedown', (e) => {
  isDragging = true;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const rect = volumeBar.getBoundingClientRect();
  let x = e.clientX - rect.left;
  x = Math.max(0, Math.min(x, rect.width));
  const percent = x / rect.width;
  volumeLine.style.width = `${percent * 100}%`;
  volumeDot.style.left = `${percent * 100}%`;

  // 3. 根據百分比切換 Volume 按鈕圖示
  if (percent === 0) {
    volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_mute.svg')";
    volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_mute.svg')";
  } else if (percent < 0.5) {
    volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_low.svg')";
    volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_low.svg')";
  } else {
    volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_normal.svg')";
    volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_normal.svg')";
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.userSelect = '';
    volumeBar.style.display = 'none';
  }
});

// 預設隱藏 VolumeBar
volumeBar.style.display = 'none';

let isMuted = false;
let lastVolume = 1; // 預設最大音量

volumeBtn.addEventListener('click', () => {
  if (!isMuted) {
    // 進入靜音
    isMuted = true;
    lastVolume = parseFloat(volumeLine.style.width) / 100 || 1;
    volumeLine.style.width = '0%';
    volumeDot.style.left = '0%';
    volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_mute.svg')";
    volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_mute.svg')";
    // 這裡可加 audio.volume = 0;
  } else {
    // 取消靜音，恢復上次音量
    isMuted = false;
    volumeLine.style.width = `${lastVolume * 100}%`;
    volumeDot.style.left = `${lastVolume * 100}%`;
    if (lastVolume < 0.5) {
      volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_low.svg')";
      volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_low.svg')";
    } else {
      volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_normal.svg')";
      volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_normal.svg')";
    }
    // 這裡可加 audio.volume = lastVolume;
  }
});

/* 簡單切換 class */
const toggleBtn = document.getElementById('NAV_bt');
const sidebar  = document.getElementById('Nav');
if (toggleBtn && sidebar) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('Nav_D');
    console.log('clicked!');
  });
}