let translations = {};

fetch('./data/lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        setLanguage('zh'); // 預設語言
    });

function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[key] && translations[key][lang]) {
            el.textContent = translations[key][lang];
        }
        // 若找不到對應翻譯，可選擇保留原文字或給預設值
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[key] && translations[key][lang]) {
            el.setAttribute('placeholder', translations[key][lang]);
        }
    });
    // 如果你還有 button title、alt 等屬性，也可以加入類似寫法處理
}
document.addEventListener('DOMContentLoaded', function () {
    const langSelect = document.getElementById('setringBox_langselect');
    if (langSelect) {
        langSelect.addEventListener('change', function () {
            // 根據選項 index 切換語言（0: 繁體中文, 1: English）
            const lang = langSelect.selectedIndex === 0 ? 'zh' : 'en';
            setLanguage(lang);
        });
    }
});