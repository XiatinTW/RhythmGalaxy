// data/favorites_songs.js 收藏歌曲列表
// 這段程式碼會在頁面載入時自動載入使用者的收藏歌曲列表
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function formatDuration(seconds) {
    if (!seconds) return '00:00';
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}
document.addEventListener('DOMContentLoaded', function () {
    const loadingDiv = document.getElementById('favorites_songs_loading');
    if (!loadingDiv) return;
    const listDiv = loadingDiv.parentElement;
    const user_id = getCookie('user_id');
    if (!user_id) {
        loadingDiv.textContent = '請先登入';
        return;
    }
    fetch(`api/get_user_favorites.php?user_id=${encodeURIComponent(user_id)}`)
        .then(r => r.json())
        .then(data => {
            if (!data.success) {
                loadingDiv.textContent = '載入失敗';
                return;
            }
            if (!data.songs || data.songs.length === 0) {
                loadingDiv.textContent = '尚未收藏任何歌曲';
                return;
            }
            loadingDiv.remove();
            const musicListDivs = [];
            data.songs.forEach(song => {
                const div = document.createElement('div');
                div.className = 'Music_List';
                div.setAttribute('data-song-id', song.song_id);
                div.innerHTML = `
                    <div class="Music_item_img" style="background-image: url('${song.cover_url ? song.cover_url : './assets/img/music/Rectangle01.jpg'}');"></div>
                    <div class="Music_item_text">
                        <h6>${song.title ? song.title : 'null'}</h6>
                        <p>${song.artist ? song.artist : 'null'}</p>
                    </div>
                    <p class="Music_item_playtime">${formatDuration(song.duration)}</p>
                    <div class="Music_item2">
                        <button class="Music_item_close">
                            <div class="icon_close"></div>
                        </button>
                    </div>
                `;
                listDiv.appendChild(div);
                musicListDivs.push({ div, song_id: song.song_id });
            });
            // 依 song_id AJAX 撈 audio_url
            musicListDivs.forEach(({ div, song_id }) => {
                fetch('api/get_song_info.php?song_id=' + encodeURIComponent(song_id))
                    .then(res => res.json())
                    .then(data => {
                        if (data.audio_url) {
                            div.setAttribute('data-audio', data.audio_url);
                        }
                    });
            });
            // 綁定播放事件
            setTimeout(bindFavoritesMusicListPlay, 300); // 等待 audio_url AJAX 完成
        })
        .catch(() => {
            loadingDiv.textContent = '載入失敗';
        });

    // 播放事件：和排行榜一致
    function bindFavoritesMusicListPlay() {
        document.querySelectorAll('.Music_List[data-song-id]').forEach(function (item) {
            if (item.dataset.bindPlay) return;
            item.dataset.bindPlay = '1';
            item.addEventListener('click', function () {
                const audio = document.getElementById('mainAudio');
                const playBtn = document.querySelector('.playing');
                const player = document.getElementById('AudioPlayer');
                const audioSrc = item.getAttribute('data-audio');
                const title = item.querySelector('.Music_item_text h6')?.textContent || 'Music';
                const artist = item.querySelector('.Music_item_text p')?.textContent || 'Artist';
                const imgDiv = item.querySelector('.Music_item_img');
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
        });
    }
});