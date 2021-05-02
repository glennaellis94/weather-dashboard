var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var todayDate = moment().format("(MM/DD/YYYY)");
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
	fetch(apiUrl)
		.then(function (response) {
			// request was successful
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					displayRepos(data, user);
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to connect to GitHub");
		});
};
userFormEl.addEventListener("submit", formSubmitHandler);
//("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=");
