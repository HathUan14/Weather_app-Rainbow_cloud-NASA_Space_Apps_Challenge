// English comments only.
// IMPORTANT: Replace API_KEY with your real key.
const API_KEY = "Avo"; // <-- replace with real key
// Keep model string editable in UI.
// We keep the exact API call signature that you insisted on.
// We'll be robust when parsing the response.

// --- Full 24-hour sample data from user (kept intact) ---
const defaultWeatherData = [
  {
    datetime: "2025-10-04T00:00:00.000",
    T2M: 25.2557413705,
    RH2M: 96.3855644347,
    PRECTOTCORR: 9.0173468534,
    ALLSKY_SFC_SW_DWN: -0.1785791885,
    WS2M: 0.9374672228,
    PS: 100.4077482861,
  },
  {
    datetime: "2025-10-04T01:00:00.000",
    T2M: 25.1116749005,
    RH2M: 96.6178189208,
    PRECTOTCORR: 5.9776618351,
    ALLSKY_SFC_SW_DWN: 0.0864007052,
    WS2M: 0.9038745226,
    PS: 100.352548757,
  },
  {
    datetime: "2025-10-04T02:00:00.000",
    T2M: 24.9675626251,
    RH2M: 96.8702895219,
    PRECTOTCORR: 5.9798049268,
    ALLSKY_SFC_SW_DWN: 0.0864007052,
    WS2M: 0.9944091635,
    PS: 100.3086121602,
  },
  {
    datetime: "2025-10-04T03:00:00.000",
    T2M: 24.884909257,
    RH2M: 97.3115932856,
    PRECTOTCORR: 5.2822283098,
    ALLSKY_SFC_SW_DWN: -0.6435411351,
    WS2M: 1.0183932828,
    PS: 100.3291143012,
  },
  {
    datetime: "2025-10-04T04:00:00.000",
    T2M: 24.65666321,
    RH2M: 97.2559639944,
    PRECTOTCORR: 3.7591051526,
    ALLSKY_SFC_SW_DWN: -3.6409906725,
    WS2M: 1.0162771082,
    PS: 100.3352711161,
  },
  {
    datetime: "2025-10-04T05:00:00.000",
    T2M: 24.5326064417,
    RH2M: 97.2028303476,
    PRECTOTCORR: 4.8904289681,
    ALLSKY_SFC_SW_DWN: 11.7480385646,
    WS2M: 0.8205805895,
    PS: 100.3867121774,
  },
  {
    datetime: "2025-10-04T06:00:00.000",
    T2M: 25.1696607118,
    RH2M: 96.0745438215,
    PRECTOTCORR: 4.3402302144,
    ALLSKY_SFC_SW_DWN: 96.3396477295,
    WS2M: 1.0853641003,
    PS: 100.4610346126,
  },
  {
    datetime: "2025-10-04T07:00:00.000",
    T2M: 26.6407777497,
    RH2M: 90.1272002094,
    PRECTOTCORR: 5.0875396932,
    ALLSKY_SFC_SW_DWN: 291.4426039424,
    WS2M: 1.2688705068,
    PS: 100.5089558282,
  },
  {
    datetime: "2025-10-04T08:00:00.000",
    T2M: 27.6872860157,
    RH2M: 85.4313259717,
    PRECTOTCORR: 6.6770175588,
    ALLSKY_SFC_SW_DWN: 504.1482194712,
    WS2M: 1.8020764509,
    PS: 100.587762344,
  },
  {
    datetime: "2025-10-04T09:00:00.000",
    T2M: 28.7240887695,
    RH2M: 78.8568444236,
    PRECTOTCORR: 6.7958295247,
    ALLSKY_SFC_SW_DWN: 635.6989037623,
    WS2M: 1.786820297,
    PS: 100.6169517928,
  },
  {
    datetime: "2025-10-04T10:00:00.000",
    T2M: 30.1366496848,
    RH2M: 73.563349388,
    PRECTOTCORR: 8.0273345579,
    ALLSKY_SFC_SW_DWN: 709.4172512339,
    WS2M: 1.7207717322,
    PS: 100.5421224744,
  },
  {
    datetime: "2025-10-04T11:00:00.000",
    T2M: 30.5303284909,
    RH2M: 72.2566283325,
    PRECTOTCORR: 8.6927261514,
    ALLSKY_SFC_SW_DWN: 718.8636487378,
    WS2M: 1.6637808617,
    PS: 100.4744961429,
  },
  {
    datetime: "2025-10-04T12:00:00.000",
    T2M: 30.6057718387,
    RH2M: 72.3515460584,
    PRECTOTCORR: 7.4798347873,
    ALLSKY_SFC_SW_DWN: 685.7023835311,
    WS2M: 1.6622530721,
    PS: 100.3814086792,
  },
  {
    datetime: "2025-10-04T13:00:00.000",
    T2M: 30.7169184194,
    RH2M: 71.7063944264,
    PRECTOTCORR: 6.390929845,
    ALLSKY_SFC_SW_DWN: 639.8327549936,
    WS2M: 1.5000959464,
    PS: 100.26866316,
  },
  {
    datetime: "2025-10-04T14:00:00.000",
    T2M: 30.4873820089,
    RH2M: 72.9222692387,
    PRECTOTCORR: 7.291964076,
    ALLSKY_SFC_SW_DWN: 428.332618075,
    WS2M: 1.4785776011,
    PS: 100.2196266637,
  },
  {
    datetime: "2025-10-04T15:00:00.000",
    T2M: 30.2940409461,
    RH2M: 74.6215091238,
    PRECTOTCORR: 7.097591016,
    ALLSKY_SFC_SW_DWN: 287.0988736131,
    WS2M: 1.3138082562,
    PS: 100.1830530641,
  },
  {
    datetime: "2025-10-04T16:00:00.000",
    T2M: 29.7261565183,
    RH2M: 77.044833131,
    PRECTOTCORR: 6.704255734,
    ALLSKY_SFC_SW_DWN: 119.3197217989,
    WS2M: 1.1365677992,
    PS: 100.2170026281,
  },
  {
    datetime: "2025-10-04T17:00:00.000",
    T2M: 28.3578815739,
    RH2M: 85.3313596045,
    PRECTOTCORR: 4.7798445088,
    ALLSKY_SFC_SW_DWN: 16.7089666323,
    WS2M: 0.8450604185,
    PS: 100.2693508849,
  },
  {
    datetime: "2025-10-04T18:00:00.000",
    T2M: 27.3350999874,
    RH2M: 89.6587104606,
    PRECTOTCORR: 10.2554570037,
    ALLSKY_SFC_SW_DWN: -1.6749495295,
    WS2M: 0.8045687514,
    PS: 100.3348187049,
  },
  {
    datetime: "2025-10-04T19:00:00.000",
    T2M: 26.6676523654,
    RH2M: 92.4988581461,
    PRECTOTCORR: 5.3053614194,
    ALLSKY_SFC_SW_DWN: -0.9491246026,
    WS2M: 0.9205554339,
    PS: 100.4500670624,
  },
  {
    datetime: "2025-10-04T20:00:00.000",
    T2M: 26.4911060912,
    RH2M: 92.3502802035,
    PRECTOTCORR: 12.9400208031,
    ALLSKY_SFC_SW_DWN: -0.7314805109,
    WS2M: 0.9685399271,
    PS: 100.4913031766,
  },
  {
    datetime: "2025-10-04T21:00:00.000",
    T2M: 26.1318605235,
    RH2M: 93.4500040052,
    PRECTOTCORR: 26.7431493452,
    ALLSKY_SFC_SW_DWN: 0.2140563427,
    WS2M: 0.8679556807,
    PS: 100.5015178167,
  },
  {
    datetime: "2025-10-04T22:00:00.000",
    T2M: 25.8598709307,
    RH2M: 94.6721324532,
    PRECTOTCORR: 22.5338637034,
    ALLSKY_SFC_SW_DWN: 0.1810962057,
    WS2M: 0.9102369834,
    PS: 100.513625435,
  },
  {
    datetime: "2025-10-04T23:00:00.000",
    T2M: 25.6869265604,
    RH2M: 95.4951550285,
    PRECTOTCORR: 15.0440199992,
    ALLSKY_SFC_SW_DWN: 0.1183880851,
    WS2M: 0.900606773,
    PS: 100.4550921136,
  },
];

