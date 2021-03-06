

//on start
document.getElementById('passwordForm').addEventListener('submit', function () {
    //arrays exist for each character type
    var specialArray = ['!', '(', ')', '-', '.', '?', '[', ']', '_', '`', '~', ';', ':', '@', '#', '$', '%', '^', '&', '*', '+', '='];
    var numericalArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var lowerArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var upperArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //This is an empty array to combine the chosen arrays
    var finalArray = [];
    //check user input 8 - 128
    var userNum = document.getElementById('userNumChar').value;
    if (userNum < 8 || userNum > 128) {
        //use helper function 1 to check number of characters is 8 or more
        alert('Password must be between 8 and 128 characters in length');
    } else {
        //read which character types are selected and concatenate
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
        //if none selected, prompt
        if (finalArray.length === 0) {
            alert('You have not selected any character groups. You must choose at least one group.')
        } else {
            //run main function (below, rework)
            passwordGenerator(finalArray, userNum);
        }
    }
});

function passwordGenerator(finalArray, userNum) {
    var passwordArray = [];
    //start a for loop to iterate to the number stored variable
    for (i = 0; i < userNum; i++) {
        //for each iteration, generate a random number between 1 and how many characters there are
        var bigDecimal = Math.random();
        var improvedNum = (bigDecimal * finalArray.length);
        var randomNum = Math.floor(improvedNum);
        //use that random number as a way to pull the character from the array
        var randomChar = finalArray[randomNum];
        //push that character to the empty array
        passwordArray.push(randomChar);
    }
    //concatenate the contents of that array into a string
    passwordArray = passwordArray.join('');
    //perform a check to see if first character is invalid (-/.)
    if (passwordArray.charAt(0) === '-' || passwordArray.charAt(0) === '.') {
        //if it is, send to helper function
        passwordArray = rearrangeFirstChar(passwordArray);
    }
    //display that string where the user can see it
    document.getElementById('finish').value = passwordArray;
};

//helper function to replace first character if (-/.)
function rearrangeFirstChar(passwordArray) {
    passwordArray = passwordArray.slice(1) + passwordArray.slice(0, 1);
    if (passwordArray.charAt(0) === '-' || passwordArray.charAt(0) === '.') {
        console.log('2nd loop');
        passwordArray = rearrangeFirstChar(passwordArray);
    }
    return passwordArray;
}

document.getElementById('copyButton').addEventListener('click', function() {
    var passwordToCopy = document.getElementById('finish');
    passwordToCopy.select();
    passwordToCopy.setSelectionRange(0, 127);
    document.execCommand('copy');
});


//Slider

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var passLengthField = document.getElementById('userNumChar');
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  passLengthField.value = this.value;
}