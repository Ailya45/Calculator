let num1 = 0;
let num2 = 0;
let operator = "";
let result = 0;
const display = document.getElementById("display");
display.value = "";

let limpiarDisplay = false;
let equalsDisplay = false;

function suma(num1, num2) {
    return num1 + num2;
}

function resta(num1, num2) {
    return num1 - num2;
}

function multiplicacion(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    if (num2 === 0) {
        return "Error: Division by zero";
    }
    return num1 / num2;
}

function operate(num1, num2, operator) {
    if (operator === "+") {
        result = suma(num1, num2);
    } else if (operator === "-") {
        result = resta(num1, num2);
    } else if (operator === "*") {
        result = multiplicacion(num1, num2);
    } else if (operator === "/") {
        result = division(num1, num2);
        if (result === "Error: Division by zero") {
            return result;
        }
    }
    return parseFloat(result.toFixed(10));
}

function operatorClick(op) {
    if (limpiarDisplay) {
        operator = op;
        return;
    }
    if (operator !== "") {
        num2 = Number(display.value);
        result = operate(num1, num2, operator);
        display.value = result;
        num1 = result;
    } else {
        num1 = Number(display.value);
    }
    operator = op;
    limpiarDisplay = true;
}

function updateDisplay(value) {
    if (limpiarDisplay) {
        display.value = value;
        limpiarDisplay = false;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
    num1 = 0;
    num2 = 0;
    operator = "";
    result = 0;
    limpiarDisplay = false;
    equalsDisplay = false;
}

function retroceder() {
    if (typeof display.value === "string") {
        display.value = "";
    } else if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    } else if (display.value.length === 0) {
        display.value = "0";
    }
}

function puntoClick(punto) {
    if (display.value.includes(punto)) {
        return;
    }
    if (limpiarDisplay) {
        display.value = "0" + punto;
        limpiarDisplay = false;
    } else {
        display.value += punto;
    }
}

function resultClick() {
    num2 = Number(display.value);
    if (operator === "") {
        display.value = "Error: No operation";
    } else if (isNaN(num1) || isNaN(num2)) {
        display.value = "Error: Invalid number";
    } else {
        result = operate(num1, num2, operator);
        display.value = result;
        equalsDisplay = true;
    }
}

const buttons = document.querySelectorAll("button");
const punto = document.querySelector(".numberDot");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (equalsDisplay) {
            if (button.classList.contains("number") || button.classList.contains("operator")) {
                clearDisplay();
            }
            equalsDisplay = false;
        } else if (button.classList.contains("number")) {
            updateDisplay(button.textContent);
        } else if (button.classList.contains("operator")) {
            operatorClick(button.textContent);
        } else if (button.classList.contains("AC")) {
            clearDisplay();
        } else if (button.classList.contains("retro")) {
            retroceder();
        }
    })
})

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (equalsDisplay) {
        if (key >= "0" && key <= "9" || key === "+" || key === "-" || key === "*" || key === "/") {
            clearDisplay();
        }
    } else if (key >= "0" && key <= "9") {
        updateDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        operatorClick(key);
    } else if (key === ".") {
        puntoClick(key);
    } else if (key === "Enter") {
        event.preventDefault();
        resultClick();
    } else if (key === "Backspace") {
        retroceder();
    } else if (key === "Escape") {
        clearDisplay();
    }
})

punto.addEventListener("click", () => {
    puntoClick(punto.textContent);
})

const resultButton = document.querySelector(".operator-eq");
resultButton.addEventListener("click", () => {
    resultClick();
})

