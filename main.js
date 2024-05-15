const previousNumber = document.querySelector('.previousNumber p');
const currentNumber = document.querySelector('.currentNumber');
const mathSign = document.querySelector('.mathSign');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number p');
const negationButton = document.querySelector('.negation');
const precentButton = document.querySelector('.percent');
const historyBtn = document.querySelector('.history-btn');
const calculatorHistory = document.querySelector('.history');
let result = '';

// function isNumber(value) {
// 	return typeof value === 'number';
// }
function displayNumbers() {
	if (currentNumber.innerHTML === 'Error') currentNumber.innerHTML = '';
	if (this.innerHTML === '.' && currentNumber.innerHTML.includes('.')) return;
	if (this.innerHTML === '.' && currentNumber.innerHTML === '')
		return (currentNumber.innerHTML = '0.');
	currentNumber.innerHTML += this.innerHTML;
}
function operate() {
	if (currentNumber.innerHTML === 'Error') return;
	if (currentNumber.innerHTML === '' && this.innerHTML === '-') {
		currentNumber.innerHTML = '-';
		return;
	} else if (
		currentNumber.innerHTML === '' ||
		currentNumber.innerHTML === '-'
	) {
		return;
	}

	if (mathSign.innerHTML !== '') {
		showResult();
	}
	previousNumber.innerHTML = currentNumber.innerHTML;
	mathSign.innerHTML = this.innerHTML;
	currentNumber.innerHTML = '';
}
function showResult() {
	if (currentNumber.innerHTML === 'Error') return;
	if ((previousNumber.innerHTML === '') | (currentNumber.innerHTML === ''))
		return;
	let a = Number(previousNumber.innerHTML);
	let b = Number(currentNumber.innerHTML);
	if (mathSign.innerHTML === '/' && b === 0) {
		currentNumber.innerHTML = 'Error';
		return;
	}
	switch (mathSign.innerHTML) {
		case '+':
			result = a + b;
			break;
		case '-':
			result = a - b;
			break;
		case 'x':
			result = a * b;
			break;
		case '/':
			result = a / b;
			break;
	}
	addToHistory();
	historyBtn.classList.add('active');
	previousNumber.innerHTML = '';
	mathSign.innerHTML = '';
	currentNumber.innerHTML = result;
}
function negation() {
	if (currentNumber.innerHTML !== '') {
		const number = parseFloat(currentNumber.innerHTML);
		currentNumber.innerHTML = -number;
	}
}
function percent() {
	if (currentNumber.innerHTML !== '') {
		currentNumber.innerHTML = parseFloat(currentNumber.innerHTML / 100);
	}
}
function clearScreen() {
	result = '';
	currentNumber.innerHTML = '';
	mathSign.innerHTML = '';
	previousNumber.innerHTML = '';
}
function addToHistory() {
	const newHistoryItem = document.createElement('li');
	newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`;
	newHistoryItem.classList.add('history-item');
	calculatorHistory.appendChild(newHistoryItem);
}
function clearHistory() {
	historyBtn.classList.remove('active');
	calculatorHistory.innerHTML = '';
}

operatorsButtons.forEach((button) => button.addEventListener('click', operate));
numberButtons.forEach((button) =>
	button.addEventListener('click', displayNumbers)
);
equalsButton.addEventListener('click', showResult);
clearButton.addEventListener('click', clearScreen);
negationButton.addEventListener('click', negation);
precentButton.addEventListener('click', percent);
historyBtn.addEventListener('click', clearHistory);
