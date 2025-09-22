# 🛠 Cách cài đặt và sử dụng 🛠
1. Clone về máy: ở vscode, mở terminal, chuyển về thư mục của bạn, chạy lệnh: git clone  *[url repository]* hoặc tải file zip. Khi cần cập nhật lại sau khi dùng git clone xong thì thì chạy lệnh: git pull origin master.
2. Project sử dụng API key cá nhân của openWeather, vì mục đích bảo mật nên mình không để API key của mình (API này free, có giới hạn). Bạn cần tạo file mới là config.js ở cùng thư mục với file index.html và ghi vào file config.js như sau, YOUR API KEY sẽ có dạng thế này: 1234567c2190acb7d1531265b3ea55abcdef

>**export const apiKey = "YOUR API KEY";**

3. Bạn cần vào website Openweather, tạo tài khoản, nhấn vào profile, vào mục your API, có API, sao chép nó và để vào config.js
4. Xong 
