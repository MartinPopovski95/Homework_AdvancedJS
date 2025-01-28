/* # Homework 1
Create a button
When the button is clicked, get the data from the https://api.openaq.org/v1/cities api with an AJAX call.
Print the details for the first 10 cities in an **unordered list**. If you are experiencing CORS problem, try using
```javascript
mode: "no-cors",
headers: {
        "Access-Control-Allow-Origin": "*",
      }
```
in the ajax call.
If you are still having problem, use https://pokeapi.co/api/v2/pokemon and print details for the first ten pokemons
of the result. 
* Use JQuery AJAX call */

$(document).ready(function () {
	$("#getPokemonsBtn").click(function () {
		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon",
			success: function (response) {
				console.log(response);

				$("#pokemons").empty();
				let pokemons = response.results;

				for (let i = 0; i < 10; i++) {
					$("#pokemons").append(`<li>${pokemons[i].name}</li>`);
				}
			},
			error: function (error) {
				console.log(error);
			},
		});
	});
});
