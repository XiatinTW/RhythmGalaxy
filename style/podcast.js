
// podcast圖片
document.querySelectorAll('.PodcastCrad').forEach(function (card) {
    var imgPath = card.getAttribute('podcast-bg');
    if (imgPath) {
        card.style.background = `url('${imgPath}') lightgray 50% / cover no-repeat`;
        card.addEventListener('mouseenter', function () {
            card.style.background = `linear-gradient(180deg, rgba(255,255,255,0.00) 0%, rgba(0,0,0,0.20) 72%), url('${imgPath}') lightgray 50% / cover no-repeat`;
        });
        card.addEventListener('mouseleave', function () {
            card.style.background = `url('${imgPath}') lightgray 50% / cover no-repeat`;
        });
    }
});