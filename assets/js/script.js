var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var currentDateObj = moment().format("(MM/DD/YYYY)");
var locations = {};
var APIKEY = "c40640150c1127abc9a3c2b1334f2b13";

var saveTasks = function () {
	localStorage.setItem("locations", JSON.stringify(nameInputEl.value));
};

// var loadTasks = function () {
// 	locations = JSON.parse(localStorage.getItem("locations"));

// 	// if nothing in localStorage, create a new object to track all task status arrays
// 	if (!locations) {
// 		locations = {
// 			location: [],
// 		};
// 	}
// 	// loop over object properties
// 	$.each(locations, function (list, arr) {
// 		console.log(list, arr);
// 		// then loop over sub-array
// 		arr.forEach(function () {
// 			createTask(nameInputEl.text, list);
// 		});
// 	});
// };

var formSubmitHandler = function (event) {
	// prevent page from refreshing
	event.preventDefault();

	// get value from input element
	var username = nameInputEl.value.trim();

	if (username) {
		currentWeather(username);
		console.log(username);
		saveTasks(username.value);

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

	// make a get request to url
	var apiInfo = fetch(apiUrl)
		.then(function (response) {
			// request was successful
			if (response.ok) {
				response.json().then(function (data) {
					apiInfo = data;

					//captures icon code
					var icon = apiInfo.weather[0].icon;
					$("#city").html("<h3>" + user + "  " + currentDateObj + "</h3>");
					$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
					//displayRepos(data, user);

					//captures longitude and latitude
					var longitude = apiInfo.coord.lon;
					var latitude = apiInfo.coord.lat;

					var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKEY;

					$("#current-temp").html("<p>Temp: " + apiInfo.main.temp + " °F</p>");
					$("#current-wind").html("<p>Wind: " + apiInfo.wind.speed + " MPH</p>");
					$("#current-humid").html("<p>Humidity: " + apiInfo.main.humidity + "%</p>");

					//fetch request for UV info
					var uvData = fetch(uvURL).then(function (response) {
						response.json().then(function (Uvdata) {
							uvData = Uvdata;
							var uv = uvData.current.uvi;

							if (uv < 3) {
								$("#current-uv").html("<p> UV Index: <span class='text-success'> " + uv + "</span></p>");
							}
							if (uv >= 3 && uv <= 6) {
								$("#current-uv").html("<p> UV Index: <span class='text-warning'>" + uv + "</span></p>");
							}
							if (uv > 6) {
								$("#current-uv").html("<p> UV Index: <span class='text-danger'>" + uv + "</span></p>");
							}
						});
					});
					// format the github api url
					var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + user + "&units=imperial&appid=" + APIKEY;

					// make a get request to url
					var forecastInfo = fetch(apiForecastUrl).then(function (response) {
						// request was successful
						if (response.ok) {
							response.json().then(function (data) {
								forecastInfo = data;

								//day 1
								//captures icon code

								var icon = forecastInfo.list[4].weather[0].icon;
								var date1 = moment().add(1, "days").format("MM-DD-YYYY");
								$("#date1").html("<h3>" + date1 + "</h3>");
								$("#icon-1").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-1").html("<p>Temp: " + forecastInfo.list[4].main.temp + " °F</p>");
								$("#wind-1").html("<p>Wind: " + forecastInfo.list[4].wind.speed + " MPH</p>");
								$("#humid-1").html("<p>Humidity: " + forecastInfo.list[4].main.humidity + "%</p>");

								//day 2
								var date2 = moment().add(2, "days").format("MM-DD-YYYY");
								//captures icon code
								var icon = forecastInfo.list[12].weather[0].icon;
								$("#date2").html("<h3>" + date2 + "</h3>");
								$("#icon-2").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-2").html("<p>Temp: " + forecastInfo.list[12].main.temp + " °F</p>");
								$("#wind-2").html("<p>Wind: " + forecastInfo.list[12].wind.speed + " MPH</p>");
								$("#humid-2").html("<p>Humidity: " + forecastInfo.list[12].main.humidity + "%</p>");

								//day 3
								var date3 = moment().add(3, "days").format("MM-DD-YYYY");
								//captures icon code
								var icon = forecastInfo.list[20].weather[0].icon;
								$("#date3").html("<h3>" + date3 + "</h3>");
								$("#icon-3").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-3").html("<p>Temp: " + forecastInfo.list[20].main.temp + " °F</p>");
								$("#wind-3").html("<p>Wind: " + forecastInfo.list[20].wind.speed + " MPH</p>");
								$("#humid-3").html("<p>Humidity: " + forecastInfo.list[20].main.humidity + "%</p>");

								//day 4
								var date4 = moment().add(4, "days").format("MM-DD-YYYY");
								//captures icon code
								var icon = forecastInfo.list[28].weather[0].icon;
								$("#date4").html("<h3>" + date4 + "</h3>");
								$("#icon-4").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-4").html("<p>Temp: " + forecastInfo.list[28].main.temp + " °F</p>");
								$("#wind-4").html("<p>Wind: " + forecastInfo.list[28].wind.speed + " MPH</p>");
								$("#humid-4").html("<p>Humidity: " + forecastInfo.list[28].main.humidity + "%</p>");

								//day 5
								var date5 = moment().add(5, "days").format("MM-DD-YYYY");
								//captures icon code
								var icon = forecastInfo.list[36].weather[0].icon;
								$("#date5").html("<h3>" + date5 + "</h3>");
								$("#icon-5").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
								//displayRepos(data, user);
								$("#temp-5").html("<p>Temp: " + forecastInfo.list[28].main.temp + " °F</p>");
								$("#wind-5").html("<p>Wind: " + forecastInfo.list[28].wind.speed + " MPH</p>");
								$("#humid-5").html("<p>Humidity: " + forecastInfo.list[28].main.humidity + "%</p>");
								$("#fiveday").html("<h4 class='five-day-forecast'>5-Day Forecast:</h4>");

								$("#hiddencard1").removeClass();
								$("#hiddencard1").addClass("col-2 card");
								$("#hiddencard2").removeClass();
								$("#hiddencard2").addClass("col-2 card");
								$("#hiddencard3").removeClass();
								$("#hiddencard3").addClass("col-2 card");
								$("#hiddencard4").removeClass();
								$("#hiddencard4").addClass("col-2 card");
								$("#hiddencard5").removeClass();
								$("#hiddencard5").addClass("col-2 card");
								$("#todaysWeather").addClass("card");
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
//loadTasks();
userFormEl.addEventListener("submit", formSubmitHandler);
//("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=");
