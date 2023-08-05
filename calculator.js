function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if(operator === '+') {
        return add(num1, num2);
    }else if(operator === '-') {
        return subtract(num1, num2);
    }else if(operator === 'X') {
        return multiply(num1, num2);
    }else{
        return divide(num1, num2);
    }
}

let num1;
let operator;
let num2;
let previous;
let result;
let previousButton;
let displayValue = '';
let display = document.querySelector('.display');
display.textContent = '0';

const clear = document.querySelector('.clear');
clear.addEventListener('click', e => {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    previous = undefined;
    result = undefined;
    displayValue = '';
    display.textContent = '0';
    previousButton = clear;
});

const equals = document.querySelector('.equals');
equals.addEventListener('click', e => {
    if(operator !== undefined) {
        num2 = Number(display.textContent);
        result  = operate(operator, num1, num2);

        if(result.toString().length > 6) {
            const parts = result.toString().split('.');
            let wholeDigits = parts[0].length;
            result = Math.round(result * Math.pow(10, 5 - wholeDigits)) / Math.pow(10, 5 - wholeDigits);
        }

        displayValue = result;
        display.textContent = result;
        previous = result;
        previousButton = equals;
    }
});

const nums = document.querySelectorAll('#num');
nums.forEach(num => num.addEventListener( 'click', e => {
    if(previousButton === equals) {
        clear.click();
    }

    if(previousButton === operation) {
        displayValue = '';
        display.textContent = displayValue;
    }

    if(display.textContent === '0') {
        display.textContent = '';
        displayValue = '';
    }

    if(displayValue.length < 6) {
        displayValue += num.textContent;
        display.textContent = displayValue;
    }    

    previousButton = num;
}));

const operation = document.querySelectorAll('#operator');
operation.forEach(button => button.addEventListener('click', e => {
    if(previous !== undefined && previousButton !== equals){
        equals.click();
        num1 = previous;
        operator = button.textContent;
        previousButton = operation;
    }else{
        num1 = Number(displayValue);
        previous = num1;
        operator = button.textContent;
        previousButton = operation;
    }
}));




