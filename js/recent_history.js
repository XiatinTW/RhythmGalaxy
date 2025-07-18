// 從 cookie 取得 user_id
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

document.addEventListener('DOMContentLoaded', function () {
  const userId = getCookie('user_id');
  const list = document.getElementById('Music_Charts_List');
  if (!userId) {
    list.innerHTML = '<p>請先登入以查看紀錄。</p>';
    return;
  }
  fetch('api/get_user_history.php')
    .then(res => res.json())
    .then(json => {
      if (!json.success || !Array.isArray(json.songs) || json.songs.length === 0) {
        list.innerHTML = '<p>尚無紀錄。</p>';
        return;
      }
      list.innerHTML = '';
      json.songs.forEach(song => {
        const div = document.createElement('div');
        div.className = 'Music_List';
        div.setAttribute('data-song-id', song.song_id);
        div.setAttribute('data-audio', song.audio_url || '');
        div.innerHTML = `
          <div class="Music_item_img" style="background-image: url('${song.cover_url ? song.cover_url : './assets/img/music/Rectangle01.jpg'}');"></div>
          <div class="Music_item_text">
              <h6>${song.title ? song.title : 'null'}</h6>
              <p>${song.artist ? song.artist : 'null'}</p>
          </div>
          <p class="Music_item_playtime">${song.duration ? (Math.floor(song.duration / 60)).toString().padStart(2, '0') + ':' + (song.duration % 60).toString().padStart(2, '0') : '00:00'}</p>
        `;
        // 綁定播放事件
        div.addEventListener('click', function () {
          const audio = document.getElementById('mainAudio');
          const playBtn = document.querySelector('.playing');
          const player = document.getElementById('AudioPlayer');
          const audioSrc = div.getAttribute('data-audio');
          const title = div.querySelector('.Music_item_text h6')?.textContent || 'Music';
          const artist = div.querySelector('.Music_item_text p')?.textContent || 'Artist';
          const imgDiv = div.querySelector('.Music_item_img');
          let coverUrl = '';
          if (imgDiv) {
            const bg = imgDiv.style.backgroundImage;
            const match = bg.match(/url\(["']?(.*?)["']?\)/);
            if (match) coverUrl = match[1];
          }
          if (audio && audioSrc) {
            audio.pause();
            audio.src = audioSrc;
            audio.load();
            audio.play();
          }
          if (player) {
            const titleEl = player.querySelector('.title');
            const artistEl = player.querySelector('.artist');
            const coverEl = player.querySelector('.cover');
            if (titleEl) titleEl.textContent = title;
            if (artistEl) artistEl.textContent = artist;
            if (coverEl) coverEl.style.backgroundImage = coverUrl ? `url(${coverUrl})` : '';
          }
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
        list.appendChild(div);
      });
    });
});
