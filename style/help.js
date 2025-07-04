// 幫所有 nav .help_box p 加上 data-target，並用 data-target 控制顯示內容
document.querySelectorAll('nav .help_box p[class^="help_box"], nav .help_box p[class^="other_box"]').forEach(box => {
    // 取得對應內容 class
    let target = '';
    if (box.className.startsWith('help_box')) {
        // 例如 help_box01 -> help_main_01
        target = 'help_main_' + box.className.replace('help_box', '').padStart(2, '0');
    } else if (box.className.startsWith('other_box')) {
        // 例如 other_box01 -> other_main_01
        target = 'other_main_' + box.className.replace('other_box', '').padStart(2, '0');
    }
    if (target) box.dataset.target = target;

    box.addEventListener('click', () => {
        // 先全部隱藏
        document.querySelectorAll('.help_main > div').forEach(main => {
            main.style.display = 'none';
            main.style.opacity = '0';
        });
        // 顯示對應內容
        const show = document.querySelector('.' + box.dataset.target);
        if (show) show.style.display = 'block';
        if (show) show.style.opacity = '1';
    });
});
// 切換Nav_help2
const Nav_help2 = document.getElementById('Nav_help2');
if (Nav_help2 && siginInMedium) {
    siginInMedium.addEventListener('click', function (e) {
        e.stopPropagation();
        Nav_help2.classList.toggle('active');
    });
    Nav_help2.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}