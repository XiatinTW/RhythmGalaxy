let translations = {};

fetch('./data/lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        setLanguage('zh'); // 預設語言
    });

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[key][lang];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', translations[key][lang]);
    });

    // 如果你還有 button title、alt 等屬性，也可以加入類似寫法處理
}