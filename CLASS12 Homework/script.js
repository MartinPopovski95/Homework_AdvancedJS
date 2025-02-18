/* # Homework
## Task 1
Create a Person constructor function that has:
* id
* firstName
* lastName
* age
* getFullName - method

Create an Animal constructor function that has:
* name
* age
* eat - method
* sleep - method

Create a Cat constructor function that inherits from Animal and has:
* color
* ownerId - id of a person that is the owner of the cat - it can be null
* meow - method that writes in the console: The cat [name] says Meow.

Create an array of 5 people. Create two cats, both of them should have owners.

## Task 2
Create a method on the Cat prototype that returns the details about the owner, based on the owner id and by using the people array. If ownerId is null
print that the cat does not have owner.

Create PersianCat and RagDollCat constructor functions that inherit from Cat.
#### PersianCat
* eyeColor - string
* furDescription - method that writes in console: The cat [name] has full fur!

#### RagDollCat
* weight - number
* isFriendly - boolean
* printPersonality(type) - method that can accepts boolean. If the boolean is true it should write that the cat is friendly and set the isFriendly value to true, else it should print that the cat is not friendly

Create one of each cats
Print details about the owner of the cat.
Call the furDescription and printPersonality methods correspondingly.
 */

function Person(id, firstName, lastName, age) {
	this.id = id;
	this.firstName = !firstName ? "Unnamed" : firstName;
	this.lastName = !lastName ? "Unnamed" : lastName;
	this.age = age;
	this.getFullName = function () {
		return `${this.firstName} ${this.lastName}`;
	};
}

function Animal(name, age) {
	this.name = !name ? "Unnamed" : name;
	this.age = age;
	this.eat = function () {
		console.log(`This ${this.name} is eating`);
	};
	this.sleep = function () {
		console.log(`This ${this.name} is sleeping`);
	};
}

function Cat(name, age, color, ownerId) {
	Object.setPrototypeOf(this, new Animal(name, age));
	this.color = color;
	this.ownerId = ownerId;
	this.printMeow = function () {
		console.log(`The cat ${this.name} says Meow!`);
	};
	this.getOwnerDetails = function () {
		let owner = null;
		people.forEach((person) => {
			if (person.id === this.ownerId) {
				owner = person;
			}
		});

		if (owner) {
			console.log(
				`The cat ${this.name} is owned by ${owner.getFullName()}`
			);
		} else {
			console.log(`The cat ${this.name} doesn't have an owner`);
		}
	};
}

let people = [
	new Person(1, "Bob", "Bobsky", 40),
	new Person(2, "Milan", "Miloradovski", 24),
	new Person(3, "Mitre", "Mitrevski", 53),
	new Person(4, "John", "Sky", 19),
	new Person(5, "Sylvester", "Stallone", 32),
];

let cat1 = new Cat("Mica", 2, "White", 1);
let cat2 = new Cat("Rocky", 3, "Brown", 5);

function PersianCat(name, age, color, ownerId, eyeColor) {
	Object.setPrototypeOf(this, new Cat(name, age, color, ownerId));
	this.eyeColor = eyeColor;
	this.furDescription = function () {
		console.log(`The cat ${this.name} has full fur!`);
	};
}

function RagDollCat(name, age, color, ownerId, weight, isFriendly) {
	Object.setPrototypeOf(this, new Cat(name, age, color, ownerId));
	this.weight = weight;
	this.isFriendly = isFriendly;
	this.printPersonality = function (type) {
		this.isFriendly = type;
		if (type) {
			console.log(`The cat ${this.name} is friendly`);
		} else {
			console.log(`The cat ${this.name} is not friendly`);
		}
	};
}

let persianCat = new PersianCat("Dushko", 4, "Cream", 2, "Green");
let ragDollCat = new RagDollCat("Zhivko", 2, "Gray", null, 2);

cat1.getOwnerDetails();
cat2.getOwnerDetails();
persianCat.getOwnerDetails();
ragDollCat.getOwnerDetails();

persianCat.furDescription();
ragDollCat.printPersonality(false);
