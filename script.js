const resultScreen = document.querySelector("#result-screen").firstElementChild;
const page = document.querySelector("body");
const buttons = document.querySelectorAll("button");
let num1 = "";
let num2 = "";
let operator = "";
resultScreen.innerText = "";


buttons.forEach(button => {
    button.addEventListener("click", handleButtonPress);
});

page.addEventListener("keydown", handleButtonPress);

function handleButtonPress(event) {
    const input = event.key || this.innerText;
    console.log(`${num1}${operator}${num2}`);
    console.log(`${event.key}`);
    switch(String(input)) {
        case "C":
        case "c":
            wipeResultScreen();
            flushVariables();
            break;
        case "=":
        case "Enter":
            event.preventDefault();
            if (num1 !== "" && operator !== "" && (parseFloat(resultScreen.innerText) || parseFloat(resultScreen.innerText) === 0)) {
                num2 = assignNumber(resultScreen.innerText);
                resultScreen.innerText = operate();
                flushVariables();
                break;
            }
            break;
        case "+/-":
            if (parseFloat(resultScreen.innerText) < 0) {
                resultScreen.innerText = Math.abs(resultScreen.innerText);
            } else if (parseFloat(resultScreen.innerText) > 0){
                resultScreen.innerText = -Math.abs(resultScreen.innerText);
            }
            break;
        case "<─":
        case "Backspace":
            if (parseFloat(resultScreen.innerText) || parseFloat(resultScreen.innerText) === 0) {
                if (resultScreen.innerText.length > 0) {
                    resultScreen.innerText = resultScreen.innerText.slice(0,-1);
                }
            }
            break;
        case ".":
            if (!resultScreen.innerText.includes(".")) {
                if (resultScreen.innerText === "") {
                    resultScreen.innerText = "0.";
                } else if (parseFloat(resultScreen.innerText) || parseFloat(resultScreen.innerText) === 0) {
                    updateResultScreen(event.key || this.innerText);
                }
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if (parseFloat(resultScreen.innerText) || parseFloat(resultScreen.innerText) === 0) {
                if (num1 === "") {
                    num1 = assignNumber(resultScreen.innerText);
                    wipeResultScreen();
                    resultScreen.innerText = event.key || this.innerText;
                } else if (num2 === "") {
                    num2 = assignNumber(resultScreen.innerText);
                    resultScreen.innerText = operate();
                    flushVariables();
                    num1 = assignNumber(resultScreen.innerText);
                    wipeResultScreen();
                    resultScreen.innerText = event.key || this.innerText;
                }
            }
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":       
            if (resultScreen.innerText === "Nope!") wipeResultScreen();
            if (num1 !== "" && (resultScreen.innerText == "+" || resultScreen.innerText == "-" || resultScreen.innerText == "*" || resultScreen.innerText == "/")) {
                assignOperator(resultScreen.innerText);
                wipeResultScreen();
            }
            if (resultScreen.innerText.length < 12) {
                if (resultScreen.innerText === "0") {
                    resultScreen.innerText = event.key || this.innerText;
                } else  {
                    updateResultScreen(event.key || this.innerText);
                }
            }
            break;
    }
}

function operate() {
    switch(operator) {
        case "+": return add();
        case "-": return subtract();
        case "*": return multiply();
        case "/": return divide();
    }
}

function add()  {
    return cleanupDecimals(num1 + num2);
}

function subtract()  {
    return cleanupDecimals(num1 - num2);
}

function multiply() {
    return cleanupDecimals(num1 * num2);
}

function divide() {
    if (num2 === 0) {
        return  "Nope!";
    } else {
        return cleanupDecimals(num1 / num2);
    }
}

function cleanupDecimals(cleanedNumber){
    if (parseInt(cleanedNumber) ==  cleanedNumber) {
        return parseInt(cleanedNumber);
    } else {
        return Math.round(parseFloat(cleanedNumber) * 1000) / 1000;
    } 
}

function updateResultScreen(string) {
    resultScreen.innerText += string;
}

function wipeResultScreen() {
    resultScreen.innerText = "";
}

function assignNumber(assignedNumber) {
    if (assignedNumber !== "") return cleanupDecimals(assignedNumber);
    else console.log("ERROR while assigning number");
}

function assignOperator(assignedOperator) {
    operator = assignedOperator;
}

function flushVariables() {
    num1 = "";
    num2 = "";
    operator = "";
}