// data/genres_popmusic.js
// 動態載入 PoPMusic 排行榜

document.addEventListener('DOMContentLoaded', function () {
  // playlist 對應 chart_id 設定
  const playlistChartMap = {
    popmusic: 'c73cf3cbc64debbc49049a178fd4eb0b',
    hiphopMusic : '0dd132e960381e6e0e49382678378d54',
    jazzmusic: '8ea69533c1a83ce6e0847a1598e6b7f9',
    // 其他類型可在這裡加:  hiphop: 'xxxx', jazz: 'xxxx', ...
  };

  document.querySelectorAll('.MusicCradList[playlist]').forEach(list => {
    const playlist = list.getAttribute('playlist');
    const chart_id = playlistChartMap[playlist];
    if (!chart_id) return;
    fetch('api/get_chart_songs.php?chart_id=' + encodeURIComponent(chart_id))
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
        });
      });
  });
});
