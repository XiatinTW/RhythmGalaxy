---
mode: edit
---
# 目的
- 在api資料夾下產生匯入音樂資料的前後端網頁

# 前端網頁
- 檔名: upload_song_.html

## 功能需求
- 需要使用者能夠輸入歌曲名稱、歌手、專輯、播放時間(以秒計算)的文字輸入框，類型用select方式，能上傳封面圖、音樂檔，上傳日期
- 送出按鈕按下後呼叫fetch到upload_song_.php，以post方式
- 參數傳遞格式為 title=歌曲名稱&artist=歌手&album=專輯&duration=播放時間&genre=類型&cover_url=封面圖&audio_url=音樂檔&upload_time=上傳日期，以FormData元件處理參數
- 類型select，內容有PoPMusic、Hip-Hop、Jazz、K-Pop、J-Pop、EDM、Decades、R&B、Soul、Country、Dance
- 上傳日期只要年月日，例如:2025/07/16
- fetch回傳的資料格式為JSON，如下
    - `{"status": 1}` 表示送出成功
    - `{"status": 0}` 表示送出失敗
- 登入成功時，透過alert用綠色的字顯示[送出成功]，否則用紅字顯示[送出失敗]

## CSS 框架
- 使用 bootstrap
- 使用 CDN 方式載入
- 風格是水藍色

# 後端網頁
- 檔名: upload_song_.php

## 指示檔
- 使用php指示檔[傳送門](../instructions/php.instructions.md)來完成後端網頁相關任務

## 登入網頁功能需求
- 接收前端網頁傳送的數據資料，進行檢查並且送出
- 檢查結果以 JSON 字串回傳，回傳格式參考前端功能需求中的格式
- song_id以時間雜亂值6碼命名
- 上傳的封面圖、音樂檔按照"song_id"_cover、"song_id"_audio命名上傳至uploads資料夾內有兩個資料夾cover、audio，請按照類型存放
- 其他跟資料庫有關的錯誤回傳內容如下
    - {"status": -1,"error": "相關的錯誤訊息放在這裡"}

## 註冊網頁功能需求
- 接收前端網頁傳送的數據資料，進行帳號密碼資料建立
- 其他跟資料庫有關的錯誤回傳內容如下
    - {"status": -1,"error": "相關的錯誤訊息放在這裡"}