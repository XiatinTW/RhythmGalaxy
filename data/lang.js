let translations = {};

fetch('./data/lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        const savedLang = localStorage.getItem("Language") || 'zh';
        setLanguage(savedLang);
        // 語言下拉選單，選擇語言
        const langSelect = document.getElementById('setringBox_langselect');
        if (langSelect) {
            langSelect.selectedIndex = savedLang === 'zh' ? 0 : 1;
        }
    });

document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem("Language") || 'zh';
    setLanguage(savedLang); // 強制刷新語言
    const langSelect = document.getElementById('setringBox_langselect');
    if (langSelect) {
        langSelect.addEventListener('change', function () {
            // 根據選項 index 切換語言（0: 繁體中文, 1: English）
            const lang = langSelect.selectedIndex === 0 ? 'zh' : 'en';
            setLanguage(lang);
            localStorage.setItem("Language", lang);
        });
    }
});

function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[key] && translations[key][lang]) {
            el.innerHTML = translations[key][lang];
        }
        // 找不到對應翻譯，保留原文字
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[key] && translations[key][lang]) {
            el.setAttribute('placeholder', translations[key][lang]);
        }
    });
    // 如果還有 button title、alt 等屬性，也可以新增
}