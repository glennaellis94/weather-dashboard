var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var currentDateObj = moment().format("(MM/DD/YYYY)");

var APIKEY = "c40640150c1127abc9a3c2b1334f2b13";

var formSubmitHandler = function (event) {
	// prevent page from refreshing
	event.preventDefault();

	// get value from input element
	var username = nameInputEl.value.trim();

	if (username) {
		currentWeather(username);

		// clear old content
		//repoContainerEl.textContent = "";
		//nameInputEl.value = "";
	} else {
		alert("Please enter a GitHub username");
	}
};

var currentWeather = function (user) {
	// format the github api url
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + user + "&units=imperial&appid=" + APIKEY;
	console.log(apiUrl);
	// make a get request to url
	var apiInfo = fetch(apiUrl)
		.then(function (response) {
			// request was successful
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					apiInfo = data;

					//captures icon code
					var icon = apiInfo.weather[0].icon;
					$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
					$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
					//displayRepos(data, user);

					//captures longitude and latitude
					var longitude = apiInfo.coord.lon;
					var latitude = apiInfo.coord.lat;
					console.log(latitude);
					var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKEY;

					$("#current-temp").html("<p>Temp: " + apiInfo.main.temp + " °F</p>");
					$("#current-wind").html("<p>Wind: " + apiInfo.wind.speed + " MPH</p>");
					$("#current-humid").html("<p>Humidity: " + apiInfo.main.humidity + "%</p>");

					//fetch request for UV info
					var uvData = fetch(uvURL).then(function (response) {
						response.json().then(function (Uvdata) {
							uvData = Uvdata;
							var uv = uvData.current.uvi;
							console.log(uv);
							if (uv < 3) {
								$("#current-uv").html("<p class='text-success'>UV Index: " + uv + "</p>");
							}
							if (uv >= 3 && uv <= 6) {
								$("#current-uv").html("<p class='text-warning'>UV Index: " + uv + "</p>");
							}
							if (uv > 6) {
								$("#current-uv").html("<p class='text-danger'>UV Index: " + uv + "</p>");
							}
						});
					});
					// format the github api url
					var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + user + "&units=imperial&appid=" + APIKEY;
					console.log(apiForecastUrl);
					// make a get request to url
					var forecastInfo = fetch(apiForecastUrl).then(function (response) {
						// request was successful
						if (response.ok) {
							console.log(response);
							response.json().then(function (data) {
								console.log(data);
								forecastInfo = data;

								//day 1
								//captures icon code
								var icon = forecastInfo.list[4].weather[0].icon;
								$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
								$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#current-temp").html("<p>Temp: " + forecastInfo.list[4].main.temp + " °F</p>");
								$("#current-wind").html("<p>Wind: " + forecastInfo.list[4].wind.speed + " MPH</p>");
								$("#current-humid").html("<p>Humidity: " + forecastInfo.list[4].main.humidity + "%</p>");

								//day 2
								//captures icon code
								var icon = forecastInfo.list[12].weather[0].icon;
								$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
								$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#current-temp").html("<p>Temp: " + forecastInfo.list[12].main.temp + " °F</p>");
								$("#current-wind").html("<p>Wind: " + forecastInfo.list[12].wind.speed + " MPH</p>");
								$("#current-humid").html("<p>Humidity: " + forecastInfo.list[12].main.humidity + "%</p>");

								//day 3
								//captures icon code
								var icon = forecastInfo.list[20].weather[0].icon;
								$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
								$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#current-temp").html("<p>Temp: " + forecastInfo.list[20].main.temp + " °F</p>");
								$("#current-wind").html("<p>Wind: " + forecastInfo.list[20].wind.speed + " MPH</p>");
								$("#current-humid").html("<p>Humidity: " + forecastInfo.list[20].main.humidity + "%</p>");

								//day 4
								//captures icon code
								var icon = forecastInfo.list[28].weather[0].icon;
								$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
								$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#current-temp").html("<p>Temp: " + forecastInfo.list[28].main.temp + " °F</p>");
								$("#current-wind").html("<p>Wind: " + forecastInfo.list[28].wind.speed + " MPH</p>");
								$("#current-humid").html("<p>Humidity: " + forecastInfo.list[28].main.humidity + "%</p>");

								//day 5
								//captures icon code
								var icon = forecastInfo.list[36].weather[0].icon;
								$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
								$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#current-temp").html("<p>Temp: " + forecastInfo.list[28].main.temp + " °F</p>");
								$("#current-wind").html("<p>Wind: " + forecastInfo.list[28].wind.speed + " MPH</p>");
								$("#current-humid").html("<p>Humidity: " + forecastInfo.list[28].main.humidity + "%</p>");
							});
						}
					});
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})

		//captures longitude and lattitude

		.catch(function (error) {
			alert("Unable to connect to GitHub");
		});
};

userFormEl.addEventListener("submit", formSubmitHandler);
//("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=");
