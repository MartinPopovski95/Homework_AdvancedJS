/* # Homework 1
Create a Constructor function for product. Each product has property: name, category (string), hasDiscount (bool) and price.
Create an array of 15 products. 
Now answer the following requirements:

* Find all products with price greater than 20.
* Get the names of all products of Category Food, that are on discount.
* Get the price of all products that are on discount.
* Find the name and price of all products with name starting with a vowel, that are not on discount.
 */

function Product(name, category, hasDiscount, price) {
	this.name = name;
	this.category = category;
	this.hasDiscount = hasDiscount ? hasDiscount : hasDiscount === "true";
	this.price = isNaN(price) ? "Invalid number" : price;
}

let products = [
	new Product("Chicken", "Food", true, 30),
	new Product("Playstation", "Electronics", false, 200),
	new Product("Cola", "Beverages", true, 12),
	new Product("Speakers", "Electronics", true, 120),
	new Product("Cheese", "Food", false, 9),
	new Product("Beer", "Beverages", true, 8),
	new Product("Shoes", "Clothing", false, 45),
	new Product("Olive Oil", "Food", false, 22),
	new Product("Ice Cream", "Food", true, 5),
	new Product("Laptop", "Electronics", false, 340),
	new Product("Jeans", "Clothing", true, 14),
	new Product("Milk", "Food", true, 10),
	new Product("Sunglasses", "Accessories", false, 38),
	new Product("Avocado", "Food", false, 11),
	new Product("Gloves", "Accessories", false, 26),
];

// All products with price greater than 20
let expensiveProducts = products.filter((product) => product.price > 20);
console.log("Products with price greater than 20:", expensiveProducts);

// Names of all products of Category Food, that are on discount
let DiscountedFoodNames = products
	.filter((product) => product.category === "Food" && product.hasDiscount)
	.map((product) => product.name);
console.log("Food products that are on discount:", DiscountedFoodNames);

// Price of all products that are on discount
let discountedPrices = products
	.filter((product) => product.hasDiscount)
	.map((product) => product.price);
console.log("Prices of discounted products:", discountedPrices);

// Name and price of all products with name starting with a vowel, that are not on discount

// forEach method

let nonDiscountedVowelProducts = [];

/* products.forEach((product) => {
	let firstLetter = product.name[0].toUpperCase();

	if (
		(firstLetter === "A" ||
			firstLetter === "E" ||
			firstLetter === "I" ||
			firstLetter === "O" ||
			firstLetter === "U") &&
		!product.hasDiscount
	) {
		nonDiscountedVowelProducts.push({
			name: product.name,
			price: product.price,
		});
	}
}); */

// Reduce method

products.reduce((vowelProductList, product) => {
	let firstLetter = product.name[0].toUpperCase();

	if (
		(firstLetter === "A" ||
			firstLetter === "E" ||
			firstLetter === "I" ||
			firstLetter === "O" ||
			firstLetter === "U") &&
		!product.hasDiscount
	) {
		vowelProductList.push({
			name: product.name,
			price: product.price,
		});
	}
	return vowelProductList;
}, nonDiscountedVowelProducts);

console.log(
	"Non discounted products with names starting with a vowel:",
	nonDiscountedVowelProducts
);
