// 動態載入 searchmusic 與 Featuredmusic 歌曲列表

function formatDuration(seconds) {
    if (!seconds) return '00:00';
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function bindLikeButtonEvents(list) {
    list.querySelectorAll('.Music_item_like').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const userId = getCookie('user_id');
            if (!userId) {
                alert('請先登入才能收藏歌曲');
                return;
            }
            const songDiv = btn.closest('.Music_List');
            const songId = songDiv.getAttribute('data-song-id');
            const icon = btn.querySelector('.icon_like');
            // 呼叫 add_favorite.php 新增收藏
            fetch('api/add_favorite.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ song_id: songId })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        icon.classList.add('active');
                        // 顯示收藏成功提示
                        showFavoriteSuccess(btn, '收藏成功！');
                    } else {
                        alert(json.error || '操作失敗');
                    }
                });
        };
    });
}

// 顯示收藏成功提示
function showFavoriteSuccess(targetBtn, msg) {
    alert(msg);
}

// ====== 歌曲加入歌單功能 ======
function createPlaylistModal(playlists, songId) {
    let oldModal = document.getElementById('playlistModal');
    if (oldModal) oldModal.remove();
    const modal = document.createElement('div');
    modal.id = 'playlistModal';
    modal.style = 'position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(255,255,255,0.66);display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="background:rgba(255,255,255,0.95);padding:32px 24px;border-radius:12px;min-width:320px;max-width:90vw;box-shadow:0 2px 16px #0002;position:relative;">
        <button id="closePlaylistModal" style="position:absolute;top:8px;right:8px;font-size:32px;background:none;border:none;cursor:pointer;">&times;</button>
        <h3 style="margin-bottom:16px;">加入歌單</h3>
        <div id="playlistModalContent"></div>
        <div id="playlistModalMsg" style="color:red;margin-top:8px;"></div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closePlaylistModal').onclick = function () {
        modal.remove();
    };
    const content = modal.querySelector('#playlistModalContent');
    if (!playlists.length) {
        content.innerHTML = `
          <p>你還沒有建立歌單</p>
          <button id="showCreatePlaylistBtn" class="button" style="margin-top:12px;padding:10px 20px;">建立新歌單</button>
        `;
        document.getElementById('showCreatePlaylistBtn').onclick = function () {
            modal.remove();
            if (typeof showCreatePlaylistModal === 'function') showCreatePlaylistModal();
        };
    } else {
        content.innerHTML = `
          <select id="playlistSelect" style="width:100%;margin-bottom:16px;padding:8px;border-radius:6px;">
            ${playlists.map(pl => `<option value="${pl.playlist_id}">${pl.playname}</option>`).join('')}
          </select>
          <div style="display: flex;gap: 10px;">
            <button id="addToPlaylistBtn" class="button" style="padding:10px 20px;margin-right:8px;">加入</button>
            <button id="showCreatePlaylistBtn" class="button" style="padding:10px 20px;">建立新歌單</button>
          </div>
        `;
        document.getElementById('addToPlaylistBtn').onclick = function () {
            const playlistId = document.getElementById('playlistSelect').value;
            if (!playlistId) return;
            fetch('api/add_song_to_playlist.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playlist_id: playlistId, song_id: songId })
            })
                .then(res => res.json())
                .then(data => {
                    const msg = document.getElementById('playlistModalMsg');
                    if (data.success) {
                        msg.style.color = 'green';
                        msg.textContent = '已加入歌單！';
                        setTimeout(() => modal.remove(), 1000);
                    } else {
                        msg.style.color = 'red';
                        msg.textContent = data.error || '加入失敗';
                    }
                })
                .catch(() => {
                    const msg = document.getElementById('playlistModalMsg');
                    msg.style.color = 'red';
                    msg.textContent = '加入失敗';
                });
        };
        document.getElementById('showCreatePlaylistBtn').onclick = function () {
            modal.remove();
            if (typeof showCreatePlaylistModal === 'function') showCreatePlaylistModal();
        };
    }
    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });
}

function bindShareButtons(list) {
    list.querySelectorAll('.Music_item_share').forEach(function (btn) {
        if (btn.dataset.bindShare) return;
        btn.dataset.bindShare = '1';
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const musicList = btn.closest('.Music_List');
            if (!musicList) return;
            const songId = musicList.getAttribute('data-song-id');
            if (!songId) {
                alert('找不到歌曲ID');
                return;
            }
            fetch('api/get_user_playlists.php')
                .then(res => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                })
                .then(data => {
                    if (data.success && Array.isArray(data.playlists)) {
                        createPlaylistModal(data.playlists, songId);
                    } else {
                        alert('無法取得歌單: ' + (data.error || ''));
                        console.log('API 回傳:', data);
                    }
                })
                .catch((err) => {
                    alert('請求失敗');
                    console.error('API 請求失敗:', err);
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // 搜尋結果
    document.querySelectorAll('.Music_List[playlist="searchmusic"]').forEach(list => {
        const params = new URLSearchParams(window.location.search);
        const keyword = params.get('q') || '';
        if (!keyword) return;
        fetch('api/search_songs.php?keyword=' + encodeURIComponent(keyword))
            .then(res => res.json())
            .then(json => {
                if (!json.success || !Array.isArray(json.songs)) return;
                list.innerHTML = '';
                const userId = getCookie('user_id');
                json.songs.forEach(song => {
                    const songId = song.song_id;
                    const title = song.title || '';
                    const artist = song.artist || '';
                    const cover = song.cover_url || './assets/img/music/Rectangle01.jpg';
                    const duration = formatDuration(song.duration);
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
                    list.appendChild(div);
                });
                // 綁定收藏事件
                bindLikeButtonEvents(list);
                // 綁定分享按鈕（加入歌單）
                bindShareButtons(list);
            });
    });

    // 推薦歌曲
    document.querySelectorAll('.Featured_List[playlist="Featuredmusic"]').forEach(list => {
        fetch('api/get_featured_songs.php')
            .then(res => res.json())
            .then(json => {
                if (!json.success || !Array.isArray(json.songs)) return;
                list.innerHTML = '';
                const userId = getCookie('user_id');
                json.songs.forEach(song => {
                    const songId = song.song_id;
                    const title = song.title || '';
                    const artist = song.artist || '';
                    const cover = song.cover_url || './assets/img/music/Rectangle01.jpg';
                    const duration = formatDuration(song.duration);
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
                    list.appendChild(div);
                });
                // 綁定收藏事件
                bindLikeButtonEvents(list);
                // 綁定分享按鈕（加入歌單）
                bindShareButtons(list);
            });
    });
});