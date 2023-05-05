// Image switcher code

let myImage = document.querySelector("img");

myImage.onclick = function () {
	let mySrc = myImage.getAttribute("src");
	if (mySrc === "images/firefox-icon.png") {
		myImage.setAttribute("src", "images/firefox2.png");
	} else {
		myImage.setAttribute("src", "images/firefox-icon.png");
	}
};

// Personalized welcome message code

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
	let myName = prompt("Please enter your name.");
	if (!myName) {
		setUserName();
	} else {
		localStorage.setItem("name", myName);
		myHeading.innerHTML = "你真是太酷了, " + myName;
	}
}

if (!localStorage.getItem("name")) {
	setUserName();
} else {
	let storedName = localStorage.getItem("name");
	myHeading.innerHTML = "你真是太酷了, " + storedName;
}

myButton.onclick = function () {
	setUserName();
};
