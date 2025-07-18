function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// 顯示使用者名稱
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

document.addEventListener('DOMContentLoaded', function () {
  showUsername();
  
    // 控制登入/登出顯示（直接用 style.display 並加 !important）
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    const userId = getCookie('user_id');
    const SiginInBtn = document.getElementById('SiginIn');
    const SiginInBox = document.getElementById('SiginInBox');
    if (!userId) {
        if (SiginInBox) SiginInBox.style.setProperty('display', 'none', 'important');
        if (SiginInBtn) SiginInBtn.style.setProperty('display', 'flex', 'important');
    } else {
        if (SiginInBtn) SiginInBtn.style.setProperty('display', 'none', 'important');
        if (SiginInBox) SiginInBox.style.setProperty('display', 'flex', 'important');
    }

  // 活動篩選
  const activitySearchBox = document.getElementById('activitySearchBox');
  const activitySearchBtn = document.getElementById('activitySearchBtn');
  document.addEventListener('click', function (e) {
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

  // 其他假設元素
  const someElement = document.getElementById('someElementId'); // 假設這是你的元素
  document.addEventListener('click', function (e) {
    // ...其他程式碼...
    if (someElement && someElement.contains(e.target)) {
      // ...原本的程式...
    }
  });
});
// 需先取得 SiginInBoxes 節點
const SiginInBoxes = [document.getElementById("SiginInBox")].filter(Boolean);
const logputBox = document.getElementById("logputBox");
SiginInBoxes.forEach(SiginInBox => {
  if (SiginInBox && logputBox) {
    SiginInBox.addEventListener("click", function (e) {
      e.stopPropagation(); // 防止事件冒泡
      if (logputBox.classList.contains("close")) {
        logputBox.classList.remove("close");
      } else {
        logputBox.classList.add("close");
      }
    });
  }
});
if (logputBox) {
  document.addEventListener('click', function (e) {
    let clickOnSiginInBox = SiginInBoxes.some(box => box.contains(e.target));
    if (!clickOnSiginInBox && !logputBox.contains(e.target)) {
      logputBox.classList.add('close');
    }
  });
}
// 已正確支援多組 SiginIn/SiginInBox 顯示/隱藏