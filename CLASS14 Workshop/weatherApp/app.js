document.getElementById("header").innerText = "Weather Alert App";
document.getElementById("greetingResult").innerText =
	"Welcome to the most aqurate weather app";

//navigation service is responsible for everything connected to the navigation of our app. This is why we keep all the properties and methods here
//we want everything that is connected to the navigation to be in one place
let navigationService = {
	navItems: document.getElementsByClassName("nav-item"),
	pages: document.getElementsByClassName("page"),
	citySearchBtn: document.getElementById("citySearchBtn"),
	citySearchInput: document.getElementById("citySearchInput"),

	activateItem: function (item) {
		for (const navItem of this.navItems) {
			navItem.classList.remove("active");
		}
		item.classList.add("active");
	},

	displayPage: function (index) {
		for (const page of this.pages) {
			page.style.display = "none";
		}
		this.pages[index].style.display = "block";
	},

	registerEventListeners: function () {
		for (let i = 0; i < this.navItems.length; i++) {
			this.navItems[i].addEventListener("click", function () {
				navigationService.activateItem(this); //target of the event in our case navItems[i]
				navigationService.displayPage(i);
			});
		}

		this.citySearchBtn.addEventListener("click", function () {
			console.log(
				`Search input: ${navigationService.citySearchInput.value}`
			);
			if (navigationService.citySearchInput.value) {
				weatherApiService.getWeatherData(
					navigationService.citySearchInput.value
				);
			}
		});
	},
};

navigationService.registerEventListeners(); // We need to call the function of the object to tell the listener to start listening

let hourlyData = [];

let weatherApiService = {
	apiKey: "d350ae3824c5f8b33755567c8265d97c",
	getWeatherData: async function (city) {
		try {
			// debugger;
			let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.apiKey}`;
			let response = await fetch(url); // we need to wait for the response from this fetch so that we can continue with our logic with our try block
			if (response.status < 200 || response.status >= 300) {
				throw new Error(
					"Request denied. Please try again later or check your input."
				);
			}
			let data = await response.json();
			console.log(data);

			hourlyData = data.list;

			let statisticsData = statisticsService.calculateStatistics(data);
			uiService.displayStatistics(statisticsData);
			hourlyService.displayHourlyData(hourlyData);
		} catch (error) {
			console.log("An error occurred!");
		}
	},
};

let statisticsService = {
	calculateStatistics: function (data) {
		let initialValues = {
			tempSum: 0,
			humiditySum: 0,
			minTemp: data.list[0].main.temp,
			maxTemp: data.list[0].main.temp,
			minHumidity: data.list[0].main.humidity,
			maxHumidity: data.list[0].main.humidity,
		};

		let res = data.list.reduce(function (result, item) {
			result.tempSum += item.main.temp;
			result.humiditySum += item.main.humidity;

			if (item.main.temp < result.minTemp) {
				result.minTemp = item.main.temp;
			}
			if (item.main.temp > result.maxTemp) {
				result.maxTemp = item.main.temp;
			}
			if (item.main.humidity < result.minHumidity) {
				result.minHumidity = item.main.humidity;
			}
			if (item.main.humidity > result.maxHumidity) {
				result.maxHumidity = item.main.humidity;
			}
			return result;
		}, initialValues);

		console.log(initialValues);
		console.log(res);

		let statisticsResult = {
			averageTemperature: initialValues.tempSum / data.list.length,
			averageHumidity: initialValues.humiditySum / data.list.length,
			minTemperature: initialValues.minTemp,
			maxTemperature: initialValues.maxTemp,
			minHumidity: initialValues.minHumidity,
			maxHumidity: initialValues.maxHumidity,
		};

		return statisticsResult;
	},
};

let aboutInfo = {
	creator: "G6",
	academy: "Qinshift Academy",
	year: 2025,
};

let hourlyService = {
	displayHourlyData: function (dataArray) {
		let hourlyTable = document.getElementById("hourlyTableResult");
		hourlyTable.innerHTML = "";

		let tableHTML = `
		<table class ="table">
			<thead>
				<tr>
					<th>Icon</th>
					<th>Description</th>
					<th>Date and Time of the measurements</th>
					<th>Temperature (℃)</th>
					<th>Humidity (%)</th>
					<th>Wind Speed (m/s)</th>
				</tr>
			</thead>
			<tbody>
		`;

		for (let i = 0; i < dataArray.length; i++) {
			let item = dataArray[i];
			let iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
			let dateTime = new Date(item.dt * 1000).toUTCString();

			tableHTML += `
			<tr>
				<td><img src="${iconUrl}" alt="weather icon"></td>
				<td>${item.weather[0].description}</td>
				<td>${dateTime}</td>
				<td>${item.main.temp} ℃</td>
				<td>${item.main.humidity} %</td>
				<td>${item.wind.speed} m/s</td>
			</tr>
			`;
		}
		tableHTML += `</tbody></table>`;
		hourlyTable.innerHTML = tableHTML;
	},
};

document.getElementById("sortTemperatureAsc").addEventListener("click", () => {
	hourlyData.sort((a, b) => a.main.temp - b.main.temp);
	hourlyService.displayHourlyData(hourlyData);
});
document.getElementById("sortTemperatureDsc").addEventListener("click", () => {
	hourlyData.sort((a, b) => b.main.temp - a.main.temp);
	hourlyService.displayHourlyData(hourlyData);
});
document.getElementById("sortHumidityAsc").addEventListener("click", () => {
	hourlyData.sort((a, b) => a.main.humidity - b.main.humidity);
	hourlyService.displayHourlyData(hourlyData);
});
document.getElementById("sortHumidityDsc").addEventListener("click", () => {
	hourlyData.sort((a, b) => b.main.humidity - a.main.humidity);
	hourlyService.displayHourlyData(hourlyData);
});

// the uiService contains the logic about everything that needs to be shown on the user interface (ui)
let uiService = {
	showAboutInfo: function () {
		document.getElementById(
			"aboutResult"
		).innerHTML = `<h2>This app is created by ${aboutInfo.creator} from the ${aboutInfo.academy}</h2>
        <p><b>${aboutInfo.year}</b></p>`;
	},
	displayStatistics: function (statisticsData) {
		document.getElementById("statisticsResult").innerHTML = "";
		document.getElementById("statisticsResult").innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-6">AVG TEMP: ${statisticsData.averageTemperature} ℃</div>
                <div class="col-6">AVG HUMIDITY: ${statisticsData.averageHumidity} %</div>
            </div>
             <div class="row">
                <div class="col-6">MIN TEMP: ${statisticsData.minTemperature} ℃</div>
                <div class="col-6">MIN HUMIDITY: ${statisticsData.minHumidity} %</div>
            </div>
            <div class="row">
                <div class="col-6">MAX TEMP: ${statisticsData.maxTemperature} ℃</div>
                <div class="col-6">MAX HUMIDITY: ${statisticsData.maxHumidity} %</div>
            </div>
        </div>`;
	},
};

uiService.showAboutInfo();
weatherApiService.getWeatherData("Skopje");
