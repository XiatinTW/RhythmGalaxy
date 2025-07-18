---
mode: edit
---
# 目的
- <div class="MusicCradList" playlist="newdmusic"></div>底下產生音樂卡片列表，顯示最新上架的音樂

# 建立 PHP API
```php
<?php
// 以 get_newdmusic_songs.php 為例，抓最新 10 首
header('Content-Type: application/json');
try {
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=music', 'abuser', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    $sql = 'SELECT song_id, title, artist, cover_url, audio_url, duration FROM songs ORDER BY upload_time DESC LIMIT 10';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $songs = $stmt->fetchAll();
    echo json_encode(['success' => true, 'songs' => $songs]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

```

# 前端 JS 動態載入
```javascript
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.MusicCradList[playlist="newdmusic"]').forEach(list => {
    fetch('api/get_newdmusic_songs.php')
      .then(res => res.json())
      .then(json => {
        if (!json.success || !Array.isArray(json.songs)) return;
        list.innerHTML = '';
        json.songs.forEach(song => {
          const btn = document.createElement('button');
          btn.className = 'MusicCrad';
          btn.setAttribute('data-bg', song.cover_url || './assets/img/music/Rectangle01.jpg');
          btn.setAttribute('data-audio', song.audio_url || '');
          btn.innerHTML = `
            <div class="MusicCrad_1">
              <div class="MusicCrad_2"></div>
              <div class="CD_icon">
                <div class="CD3"></div>
                <div class="CD"></div>
                <div class="CD1"></div>
              </div>
            </div>
            <div class="MusicCrad_text">
              <h6>${song.title || ''}</h6>
              <p>${song.artist || ''}</p>
            </div>
          `;
          btn.style.backgroundImage = `url(${song.cover_url || './assets/img/music/Rectangle01.jpg'})`;
          // 設定子層背景圖
          const child = btn.querySelector('.MusicCrad_2');
          const cd = btn.querySelector('.CD');
          if (child) {
            child.style.backgroundImage = `url(${song.cover_url || './assets/img/music/Rectangle01.jpg'})`;
            child.style.backgroundSize = 'cover';
            child.style.backgroundPosition = 'center';
            child.style.backgroundRepeat = 'no-repeat';
          }
          if (cd) {
            cd.style.backgroundImage = `url(${song.cover_url || './assets/img/music/Rectangle01.jpg'})`;
            cd.style.backgroundSize = 'cover';
            cd.style.backgroundPosition = 'center';
            cd.style.backgroundRepeat = 'no-repeat';
          }
          btn.addEventListener('click', function () {
            const audio = document.getElementById('mainAudio');
            const playBtn = document.querySelector('.playing');
            const player = document.getElementById('AudioPlayer');
            if (audio && song.audio_url) {
              audio.pause();
              audio.src = song.audio_url;
              audio.load();
              audio.play();
            }
            if (player) {
              const titleEl = player.querySelector('.title');
              const artistEl = player.querySelector('.artist');
              const coverEl = player.querySelector('.cover');
              if (titleEl) titleEl.textContent = song.title || '';
              if (artistEl) artistEl.textContent = song.artist || '';
              if (coverEl) coverEl.style.backgroundImage = `url(${song.cover_url || './assets/img/music/Rectangle01.jpg'})`;
            }
            if (playBtn) playBtn.classList.add('pause');
          });
          list.appendChild(btn);
        });
      });
  });
});

```

# HTML 結構
```html
<div class="MusicCradList" playlist="newdmusic"></div>
```

# 引入 JS
```html
<script src="js/music_card_list.js"></script>
```

# user_id引入
- 從cookie抓user_id