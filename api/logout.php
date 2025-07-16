<?php
// 清除 user_id cookie
setcookie('user_id', '', time() - 3600, '/');
print('登出成功。');
?>