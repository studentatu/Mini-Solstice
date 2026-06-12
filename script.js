// ======================
// RANDOM
// ======================

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ======================
// THEME SWITCH
// ======================

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const logo =
    document.getElementById("logoIcon");

    logo.style.transform =
    "scale(1.2) rotate(360deg)";

    setTimeout(() => {
        logo.style.transform = "";
    }, 500);

    if(document.body.classList.contains("light")){

        themeBtn.innerHTML =
        "🌙 Dark Theme";

        logo.innerHTML =
        "☀️";

    }
    else{

        themeBtn.innerHTML =
        "☀️ Light Theme";

        logo.innerHTML =
        "🌙";

    }

});

// ======================
// CLOCK
// ======================

function updateClock(){

    const now =
    new Date();

    const hours =
    String(now.getHours())
    .padStart(2,"0");

    const minutes =
    String(now.getMinutes())
    .padStart(2,"0");

    const seconds =
    String(now.getSeconds())
    .padStart(2,"0");

    document.getElementById("clock")
    .textContent =
    `${hours}:${minutes}:${seconds}`;

}

setInterval(updateClock,1000);
updateClock();

// ======================
// NOTIFICATION
// ======================

function showNotification(message){

    const notification =
    document.getElementById("notification");

    notification.textContent =
    message;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    },4000);

}

// ======================
// ELEMENTS
// ======================

const powerElement =
document.getElementById("currentPower");

const tempElement =
document.getElementById("temperature");

const solarElement =
document.getElementById("solarActivity");

const aiMessage =
document.getElementById("aiMessage");

// ======================
// DASHBOARD
// ======================

function updateDashboard(){

    const hour =
    new Date().getHours();

    let temp =
    random(22,38);

    let cloud =
    random(0,100);

    let solar;
    let power;

    if(hour >= 20 || hour < 6){

        power = 0;
        solar = 0;

        document.getElementById(
        "stationStatus").textContent =
        "STANDBY";

        document.getElementById(
        "stationStatus").className =
        "warning";

        document.getElementById(
        "dayMode").textContent =
        "🌙 NIGHT MODE";

        document.getElementById(
        "logoIcon").innerHTML =
        "🌙";

    }
    else{

        solar =
        random(60,100);

        power =
        Math.floor(
        250 * (1 - cloud/100)
        );

        document.getElementById(
        "stationStatus").textContent =
        "ONLINE";

        document.getElementById(
        "stationStatus").className =
        "online";

        document.getElementById(
        "dayMode").textContent =
        "☀️ DAY MODE";

        document.getElementById(
        "logoIcon").innerHTML =
        "☀️";

    }

    powerElement.textContent =
    power + " кВт";

    tempElement.textContent =
    temp + "°C";

    solarElement.textContent =
    solar + "%";

    document.getElementById(
    "weatherTemp").textContent =
    temp + "°C";

    document.getElementById(
    "cloudiness").textContent =
    cloud + "%";

    document.getElementById(
    "windSpeed").textContent =
    random(2,12) + " м/с";

    if(cloud < 30){

        document.getElementById(
        "weatherStatus").textContent =
        "Күн ашық";

    }
    else if(cloud < 70){

        document.getElementById(
        "weatherStatus").textContent =
        "Жартылай бұлтты";

    }
    else{

        document.getElementById(
        "weatherStatus").textContent =
        "Бұлтты";

    }

    let recommendation = "";

    if(hour >= 20 || hour < 6){

        recommendation =
        "🌙 Түнгі режим. Генерация тоқтатылған.";

    }
    else if(cloud > 70){

        recommendation =
        "☁️ Бұлттылық жоғары. Генерация төмендеуі мүмкін.";

    }
    else if(temp > 35){

        recommendation =
        "🌡 Температура жоғары. Инверторларды бақылау ұсынылады.";

    }
    else{

        recommendation =
        "✅ Станция қалыпты режимде жұмыс істеуде.";

    }

    aiMessage.innerHTML =
    recommendation;

// ======================
// EFFICIENCY UPDATE
// ======================

let efficiency =
100
- Math.floor(cloud * 0.15)
- Math.floor(temp * 0.1);

efficiency =
Math.max(75, efficiency);

let loss =
100 - efficiency;

efficiencyChart.data.datasets[0].data =
[
    efficiency,
    loss
];

efficiencyChart.update();

    updateInverters();

}


