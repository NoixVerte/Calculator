const resultScreen = document.querySelector("#result-screen").firstElementChild;
const buttonsWrapper = document.querySelector("#buttons");
const buttons = document.querySelectorAll("button");
let num1 = "";
let num2 = "";
let operator = "";
resultScreen.innerText = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        switch(button.innerText) {
            case "C":
                wipeResultScreen();
                num1 = "";
                num2 = "";
                operator = "";
                break;
            case "=":
                if (num1 == "" || operator == "") break;
                num2 = resultScreen.innerText;
                resultScreen.innerText = operate();
                num1 = resultScreen.innerText;
                num2 = "";
                operator = "";
                break;
            case "+":
            case "-":
            case "x":
            case "/":
                if (resultScreen.innerText === "" && button.innerText == "-") {
                    updateResultScreen(button.innerText);
                    break;
                }
                !num1 ? num1 = resultScreen.innerText : num2 = resultScreen.innerText;
                // console.log(`resultScreen.innerText: ${resultScreen.innerText} num1: ${num1} num2: ${num2}`);
                wipeResultScreen();
                resultScreen.innerText = button.innerText;
                operator = button.innerText;
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
                if (num1 && (resultScreen.innerText == "+" || resultScreen.innerText == "-" || resultScreen.innerText == "x" || resultScreen.innerText == "/")) {
                    wipeResultScreen();
                }
                if (resultScreen.innerText.length < 12) {
                    updateResultScreen(button.innerText);
                }
                break;
        }
    })
});

function operate() {
    switch(operator) {
        case "+": return add();
        case "-": return subtract();
        case "x": return multiply();
        case "/": return divide();
    }
}

function add()  {
    let result = (parseFloat(num1) + parseFloat(num2));
    if (result == result.toFixed(0)) {
        return parseInt(result);
    }
    return parseFloat(result);
}

function subtract()  {
    return (num1 - num2);
}

function multiply() {
    return (num1 * num2);
}

function divide() {
    if (num2 === 0) {
        return  "Nope!";
    } else {
        return cleanupDecimals(num1 / num2);
    }
}

function cleanupDecimals(number){
    if (parseInt(number) ==  number) {
        return parseInt(number);
    } else {
        return number = Math.round(number * 1000) / 1000;
    } 
}

function updateResultScreen(string) {
    resultScreen.innerText += string;
}

function wipeResultScreen() {
    resultScreen.innerText = "";
}