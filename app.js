/*
==================================================================================
State
==================================================================================
*/

const state = {
	allMonsters: [
		{
      id: 1,
			name: 'Demo 1',
			type: 'ismonster',
			colour: 'blå',
			attributes: { huvuden: 1, armar: 4, horn: 2, tår: 9 },
		},
		{
      id: 2,
			name: 'Demo 2',
			type: 'eldmonster',
			colour: 'röd',
			attributes: { huvuden: 1, armar: 4, horn: 2, tår: 9 },
		},
		{
      id: 3,
			name: 'Demo 3',
			type: 'blixtmonster',
			colour: 'grön',
			attributes: { huvuden: 1, armar: 4, horn: 2, tår: 9 },
		},
		{
      id: 4,
			name: 'Demo 4',
			type: 'eldmonster',
			colour: 'rosa',
			attributes: { huvuden: 1, armar: 4, horn: 2, tår: 9 },
		},
		{
      id: 5,
			name: 'Demo 5',
			type: 'blixtmonster',
			colour: 'gul',
			attributes: { huvuden: 1, armar: 4, horn: 2, tår: 9 },
		},
	],
	currentID: 6, // Ger varje monster ett unikt ID
};

/*
==================================================================================
Config
==================================================================================
*/

const config = {
	monsterTypes: ['ismonster', 'eldmonster', 'blixtmonster'],
	monsterColours: ['röd', 'rosa', 'blå', 'grön', 'gul'],
	monsterAttributes: ['huvuden', 'armar', 'horn', 'tår'],
};

/*
==================================================================================
DOM-handles
==================================================================================
*/

const domHandles = {
	typeSelect: document.querySelector('#monster-type'),
	colourSelect: document.querySelector('#monster-colour'),
	registerMonsterForm: document.querySelector('#monster-form'),
	allMonsterCards: document.querySelector('#monster-card-wrapper'),
	monsterAttributeSpanElement: document.querySelector('#monster-attribute'),
	metadataColours: document.querySelector('#metadata-colours'),
	metadataTypes: document.querySelector('#metadata-types'),
	filterButtonWrapperColour: document.querySelector(`#dropdown-colour`),
	filterButtonWrapperType: document.querySelector(`#dropdown-type`),
};

/*
==================================================================================
Helper functions
==================================================================================
*/

// Funktion för att skriva stor bokstav i början
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
==================================================================================
Render function
==================================================================================
*/

// Funktion för att rendera alla monsterkort
const renderAllMonsterCards = (monsters) => {
	domHandles.allMonsterCards.innerHTML = ''; //

	monsters.forEach((el) => {
		const monsterCard = document.createElement('section');
		monsterCard.classList.add('monster-card', el.colour);
		monsterCard.setAttribute('data-id', el.id);

		// let idAsString = state.currentID.toString();

		// Skapa HTML-struktur för kortet
		monsterCard.innerHTML = `
        <span class="monster-card-heading-wrapper">
        <h3>${el.name}</h3>
        <button class="edit-button" data-id="${el.id}">
          Ändra
          </button>
        </span>
            <p>Typ: ${el.type}</p>
            <p>Färg: ${el.colour}</p>
            ${renderAttributes(el.attributes)}
            `;

		domHandles.allMonsterCards.appendChild(monsterCard);
	});
	attachEditButtons();
};

const attachEditButtons = () => {
	const editButtons = document.querySelectorAll('.edit-button');

	editButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const buttonID = e.target.dataset.id;

			// Hitta monstret som ska ändras
			const monsterToEdit = state.allMonsters.find(
				(monster) => monster.id == buttonID
			);
			console.log(monsterToEdit);
			console.log(buttonID);

			if (monsterToEdit) {
				openEditPopup(monsterToEdit);
			}
		});
	});
};

/*
==================================================================================
Form
==================================================================================
*/

// Populerar options med typer
config.monsterTypes.forEach((option) => {
	const typeOption = document.createElement('option');
	typeOption.innerHTML = capitalizeFirstLetter(option);
	typeOption.value = option;
	domHandles.typeSelect.appendChild(typeOption);
});

// Populerar metadatafältet med typer
for (const el of config.monsterTypes) {
	const metadataListItemType = document.createElement('li');
	metadataListItemType.innerHTML = capitalizeFirstLetter(`${[el]}: `);
	metadataListItemType.id = `listItem-${[el]}`;
	domHandles.metadataTypes.appendChild(metadataListItemType);

	const spanInListItem = document.createElement('span');
	spanInListItem.innerHTML = 0;
	spanInListItem.id = `antal-${[el]}`;
	metadataListItemType.appendChild(spanInListItem);
}

