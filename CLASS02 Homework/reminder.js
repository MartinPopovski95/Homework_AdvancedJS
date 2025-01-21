/* ## Reminder App
 * Create a reminder app
 * There should be:
 * An input for entering the title
 * An input for entering priority (Low, medium, High)
 * An input for color
 * A textarea for adding a description
 * A button for adding the reminder
 * A button for showing all reminders
 * When the button for adding is clicked an object needs to be created with the properties from the inputs ( title, priority, color, and description )
 * The object should then be added to an array of reminders
 * When the button for showing all reminders is clicked it should show a table with title, priority, and description columns
 * The title should be the color of the "color" property */

// DOM elements
let titleInput = document.getElementById("titleInput");
let priorityInput = document.getElementById("priorityInput");
let colorInput = document.getElementById("colorInput");
let descriptionInput = document.getElementById("descriptionInput");
const addRemainderBtn = document.getElementById("addReminderBtn");
const showAllRemindersBtn = document.getElementById("showAllRemindersBtn");
const tableContainer = document.getElementById("tableContainer");

function addNewReminder(title, priority, color, description) {
	this.title = title;
	this.priority = priority;
	this.color = color;
	this.description = description;
}

let reminders = [];

addRemainderBtn.addEventListener("click", function () {
	if (!titleInput.value || !descriptionInput.value) {
		return alert("Please enter information about your task");
	} else {
		let reminder = new addNewReminder(
			titleInput.value,
			priorityInput.value,
			colorInput.value,
			descriptionInput.value
		);
		reminders.push(reminder);

		titleInput.value = "";
		descriptionInput.value = "";
	}
	console.log(reminders);
});

showAllRemindersBtn.addEventListener("click", function () {
	tableContainer.innerHTML = "";
	const table = document.createElement("table");
	const tHead = document.createElement("thead");
	const tRow = document.createElement("tr");
	const headerTitles = ["Title", "Priority", "Description"];

	for (let i = 0; i < headerTitles.length; i++) {
		const th = document.createElement("th");
		th.textContent = headerTitles[i];
		tRow.appendChild(th);
	}
	tHead.appendChild(tRow);
	table.appendChild(tHead);

	const tbody = document.createElement("tbody");

	for (let j = 0; j < reminders.length; j++) {
		const row = document.createElement("tr");

		const titleCell = document.createElement("td");
		titleCell.textContent = reminders[j].title;
		titleCell.style.color = reminders[j].color;
		row.appendChild(titleCell);

		const priorityCell = document.createElement("td");
		priorityCell.textContent = reminders[j].priority;
		row.appendChild(priorityCell);

		const descriptionCell = document.createElement("td");
		descriptionCell.textContent = reminders[j].description;
		row.appendChild(descriptionCell);

		tbody.appendChild(row);
	}
	table.appendChild(tbody);
	tableContainer.appendChild(table);
});
