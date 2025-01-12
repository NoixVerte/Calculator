const resultScreen = document.querySelector("#result-screen");
const buttonsWrapper = document.querySelector("#buttons");
let array;
let operator;

buttonsWrapper.addEventListener("click", (event) => {
    let target = event.target;
    switch (target.innerText) {
        case "=":
            operator = String(resultScreen.innerText.match(/(?<=\d)[+\-x/]/));
            array = resultScreen.innerText.split(/(?<=\d)[+\-x/]/);
            resultScreen.innerText = operate(array[0], operator, array[1]);
            break;
        case "C":
            resultScreen.innerText = "";
            array = [];
            break;
        case "+":
        case "-":
        case "x":
        case "/":
            if (checkIfOperatorAllowed()){
                resultScreen.innerText += target.innerText;
            }
            break;
        default:
            if (target.parentElement.parentElement.id == "buttons") {
                resultScreen.innerText += target.innerText;
            }
    }
})

function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseInt(num2);
    if (operator === "null" || isNaN(num1) || isNaN(num2))  {
        return resultScreen.innerText;
    }
    console.log(num1, operator, num2);
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.log("ERROR");
    }
}

function add(num1, num2)  {
    return (num1 + num2);
}

function subtract(num1, num2)  {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
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
        let amountOfDecimals = 4;
        return number.toFixed(amountOfDecimals);
    } 
}

function checkIfOperatorAllowed() {
    if (resultScreen.innerText == ""  || 
        resultScreen.innerText.endsWith("+") || 
        resultScreen.innerText.endsWith("-") || 
        resultScreen.innerText.endsWith("x") || 
        resultScreen.innerText.endsWith("/")) {
            return false;
    } else return true;
}