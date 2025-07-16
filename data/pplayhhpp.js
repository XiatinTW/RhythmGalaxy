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