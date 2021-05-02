var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var currentDateObj = moment();
$("#currentDay").text(currentDateObj.format("dddd MMMM Do, YYYY"));
var APIKEY = "c40640150c1127abc9a3c2b1334f2b13";

var formSubmitHandler = function (event) {
	// prevent page from refreshing
	event.preventDefault();

	// get value from input element
	var username = nameInputEl.value.trim();

	if (username) {
		getUserRepos(username);

		// clear old content
		repoContainerEl.textContent = "";
		nameInputEl.value = "";
	} else {
		alert("Please enter a GitHub username");
	}
};

var getUserRepos = function (user) {
	// format the github api url
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + user + "&appid=" + APIKEY;
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
					$("#current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
					console.log(icon);
					//displayRepos(data, user);
					var longitude = apiInfo.coord.lon;
					var latitude = apiInfo.coord.lat;
					console.log(latitude);
					var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKEY;

					$("#current-temp").html("<p>Temp: " + apiInfo.main.temp + " °F</p>");
					$("#current-wind").html("<p>Wind: " + apiInfo.wind.speed + " MPH</p>");
					$("#current-humid").html("<p>Humidity: " + apiInfo.main.humidity + "%</p>");

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
