// data/featuredmusic.js
// AJAX 載入 songs 資料表隨機 10 首歌曲到 .MusicCradList[playlist="Featuredmusic"]
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.MusicCradList[playlist="Featuredmusic"]').forEach(list => {
    fetch('api/get_featured_songs.php')
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
