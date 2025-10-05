////// Weather for 10 days dùng openweather

import { apiKey } from "./config.js";

async function getForecast10days(lat, lon, cnt = 10) {
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch forecast data");
  return await response.json();
}

////// Hourly weather dùng mô hình dự đoán

document.addEventListener("DOMContentLoaded", () => {
  // Mặc định ngày hiện tại
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("startDate").value = today;
  document.getElementById("endDate").value = today;
});

async function getForecastByModel() {
  const place = document.getElementById("locationInput").value;
  const date1 = document.getElementById("startDate").value;
  const date2 = document.getElementById("endDate").value;

  if (!place || !date1 || !date2) {
    alert("Vui lòng nhập địa điểm và ngày!");
    return;
  }

  // So sánh theo ngày/tháng/năm
  if (new Date(date1).toDateString() === new Date(date2).toDateString()) {
    ///////  Dự báo 1 ngày

    const date = date1;
    try {
      // Kiểm tra box-hourly
      let boxHourly = document.getElementById("box-hourly");
      if (!boxHourly) {
        const btnHourly = document.querySelector(".btn.btn--hourly");
        if (btnHourly) btnHourly.click();
        // chờ cho DOM render
        await new Promise((resolve) => setTimeout(resolve, 300));
        boxHourly = document.getElementById("box-hourly");
      }

      // Tạo hoặc reset chartsHourly
      let chartsDiv = document.getElementById("chartsHourly");
      if (!chartsDiv) {
        chartsDiv = document.createElement("div");
        chartsDiv.id = "chartsHourly";
        boxHourly.appendChild(chartsDiv);
      }
      chartsDiv.innerHTML = `<p style="text-align:center">Loading...</p>`;
      chartsDiv.scrollIntoView({ behavior: "smooth" });

      // Gọi API
      const res = await fetch(
        `http://127.0.0.1:8000/forecast_point_one_day?place=${encodeURIComponent(
          place
        )}&date=${date}`
      );

      const data = await res.json();

      // Xóa loading khi có dữ liệu
      chartsDiv.innerHTML = "";

      if (data.error) {
        alert(data.error);
        return;
      }

      //  Vẽ biểu đồ
      Object.keys(data.figures).forEach((param) => {
        const figData = JSON.parse(data.figures[param]);
        const container = document.createElement("div");
        container.className = "chart";
        container.id = "chart_" + param;
        chartsDiv.appendChild(container);

        Plotly.newPlot(container, figData.data, figData.layout);
      });
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gọi API!");
    }
  } else {
    ///////  Dự báo nhiều ngày 
    try {
        // Kiểm tra box-ten-days
        let boxTenDays = document.getElementById("box-ten-days");
        if (!boxTenDays) {
          const btnHourly = document.querySelector(".btn.btn--primary");
          if (btnHourly) btnHourly.click();
          // chờ cho DOM render
          await new Promise((resolve) => setTimeout(resolve, 300));
          boxTenDays = document.getElementById("box-ten-days");
        }

        // Tạo hoặc reset chartsHourly
        let chartsDiv = document.getElementById("chartsTenDays");
        if (!chartsDiv) {
          chartsDiv = document.createElement("div");
          chartsDiv.id = "chartsTenDays";
          boxTenDays.appendChild(chartsDiv);
        }
        chartsDiv.innerHTML = `<p style="text-align:center">Loading...</p>`;
        chartsDiv.scrollIntoView({ behavior: "smooth" });

        // Gọi API
        const res = await fetch(
          `http://127.0.0.1:8000/forecast_point_many_days?place=${encodeURIComponent(
            place
          )}&start_date=${date1}&end_date=${date2}`
        );

        const data = await res.json();

        // Xóa loading khi có dữ liệu
        chartsDiv.innerHTML = "";

        if (data.error) {
          alert(data.error);
          return;
        }

        //  Vẽ biểu đồ
        Object.keys(data.figures).forEach((param) => {
          const figData = JSON.parse(data.figures[param]);
          const container = document.createElement("div");
          container.className = "chart";
          container.id = "chart_" + param;
          chartsDiv.appendChild(container);

          Plotly.newPlot(container, figData.data, figData.layout);
        });

    } catch (err) {
      console.error(err);
      alert("Lỗi khi gọi API!");
    }
  }
}
window.getForecastByModel = getForecastByModel; // gán vào global để sử dụng trên button Get  Weather
const btnHourly = document.querySelector(".btn.btn--hourly");
btnHourly.onclick = getForecastByModel;

