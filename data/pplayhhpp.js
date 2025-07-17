// 根據登入狀態動態切換 Nav 側邊欄內容，並自動高亮active頁面
document.addEventListener('DOMContentLoaded', function () {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    var userId = getCookie('user_id');
    var isLoggedIn = !!userId;
    var path = window.location.pathname.split('/').pop();
    if (path === '' || path === undefined) path = 'index.html';

    // 處理 Nav/Nav2
    ['Nav', 'Nav2'].forEach(function (navId) {
        var nav = document.getElementById(navId);
        if (!nav) return;
        if (isLoggedIn) {
            // Nav2多一個登入資訊區塊
            var signinBox = '';
            if (navId === 'Nav2') {
                // 登入時隱藏 Sign in 按鈕，只顯示 usernameDisplay
                signinBox = `<div class="SiginInBox" style="display:none">
                    <Button id="SiginIn" class="h6"><p data-lang="paragraph">Sign in</p></Button>
                </div>
                <div id="SiginInBox"><span></span><p id="usernameDisplay"></p></div>`;
            }
            nav.innerHTML = `
                <div id="LeftList_menu"></div>
                ${signinBox}
                <h6 class="Nav_Menu" data-lang="Nav_menu">Menu</h6>
                <a href="index.html" class="LeftButton Explore${path === 'index.html' ? ' LeftButton_H' : ''}"><span></span><p data-lang="Nav_Explore">Explore</p></a>
                <a href="genres.html" class="LeftButton Genres${path === 'genres.html' ? ' LeftButton_H' : ''}"><span></span><p data-lang="Nav_Genres">Genres</p></a>
                <a href="activity.html" class="LeftButton Activity${path === 'activity.html' ? ' LeftButton_H' : ''}"><span></span><p data-lang="Nav_Activity">Activity</p></a>
                <a href="Radio.html" class="LeftButton Radio${path === 'Radio.html' ? ' LeftButton_H' : ''}"><span></span><p data-lang="Nav_Radio">Radio</p></a>
                <a href="podcast.html" class="LeftButton Podcast${path === 'podcast.html' ? ' LeftButton_H' : ''}"><span></span><p data-lang="Nav_Podcast">Podcast</p></a>
                <h6 class="Nav_Menu" data-lang="Nav_Library">Library</h6>
                <a href="#" class="LeftButton Recent"><span></span><p data-lang="Nav_Recent">Recent</p></a>
                <a href="favorites.html" class="LeftButton Favorites"><span></span><p data-lang="Nav_Favorites">Favorites</p></a>
                <a href="#" class="LeftButton Offline"><span></span><p data-lang="Nav_Offline">Offline</p></a>
                <h6 class="Nav_Menu" data-lang="Nav_Playlist">Playlist</h6>
                <a href="#" class="LeftButton Create"><span></span><p data-lang="Nav_Create">Create playlist</p></a>
                <div id="UserPlaylistList" style="width: 100%;"></div>
            `;
            // 綁定 Create playlist 彈窗
            setTimeout(function () {
                var createBtn = nav.querySelector('.LeftButton.Create');
                if (createBtn) {
                    createBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        showCreatePlaylistModal();
                    });
                }
                // 載入使用者歌單列表
                var userId = getCookie('user_id');
                if (userId) {
                    fetch('api/get_user_playlists.php?user_id=' + encodeURIComponent(userId))
                        .then(res => res.json())
                        .then(data => {
                            if (data.success && Array.isArray(data.data)) {
                                var html = data.data.map(pl => `<a href="#" class="LeftButton Album"><span></span><p>${pl.playname}</p></a>`).join('');
                                var listDiv = nav.querySelector('#UserPlaylistList');
                                if (listDiv) listDiv.innerHTML = html;
                            }
                        });
                }
            }, 0);
        } else {
            // 沒登入時自動高亮
            var links = nav.querySelectorAll('a.LeftButton');
            links.forEach(function (a) {
                var href = a.getAttribute('href');
                if (href && href.split('?')[0] === path) {
                    a.classList.add('LeftButton_H');
                } else {
                    a.classList.remove('LeftButton_H');
                }
            });
        }
    });

    // 建立歌單彈窗
    function showCreatePlaylistModal() {
        if (document.getElementById('CreatePlaylistModal')) return;
        var modal = document.createElement('div');
        modal.id = 'CreatePlaylistModal';
        modal.style = 'position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(255, 255, 255, 0.66);display:flex;align-items:center;justify-content:center;';
        modal.innerHTML = `
            <div style="background:rgba(255, 255, 255, 0.66);padding:32px 24px;border-radius:12px;min-width:320px;max-width:90vw;box-shadow:0 2px 16px #0002;position:relative;">
                <button id="closeCreatePlaylistModal" style="position:absolute;top:8px;right:8px;font-size:32px;background:none;border:none;cursor:pointer;">&times;</button>
                <h3 style="margin-bottom:16px;">建立新歌單</h3>
                <form id="createPlaylistForm" style="display:flex;flex-direction:column;">
                    <div style="margin-bottom:12px;">
                        <h6>歌單名稱</h6><br>
                        <input type="text" style="display: flex;align-items: flex-start;flex-direction: column;padding: 10px;border: 0;border-radius: 10px;background-color: #616161;color: white;" name="playname" required maxlength="15">
                        </div>
                        <div style="margin-bottom:12px;">
                        <h6>簡介</h6><br>
                        <textarea name="playdescription" style="display: flex;align-items: flex-start;flex-direction: column;padding: 10px;border: 0;border-radius: 10px;background-color: #616161;color: white;" required maxlength="200" style="width:100%;padding:6px;"></textarea>
                        </div>
                        <div style="margin-bottom:12px;">
                        <h6>歌單封面圖片</h6><br>
                        <input type="file" style="display: flex;align-items: flex-start;flex-direction: column;padding: 10px;border: 0;border-radius: 10px;background-color: #616161;color: white;" name="cover_file" required>
                    </div>
                    <button type="submit" class="button" style="padding:15px;">建立</button>
                </form>
                <div id="createPlaylistMsg" style="color:red;margin-top:8px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('closeCreatePlaylistModal').onclick = function () {
            modal.remove();
        };
        document.getElementById('createPlaylistForm').onsubmit = function (e) {
            e.preventDefault();
            var form = e.target;
            var playname = form.playname.value.trim();
            var playdescription = form.playdescription.value.trim();
            var coverFile = form.cover_file.files[0];
            if (!playname || !playdescription || !coverFile) {
                document.getElementById('createPlaylistMsg').textContent = '所有欄位皆必填';
                return;
            }
            var userId = getCookie('user_id');
            var fd = new FormData();
            fd.append('user_id', userId);
            fd.append('playname', playname);
            fd.append('playdescription', playdescription);
            fd.append('cover_file', coverFile);
            fetch('api/create_playlist.php', {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('createPlaylistMsg').style.color = 'green';
                        document.getElementById('createPlaylistMsg').textContent = '歌單建立成功！';
                        setTimeout(() => modal.remove(), 1200);
                    } else {
                        document.getElementById('createPlaylistMsg').style.color = 'red';
                        document.getElementById('createPlaylistMsg').textContent = data.error || '建立失敗';
                    }
                })
                .catch(() => {
                    document.getElementById('createPlaylistMsg').style.color = 'red';
                    document.getElementById('createPlaylistMsg').textContent = '建立失敗';
                });
        };
    }
});


// 顯示每日音樂資訊
document.addEventListener('DOMContentLoaded', function () {
    const dailyMusicDiv = document.getElementById('DailyMusic');
    if (!dailyMusicDiv) return;
    const songId = dailyMusicDiv.getAttribute('song_id');
    if (!songId) return;

    fetch(`api/get_song_info.php?song_id=${encodeURIComponent(songId)}`)
        .then(res => res.json())
        .then(data => {
            if (data.title && data.artist) {
                const titleElem = dailyMusicDiv.querySelector('.DailyMusic_title h5');
                const artistElem = dailyMusicDiv.querySelector('.DailyMusic_title p');
                if (titleElem) titleElem.textContent = data.title;
                if (artistElem) artistElem.textContent = data.artist;
            }
            const musicCradBtn = dailyMusicDiv.querySelector('.MusicCrad');
            if (musicCradBtn) {
                if (data.audio_url) {
                    musicCradBtn.setAttribute('data-audio', data.audio_url);
                }
                if (data.cover_url) {
                    musicCradBtn.setAttribute('data-bg', data.cover_url);
                    musicCradBtn.style.backgroundImage = `url(${data.cover_url})`;
                    const child = musicCradBtn.querySelector('.MusicCrad_2');
                    const child2 = musicCradBtn.querySelector('.CD');
                    if (child) {
                        child.style.backgroundImage = `url(${data.cover_url})`;
                        child.style.backgroundSize = 'cover';
                        child.style.backgroundPosition = 'center';
                        child.style.backgroundRepeat = 'no-repeat';
                    }
                    if (child2) {
                        child2.style.backgroundImage = `url(${data.cover_url})`;
                        child2.style.backgroundSize = 'cover';
                        child2.style.backgroundPosition = 'center';
                        child2.style.backgroundRepeat = 'no-repeat';
                    }
                }
                // 只加一次監聽
                musicCradBtn.addEventListener('click', function () {
                    fetch('api/increase_play_count.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `song_id=${encodeURIComponent(songId)}`
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (!data.success) {
                                console.warn('播放次數更新失敗:', data.error);
                            }
                        });
                }, { once: false });
            }
        });
});

//新增熱門歌曲列
document.addEventListener('DOMContentLoaded', function () {
    fetch('api/get_hot_songs.php')
        .then(res => res.json())
        .then(json => {
            if (json.success && Array.isArray(json.data)) {
                const list = document.querySelector('.MusicCradList[playlist="hotmusic"]');
                if (!list) return;
                json.data.forEach(song => {
                    const btn = document.createElement('button');
                    btn.className = 'MusicCrad';
                    btn.setAttribute('song_id', song.song_id);
                    // 處理 cover_url 路徑
                    let coverUrl = song.cover_url;
                    if (coverUrl && !coverUrl.startsWith('./') && !coverUrl.startsWith('/')) {
                        coverUrl = './' + coverUrl;
                    }
                    btn.setAttribute('data-bg', coverUrl);
                    // 補上父層背景
                    btn.style.backgroundImage = `url('${coverUrl}')`;
                    btn.style.backgroundSize = 'cover';
                    btn.style.backgroundPosition = 'center';
                    btn.style.backgroundRepeat = 'no-repeat';
                    // 處理 audio_url 路徑
                    let audioUrl = song.audio_url;
                    if (audioUrl && !audioUrl.startsWith('./') && !audioUrl.startsWith('/')) {
                        audioUrl = './' + audioUrl;
                    }
                    btn.setAttribute('data-audio', audioUrl);
                    btn.innerHTML = `
                            <div class="MusicCrad_1">
                                <div class="MusicCrad_2" style="background-image:url('${coverUrl}');background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
                                <div class="CD_icon">
                                    <div class="CD3"></div>
                                    <div class="CD" style="background-image:url('${coverUrl}');background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
                                    <div class="CD1"></div>
                                </div>
                            </div>
                            <div class="MusicCrad_text">
                                <h6>${song.title}</h6>
                                <p>${song.artist}</p>
                            </div>
                        `;
                    // 立即綁定點擊事件，更新 AudioPlayer UI 並播放
                    btn.addEventListener('click', () => {
                        const audio = document.getElementById('mainAudio');
                        const playBtn = document.querySelector('.playing');
                        audio.src = audioUrl;
                        audio.load();
                        audio.play().catch(err => {
                            console.error('音樂播放失敗:', err);
                        });
                        // 更新 AudioPlayer UI
                        const player = document.getElementById('AudioPlayer');
                        player.querySelector('.title').textContent = song.title || 'Music';
                        player.querySelector('.artist').textContent = song.artist || 'Artist';
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
                        playBtn.classList.add('pause');
                    });
                    list.prepend(btn);
                });
            }
        });
});