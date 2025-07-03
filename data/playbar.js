
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
  const audio = document.getElementById('mainAudio');
  audio.volume = percent; // 拖動中改變音量

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
let lastVolume = 0.75; // 預設最大音量

volumeBtn.addEventListener('click', () => {
  if (!isMuted) {
    // 進入靜音
    isMuted = true;
    lastVolume = parseFloat(volumeLine.style.width) / 100 || 1;
    volumeLine.style.width = '0%';
    volumeDot.style.left = '0%';
    const audio = document.getElementById('mainAudio');
    audio.volume = 0;// 點擊靜音
    volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_mute.svg')";
    volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_mute.svg')";
    audio.volume = 0;// 點擊靜音
  } else {
    // 取消靜音，恢復上次音量
    isMuted = false;
    volumeLine.style.width = `${lastVolume * 100}%`;
    volumeDot.style.left = `${lastVolume * 100}%`;
    audio.volume = lastVolume;// 取消靜音
    if (lastVolume < 0.5) {
      volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_low.svg')";
      volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_low.svg')";
    } else {
      volumeBtn.style.maskImage = "url('./assets/icon/Icon-Volume_normal.svg')";
      volumeBtn.style.webkitMaskImage = "url('./assets/icon/Icon-Volume_normal.svg')";
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('mainAudio');
  const playBtn = document.querySelector('.playing');
  const progress = document.querySelector('.progress');
  const buttons = document.querySelectorAll('.MusicCrad');

  // 預設音量為 100%
  audio.volume = 1;

  let currentMusicListIndex = -1; // 全域變數，追蹤 related 播放索引
  // 點擊 MusicCrad
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const audioSrc = button.dataset.audio;
      if (audioSrc) {
        audio.src = audioSrc;
        audio.play();
        updateAudioPlayerUI(button);
        playBtn.classList.add('pause');
        currentMusicListIndex = -1; // 不是 related 區塊
      }
    });
  });

  // 控制播放／暫停
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.add('pause');
    } else {
      audio.pause();
      playBtn.classList.remove('pause');
    }
  });

  // 更新 AudioPlayer 播放器 UI（標題、歌手、封面）
  function updateAudioPlayerUI(button) {
    const wrapper = button.parentElement;

    // DailyMusic_title
    const titleEl = wrapper.querySelector('.DailyMusic_title h5');
    const artistEl = wrapper.querySelector('.DailyMusic_title p');

    // musicCrad
    const fallbackTitleEl = button.querySelector('h6');
    const fallbackArtistEl = button.querySelector('p');

    const title = titleEl?.textContent || fallbackTitleEl?.textContent || 'Music';
    const artist = artistEl?.textContent || fallbackArtistEl?.textContent || 'Artist';
    const coverUrl = button.dataset.bg || '';

    // 套用到播放器 UI
    const player = document.getElementById('AudioPlayer');
    player.querySelector('.title').textContent = title;
    player.querySelector('.artist').textContent = artist;
    player.querySelector('.cover').style.backgroundImage = `url(${coverUrl})`;

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
  }
  // 播放時更新進度條寬度
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = percent + '%';
    }
  });
  // 讓 Music_List 也能點擊播放
  const musicLists = document.querySelectorAll('.Music_List');
  const player = document.getElementById('AudioPlayer');
  const coverEl = player.querySelector('.cover');
  const titleEl = player.querySelector('.title');
  const artistEl = player.querySelector('.artist');
  musicLists.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const audioSrc = item.dataset.audio;
      if (audioSrc) {
        audio.src = audioSrc;
        audio.play();
        playBtn.classList.add('pause');
        // 正確抓取歌名、歌手、封面
        const title = item.querySelector('.Music_item_text h6')?.textContent || 'Music';
        const artist = item.querySelector('.Music_item_text p')?.textContent || 'Artist';
        const imgDiv = item.querySelector('.Music_item_img');
        let coverUrl = '';
        if (imgDiv) {
          // 取得 url("xxx") 只取 xxx
          const bg = imgDiv.style.backgroundImage;
          const match = bg.match(/url\(["']?(.*?)["']?\)/);
          if (match) coverUrl = match[1];
        }
        titleEl.textContent = title;
        artistEl.textContent = artist;
        coverEl.style.backgroundImage = coverUrl ? `url(${coverUrl})` : '';

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
        // 記錄目前 related 播放索引
        const relatedLists = Array.from(document.querySelectorAll('#related .Music_List'));
        const relatedIdx = relatedLists.indexOf(item);
        currentMusicListIndex = relatedIdx;
      }
    });
  });
  // 只綁定一次自動接續播放
  audio.addEventListener('ended', () => {
    const relatedLists = Array.from(document.querySelectorAll('#related .Music_List'));
    if (currentMusicListIndex >= 0 && currentMusicListIndex < relatedLists.length - 1) {
      const nextItem = relatedLists[currentMusicListIndex + 1];
      if (nextItem) {
        nextItem.click();
      }
    } else {
      // relatedLists[0]?.click(); // 若要循環播放，取消註解這行
    }
  });
});
