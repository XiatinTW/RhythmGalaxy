
// 音量調整功能
const volumeBtn = document.querySelector('.Volume');
const volumeBar = document.querySelector('.VolumeBar');
const volumeDot = document.querySelector('.VolumeBar_bu');
const volumeLine = document.querySelector('.VolumeBar_li');

let volumeHover = false;
let isDragging = false;

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