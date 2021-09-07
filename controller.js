// In JS, we define methods as functions
// JavaScript is loosely typed, so no data types are defined


// We can specify event listeners to call code when events are triggered
window.onload = () => {
    let apiBtn = document.querySelector("#btn");
    apiBtn.addEventListener("click", makeRequest);
    window.addEventListener("keydown", submitInput);
}

function submitInput(event) {
    if (event.code !== "Enter") return;
    makeRequest();
}

function makeRequest() {
    let input = document.querySelector("input[type=text]");
    let searchQuery = input.value.toLowerCase();
    if (!input.value) return;

    input.value = "";

    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            response = JSON.parse(response);
            populate(response);
        }
    };
	
	// Open the request: Method, URL, isAsynchronous
    ajaxRequest.open("GET", "https://pokeapi.co/api/v2/pokemon/" + searchQuery, true);
    ajaxRequest.send();
}

function populate(requestData) {
    let pkmName = requestData["name"];
    let typeData = requestData["types"];
    let allTypes = [];
    let spriteURL = requestData["sprites"]["front_default"];
    let spriteContainer = document.querySelector("#result-image");
    let typeContainer = document.querySelector("#result-data");
    let typeHTML = "";

    pkmName = capitalize(pkmName);

    for (let d of typeData) {
        allTypes.push(d["type"]["name"]);
    }

    spriteContainer.innerHTML = "<img class=\"sprite\" src=\"" + spriteURL + "\" alt=\"" + pkmName + " Front Sprite\" />";
    document.querySelector("#result-text").innerHTML = pkmName;

    for (let type of allTypes) {
        typeHTML += "<span class=\"type\">" + capitalize(type) + "</span>";
    }
    typeContainer.innerHTML = typeHTML;
}

function capitalize(inputString) {
    let char1 = inputString[0].toUpperCase();
    return char1 + inputString.substring(1).toLowerCase();
}