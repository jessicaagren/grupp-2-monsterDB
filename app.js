// En array där alla monsterobjekt ska landa
const allMonsters = [];

// Array med typerna
const monsterTypes = ["Ismonster", "Eldmonster", "Blixtmonster"];

const typeSelect = document.querySelector("#monster-type");

for (const el of monsterTypes) {
    const typeOptions = document.createElement("option");
    typeOptions.innerHTML = el;
    typeOptions.value = el;
    typeSelect.appendChild(typeOptions);
}

// array med färgerna
const monsterColours = ["röd", "rosa", "blå", "grön", "gul"];

const labelElement = document.querySelector('#monster-colour');

// loopar igenom arrayen med färger och skapar radio input och korresponderande labels
for (const el of monsterColours) {
    const colourOptions = document.createElement("input");
    colourOptions.type = "radio"; // gör alla till radio buttons
    colourOptions.value = el; // ger unikt value som motsvarar färgnamnen
    colourOptions.name = "colour"; // grupperar alla radio buttons genom gemensamt namn
    colourOptions.id = el; // ger unikt id -- colour-(färgnamn)
    colourOptions.innerHTML = el;

    const labelForColors = document.createElement("label");
    labelForColors.setAttribute("for", colourOptions.id); // länka label till inputens id
    labelForColors.textContent = el; // label texten blir färgnamen
    labelForColors.innerHTML = el;

    labelElement.appendChild(colourOptions);
    labelElement.appendChild(labelForColors);
};

// hämta formulär
const registerMonsterForm = document.querySelector("#monster-form");

// hämta knapp
// const submitButton = document.querySelector('#submit');

// hämta section
const allMonsterCards = document.querySelector("article");

registerMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault();

const monsterName = document.querySelector("#monster-name").value;
const monsterType = document.querySelector("#monster-type").value;
const monsterColour = document.querySelector('input[name="colour"]:checked').value;

// skapa monsterobjekt från formulär
const newMonster = {
    name: monsterName,
    type: monsterType,
    color: monsterColour,
    heads: "1",
    tails: "0",
    arms: "4",
    horns: "2"
}

// pusha monsterobjekt till array allMonsters
allMonsters.push(newMonster);

//skapa monsterkort på sidan
const monsterCard = document.createElement("section");
monsterCard.classList.add("monster-card");
monsterCard.innerHTML = `<h3>${monsterName}</h3><p>Typ: ${monsterType}</p><p>Färg: ${monsterColour}</p>`;
allMonsterCards.appendChild(monsterCard);

registerMonsterForm.reset();

console.log(newMonster);
console.log(allMonsters);

});


