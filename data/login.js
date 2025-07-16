if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', document.getElementById('email').value);
        formData.append('password', document.getElementById('password').value);

        const res = await fetch('./database/login.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        const msg = document.getElementById('resultMsg');
        if (data.status === 1) {
            alert('登入成功');
            msg.textContent = '';
            msg.style.color = 'transparent';
        } else if (data.status === 0) {
            msg.textContent = '登入失敗';
            msg.style.color = 'red';
        } else if (data.status === -1) {
            msg.textContent = data.error || '登入錯誤';
            msg.style.color = 'red';
        }
    });
}

function sigup() {
    location.href = 'http://localhost/Portfolio_web/signup.html'
};


if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        const msg = document.getElementById('resultMsg');
        if (password !== confirm) {
            msg.textContent = '密碼不一致';
            msg.style.color = 'red';
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        const res = await fetch('database/signup.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.status === 1) {
            msg.textContent = '註冊成功';
            msg.style.color = 'green';
            setTimeout(() => {
                location.href = 'http://localhost/Portfolio_web/index.html';
            }, 1000);
        } else if (data.status === 0) {
            msg.textContent = '已經註冊過囉';
            msg.style.color = 'orange';
        } else if (data.status === -1) {
            msg.textContent = data.error || '註冊錯誤';
            msg.style.color = 'red';
        }
    });
}