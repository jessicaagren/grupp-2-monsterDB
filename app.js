// En array där alla monsterobjekt ska landa
const allMonsters = [];


// Objekt som visar egenskaperna som monstren har
const monster = {
    name: "Demo",
    type: "Ice",
    colour: "blue",
    heads: 1,
    tails: 0,
    arms: 4,
    horns:2,
};

// Array med typerna
const types = ["Ismonster", "Eldmonster", "Blixtmonster"];

const typeSelect = document.querySelector("#monsterType");

for (const type of types) {
    const typeOption = document.createElement("option");
    typeOption.innerHTML = type;
    typeOption.value = type;
    typeSelect.appendChild(typeOption);
}

// array med färgerna
const monsterColours = ["röd", "rosa", "blå", "grön", "gul"];

const labelElement = document.querySelector('#monsterColour');

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

    labelElement.appendChild(labelForColors);
    labelElement.appendChild(colourOptions);
};