document.getElementById('genButton').addEventListener('click', function () {
    start();
});
document.getElementById('refreshButton').addEventListener('click', function () {
    start();
});

function start() {
    var specialArray = ['!', '(', ')', '-', '.', '?', '[', ']', '_', '`', '~', ';', ':', '@', '#', '$', '%', '^', '&', '*', '+', '='];
    var numericalArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var lowerArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var upperArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var finalArray = [];
    var userNum = document.getElementById('slide-length').innerHTML;
    if (document.getElementById('specialChar').checked) {
        finalArray = finalArray.concat(specialArray);
    }
    if (document.getElementById('numericalChar').checked) {
        finalArray = finalArray.concat(numericalArray);
    }
    if (document.getElementById('lowerChar').checked) {
        finalArray = finalArray.concat(lowerArray);
    }
    if (document.getElementById('upperChar').checked) {
        finalArray = finalArray.concat(upperArray);
    }
    if (finalArray.length === 0) {
        alert('You have not selected any character groups. You must choose at least one group.')
    } else {
        passwordGenerator(finalArray, userNum);
    }
};

function passwordGenerator(finalArray, userNum) {
    var passwordArray = [];
    for (i = 0; i < userNum; i++) {
        var randomNum = Math.floor(Math.random() * finalArray.length);
        var randomChar = finalArray[randomNum];
        passwordArray.push(randomChar);
    }
    passwordArray = passwordArray.join('');
    if (passwordArray.charAt(0) === '-' || passwordArray.charAt(0) === '.') {
        passwordArray = rearrangeFirstChar(passwordArray);
    }
    document.getElementById('the-password').value = passwordArray;
};

function rearrangeFirstChar(passwordArray) {
    passwordArray = passwordArray.slice(1) + passwordArray.slice(0, 1);
    if (passwordArray.charAt(0) === '-' || passwordArray.charAt(0) === '.') {
        passwordArray = rearrangeFirstChar(passwordArray);
    }
    return passwordArray;
}

document.getElementById('copyButton').addEventListener('click', function () {
    var tempNode = document.createElement('input');
    tempNode.setAttribute('value', document.getElementById('the-password').value);
    document.body.appendChild(tempNode);
    tempNode.select();
    tempNode.setSelectionRange(0, 128);
    document.execCommand('copy');
    document.body.removeChild(tempNode);
});

var slider = document.getElementById('myRange');
var output = document.getElementById('slide-length');
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
}