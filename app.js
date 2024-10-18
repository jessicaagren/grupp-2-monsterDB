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
const allMonsterCards = document.querySelector("main");
const monsterAttributeSpanElement = document.querySelector("#monster-attribute");

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

// Funktion för att skapa monsterkort
// const createMonsterCard = (monsterName, monsterType, monsterColour) => {
//     const monsterCard = document.createElement("section");
//     monsterCard.classList.add("monster-card", monsterColour);
//     monsterCard.innerHTML = `<h3>${monsterName}</h3><p>Typ: ${monsterType}</p><p>Färg: ${monsterColour}</p>`;
//     return monsterCard;
//   }

// Flyttat ut objektet och skapat funktion
// const createMonster = (name, type, colour, attributes) => {
//     return {
//         name: name,
//         type: type,
//         colour: colour,
//         attributes: attributes,
//     };
// };

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
    labelForColours.innerHTML = capitalizeFirstLetter(el);
    labelForColours.classList = el;
    
    inputLabelSpanElement.appendChild(colourOptions);
    inputLabelSpanElement.appendChild(labelForColours);
}

registerMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Förhindra sidladdning vid formulärinlämning

    // === Skapa ett attribut-objekt från formuläret ===
    const newAttributes = {};
    monsterAttributes.forEach((attr) => {
        const inputValue = document.getElementById(attr).value; // Hämta värde för varje attribut
        newAttributes[attr] = inputValue || 0; // Om inget värde anges, sätt till 0
    });

    // === Hämta värden från formuläret ===
    const monsterName = document.querySelector("#monster-name").value; // Namn på monstret
    const monsterType = document.querySelector("#monster-type").value; // Typ av monster
    const monsterColour = document.querySelector('input[name="colour"]:checked').value; // Färg från vald radio-knapp

    // === Skapa ett nytt monsterobjekt med unikt ID ===
    const newMonster = {
        id: currentID, // Tilldela ett unikt ID till monstret
        name: monsterName, // Namn från formuläret
        type: monsterType, // Typ från formuläret
        colour: monsterColour, // Färg från radio-knapp
        attributes: newAttributes, // Attribut från formuläret
    };

    // === Uppdatera state med det nya monstret ===
    allMonsters.push(newMonster); // Lägg till det nya monstret i listan
    currentID++; // Öka ID:t så att nästa monster får ett nytt unikt ID

    // === Rendera om monsterkorten och metadata ===
    renderAllMonsterCards(allMonsters); // Visa alla monsterkort igen
    registerMonsterForm.reset(); // Återställ formuläret till sitt ursprungsläge
    renderMonsterData(); // Uppdatera metadata för alla monster
});

// === Funktion för att rendera alla monsterkort ===
const renderAllMonsterCards = (monsters) => {
    allMonsterCards.innerHTML = ""; // Töm DOM-elementet för gamla monsterkort

    monsters.forEach((monster) => {
        const monsterCard = document.createElement("section"); // Skapa en ny kortsektion
        monsterCard.classList.add("monster-card", monster.colour); // Lägg till klasser för kort och färg
        monsterCard.setAttribute("data-id", monster.id); // Tilldela kortet ett data-attribut med ID

        // Skapa HTML-struktur för kortet och lägg till attributdata
        monsterCard.innerHTML = `
            <h3>${monster.name}</h3>
            <p>Typ: ${monster.type}</p>
            <p>Färg: ${monster.colour}</p>
            ${renderAttributes(monster.attributes)} <!-- Rendera attributen -->
        `;

        allMonsterCards.appendChild(monsterCard); // Lägg kortet i main-sektionen
    });
};
 

// Funktion för att rendera attribut som HTML
const renderAttributes = (attributes) => {
    let attributesHTML = "";
    for (const key in attributes) {
        attributesHTML += `<p>${capitalizeFirstLetter(key)}: ${attributes[key]}</p>`;
    }
    return attributesHTML;
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

// ===================== teeest =====================

monsterAttributes.forEach((attribute) => {
  const attributeInputElement = document.createElement("div");
  attributeInputElement.innerHTML = `
    <label for=${attribute}>` + capitalizeFirstLetter(attribute) + `: </label>
    <input type="number" id="${attribute}" min="0" max ="10" placeholder="Välj antal ${attribute}">
    `;

  monsterAttributeSpanElement.appendChild(attributeInputElement);

  temporaryAttributesContainer[attribute] = document.querySelector(`#${attribute}`);
});

// ========= filter????? =========

// event listener på den??

const filterMonsterCards = (selectedType, selectedColour) => {
    // Filtrera monster efter vald typ och färg
    const filteredMonsters = allMonsters;
  
    if (selectedType) {
      filteredMonsters = filterByType(selectedType);
    }
    if (selectedColour) {
      filteredMonsters = filteredMonsters.filter(
        (monster) => monster.colour === selectedColour
      );

    } // Rensa tidigare kort från DOM
    allMonsterCards.innerHTML = "";
  
    // Rendera de filtrerade korten
    filteredMonsters.forEach((monster) => {
      const monsterCard = createMonsterCard(monster.name, monster.type, monster.colour);
      allMonsterCards.appendChild(monsterCard);
    });
  };