const defaultHealthData = [
  {
    datetime: "2025-10-04T00:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T01:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T02:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T03:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T04:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T05:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T06:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
  {
    datetime: "2025-10-04T07:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T08:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T09:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T10:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T11:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T12:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T13:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T14:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T15:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T16:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Low",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T17:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T18:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T19:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T20:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T21:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T22:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Low",
  },
  {
    datetime: "2025-10-04T23:00:00.000",
    Arthritis: "Low",
    "Sinus Pressure": "Moderate",
    "Common Cold": "Low",
    Flu: "Low",
    Migraine: "Low",
    Asthma: "Moderate",
  },
];

// --- UI wiring and logic ---
const outputEl = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const showJSONBtn = document.getElementById("showJSONBtn");
const jsonEditor = document.getElementById("jsonEditor");
const weatherTxt = document.getElementById("weatherTxt");
const healthTxt = document.getElementById("healthTxt");
const applyBtn = document.getElementById("applyBtn");

// populate editor with default data when shown
weatherTxt.value = JSON.stringify(defaultWeatherData, null, 2);
healthTxt.value = JSON.stringify(defaultHealthData, null, 2);

showJSONBtn.addEventListener("click", () => {
  jsonEditor.style.display =
    jsonEditor.style.display === "none" ? "block" : "none";
});

applyBtn.addEventListener("click", () => {
  try {
    // parse to ensure valid JSON
    JSON.parse(weatherTxt.value);
    JSON.parse(healthTxt.value);
    outputEl.textContent = "JSON updated. Ready to generate.";
  } catch (e) {
    outputEl.textContent = "Invalid JSON: " + e.message;
  }
});

// Helper: build prompt text
function buildPrompt(weatherData, healthData, activity) {
  return `
    24-hour weather forecast data:
    ${JSON.stringify(weatherData, null, 2)}

    24-hour health forecast data:
    ${JSON.stringify(healthData, null, 2)}

    Activity type: ${activity}

    Based on the forecasts, provide advice related to this activity in no more than 150 words. Pay attention to probabilities. Use the following template:
    "The weather is ideal/suitable/not suitable,... for the activity ... because . You should prepare ..."
    `;
}

// Robust extractor: try several common response fields (do NOT change API call).
function extractTextFromResponse(data) {
  // 1) typical nested candidate content structure
  try {
    if (data?.candidates?.length) {
      const cand = data.candidates[0];
      // old / nested content.parts[0].text
      if (
        cand?.content?.parts &&
        cand.content.parts.length &&
        cand.content.parts[0].text
      ) {
        return cand.content.parts[0].text;
      }
      // some variants: content[0].text or content?.text
      if (cand?.content?.text) return cand.content.text;
      if (Array.isArray(cand?.content) && cand.content[0]?.text)
        return cand.content[0].text;
      // output_text fallback
      if (cand.output_text) return cand.output_text;
    }
  } catch (e) {
    /* ignore and try others */
  }

  // 2) root-level output_text or text
  if (data?.output_text) return data.output_text;
  if (data?.text) return data.text;

  // 3) last resort: stringify whole response (developer debugging)
  return null;
}

 export async function runGenerate() {
  runBtn.disabled = true;
  outputEl.textContent = "Thinking...";

  // Use JSON from editor if user applied edits, otherwise defaults
  let weatherData, healthData;
  try {
    weatherData = JSON.parse(weatherTxt.value);
    healthData = JSON.parse(healthTxt.value);
  } catch (e) {
    // fallback to defaults if parse fails
    weatherData = defaultWeatherData;
    healthData = defaultHealthData;
  }

  const activity = document.getElementById("activity").value.trim();
  const prompt = buildPrompt(weatherData, healthData, activity);
  const MODEL = document.getElementById("model").value.trim();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Keep the body format exactly as you originally called it.
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    // If network error or non-JSON, catch below
    const data = await response.json().catch((err) => {
      throw new Error("Invalid JSON response from API: " + err.message);
    });

    console.log("Full response:", data); // helpful for debugging in devtools

    // try to extract the text using robust extractor (but do not change API call)
    const extracted = extractTextFromResponse(data);

    if (extracted) {
      outputEl.innerHTML = extracted
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // convert **...** to bold
        .replace(/^[-*•]\s/gm, "• "); // đảm bảo bullet hiển thị chuẩn
    } else {
      // If extractor failed, show helpful debug output
      outputEl.textContent =
        "Unexpected response format. Full response below:\n\n" +
        JSON.stringify(data, null, 2);
    }
  } catch (err) {
    outputEl.textContent =
      "Request failed: " +
      err.message +
      "\n\nCheck the console for full error and full response.";
    console.error(err);
  } finally {
    runBtn.disabled = false;
  }
  outputEl.innerHTML = extracted; // update DOM
  return outputEl.innerHTML;
}

runBtn.addEventListener("click", runGenerate);

// initialize editor hidden but pre-filled
jsonEditor.style.display = "none";
