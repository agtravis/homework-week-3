# Design and Deploy a Functioning Password Generator

[Deployed Application](https://agtravis.github.io/homework-week-3/index.html)

## Introduction

Before commencing work at all on this project, I decided to use the internet to research what other developers and established companies had in operation. I used Google, and found a few that I particularly liked either the features they had used, or the style of their generators. I bookmarked them for easy reference:

![Bookmarks](https://github.com/agtravis/homework-week-3/blob/master/assets/images/bookmarks.PNG)

Next, I did some research on password conventions. In the brief we are told to include special characters, however I wasn't sure if ALL special characters would be allowed, at least not all that are present on a standard English keyboard. When I used Googled _'password valid characters'_, the first link that came up was IBM's guidelines. IBM lists the characters they allow in their passwords, and they also have some further restrictions on allowable first characters. I decided I would incorporate this feature as well in my generator.

[IBM guidelines](https://www.ibm.com/support/knowledgecenter/SSFTN5_8.5.5/com.ibm.wbpm.imuc.doc/topics/rsec_characters.html)

## Practice & Pen & Paper

Now I knew what I wanted to achieve, I decided to at least get the JavaScript code up and running successfully, and then I could adapt it to my needs. First I would need to create a practice environment, so I made a really basic [webpage](https://github.com/agtravis/homework-week-3/blob/master/practice.html) and associated [JavaScript](https://github.com/agtravis/homework-week-3/blob/master/assets/scripts/practice.js) file. I would come back to these files to also test out new features as I discovered or researched them, so the file you see here is not how it began.

This is how my basic HTML webpage looks:

![PracticeHTML](https://github.com/agtravis/homework-week-3/blob/master/assets/images/practiceHTML.PNG)

I set one checkbox to be default checked, and the input field to have a value, for debugging purposes.

The next step was to write the pseudocode. These are left in the form of comments still in my practice.js file, because I would be referring back to them frequently. I will not be explaining the code from this file because, as well as the comments still being present, my final JavaScript associated with the final generator is slightly different, and so I will be explaining that code later on, so suffice it to say that I did not progress to the next step until my javascript code was working 100%. The CSS file, while the link is commented out in this HTML, is the same file between the practice and final HTML pages, because I would use this page to test styling and when it worked the way I wanted in one page, it would be simple to just link to the same file.

## JavaScript (Final)

Initially I had written the bulk of the code as an anonymous function that was triggered by `addEventListener` applied to a `click` event on my designated generate button. However, after including a _refresh_ button (a common feature I had seen in my research), I realized that whether generating or refreshing, fundamentally the exact same thing happens. Therefore, I contained the original code in its own function, and when a user clicks on either the _Generate_ or _Refresh_ buttons, that function is called.

## Gathering the User's Input

### Arrays Established

The function starts by defining 5 arrays. Arrays 1-4 are my defined arrays of character sets that I have written (special characters as set out by IBM), and the 5th is an empty array that will be filled with the characters randomly picked by my code.

### Controlling Number of Characters

Originally I had intended for the user to enter how many characters long they wanted their password to be. The brief states that the user is restricted by their choice to be between 8 and 128 characters. In order to perform that check, I would include the following code:

    if (userNum < 8 || userNum > 128) {
        alert('Password must be between 8 and 128 characters in length');
    }

However, most of the websites I encountered in my research utilized a slider in lieu of an input field with constraints. I did have to research how to implement and style a slider, and managed to add this feature to my web-application successfully. Here is the JavaScript code for the slider:

    var slider = document.getElementById('myRange');
    var output = document.getElementById('slide-length');
    output.innerHTML = slider.value;

The above code first sets a variable to store the actual slider, and second sets a variable to store the location that I intend to hold the output (how many characters). Lastly, the output element is set to display (via `innerHTML`) the value the slider is at - this value is hard coded in the HTML as the default, and also minimum amount - 8 characters. At this point, The generator will work but only being ever able to generate 8 characters. In order to make it dynamic, the following anonymous function block is set up:

    slider.oninput = function () {
        output.innerHTML = this.value;
    }

to run every time the user interacts with the slider. This dynamically changes the output element to the users choice, and then my main function accesses this setting with this line:

    var userNum = document.getElementById('slide-length').innerHTML;

when the _Generate_ button is clicked.

There were two features of a slider I tried to implement, but could not in the time-frame.

1. Some generators I observed were able to display the length actually on the slider handle. I thought this looked good, but was not essential, so I moved on.
1. Other generators did not have a button at all, or if they included one it was somewhat redundant because the password was generated upon the release of the slider. I had some success with this, but not enough to not be buggy, so again I left it behind.

### Character Selection.

This was actually pretty simple. I have written a series of `if` statements. Each one has a condition to see if a targeted element (a check box) is checked. The format is as follows:

    if (document.getElementById('specialChar').checked) {
        finalArray = finalArray.concat(specialArray);
    }

If the box is checked then the empty array has the appropriate set of characters added to it, using `concat([arrayName])`. For each additional time a box is checked, another array is added to the `finalArray`.

Using the `DRY - Don't Repeat Yourself!` principle, this code is a little repetitive. In order to account for this, what I could do is create a `for` loop, and combine all my character array sets into one array containing the arrays. I would also have to put all my check-box elements accessed with `getElementById` in another array (which I could do using the DOM). Then the iterator would cycle through the elements inspecting to see if they were checked, and assigning the appropriate array to the element, and `push`ing that to the `finalArray` instead. Or, perhaps, I could use an array of objects where the properties are the `getElementById` and the array. Either way, I decided that there is only 4 choices, and not likely to be any more that would necessitate such dynamic code, so I would stick with my simple (and already functioning perfectly) `if` statements.

I have (in the HTML) hard coded one of these checkboxes to be checked already, because if none are selected, the password has no characters to be accessed. However, should the user uncheck that default box and forget to check another, I use the following code to evaluate:

    if (finalArray.length === 0) {
        alert('You have not selected any character groups. You must choose at least one group.')
    } else {
        passwordGenerator(finalArray, userNum);
    }

What this says is that if the length of the array is ZERO then no concatenations have happened, and therefore the user has not checked ANY boxes. If this is the case, there is an alert to the user's attention of this, and the function simply ends. This `if` statement has an `else` accompanying it however, and here I have a function call which will pass two arguments, the `finalArray` as selected by the user, and the `userNum` variable, as selected by the user with the slider.

## Generating the Password

This function has two parameters passed to it from the function call, `finalArray` - the complete set of characters from which the password will be generated - and `userNum` - the user designated length of the password.

The function starts by establishing and empty array that will hold the characters of the password.

First, a `for` loop runs. the condition is that it will run as long as the iterator is less than `userNum`, I.E. the password array has the right amount of characters in it.

A random number is generated:

    var randomNum = Math.floor(Math.random() * finalArray.length);

where `finalArray.length` is the amount of characters in the array based upon the user's selection. This number will be able to be assigned to any character in that array, from the zero index to the last index. Next that number is used as a `sub` to access the aligning character:

    var randomChar = finalArray[randomNum];

and then that character is added to the _end_ of that array using `push`:

    passwordArray.push(randomChar);

The array is now converted into a string, using `join('')`, which will delimit each character in the string with nothing.

At this point, the password could be considered complete, at least by the specifications set out in the brief, however, I wanted to follow the guidelines further set out by IBM, to ensure the password didn't start with either a '-' or a '.'. These characters are valid, just not as a first character.

## Validating the Password

Still operating within the _passwordGenerator_ function, once the string has been formed a conditional `if` statement runs. The condition:

    if (passwordArray.charAt(0) === '-' || passwordArray.charAt(0) === '.') {

is straightforward, and just checks to see if the `charAt` index of zero in the string is one of those invalid characters. If it is, the following code runs:

        passwordArray = rearrangeFirstChar(passwordArray);

What this line means is that the password is set to the value that is returned by a function where the password itself is sent as an argument to the function being called. This function is a recursive function, and so nothing will be returned at all until the recursive function breaks out of its own loop.

## Recursive Function

I have written this function because the user may end up with one of those characters first twice in a row, or more times. The user could simply click generate again, until this wasn't the case, but that is more effort on the user's part (and the user may also not be aware of this constraint - and there is no need for them to know if I can code around it). Here is the function in whole:

    function rearrangeFirstChar(passwordArray) {
        passwordArray = passwordArray.slice(1) + passwordArray.slice(0, 1);
        if (passwordArray.charAt(0) === '-' || passwordArray.charAt(0) === '.') {
            passwordArray = rearrangeFirstChar(passwordArray);
        }
        return passwordArray;
    }

This took me a long time to figure out, but the explanation now it works is fairly simple. First the function takes the password (passed as a parameter from the function call), and cuts it in to two pieces - the first character by itself and then the second character through the end of the rest of the string. It then concates these two parts, but in switched order - fundamentally the first character of the string is put at the end of the string instead.

Then the function checks the condition again, the same condition that led to the function being called in the first place. If it fails that condition again, the function calls itself, again passing the password as an argument. It will keep doing this until the password no longer has an invalid character at the zero index, and at that point the password is returned to the original call, back inside the function that called it, which still has not completed at this point.

Before going back to that function in this explanation, I should point out that this is still not a perfect system. If the password that is generated contains nothing but the two invalid characters, then the call stack will get stuck in an infinite loop and become non-responsive. However, the greatest chances of this happening occur when the user ONLY selects special characters and has the shortest possible password. I was able to engineer this condition, but only by clicking generate hundreds of times (which I did). In theory this COULD happen with any user selections, even at 128 characters and all character sets selected, no matter how astronomical the odds. If I truly wanted to eliminate this I could remove the array as a choice, or remove the offending elements from the array. I could also have a precheck function that would ensure a password array did not contain _exclusively_ those elements before being passed back to the user, and perhaps I would code that if either the brief specified it or this was a professional project for which I had been hired to create, but for now I am content with the odds ensuring success.

## Giving the User the Password

Finally, in the _passwordGenerator_ function again, once the password is valid, it is passed to the web app by getting an element by its ID and assigning it to its `value`. It is value rather than `innerHTML` because it is being displayed in an `<input>` field, not a `<p>` element or anything else. I initially wanted to display it as a `<p>`, but I ran into too many difficulties in displaying the password when it was long and not mishaping my `<div>` boundaries or affecting my CSS stylings. I did try running some JavaScript code:

    if (userNum > 20 && userNum < 44) {
        document.getElementById('the-password').style.fontSize = '1em';
    }
    if (userNum > 45 && userNum < 89) {
        document.getElementById('the-password').style.fontSize = '0.5em';
    }
    if (userNum > 90) {
        document.getElementById('the-password').style.fontSize = '0.3em';
    }

that would change the font-size based on password length so it would fit, but it never fit, and it never wrapped attractively, and the tiny font size looked ridiculous anyway, so I stuck with the `<input>` method.

## Copy to Clipboard

This was another part I did a fair amount of research on. Most places I looked had this code, or similar, to copy to the clipboard:

    document.getElementById('copyButton').addEventListener('click', function() {
        var passwordToCopy = document.getElementById('the-password');
        passwordToCopy.select();
        passwordToCopy.setSelectionRange(0, 128);
        document.execCommand('copy');
    });

What this does is it listens for a click on the button I have designated _copy_, and when that happens it stores the relevent HTML element as a variable, then uses the `select()` method on that element to move the cursor to it, then the `setSelectionRange` to highlight as much as needed (128 characters max). Finally it uses the `execCommand('copy')` method to copy it to the clipboard.

I did not like how this operated - it looked scruffy:

![uglypassword](https://github.com/agtravis/homework-week-3/blob/master/assets/images/uglypassword.PNG)

The highlighting of the password is bearable, but the selection lines that outline the `input` are unsightly.

I found another method that uses the DOM:

    document.getElementById('copyButton').addEventListener('click', function () {
        var tempNode = document.createElement('input');
        tempNode.setAttribute('value', document.getElementById('the-password').value);
        document.body.appendChild(tempNode);
        tempNode.select();
        tempNode.setSelectionRange(0, 128);
        document.execCommand('copy');
        document.body.removeChild(tempNode);
    });

This time the function basically creates a new node, sets the node's value to the password, appends the node to the body of the webpage, THEN it copies the code tot he clipboard with the same code as above, then it deletes the node. If the user could see as fast as the computer can process, or if they were using the developer tools for some obscure reason (perhaps reading my code!), then they would be able to see it, but seeing as this probably happens faster than the computer screen refresh rate, it's going to be missed by human eyes. The benefit of this method is that nothing visible is ever highlighted by the cursor, thus:

![prettypassword](https://github.com/agtravis/homework-week-3/blob/master/assets/images/prettypassword.PNG)

The only downside to this is that it would be nice to have some form of notification that the user had been successful in copying to the clipboard. I could write an alert, but I don't like the standard alerts - a little mouse hover box displaying a message (like a `title` attribute of an image) would be nice, but I didn't research or implement that here. The user will know if it worked by attempting to paste anywhere, like the URL bar for example. I stopped short of providing them a field to test it in.

## Bootstrap & CSS

I heavily used Bootstrap's grid system in making my app responsive. I used columns inside of rows inside of colums inside of rows multiple times. I did not use any other features from Bootstrap.

There are some CSS properties and selectors of what I have a basic idea of what they mean, but don't know the technical aspects. These are from when I copied code from my research.

Specifically:

1. Anything involving the word `webkit`. I know this is to do with cross browser compatibility, and so I have left it in. I used Chrome, and I know the course guidelines suggest using Chrome, but backwards compatibility with Internet Explorer or Safari is essential in a lot of the professional world, so this will be a concept I will study later
1. `moz` Again I assume this is for compatibility, but how exactly remains to be seen.
1. My custom check boxes - I understand how to affect the change I want to my CSS code, and I did edit color and position of many elements, but could I write this code from scratch? Absolutely not. However I understand it enough in the context of my code, and it functions perfectly. Should I need to use it again, I could come back and take it from here and edit it as needed.

## Future Endeavors

I have already mentioned a few things that I would implement in future:

1. A slider control that displays the length directly on it
1. An 'on release' of the slider generate of a password
1. Advanced code to remove the repetition of the conditional statements concatenating the arrays
1. Advanced code removing ALL possibility of a password containing exclusively invalid characters

In addition to this I could also bring in a color bar that would go from red through orange to shades of green and/or increase in length to display how strong the users password might be. I decided against this, mainly because of time constraints and necessity, but also because most sites that require passwords usually are equipped with this feature themselves.

Also, if this was for a professional brief, I would spent more time on the CSS and design aspect. The project brief does not require this level of attention to design, so I spent most of my time on the JavaScript.

A key design aspect I could not implement in the time-frame was involving my custom check boxes - I would like the whole `<div>` containing the check box to be able to be clicked on. As it stands, exclusively the check box itself must be clicked on.
