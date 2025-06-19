// 歌詞&相關音樂切換
function toggleSection(showId, hideId) {
  document.getElementById(showId).classList.add('show');
  document.getElementById(showId).classList.remove('hide');
  document.getElementById(hideId).classList.add('hide');
  document.getElementById(hideId).classList.remove('show');
}

document.querySelector('.lyrics_bt').addEventListener('click', () => {
  toggleSection('lyrics', 'related');
});
document.querySelector('.related_bt').addEventListener('click', () => {
  toggleSection('related', 'lyrics');
});