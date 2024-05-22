const resultBox = document.getElementById('result-box');

let displayResult = "";
let beforeOperand = 0;
let currentOperand = null;
let currentOperator = null;

const buttons = document.querySelectorAll('#keyboard-box .item');
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const dataId = e.target.getAttribute('data-id');
        if (dataId === "_") { // next feature: (), %, +/-, 
            return;
        }

        const isNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(dataId);
        const isOperator = ["+", "-", "x", ":"].includes(dataId);

        if (dataId === "clear") {
            _clearBoard();
        } else if (dataId === "=") {
            _calculate();
        } else if (isNumber) {
            if (currentOperand === null) {
                currentOperand = Number(dataId);
            } else {
                currentOperand = currentOperand * 10 + Number(dataId);
            }

            displayResult += dataId;
            resultBox.textContent = displayResult;
        } else if (isOperator) {
            if (currentOperator === null) {
                currentOperator = dataId;
                beforeOperand = currentOperand;
                currentOperand = null;

                displayResult += " " + dataId;
            }
            resultBox.textContent = displayResult;
        }
        
    });
});

function _clearBoard() {
    beforeOperand = 0;
    currentOperand = null;
    currentOperator = null;
    displayResult = "";
    resultBox.textContent = "0";
}

function _calculate() {
    console.log(beforeOperand, currentOperand, currentOperator);
    if (!currentOperand || !currentOperator) {
        return;
    }
    switch (currentOperator) {
        case "+":
            beforeOperand = beforeOperand + currentOperand;
            break;
        case "-":
            beforeOperand = beforeOperand - currentOperand;
            break;
        case "x":
            beforeOperand = beforeOperand * currentOperand;
            break;
        case ":":
            beforeOperand = beforeOperand / currentOperand;
            beforeOperand = parseFloat(beforeOperand.toFixed(2));
            break;
    }

    currentOperand = beforeOperand;
    beforeOperand = 0;
    currentOperator = null;
    displayResult = currentOperand;

    resultBox.textContent = displayResult;
}