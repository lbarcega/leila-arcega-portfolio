let playerName = ""
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const inputElement = document.getElementById("text-input");

let textNodes = []

let rollResult = 0;

let state = {};

let currentNode = 1;

function startGame() {
    state = {};
    showTextNode(1);
}


function showTextNode(textNodeIndex) {
    currentNode = textNodeIndex;
    const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
    const container = document.getElementById('history');
    const warning = document.getElementById("text-warning");

    const newDiv = document.createElement('div');
    const linebreak = document.createElement('br');

    newDiv.textContent = textNode.text;
    newDiv.className = "story";

    container.appendChild(newDiv);
    container.appendChild(linebreak);

    

    while (inputElement.firstChild) {
        inputElement.removeChild(inputElement.firstChild);
    }
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.prompt.forEach((prompt) => {
        if (showOption([prompt])) {
            const input = document.createElement("input");
            const div = document.createElement("div");
            const button = document.createElement("button");
            warning.textContent = prompt.warning;
            div.textContent = prompt.text;
            div.classList="story";
            input.type = "text";
            input.id = prompt.id;
            button.innerText = "Submit";
            button.classList.add("btn");
            button.addEventListener("click", () => setName());
            button.addEventListener("click", () => showTextNode(currentNode + 1));
            inputElement.appendChild(div);
            inputElement.appendChild(input);
            inputElement.appendChild(button);
        }
    });
    textNode.options.forEach((option) => {
        if (showOption(option)) {
            if (option.text == 'None'){

            } else {
                const button = document.createElement("button");
                button.innerText = option.text;
                button.classList.add("btn");
                button.addEventListener("click", () => selectOption(option));
                optionButtonsElement.appendChild(button);
            }
        }
});
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function showPrompt(prompt) {
    return prompt.requiredState == null || prompt.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    text.style.opacity = 0;

    if (nextTextNodeId <= 0) {
        return startGame();
    }
    text.classList.remove('story');
    void text.offsetWidth;
    text.classList.add('story');
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

class Item{
    constructor(name, description, value){
        this.name = name
        this.description = description
        this.value = value
        this.pickedUp = false
    }
}

class Weapon extends Item {
    constructor(name, description, value, damage, durability){
        super(name, description,value)
        this.damage = damage
    }
}

class Pipe extends Weapon {
    constructor(name, description, value, damage, durability){
        super("Rusted Pipe", "A pipe that's more rust than steel.", 1, 5, 3)
    }
}

function setName() {
    playerName = document.getElementById('playerNameInput').value;
    updateNodes();
}

function validateForm() {
    const form = document.getElementsByClassName("form");

}

function showResponse() {
    const form = document.getElementById('firstAction');
    const selectedOption = form.elements['option'].value;
    const displayText = document.getElementById('displayText');

    displayText.style.opacity = 0;

    if (selectedOption == "search") {
        displayText.textContent = `It's dark; you can't see anything. You trip on something.`;
    } else if (selectedOption == "scream"){
        displayText.textContent = "Your voice echoes around the small room. No one answers.";
    } else {
        displayText.textContent = "Pick one, idiot.";
    }
    displayText.classList.remove('story');
    void displayText.offsetWidth;
    displayText.classList.add('story');
}
function updateNodes(){
    textNodes = [
        {
            id: 1,
            text : `You wake up in the dark. The ground is damp and cold.
                    The air smells heavily of rot and decay.
                    Every muscle in your body aches as you sit up. You don't remember how you got here.`,
            options: [
            ],
            prompt: [
                {
                    text: `What was your name?`,
                    options: [],
                    id: "playerNameInput",
                    warning: "Think! What was it?"
                }
            ]
        },
        {
            id: 2,
            text: `${playerName}... is that right? You don't know for sure.`,
            options: [
                {
                    text: `Continue`,
                    nextText: 3
                }
            ],
            prompt: [
            ]
        },
        {
            id: 3,
            text: `You try to look around; the darkness stretches endlessly.`,
            options: [
                {
                    text: `Keep looking`,
                    nextText: 4
                },
                {
                    text: `Shout for help`,
                    nextText: 5
                }
            ],
            prompt: [
                {
                    text: `question 1?`,
                    options: [],
                    id: "q1"
                },
                {
                    text: `question2 ?`,
                    options: [
                        {text:"idk",nextText:4}
                    ],
                    id: "q2"
                }
            ]
        },
        {
            id: 4,
            text: `Your eyes are getting used to the darkness. There's something in the corner.`,
            options: [
                {
                    text: `Investigate`,
                    nextText: 6
                },
                {
                    text: `Ignore it`,
                    nextText: 7
                }
            ],
            prompt: [

            ]
        },
        {
            id: 5,
            text: `Your voice bounces around the small room. No one answers`,
            options: [
                {
                    text: `Keep shouting`,
                    nextText: 8
                }
            ],
            prompt: [

            ]
        },
        {
            id: 6,
            text: `Something is watching you.`,
            options: [
                {
                    text: `Fucking run.`,
                    nextText: 1
                }
            ],
            prompt: [
            ]
        }
    ]
}

function diceRoll() {
    rollResult = Math.random() * 10;
    return rollResult;
}

updateNodes();
startGame();