// Populerar metadatafältet med färger
for (const el of config.monsterColours) {
	const metadataListItemColour = document.createElement('li');
	metadataListItemColour.innerHTML = capitalizeFirstLetter(
		`${el}${el.slice(-1) === 'a' ? '' : 'a'} monster: `
	);
	metadataListItemColour.id = `listItem-${[el]}`;
	domHandles.metadataColours.appendChild(metadataListItemColour);

	const spanInListItem = document.createElement('span');
	spanInListItem.innerHTML = 0;
	spanInListItem.id = `antal-${[el]}`;
	metadataListItemColour.appendChild(spanInListItem);
}

// Loopar igenom arrayen med färger och skapar radio input och korresponderande labels
for (const el of config.monsterColours) {
	const inputLabelSpanElement = document.createElement('span');
	inputLabelSpanElement.classList.add('colour-span');
	domHandles.colourSelect.appendChild(inputLabelSpanElement);

	const colourOptions = document.createElement('input');
	colourOptions.type = 'radio';
	colourOptions.value = el;
	colourOptions.name = 'colour';
	colourOptions.id = el;
	colourOptions.innerHTML = el;

	const labelForColours = document.createElement('label');
	labelForColours.setAttribute('for', colourOptions.id);
	// labelForColours.textContent = el;
	labelForColours.innerHTML = capitalizeFirstLetter(el);
	labelForColours.classList.add(el);

	inputLabelSpanElement.appendChild(colourOptions);
	inputLabelSpanElement.appendChild(labelForColours);
}

// Eventlistener på formulär
domHandles.registerMonsterForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Skapa ett utseende-egenskaps-objekt från formuläret
	const newAttributes = {};
	config.monsterAttributes.forEach((el) => {
		const inputValue = document.getElementById(el).value;
		newAttributes[el] = inputValue || 0;
	});

	// Hämta värden från formuläret
	const monsterName = document.querySelector('#monster-name').value;
	const monsterType = document.querySelector('#monster-type').value;
	const monsterColour = document.querySelector(
		'input[name="colour"]:checked'
	).value;

	const newID = state.currentID;

	// Skapa ett nytt monsterobjekt med unikt ID
	const newMonster = {
		id: newID,
		name: monsterName,
		type: monsterType,
		colour: monsterColour,
		attributes: { ...newAttributes },
	};

	// Uppdatera state med det nya monstret
	state.allMonsters.push(newMonster);

	// Rendera monsterkorten och metadata
	renderAllMonsterCards(state.allMonsters);
	domHandles.registerMonsterForm.reset();
	renderMonsterData();

	// Öka id till nästa monster
	state.currentID++;
});

// Skapar input-fält för utseende-egenskaperna
config.monsterAttributes.forEach((attribute) => {
	const attributeInputElement = document.createElement('div');
	attributeInputElement.innerHTML =
		`
  <label for=${attribute}>` +
		capitalizeFirstLetter(attribute) +
		`: </label>
  <input type="number" id="${attribute}" min="0" max ="10" placeholder="0">
    `;

	domHandles.monsterAttributeSpanElement.appendChild(attributeInputElement);

	// temporaryAttributesContainer[attribute] = document.querySelector(`#${attribute}`);
});

// Funktion för att rendera attribut som HTML
const renderAttributes = (attributes) => {
	let attributesAsString = '';
	for (const key in attributes) {
		attributesAsString += `<p>${capitalizeFirstLetter(key)}: ${
			attributes[key]
		}</p>`;
	}
	return attributesAsString;
};

/*
==================================================================================
Metadata
==================================================================================
*/

// funktion som returnerar antal monster av en färg
const amountOfColour = (colour) => {
	return state.allMonsters.filter((monster) => monster.colour === colour)
		.length;
};

// funktion som returnerar antal monster av en färg
const amountOfType = (type) => {
	return state.allMonsters.filter((monster) => monster.type === type).length;
};

// funktion som renderar hela metadatarutan
const renderMonsterData = () => {
	const totalAmountElement = document.getElementById(`antal-totalt`);
	totalAmountElement.innerHTML = state.allMonsters.length;

	config.monsterColours.forEach((colour) => {
		const colourElement = document.getElementById(`antal-${colour}`);
		colourElement.innerHTML = amountOfColour(colour);
	});

	config.monsterTypes.forEach((type) => {
		const typeElement = document.getElementById(`antal-${type}`);
		typeElement.innerHTML = amountOfType(type);
	});
};

/*
==================================================================================
Filter
==================================================================================
*/

// funktion som returnerar monster av en färg
const filterByColour = (colour) => {
	return state.allMonsters.filter((monster) => monster.colour === colour);
};

// funktion som returnerar monster av en typ
const filterByType = (type) => {
	return state.allMonsters.filter((monster) => monster.type === type);
};

// Skapa en visa alla färger knapp
const showAllColoursButton = document.createElement('button');
showAllColoursButton.innerHTML = 'Visa alla färger';
showAllColoursButton.id = 'show-all-colours';
showAllColoursButton.classList.add('show-colour');

