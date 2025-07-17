
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
            });
        })
        .catch(() => {
            loadingDiv.textContent = '載入失敗';
        });
});