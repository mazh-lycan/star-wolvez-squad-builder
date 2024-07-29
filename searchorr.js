const characters = [
    {
        "image": "./pics/QmZ7m4GBfEiCnfmgqjXNbfj4cVKT5oNBiqCZyeCw2TihBL",
        "collectionNumber": 1,
        "url": "https://game.starwolvez.com",
        "traits": {
            "PVP": ["8% less likely to be stunned", "Heavy attack does 8 more damage"],
            "PVE": ["Tiene un arma no se 5% de fuerza"],
            "Boss Battle": [],
            "Battle Royale": [],
            "Mining": [],
            "Passive": ["Canta canciones"]
        }
    },
    {
        "image": "./pics/QmSuDWbxDDHReFFtmrbcecQxxbgHHRGCyLVdYJHiVHrDww",
        "collectionNumber": 2,
        "url": "https://game.starwolvez.com",
        "traits": {
            "PVP": ["Additional 6% chance to stun opponent"],
            "PVE": ["Me lo inventé esto jaja"],
            "Boss Battle": ["Reguapardo con 3% de rizz"],
            "Battle Royale": [],
            "Mining": ["Minero de corazon"],
            "Passive": []
        }
    },
    // Add more characters as needed
];

function loadCharacters(filteredCharacters) {
    const charactersContainer = document.getElementById('characters');
    charactersContainer.innerHTML = '';

    filteredCharacters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'character';
        characterElement.innerHTML = `
            <img src="${character.image}" alt="Character Image">
            <p>${character.collectionNumber}</p>
            <a href="${character.url}" target="_blank">More Info</a>
        `;
        charactersContainer.appendChild(characterElement);

        characterElement.addEventListener('click', () => {
            addCharacterToSquad(character);
        });
    });
}

function addCharacterToSquad(character) {
    const squadContainers = document.querySelectorAll('.squad-container');
    for (let container of squadContainers) {
        const square = container.querySelector('.squad-square');
        const collectionNumber = container.querySelector('.collection-number');
        if (!square.innerHTML) {
            square.innerHTML = `<img src="${character.image}" alt="Character Image" style="width: 100px;">`;
            collectionNumber.innerHTML = character.collectionNumber;
            updateSquadInfo(character);
            break;
        }
    }
}

let pvpBuffs = [];
let pveBuffs = [];
let bossBuffs = [];
let brBuffs = [];
let miningBuffs = [];
let passiveBuffs = [];

function updateSquadInfo(character) {
    const squadSquares = document.querySelectorAll('.squad-square img');
    const pvpInfo = document.getElementById('pvp-info');
    const pveInfo = document.getElementById('pve-info');
    const bossInfo = document.getElementById('boss-info');
    const brInfo = document.getElementById('br-info');
    const miningInfo = document.getElementById('mining-info');
    const passiveInfo = document.getElementById('passive-info');

    if (character.traits.PVP) pvpBuffs.push(character.traits.PVP);
    if (character.traits.PVE) pveBuffs.push(character.traits.PVE);
    if (character.traits['Boss Battle']) bossBuffs.push(character.traits['Boss Battle']);
    if (character.traits['Battle Royale']) brBuffs.push(character.traits['Battle Royale']);
    if (character.traits.Mining) miningBuffs.push(character.traits.Mining);
    if (character.traits.Passive) passiveBuffs.push(character.traits.Passive);
   

    pvpInfo.textContent = pvpBuffs.join(', ');
    pveInfo.textContent = pveBuffs.join(', ');
    bossInfo.textContent = bossBuffs.join(', ');
    brInfo.textContent = brBuffs.join(', ');
    miningInfo.textContent = miningBuffs.join(', ');
    passiveInfo.textContent = passiveBuffs.join(', ');
}


function searchCharactersByTrait(traitType, traitValue) {
    return characters.filter(character => {
        if (character.traits[traitType]) {
            return character.traits[traitType].includes(traitValue);
        }
        return false;
    });
}

function filterCharacters() {
    const pvpValue = document.getElementById('pvp-select').value;
    const pveValue = document.getElementById('pve-select').value;
    const bossValue = document.getElementById('boss-select').value;
    const brValue = document.getElementById('br-select').value;
    const miningValue = document.getElementById('mining-select').value;
    const passiveValue = document.getElementById('passive-select').value;

    const filteredCharacters = characters.filter(character => {
        return (!pvpValue || searchCharactersByTrait("PVP", pvpValue).includes(character)) &&
            (!pveValue || searchCharactersByTrait("PVE", pveValue).includes(character)) &&
            (!bossValue || searchCharactersByTrait("Boss Battle", bossBattleValue).includes(character)) &&
            (!brValue || searchCharactersByTrait("Battle Royale", battleRoyaleValue).includes(character)) &&
            (!miningValue || searchCharactersByTrait("Mining", miningValue).includes(character)) &&
            (!passiveValue || searchCharactersByTrait("Passive", passiveValue).includes(character))
    });

    loadCharacters(filteredCharacters);
}

// Initial load (empty at first until filters are used)
// loadCharacters([]); // Uncomment if you want to show no characters initially
