
## Summary ##

- Rainbow Cloud là website giúp cải thiện sự thông hiểu của người dùng về thời tiết. Sử dụng mô hình phân tích thời tiết theo lịch sử, đưa ra lời khuyên tránh rủi ro thời tiết, dashboard để trực quan hóa dữ liệu thời tiết, bản đồ có thể tương tác và trực quan dữ liệu.
- Người dùng có thể dùng với nhiều mục đích, như lên kế hoạch khi đi du lịch trong một tuần vào tháng sau; Xem các chỉ số thời tiết theo giờ trong ngày thứ 7 tuần này; Khám phá thời tiết trong năm mọi địa điểm trên khắp thế giới qua 30 kiểu khí hậu; 

## Project Demo ##

![alt text](img/image.png)
![alt text](img/image-1.png)
![alt text](img/image-2.png)
![alt text](img/image-4.png)
![alt text](img/image-3.png)
![alt text](img/image-5.png)
![alt text](img/image-6.png)

## How it works ##

1. Front-end: sử dụng `Javascipt, CSS, HTML` để xây dựng cấu trúc và thao tác trên trang web. 
2. Back-end: sử dụng các thư viện như `sklearn` trên `Python` để chạy mô hình dự đoán và kết nối với front-end thông qua api chạy trên `fastapi`

## Tools & Data ##

- Data Source: NASA POWER API, OpenWeather API, OpenStreet Map, Open Topo Map
- Machine Learning: LightGBM for long-term prediction
- AI Support: Google Gemini for generating activity and health advice
- Frontend: HTML, CSS, JavaScript
- Backend: Python
- Climate types data: Beck, H.E., T.R. McVicar, N. Vergopolan, A. Berg, N.J. Lutsko, A. Dufour, Z. Zeng, X. Jiang, A.I.J.M. van Dijk, D.G. MirallesHigh-resolution (1 km) Köppen-Geiger maps for 1901–2099 based on constrained CMIP6 projectionsScientific Data 10, 724, doi:10.1038/s41597-023–02549‑6 (2023)

## 🛠 Cách cài đặt và sử dụng 🛠
1. Clone về máy: ở vscode, mở terminal, chuyển về thư mục của bạn, chạy lệnh: git clone  *[url repository]* hoặc tải file zip. Khi cần cập nhật lại sau khi dùng git clone xong thì thì chạy lệnh: git pull origin master.
2. Project sử dụng API key cá nhân của openWeather, vì mục đích bảo mật nên mình không để API key của mình (API này free, có giới hạn). Bạn cần tạo file mới là config.js ở cùng thư mục với file index.html và ghi vào file config.js như sau, YOUR API KEY sẽ có dạng thế này: 1234567c2190acb7d1531265b3ea55abcdef

>**export const apiKey = "YOUR API KEY";**

3. Bạn cần vào website Openweather, tạo tài khoản, nhấn vào profile, vào mục your API, có API, sao chép nó và để vào config.js

>*Với mục đích dự đoán thời tiết cần cài đặt và sử dụng Python trên máy*
4. Bạn cần biết phiên bản python của mình (đề phòng lỗi về thư viện): ở terminal Vscode dùng lệnh python --version, kết quả phiên bản của mình là Python 3.13.7
5. Mở file explorer, chọn vào thư mục model của project này trên máy, chuột phải và chọn "Open with code" để đưa con trỏ terminal của Vscode vào thư mục, ở cửa sổ Vscode này (sau khi cài đặt pip-là công cụ của python) chạy lệnh sau và chờ 10 phút nếu không có lỗi gì xảy ra
>**pip install -r requirement.txt**

6. Chạy lệnh sau để chạy back-end, tạo ra đường dẫn api ở cổng http://127.0.0.1:8000 trên máy tính
>**python -m uvicorn main:app --reload**

7. Quay lại cửa sổ Vscode chính của project, chọn nút go live để view trang web. 

## 🗺 Cấu trúc project 🗺

- Thư mục model dùng để chứa các thuật toán dự đoán dữ liệu 
- Thư mục data dùng để chứa các resoure, file dữ liệu, văn bản thông tin
- Thư mục image dùng để chứa ảnh, logo, icon
- *index.html* cấu trúc website chính
- *script.js* module gồm các lời gọi API từ nhiều nguồn và thao tác, nút bấm chính
- *map.js* module cấu hình bản đồ, các lớp, các thao tác
- *options.js* module cài đặt 4 tính năng quan trọng của website
- *config.js* chứa các biến toàn cục cài đặt cho chương trình
- *style.css* file điều chỉnh UI/UX
