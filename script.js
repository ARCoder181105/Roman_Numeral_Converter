const input = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

convertBtn.addEventListener('click', () => {
    let str_number = input.value;

    if (str_number === "") {
        output.innerHTML = "<b>Please enter a valid number</b>";
        return;
    }

    let number = parseInt(str_number);

    if (isNaN(number)) {
        output.innerHTML = "<b>Please enter a valid number</b>";
        return;
    }

    if (number > 3999) {
        output.innerHTML = "<b>Please enter a number less than or equal to 3999</b>";
        return;
    }

    if(number<=0){
        output.innerHTML = "<b>Please enter a number greater than or equal to 1</b>"
        return;
    }

    const dataSet = {
        1000: "M",
        900: "CM",
        500: "D",
        400: "CD",
        100: "C",
        90: "XC",
        50: "L",
        40: "XL",
        10: "X",
        9: "IX",
        5: "V",
        4: "IV",
        1: "I"
    };

    let ans = "";

    while (number > 0) {
        let maxKey = 0;

        for (let key in dataSet) {
            let numKey = parseInt(key);
            if (numKey <= number && numKey > maxKey) {
                maxKey = numKey;
            }
        }

        number -= maxKey;
        ans += dataSet[maxKey];
    }

    output.innerHTML = `<b>${ans}</b>`; 
});
