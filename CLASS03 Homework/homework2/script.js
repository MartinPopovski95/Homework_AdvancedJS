/* # Homework 2
 * Create a button
 * When the button is clicked, call the https://jsonplaceholder.typicode.com/users/1.
 * Get the details for the first user using **FETCH API**.
 * Print the person stats in a **table**. */

document
	.getElementById("getUserInfoBtn")
	.addEventListener("click", function () {
		fetch("https://jsonplaceholder.typicode.com/users/1")
			.then(function (response) {
				console.log(response);
				response
					.json()
					.then(function (data) {
						console.log(data);

						let table = document.getElementById("userInfo");

						table.innerHTML = "";

						for (let key in data) {
							if (typeof data[key] === "object") {
								for (let subKey in data[key]) {
									if (typeof data[key][subKey] === "object") {
										for (let deepKey in data[key][subKey]) {
											let row =
												document.createElement("tr");

											let cellOne =
												document.createElement("td");
											cellOne.textContent = `${key} - ${subKey} - ${deepKey}`;
											row.appendChild(cellOne);

											let cellTwo =
												document.createElement("td");
											cellTwo.textContent =
												data[key][subKey][deepKey];
											row.appendChild(cellTwo);

											table.appendChild(row);
										}
									} else {
										let row = document.createElement("tr");

										let cellOne =
											document.createElement("td");
										cellOne.textContent = `${key} - ${subKey}`;
										row.appendChild(cellOne);

										let cellTwo =
											document.createElement("td");
										cellTwo.textContent = data[key][subKey];
										row.appendChild(cellTwo);

										table.appendChild(row);
									}
								}
							} else {
								let row = document.createElement("tr");

								let cellOne = document.createElement("td");
								cellOne.textContent = key;
								row.appendChild(cellOne);

								let cellTwo = document.createElement("td");
								cellTwo.textContent = data[key];
								row.appendChild(cellTwo);

								table.appendChild(row);
							}
						}
					})
					.catch(function (errorParse) {
						console.log(errorParse);
					});
			})
			.catch(function (error) {
				console.log(error);
			});
	});
