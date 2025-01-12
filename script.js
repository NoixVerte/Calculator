const resultScreen = document.querySelector("#result-screen");
const buttonsWrapper = document.querySelector("#buttons");
const allowedValues = "1234567890+-*/=C";
let num1, operator, num2;

buttonsWrapper.addEventListener("click", (event) => {
    let target = event.target;
    if (target.innerText == "="){
        console.log(resultScreen.innerText.split(/\+,-,\*,\//));
        operate(num1, operator, num2);
    } else if(target.innerText == "C") {
        resultScreen.innerText = "";
        num1, num2, operator = undefined;
    } else if (target.parentElement.parentElement.id == "buttons") {
        resultScreen.innerText += target.innerText;
    }
})

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function add(num1, num2)  {
    return num1 + num2;
}

function subtract(num1, num2)  {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}