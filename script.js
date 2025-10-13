const input = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
const toggleBtn = document.querySelector('.toggle-btn');
const toggleIcon = document.querySelector('.toggle-icon');
const toggleText = document.querySelector('.toggle-text');
const body = document.body;

let mode = 'light';

// Dark mode toggle functionality
toggleBtn.addEventListener('click', () => {
    if (mode === 'light') {
        body.classList.add('dark-mode');
        mode = 'dark';
        toggleIcon.textContent = '☀️';
        toggleText.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        mode = 'light';
        toggleIcon.textContent = '🌙';
        toggleText.textContent = 'Dark Mode'; // Fixed: Capital "M"
    }
    
    // Save preference to localStorage
    localStorage.setItem('mode', mode);
});

// Check for saved mode preference
window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
        mode = 'dark';
        toggleIcon.textContent = '☀️';
        toggleText.textContent = 'Light Mode';
    }
});

// Conversion functionality
convertBtn.addEventListener('click', convertNumber);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertNumber();
    }
});

function convertNumber() {
    let str_number = input.value.trim();
    output.className = 'output';

    if (str_number === "") {
        showError("Please enter a valid number");
        return;
    }

    let number = parseInt(str_number);

    if (isNaN(number)) {
        showError("Please enter a valid number");
        return;
    }

    if (number > 3999) {
        showError("Please enter a number less than or equal to 3999");
        return;
    }

    if (number <= 0) {
        showError("Please enter a number greater than or equal to 1");
        return;
    }

    const romanNumeral = convertToRoman(number);
    showResult(romanNumeral);
}

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = '';

    for (const { value, numeral } of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }

    return result;
}

function showError(message) {
    output.innerHTML = `<b>${message}</b>`;
    output.classList.add('error');
}

function showResult(romanNumeral) {
    output.innerHTML = `<b>${romanNumeral}</b>`;
    output.classList.add('success');
    
    // Add animation effect
    output.style.transform = 'scale(1.05)';
    setTimeout(() => {
        output.style.transform = 'scale(1)';
    }, 200);
}
