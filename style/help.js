const boxList = document.querySelectorAll('.help_box p[class^="help_box"]');
const otherList = document.querySelectorAll('.help_box p[class^="other_box"]');
const mainList = document.querySelectorAll('.help_main > div[class^="help_main_"]');
const other_mainList = document.querySelectorAll('.help_main > div[class^="other_main_"]');

boxList.forEach((box, idx) => {
    box.addEventListener('click', () => {
        //opacity 0
        other_mainList.forEach((main) => {
            main.style.opacity = '0';
        });
        //opacity 檢查0?1
        mainList.forEach((main, i) => {
            main.style.opacity = (i === idx) ? '1' : '0';
        });
    });
});
otherList.forEach((box, idx) => {
    box.addEventListener('click', () => {
        //opacity 0
        mainList.forEach((main) => {
            main.style.opacity = '0';
        });
        //opacity 檢查0?1
        other_mainList.forEach((main, i) => {
            main.style.opacity = (i === idx) ? '1' : '0';
        });
    });
});