domHandles.filterButtonWrapperColour.appendChild(showAllColoursButton);

showAllColoursButton.addEventListener(`click`, () => {
	renderAllMonsterCards(state.allMonsters);
});

// Skapa filtrera efter färg knapparna i deras wrapper
config.monsterColours.forEach((el) => {
	const filterByColourButton = document.createElement('button');
	filterByColourButton.innerHTML = capitalizeFirstLetter(`${el}`);
	filterByColourButton.id = `filter-${el}`;
	filterByColourButton.classList.add('show-colour');
	filterByColourButton.type = 'button';

	domHandles.filterButtonWrapperColour.appendChild(filterByColourButton);

	// Event listener för färgen som filtrerar
	filterByColourButton.addEventListener('click', () => {
		const filteredMonsters = filterByColour(el);
		renderAllMonsterCards(filteredMonsters);
	});
});

// Skapa en visa alla typer knapp
const showAllTypesButton = document.createElement('button');
showAllTypesButton.innerHTML = 'Visa alla typer';
showAllTypesButton.id = 'show-all-types';
showAllTypesButton.classList.add('show-colour');

domHandles.filterButtonWrapperType.appendChild(showAllTypesButton);

showAllTypesButton.addEventListener(`click`, () => {
	renderAllMonsterCards(state.allMonsters);
});

// Skapa filtrera efter typ knapparna i deras wrapper
config.monsterTypes.forEach((el) => {
	const filterByTypeButton = document.createElement('button');
	filterByTypeButton.innerHTML = capitalizeFirstLetter(`${el}`);
	filterByTypeButton.id = `filter-${el}`;
	filterByTypeButton.classList.add('show-type');
	filterByTypeButton.type = 'button';

	domHandles.filterButtonWrapperType.appendChild(filterByTypeButton);

	// Event listener för typerna som filtrerar
	filterByTypeButton.addEventListener('click', () => {
		const filteredMonsters = filterByType(el);
		renderAllMonsterCards(filteredMonsters);
	});
});

/*
==================================================================================
Initiation
==================================================================================
*/

// Anropa renderMonsterCards för att skriva ut demokort
// renderDemoMonsterCards();

renderAllMonsterCards(state.allMonsters);
renderMonsterData();

/*
==================================================================================
Edit
==================================================================================
*/

// Edit-popup setup
const editPopupWindow = document.querySelector('#edit-popup-window');
const editPopup = document.createElement('section');
editPopup.classList.add('popup-wrapper');
editPopupWindow.appendChild(editPopup);
editPopup.style.display = 'none';
editPopupWindow.style.display = 'none';

//Funktion som sköter edit-popup fönster
const openEditPopup = (monsterToEdit) => {
	editPopup.innerHTML = '';
	editPopup.style.display = 'block';
	editPopupWindow.style.display = 'block';

	const cancelEditButton = document.createElement('button');
	cancelEditButton.innerHTML = 'Avbryt';
	editPopup.appendChild(cancelEditButton);

	cancelEditButton.addEventListener('click', (e) => {
		e.preventDefault();
		editPopup.style.display = 'none';
		editPopupWindow.style.display = 'none';
	});

	// Skriver ut värderna innan redigering
	config.monsterAttributes.forEach((attribute) => {
		const currentAttribute = document.createElement('span');
		currentAttribute.innerHTML = `
      <label for=${attribute}>${capitalizeFirstLetter(attribute)}: </label>
      <input type="number" id="edit-${attribute}" min="0" max="10" value="${
			monsterToEdit.attributes[attribute]
		}">
    `;
		editPopup.appendChild(currentAttribute);
	});

	const saveEditButton = document.createElement('button');
	saveEditButton.innerHTML = 'Spara';
	editPopup.appendChild(saveEditButton);

	saveEditButton.addEventListener('click', (e) => {
		e.preventDefault();

		const updatedAttributes = { ...monsterToEdit.attributes };

		// Uppdaterar utseende-egenskaperna
		config.monsterAttributes.forEach((attribute) => {
			const updatedAttribute = document.getElementById(
				`edit-${attribute}`
			).value;
			updatedAttributes[attribute] = updatedAttribute;
		});

		// skapa nytt objekt med uppdaterade utseende-egenskaperna att stoppa in i arrayen
		const editedMonster = {
			...monsterToEdit,
			attributes: updatedAttributes,
		};

		// Hitta index av det gamla objektet i arrayen
		const monsterIndex = state.allMonsters.findIndex(
			(monster) => monster.id === editedMonster.id
		);

		// Byt ut objektet i arrayen
		state.allMonsters[monsterIndex] = editedMonster;

		editPopup.style.display = 'none';
		editPopupWindow.style.display = 'none';

		renderAllMonsterCards(state.allMonsters);
		renderMonsterData();
	});
};
