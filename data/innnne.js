function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
}
// 顯示使用者名稱
const userId = getCookie('user_id');
if (!userId) {
    const SiginInBox = document.getElementById("SiginInBox");
    if (SiginInBox) SiginInBox.style.setProperty("display", "none", "important");
} else {
    const SiginIn = document.getElementById("SiginIn");
    if (SiginIn) SiginIn.style.setProperty("display", "none", "important");
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function showUsername() {
  const userId = getCookie('user_id');
  // 支援多個 usernameDisplay
  const displays = document.querySelectorAll('#usernameDisplay');
  if (!displays.length) return;
  if (!userId) {
    displays.forEach(d => d.textContent = '演示版');
    return;
  }
  fetch('api/get_username.php?user_id=' + encodeURIComponent(userId))
    .then(res => res.json())
    .then(data => {
      if (data.username && data.username.trim()) {
        displays.forEach(d => d.textContent = data.username);
      } else {
        displays.forEach(d => d.textContent = '演示版');
      }
    })
    .catch(() => {
      displays.forEach(d => d.textContent = '演示版');
    });
}

document.addEventListener('DOMContentLoaded', showUsername);

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

const activitySearchBox = document.getElementById('activitySearchBox');
const activitySearchBtn = document.getElementById('activitySearchBtn');

document.addEventListener('click', function (e) {
    // 活動篩選
    if (
        activitySearchBox &&
        activitySearchBtn &&
        activitySearchBox.classList.contains('active') &&
        !activitySearchBox.contains(e.target) &&
        !activitySearchBtn.contains(e.target)
    ) {
        activitySearchBox.classList.remove('active');
    }
});

const someElement = document.getElementById('someElementId'); // 假設這是你的元素
document.addEventListener('click', function (e) {
    // 其他程式碼...

    // 假設第 64 行如下
    if (someElement && someElement.contains(e.target)) {
        // ...原本的程式...
    }
});