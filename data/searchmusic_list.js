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
            });
    });
});