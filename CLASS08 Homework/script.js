/* # Exercise

## Get bordering countries function

* Call the countries API for a country by code.
* Create a function that gets all the neighbours from a country and returns them in console
* When the call to the countries API for a country is made imidietly show the bordering countries in the console

Example:

Call -> MKD

In console:

Country:

macedonia object

Neighbours:

albania object

greece object

bulgaria object

serbia object

[CountriesApi](https://restcountries.com/);
 */

async function getBorderingCountries(countryCode) {
	try {
		let response = await fetch(
			`https://restcountries.com/v3.1/alpha/${countryCode}`
		);
		let countryData = await response.json();
		let country = countryData[0];
		console.log("Country:");
		console.log(country.name.common);
		console.log(country);

		if (!country.borders || country.borders.length === 0) {
			console.log("No bordering countries found");
			return;
		}
		let bordersResponse = await fetch(
			`https://restcountries.com/v3.1/alpha?codes=${country.borders}`
		);
		let borderingCountries = await bordersResponse.json();
		console.log("Bordering countries:");
		borderingCountries.forEach((neigbour) => console.log(neigbour));
	} catch (error) {
		console.log(error);
	}
}

// country with borders
getBorderingCountries("MKD");

// country without borders :)
// getBorderingCountries("MV");
