// 搜尋紀錄的 localStorage key
const SEARCH_HISTORY_KEY = 'search_history';

// 取得搜尋紀錄，過濾掉超過七天的
function getSearchHistory() {
    const now = Date.now();
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
    } catch (e) { }
    // 過濾七天內的紀錄
    history = history.filter(item => now - item.ts < 7 * 24 * 60 * 60 * 1000);
    // 更新 localStorage（移除過期）
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    return history;
}

// 新增搜尋紀錄
function addSearchHistory(keyword) {
    if (!keyword) return;
    let history = getSearchHistory();
    // 移除重複
    history = history.filter(item => item.keyword !== keyword);
    // 新增到最前面
    history.unshift({ keyword, ts: Date.now() });
    // 最多只保留 10 筆
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

// 渲染搜尋紀錄
function renderSearchHistory() {
    const history = getSearchHistory();
    const list = document.getElementById('SearchHistory_buttonList');
    if (list) {
        list.innerHTML = '';
        if (history.length === 0) {
            // 無紀錄時顯示預設
            list.innerHTML = '<p class="SearchHistory_button" data-lang="header_input03-1"></p>';
        } else {
            history.forEach(item => {
                const p = document.createElement('p');
                p.className = 'SearchHistory_button';
                p.textContent = item.keyword;
                p.onclick = function () {
                    window.location.href = 'search.html?q=' + encodeURIComponent(item.keyword);
                };
                list.appendChild(p);
            });
        }
    }
}

// 清除搜尋紀錄
function clearSearchHistory() {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    renderSearchHistory();
}

// 假設 songs 資料已經在 window.songs，否則可自行定義
// window.songs = [{title: "xxx"}, ...];

// 取得 songs 資料（AJAX 從 PHP 取得）
function fetchSongsAndSetKeyword() {
    fetch('api/get_songs_titles.php')
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                window.songs = data;
            } else {
                window.songs = [];
            }
            setPopularKeywordButton();
        })
        .catch(() => {
            window.songs = [];
            setPopularKeywordButton();
        });
}

// 隨機選一首歌的 title
function getRandomSongTitle() {
    if (window.songs && Array.isArray(window.songs) && window.songs.length > 0) {
        const idx = Math.floor(Math.random() * window.songs.length);
        return window.songs[idx].title;
    }
    return 'I am a keyword.';
}

// 設定熱門關鍵字按鈕
function setPopularKeywordButton() {
    // 桌機
    const btn = document.querySelector('#SearchInput_list_button .SearchKeywords');
    if (btn) {
        const title = getRandomSongTitle();
        btn.textContent = '🔥' + title;
        btn.onclick = function () {
            const input = document.getElementById('search_Input');
            if (input) {
                input.value = title;
                input.focus();
                // 直接觸發搜尋
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            }
        };
    }
    // 手機/medium
    const btn2 = document.querySelector('#SearchBox_medium #SearchInput_list_button .SearchKeywords');
    if (btn2) {
        const title = getRandomSongTitle();
        btn2.textContent = '🔥' + title;
        btn2.onclick = function () {
            const input = document.getElementById('search_Input_medium');
            if (input) {
                input.value = title;
                input.focus();
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search_Input');
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var keyword = searchInput.value.trim();
                if (keyword) {
                    addSearchHistory(keyword);
                    renderSearchHistory();
                    window.location.href = 'search.html?q=' + encodeURIComponent(keyword);
                }
            }
        });
    }
    // medium 搜尋欄也要支援
    var searchInputMedium = document.getElementById('search_Input_medium');
    if (searchInputMedium) {
        searchInputMedium.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var keyword = searchInputMedium.value.trim();
                if (keyword) {
                    addSearchHistory(keyword);
                    renderSearchHistory();
                    window.location.href = 'search.html?q=' + encodeURIComponent(keyword);
                }
            }
        });
    }
    // 綁定清除按鈕
    var clearBtns = document.querySelectorAll('.ClearButton');
    clearBtns.forEach(function (btn) {
        btn.addEventListener('click', clearSearchHistory);
    });
    // 初始渲染
    renderSearchHistory();
    // 改為 AJAX 取得 songs 再設定熱門關鍵字
    fetchSongsAndSetKeyword();
});