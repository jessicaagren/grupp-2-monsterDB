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
// Array med färgerna
const colours = ["Röd", "Blå", "Gul", "Grön", "Lila"];

const typeSelect = document.querySelector("#monsterType");

for (const type of types) {
    const typeOption = document.createElement("option");
    typeOption.innerHTML = type;
    typeOption.value = type;
    typeSelect.appendChild(typeOption);
}