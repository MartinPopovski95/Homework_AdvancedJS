/* # Homework 3
 * Use the Dog API https://dog.ceo/dog-api/documentation/breed
 * Call the following url: https://dog.ceo/api/breed/hound/images
 * Display (show on UI) each image returned in the response.
 * Use Fetch or JQuery AJAX by your choice */

document.getElementById("fetchDogsBtn").addEventListener("click", function () {
	fetch("https://dog.ceo/api/breed/hound/images/random")
		.then(function (response) {
			console.log(response);
			response
				.json()
				.then(function (data) {
					let dogImageContainer =
						document.getElementById("dogImages");

					dogImageContainer.innerHTML = "";

					let img = document.createElement("img");
					img.src = data.message;
					img.alt = "Dog image";
					dogImageContainer.appendChild(img);
				})
				.catch(function (errorParse) {
					console.log(errorParse);
				});
		})
		.catch(function (error) {
			console.log(error);
		});
});