// ======================
// INVERTERS
// ======================

function updateInverters(){

    const inverterCards =
    document.querySelectorAll(".inverter");

    inverterCards.forEach((card,index)=>{

        let power =
        random(25,50);

        let temp =
        random(35,75);

        document.getElementById(
        "invPower"+(index+1))
        .textContent =
        power+" кВт";

        document.getElementById(
        "invTemp"+(index+1))
        .textContent =
        temp+"°C";

        let statusSpan =
        card.querySelector("p span");

        let chance =
        Math.random();

        if(chance < 0.75){

            statusSpan.textContent =
            "Online";

            statusSpan.className =
            "online";

        }
        else if(chance < 0.95){

            statusSpan.textContent =
            "Warning";

            statusSpan.className =
            "warning";

            showNotification(
            `⚠️ Inverter #${index+1}: Температура жоғары`
            );

        }
        else{

            statusSpan.textContent =
            "Offline";

            statusSpan.className =
            "offline";

            showNotification(
            `🚨 Inverter #${index+1}: Offline`
            );

        }

    });

}

// ======================
// CHART SETTINGS
// ======================

Chart.defaults.color = "#cbd5e1";

Chart.defaults.borderColor =
"rgba(255,255,255,0.08)";

// ======================
// GENERATION CHART
// ======================

new Chart(
document.getElementById("generationChart"),
{
type:"line",
data:{
labels:[
"06:00",
"08:00",
"10:00",
"12:00",
"14:00",
"16:00",
"18:00"
],
datasets:[{
label:"Генерация (кВт)",
data:[
15,
60,
130,
220,
210,
150,
40
],
borderColor:"#38bdf8",
backgroundColor:"rgba(56,189,248,.15)",
fill:true,
tension:.4
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
scales:{
y:{
title:{
display:true,
text:"Қуат (кВт)"
}
},
x:{
title:{
display:true,
text:"Уақыт (сағ)"
}
}
}
}
}
);

// ======================
// FORECAST CHART
// ======================

new Chart(
document.getElementById("forecastChart"),
{
type:"bar",
data:{
labels:[
"1 сағ",
"2 сағ",
"3 сағ",
"4 сағ",
"5 сағ"
],
datasets:[{
label:"Генерация болжамы (кВт)",
data:[
190,
200,
180,
170,
160
],
backgroundColor:"#22c55e",
borderRadius:10
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
scales:{
y:{
title:{
display:true,
text:"Қуат (кВт)"
}
},
x:{
title:{
display:true,
text:"Келесі сағаттар"
}
}
}
}
}
);

// ======================
// TEMPERATURE CHART
// ======================

new Chart(
document.getElementById("temperatureChart"),
{
type:"line",
data:{
labels:[
"06:00",
"08:00",
"10:00",
"12:00",
"14:00",
"16:00",
"18:00"
],
datasets:[{
label:"Температура (°C)",
data:[
18,
22,
27,
31,
34,
30,
25
],
borderColor:"#f59e0b",
backgroundColor:"rgba(245,158,11,.15)",
fill:true,
tension:.4
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
scales:{
y:{
title:{
display:true,
text:"Температура (°C)"
}
},
x:{
title:{
display:true,
text:"Уақыт (сағ)"
}
}
}
}
}
);

// ======================
// EFFICIENCY CHART
// ======================

const efficiencyChart = new Chart(
    document.getElementById("efficiencyChart"),
    {
        type: "doughnut",
        data: {
            labels: [
                "Тиімділік (%)",
                "Жоғалту (%)"
            ],
            datasets: [{
                data: [92, 8],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            cutout: "70%",
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ": " + context.raw + "%";
                        }
                    }
                }
            }
        }
    }
);


// ======================
// START APP
// ======================

updateDashboard();

setInterval(
    updateDashboard,
    5000
);
