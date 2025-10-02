////// Weather for 10 days dùng openweather

import { apiKey } from "./config.js";

async function getForecast10days(lat, lon, cnt=10) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not fetch forecast data");
    return await response.json();
}

////// Hourly weather dùng mô hình dự đoán 

// async function getForecastByModel() {
//   const place = document.getElementById("locationInput").value;
//   const date = document.getElementById("startDate").value;

//   if (!place || !date) {
//     alert("Vui lòng nhập địa điểm và ngày!");
//     return;
//   }

//   try {
//     const res = await fetch(
//       `http://127.0.0.1:8000/forecast?place=${encodeURIComponent(
//         place
//       )}&date=${date}`
//     );
//     const data = await res.json();

//     if (data.error) {
//       alert(data.error);
//       return;
//     }

//     // Hiển thị summary
//     // let summaryHtml = `<h2>Kết quả cho ${data.place} (${data.coords.lat.toFixed(
//     //   2
//     // )}, ${data.coords.lon.toFixed(2)}) - ${data.date}</h2>`;
//     // summaryHtml += `<h3>Daily Summary</h3><ul>`;
//     // for (const [param, stats] of Object.entries(data.daily_summary)) {
//     //   summaryHtml += `<li><b>${param}</b>: Mean=${stats.mean.toFixed(
//     //     2
//     //   )}, Min=${stats.min.toFixed(2)}, Max=${stats.max.toFixed(2)}</li>`;
//     // }
//     // summaryHtml += `</ul>`;
//     // document.getElementById("summary").innerHTML = summaryHtml;

//     // Vẽ biểu đồ
//     const chartsDiv = document.getElementById("chartsHourly");
//     chartsDiv.innerHTML = "";
//     Object.keys(data.figures).forEach((param) => {
//       const figData = JSON.parse(data.figures[param]); // parse lại string JSON
//       const container = document.createElement("div");
//       container.className = "chart";
//       container.id = "chart_" + param;
//       chartsDiv.appendChild(container);

//       Plotly.newPlot(container, figData.data, figData.layout);
//     });
//   } catch (err) {
//     console.error(err);
//     alert("Lỗi khi gọi API!");
//   }
// }
document.addEventListener("DOMContentLoaded", () => { // Mặc định ngày hiện tại
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("startDate").value = today;
    document.getElementById("endDate").value = today;
});

async function getForecastByModel() { 
  const place = document.getElementById("locationInput").value;
  const date = document.getElementById("startDate").value;

  if (!place || !date) {
    alert("Vui lòng nhập địa điểm và ngày!");
    return;
  }

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
      `http://127.0.0.1:8000/forecast?place=${encodeURIComponent(
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
}
window.getForecastByModel = getForecastByModel; // gán vào global để sử dụng trên button Get  Weather
const btnHourly = document.querySelector(".btn.btn--hourly");
btnHourly.onclick = getForecastByModel;

// C:\Python313\python.exe -m uvicorn main:app --reload