// 檢查 user_id cookie，若為空則導向首頁
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
}
if (!getCookie('user_id')) {
    window.location.href = "http://localhost/rhythmGalaxy/index.html";
}

// 顯示/隱藏登入登出按鈕
const SiginInbutton = document.getElementById("SiginInBox");
const logputBox = document.getElementById("logputBox");

if (SiginInbutton && logputBox) {
  SiginInbutton.addEventListener("click", function () {
    if (logputBox.classList.contains("close")) {
      logputBox.classList.remove("close");
    } else {
      logputBox.classList.add("close");
    }
  });
}

document.addEventListener('click', function (e) {
    if (!SiginInbutton.contains(e.target) && !logputBox.contains(e.target)) {
        logputBox.classList.add('close');
    }
});