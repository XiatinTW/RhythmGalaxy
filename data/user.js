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
