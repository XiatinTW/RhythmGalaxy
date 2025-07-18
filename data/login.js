if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        function doLogin() {
            const formData = new FormData();
            formData.append('email', document.getElementById('email').value);
            formData.append('password', document.getElementById('password').value);

            fetch('./database/login.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                const msg = document.getElementById('resultMsg');
                let lang = localStorage.getItem('Language');
                if (lang !== 'zh' && lang !== 'en') lang = 'zh';
                const loginSuccessMsg = lang === 'zh' ? '登入成功' : 'Login Success';
                const loginFailMsg = lang === 'zh' ? '登入失敗' : 'Login Failed';
                const loginErrorMsg = lang === 'zh' ? '登入錯誤' : 'Login Error';
                if (data.status === 1) {
                    if (data.user_id) {
                        const d = new Date();
                        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                        // 修正 cookie 設置，domain 可省略，path 設為 /
                        document.cookie = `user_id=${data.user_id};expires=${d.toUTCString()};path=/`;
                        // 除錯用：顯示設置後的 cookie
                        // console.log('Set-Cookie:', document.cookie);
                    } else {
                        // 除錯：user_id 未回傳
                        // console.error('No user_id in response:', data);
                    }
                    alert(loginSuccessMsg);
                    msg.textContent = '';
                    msg.style.color = 'transparent';
                    // 導向改為相對路徑，避免跨網域
                    location.href = './index.html';
                } else if (data.status === 0) {
                    msg.textContent = loginFailMsg;
                    msg.style.color = 'red';
                } else if (data.status === -1) {
                    msg.textContent = data.error || loginErrorMsg;
                    msg.style.color = 'red';
                }
            });
        }
        doLogin();
    });
}

function sigup() {
    location.href = 'http://localhost/rhythmgalaxy/signup.html'
};


function logout() {
    fetch('http://localhost/rhythmgalaxy/api/logout.php')
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            location.href = 'http://localhost/rhythmgalaxy/index.html';
        });
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
                location.href = 'http://localhost/rhythmgalaxy/index.html';
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