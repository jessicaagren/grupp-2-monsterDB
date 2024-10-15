// TODO: vad gör detta stycket kod?
for (const el of monsterTypes) {
  const typeOptions = document.createElement("option");
  typeOptions.innerHTML = el;
  typeOptions.value = el;
  typeSelect.appendChild(typeOptions);
}

// loopar igenom arrayen med färger och skapar radio input och korresponderande labels
for (const el of monsterColours) {
  const inputLabelSpanElement = document.createElement("span");
  colourSelect.appendChild(inputLabelSpanElement);

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
  labelForColours.classList = el;

  inputLabelSpanElement.appendChild(colourOptions);
  inputLabelSpanElement.appendChild(labelForColours);
}

// hämta knapp
// const submitButton = document.querySelector('#submit');

registerMonsterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const monsterName = document.querySelector("#monster-name").value;
  const monsterType = document.querySelector("#monster-type").value;
  const monsterColour = document.querySelector(
    'input[name="colour"]:checked'
  ).value;

  // skapa monsterobjekt från formulär
  const newMonster = {
    name: monsterName,
    type: monsterType,
    colour: monsterColour,
    attributes: attributesContainer,
  };

  // pusha monsterobjekt till array allMonsters
  allMonsters.push(newMonster);

  //skapa monsterkort på sidan
  const monsterCard = document.createElement("section");
  monsterCard.classList.add("monster-card");
  monsterCard.classList.add(`${monsterColour}`);
  monsterCard.innerHTML = `<h3>${monsterName}</h3><p>Typ: ${monsterType}</p><p>Färg: ${monsterColour}</p>`;

  allMonsterCards.appendChild(monsterCard);

  registerMonsterForm.reset();

  renderMonsterData();

  console.log(newMonster);
  console.log(allMonsters);
});

// funktion som returnerar monster av en färg
const filterByColour = (colour) => {
  return allMonsters.filter((monster) => monster.colour === colour);
};

// funktion som returnerar monster av en typ
const filterByType = (type) => {
  return allMonsters.filter((monster) => monster.type === type);
};

// funktion som returnerar antal monster av en färg
const amountOfColour = (colour) => {
  return allMonsters.filter((monster) => monster.colour === colour).length;
};

// funktion som returnerar antal monster av en färg
const amountOfType = (type) => {
  return allMonsters.filter((monster) => monster.type === type).length;
};

// funktion som renderar hela metadatarutan
const renderMonsterData = () => {
  const totalAmountElement = document.getElementById(`antal-totalt`);
  totalAmountElement.innerText = allMonsters.length;

  monsterColours.forEach((colour) => {
    const colourElement = document.getElementById(`antal-${colour}`);
    colourElement.innerText = amountOfColour(colour);
  });

  monsterTypes.forEach((type) => {
    const typeElement = document.getElementById(`antal-${type}`);
    typeElement.innerText = amountOfType(type);
  });
};

// ===================== teeest =====================

monsterAttributes.forEach((attribute) => {
  const attributeInputElement = document.createElement("div");
  attributeInputElement.innerHTML = `
    <label for=${attribute}>${attribute}: </label>
    <input type="number" id="${attribute}" min="0" max ="10" placeholder="Välj antal ${attribute}">
    `;

  monsterAttributeSpanElement.appendChild(attributeInputElement);

  attributesContainer[attribute] = document.querySelector(`#${attribute}`);
});
