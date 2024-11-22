//Directory Page, including headers and footers
document.addEventListener('DOMContentLoaded', () => {

    const lastModifiedElement = document.getElementById("last-modified");

    async function fetchMembers() {

        const response = await fetch('./data/members.json');
        const members = await response.json();
        spotlightSection(members);

    }

    //Spotlights
    function getMembershipLevel(membership_level) {
        switch (membership_level) {
            case 1: return 'Member';
            case 2: return 'Silver';
            case 3: return 'Gold';
            default: return 'Unknown';
        }
    }

    function spotlightSection(members) {
        const spotlightContainer = document.getElementById("spotlights");

        if (!spotlightContainer) {
            console.log("Spotlight section not found on this page.");
            return; 
        }

        const filteredMembers = members.filter(member => {
            const membershipLevel = getMembershipLevel(member.membership_level);
            return membershipLevel === 'Silver' || membershipLevel === 'Gold';
        });

        const shuffledMembers = [...filteredMembers].sort(() => 0.5 - Math.random());
        const spotlightMembers = shuffledMembers.slice(0, 3);

        spotlightContainer.innerHTML = ""; 

        spotlightMembers.forEach(member => {
            const spotlightCard = document.createElement('div');
            spotlightCard.classList.add("spotlight-card");

            spotlightCard.innerHTML = `
                <div id= "spotlight-header">
                    <p id= "spotlight-name"><strong>${member.name}</strong></p>
                    <p id= "spotlight-description">${member.description}</p>
                </div>
                <div id="spotlight-main">
                    <div class= "spotlight-img-box">
                        <img src="${member.image}" alt="${member.name}">
                    </div>
                        <p class="spotlight-info"><strong>Phone:</strong> ${member.phone}</p>
                        <p class="spotlight-info"><strong>Address:</strong> ${member.address}</p>
                        <p class="spotlight-info"><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                </div>
            `;

            spotlightContainer.appendChild(spotlightCard);
        });
    }

    fetchMembers();

    lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;
});

document.querySelector(".menu-button").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("active");
});

// Home Page

// Current Weather
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


const myLat = "43.823";
const myLon = "-111.789";
const myKey = "00b708ea89c64617dad35dfffe381d46";

const weatherUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

async function apiFetch(url, type) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            if (type === "current") {
                displayResults(data);
            } else if (type === "forecast") {
                calculateThreeDayAverage(data);
            }
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    console.log('hello')
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    captionDesc.innerHTML = data.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

}


// Forecast
function calculateThreeDayAverage(data) {
    const groupedByDay = {};
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000); 
        const day = daysOfWeek[date.getDay()];

        if (!groupedByDay[day]) {
            groupedByDay[day] = [];
        }
        groupedByDay[day].push(item.main.temp); 
    });

    const averages = Object.keys(groupedByDay)
        .slice(0, 3) // Get the next 3 days
        .map(day => {
            const temps = groupedByDay[day];
            const averageTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
            return { day, averageTemp: averageTemp.toFixed(0) }; 
        });

    insertForecastIntoHtml(averages);
}

function insertForecastIntoHtml(averages) {
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; 

    averages.forEach(forecast => {
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("day");
        forecastElement.innerHTML = `
            <p id= "forecast-temp"><strong>${forecast.day}</strong>: ${forecast.averageTemp}°F</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}


apiFetch(weatherUrl, "current");
apiFetch(forecastUrl, "forecast");

