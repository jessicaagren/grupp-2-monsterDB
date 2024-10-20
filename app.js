// ===== STATE =====
const allMonsters = [
    { name: "1", type: "ismonster", colour: "blå", attributes: {} },
    { name: "2", type: "eldmonster", colour: "röd", attributes: {} },
    { name: "3", type: "blixtmonster", colour: "grön", attributes: {} },
    { name: "4", type: "eldmonster", colour: "rosa", attributes: {} },
    { name: "5", type: "blixtmonster", colour: "gul", attributes: {} },
];
const allAttributes = [];
const temporaryAttributesContainer = {};
let currentID = 1; // Ger varje monster ett unikt ID

// ===== CONFIG =====
const monsterTypes = ["ismonster", "eldmonster", "blixtmonster"];
const monsterColours = ["röd", "rosa", "blå", "grön", "gul"];
const monsterAttributes = ["huvuden", "armar", "horn", "tår"];

// ===== DOM HANDLES =====
const typeSelect = document.querySelector("#monster-type");
const colourSelect = document.querySelector("#monster-colour");
const registerMonsterForm = document.querySelector("#monster-form");
const allMonsterCards = document.querySelector("#monster-card-wrapper");
const monsterAttributeSpanElement = document.querySelector("#monster-attribute");
const metadataColours = document.querySelector("#metadata-colours");

// ===== FUNCTIONS =====
// Funktion för att skriva stor bokstav i början
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Funktion för att rendera monsterkort
const renderDemoMonsterCards = () => {
    allMonsters.forEach((monster) => {
      const monsterCard = document.createElement("section");
      monsterCard.classList.add("monster-card", monster.colour);
      monsterCard.innerHTML = `<h3>${monster.name}</h3><p>Typ: ${monster.type}</p><p>Färg: ${monster.colour}</p>`;
  
      allMonsterCards.appendChild(monsterCard);
    });
  };
  
// Anropa renderMonsterCards för att skriva ut demokort
renderDemoMonsterCards();

// Funktion för att skapa options (domHandle = DOM handle, options = array med alternativ)
const populateSelectOptions = (domHandle, options) => {
    options.forEach((option) => {
        const typeOption = document.createElement("option");
        typeOption.innerHTML = capitalizeFirstLetter(option);
        typeOption.value = option;
        domHandle.appendChild(typeOption);
    });
};

populateSelectOptions(typeSelect, monsterTypes);


// Loopar igenom arrayen med färger och skapar radio input och korresponderande labels + populerar metadatafältet
for (const el of monsterColours) {
    const metadataListItemColour = document.createElement("li");
    metadataListItemColour.innerHTML = capitalizeFirstLetter(`${[el]}a monster:`);  // lägga till if sats som inte lägger till om sista bokstav är "a"
    metadataListItemColour.id = (`listItem-${[el]}`);
    metadataColours.appendChild(metadataListItemColour);

    const spanInListItem = document.createElement("span");
    spanInListItem.innerHTML = 0;
    spanInListItem.id = (`antal-${[el]}`);
    metadataListItemColour.appendChild(spanInListItem);

    const inputLabelSpanElement = document.createElement("span");
    colourSelect.appendChild(inputLabelSpanElement);
    
    const colourOptions = document.createElement("input");
    colourOptions.type = "radio";
    colourOptions.value = el;
    colourOptions.name = "colour";
    colourOptions.id = el;
    colourOptions.innerHTML = el;
    
    const labelForColours = document.createElement("label");
    labelForColours.setAttribute("for", colourOptions.id);
    // labelForColours.textContent = el;
    labelForColours.innerHTML = capitalizeFirstLetter(el);
    labelForColours.classList = el;
    
    inputLabelSpanElement.appendChild(colourOptions);
    inputLabelSpanElement.appendChild(labelForColours);
}

// Eventlistener på formulär
registerMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Skapa ett utseende-egenskaps-objekt från formuläret
    const newAttributes = {};
    monsterAttributes.forEach((el) => {
        const inputValue = document.getElementById(el).value;
        newAttributes[el] = inputValue || 0;
    });

    // Hämta värden från formuläret
    const monsterName = document.querySelector("#monster-name").value;
    const monsterType = document.querySelector("#monster-type").value; 
    const monsterColour = document.querySelector('input[name="colour"]:checked').value;

    // Skapa ett nytt monsterobjekt med unikt ID
    const newMonster = {
        id: currentID,
        name: monsterName,
        type: monsterType,
        colour: monsterColour, 
        attributes: newAttributes,
    };

    // Uppdatera state med det nya monstret
    allMonsters.push(newMonster);
    currentID++;

    // Rendera monsterkorten och metadata
    renderAllMonsterCards(allMonsters);
    registerMonsterForm.reset();
    renderMonsterData();
});

