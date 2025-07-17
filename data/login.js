if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // 確保 translations 載入
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
                let lang = localStorage.getItem('Language') || 'zh';
                const loginSuccessMsg = (window.translations && window.translations.login_success) ? window.translations.login_success[lang] : (lang === 'zh' ? '登入成功' : 'Login Success');
                const loginFailMsg = (window.translations && window.translations.login_fail) ? window.translations.login_fail[lang] : (lang === 'zh' ? '登入失敗' : 'Login Failed');
                const loginErrorMsg = (window.translations && window.translations.login_error) ? window.translations.login_error[lang] : (lang === 'zh' ? '登入錯誤' : 'Login Error');
                if (data.status === 1) {
                    if (data.user_id) {
                        const d = new Date();
                        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                        document.cookie = `user_id=${data.user_id};expires=${d.toUTCString()};path=/`;
                    }
                    alert(loginSuccessMsg);
                    msg.textContent = '';
                    msg.style.color = 'transparent';
                    location.href = 'http://localhost/rhythmGalaxy/index_Login.html';
                } else if (data.status === 0) {
                    msg.textContent = loginFailMsg;
                    msg.style.color = 'red';
                } else if (data.status === -1) {
                    msg.textContent = data.error || loginErrorMsg;
                    msg.style.color = 'red';
                }
            });
        }
        if (window.translations && window.translations.login_success) {
            doLogin();
        } else {
            // 若 translations 尚未載入，等待載入後再執行
            let check = 0;
            const waitTranslations = setInterval(() => {
                check++;
                if (window.translations && window.translations.login_success) {
                    clearInterval(waitTranslations);
                    doLogin();
                } else if (check > 20) { // 最多等2秒
                    clearInterval(waitTranslations);
                    alert('語言包載入失敗，請重整頁面');
                }
            }, 100);
        }
    });
}

function sigup() {
    location.href = 'http://localhost/rhythmGalaxy/signup.html'
};


function logout() {
    fetch('http://localhost/rhythmGalaxy/api/logout.php')
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            location.href = 'http://localhost/rhythmGalaxy/index.html';
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
                location.href = 'http://localhost/rhythmGalaxy/index.html';
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