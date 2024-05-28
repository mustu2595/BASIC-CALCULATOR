document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.dataset.operator);
            } else if (button.id === 'clear') {
                clearDisplay();
            } else if (button.id === 'equals') {
                calculate();
            } else if (button.id === 'decimal') {
                addDecimal();
            }
        });
    });

    function handleNumber(value) {
        if (currentInput.length >= 10) return; // Limit input length
        currentInput += value;
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function updateDisplay(value) {
        display.value = value;
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay('');
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay(currentInput);
    }

    function addDecimal() {
        if (currentInput.includes('.')) return;
        currentInput += '.';
        updateDisplay(currentInput);
    }
});