// C:\Python313\python.exe -m uvicorn main:app --reload



////// self forcasting

function displaceSelf() {
  const box = document.getElementById('box-self');
  if (box) {
    // Tạo phần tử cha tương tự modal-body
    const selfForecastBody = document.createElement('div');
    selfForecastBody.classList.add('self-forecast-body');
    // Tạo phần tử con tương tự modal-text
    const selfForecastLeft = document.createElement('div');
    selfForecastLeft.classList.add('self-forecast-left');

    const selfImg = document.createElement('div');
    selfImg.classList.add('self-img');
    selfForecastLeft.innerHTML = `
    <div class="image-container">
      <img src="./data/cloud/cl.jpg" alt="Clouds" class="background-image">

      <button class="hotspot" style="top: 36%; left: 21%;" onclick="updateCloud(9)"></button>
      <button class="hotspot" style="top: 36%; left: 39%;" onclick="updateCloud(7)"></button>
      <button class="hotspot" style="top: 36%; left: 53%;" onclick="updateCloud(8)"></button>
      <button class="hotspot" style="top: 57%; left: 53%;" onclick="updateCloud(4)"></button>
      <button class="hotspot" style="top: 51%; left: 33%;" onclick="updateCloud(6)"></button>
      <button class="hotspot" style="top: 70%; left: 20%;" onclick="updateCloud(5)"></button>
      <button class="hotspot" style="top: 75%; left: 82%;" onclick="updateCloud(10)"></button>
      <button class="hotspot" style="top: 75%; left: 53%;" onclick="updateCloud(1)"></button>
      <button class="hotspot" style="top: 70%; left: 40%;" onclick="updateCloud(3)"></button>
      <button class="hotspot" style="top: 76%; left: 31%;" onclick="updateCloud(2)"></button>
    </div>
  `;

    const selfInfo = document.createElement('div');
    selfInfo.classList.add('self-info');

    selfForecastLeft.appendChild(selfImg)
    selfForecastBody.appendChild(selfForecastLeft);
    selfForecastBody.appendChild(selfInfo);
    box.appendChild(selfForecastBody);

     
  } 
} 
window.displaceSelf = displaceSelf()
const btnSelf = document.querySelector('.btn.btn--self');
btnSelf.onclick = displaceSelf;

function updateCloud(id) {

  let cloudcode = id;
  let cloudtype = 'o'; // Chưa làm
  const selfInfo = document.querySelector(".self-info");
  const selfImg = document.querySelector(".self-img");

  fetch(`./data/cloud/desc-en/${cloudcode}.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không tìm thấy file " + cloudcode + ".txt");
        }
        return response.text();
      })
      .then((text) => {
        // Giữ xuống dòng trong file txt khi hiển thị
        selfInfo.innerHTML = text.replace(/\n/g, "<br>");
      })
      .catch((err) => {
        selfInfo.textContent = "Không có dữ liệu mô tả cho khí hậu này.";
        console.error(err);
      });
      selfImg.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
      const img = document.createElement("img");
      img.src = `./data/cloud/img/${cloudcode}-${i}.jpg`;
      img.alt = `${cloudtype} - Ảnh ${i}`;
      img.style.width = "150px"; // tuỳ chỉnh
      img.style.margin = "5px";
      selfImg.appendChild(img);
    }
}
window.updateCloud = updateCloud
