// En array där alla monsterobjekt ska landa
const allMonsters = [];



// Array med typerna
const types = ["Ismonster", "Eldmonster", "Blixtmonster"];

const typeSelect = document.querySelector("#monster-type");

for (const type of types) {
    const typeOption = document.createElement("option");
    typeOption.innerHTML = type;
    typeOption.value = type;
    typeSelect.appendChild(typeOption);
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
    colourOptions.id = el; // ger unikt id med färgnamn
    colourOptions.innerHTML = el;

    const labelForColours = document.createElement("label");
    labelForColours.setAttribute("for", colourOptions.id); // länka label till inputens id
    labelForColours.textContent = el; // label texten blir färgnamen
    labelForColours.innerHTML = el;

    labelElement.appendChild(colourOptions);
    labelElement.appendChild(labelForColours);
};

// hämta formulär
const registerMonsterForm = document.querySelector('#monster-form');
// hämta article
const allMonsterCards = document.querySelector('article');

registerMonsterForm.addEventListener('submit', function(event) {
    event.preventDefault();

const monsterName = document.querySelector('#monster-name').value;
const monsterType = document.querySelector('#monster-type').value;
const monsterColour = document.querySelector('input[name="colour"]:checked').value;

// skapa monsterobjekt från formulär
const newMonster = {
    name: monsterName,
    type: monsterType,
    colour: monsterColour,
    heads: "1",
    tails: "0",
    arms: "4",
    horns: "2"
}

// pusha monsterobjekt till array allMonsters
allMonsters.push(newMonster);

//skapa monsterkort på sidan
const monsterCard = document.createElement('section');
monsterCard.classList.add('monster-card');
monsterCard.innerHTML = `<h3>${monsterName}</h3><p>Typ: ${monsterType}</p><p>Färg: ${monsterColour}</p>`;
allMonsterCards.appendChild(monsterCard);

registerMonsterForm.reset();

renderMonsterData();

console.log(newMonster);
console.log(allMonsters);

});




// ========================= Siris tilläg (metadata) ==========================

// funktion som returnerar monster av en färg
const filterByColour = (colour) => {
    return allMonsters.filter(monster => monster.colour === colour);
}

// funktion som returnerar monster av en typ
const filterByType = (type) => {
    return allMonsters.filter(monster => monster.type === type);
}

// funktion som returnerar antal monster av en färg
const amountOfColour = (colour) => {
    return allMonsters.filter(monster => monster.colour === colour).length;
}

// funktion som returnerar antal monster av en färg
const amountOfType = (type) => {
    return allMonsters.filter(monster => monster.type === type).length;
}

// funktion som renderar hela metadatarutan
const renderMonsterData = () => {
    const totalAmountElement = document.getElementById(`antal-totalt`);
    totalAmountElement.innerText = allMonsters.length;

    monsterColours.forEach(colour => {
        const colourElement = document.getElementById(`antal-${colour}`);
        colourElement.innerText = amountOfColour(colour);
    });

    types.forEach(type => {
        const typeElement = document.getElementById(`antal-${type}`);
        typeElement.innerText = amountOfType(type);
    });
}