// Funktion för att rendera alla monsterkort
const renderAllMonsterCards = (monsters) => {
    allMonsterCards.innerHTML = ""; //

    monsters.forEach((monster) => {
        const monsterCard = document.createElement("section");
        monsterCard.classList.add("monster-card", monster.colour); 
        monsterCard.setAttribute("data-id", monster.id);

        // Skapa HTML-struktur för kortet
        monsterCard.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Typ: ${monster.type}</p>
            <p>Färg: ${monster.colour}</p>
            ${renderAttributes(monster.attributes)}
        `;

        allMonsterCards.appendChild(monsterCard);
    });
};
 
// Funktion för att rendera attribut som HTML
const renderAttributes = (attributes) => {
    let attributesAsString = "";
    for (const key in attributes) {
        attributesAsString += `<p>${capitalizeFirstLetter(key)}: ${attributes[key]}</p>`;
    }
    return attributesAsString;
};

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

// Skapar input-fält för utseende-egenskaperna
monsterAttributes.forEach((attribute) => {
  const attributeInputElement = document.createElement("div");
  attributeInputElement.innerHTML = `
    <label for=${attribute}>` + capitalizeFirstLetter(attribute) + `: </label>
    <input type="number" id="${attribute}" min="0" max ="10" placeholder="Välj antal ${attribute}">
    `;

  monsterAttributeSpanElement.appendChild(attributeInputElement);

  temporaryAttributesContainer[attribute] = document.querySelector(`#${attribute}`);
});


// DOM-handle för filterknapparnas wrapper färg
const filterButtonWrapperColour = document.querySelector(`#dropdown-colour`);

// Skapa en visa alla färger knapp
const showAllColoursButton = document.createElement("button");
showAllColoursButton.innerHTML = "Visa alla färger";
showAllColoursButton.id = "show-all-colours";
showAllColoursButton.classList.add("show-colour");

filterButtonWrapperColour.appendChild(showAllColoursButton);

showAllColoursButton.addEventListener(`click`, () => {
  renderAllMonsterCards(allMonsters);
});

// Skapa filtrera efter färg knapparna i deras wrapper
monsterColours.forEach(colour => {

  const filterByColourButton = document.createElement("button");
  filterByColourButton.innerHTML = `${colour}`;
  filterByColourButton.id = `filter-${colour}`; 
  filterByColourButton.classList.add("show-colour");
  filterByColourButton.type = "button";

  filterButtonWrapperColour.appendChild(filterByColourButton);
  
  // Event listener för färgen som filtrerar
    filterByColourButton.addEventListener('click', () => {
    const filteredMonsters = filterByColour(colour);
    renderAllMonsterCards(filteredMonsters);
  });
});

// DOM-handle för filterknapparnas wrapper typ
const filterButtonWrapperType = document.querySelector(`#dropdown-type`);
// Skapa en visa alla typer knapp
const showAllTypesButton = document.createElement("button");
showAllTypesButton.innerHTML = "Visa alla typer";
showAllTypesButton.id = "show-all-types";
showAllTypesButton.classList.add("show-colour");

filterButtonWrapperType.appendChild(showAllTypesButton);

showAllTypesButton.addEventListener(`click`, () => {
  renderAllMonsterCards(allMonsters);
});

// Skapa filtrera efter typ knapparna i deras wrapper
monsterTypes.forEach(el => {

  const filterByTypeButton = document.createElement("button");
  filterByTypeButton.innerHTML = `${el}`;
  filterByTypeButton.id = `filter-${el}`; 
  filterByTypeButton.classList.add("show-type");
  filterByTypeButton.type = "button";

  filterButtonWrapperType.appendChild(filterByTypeButton);
  
  // Event listener för typerna som filtrerar 
    filterByTypeButton.addEventListener('click', () => {
    const filteredMonsters = filterByType(el);
    renderAllMonsterCards(filteredMonsters);
  });
});