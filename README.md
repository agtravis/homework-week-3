# Design and Deploy a Functioning Password Generator

## Introduction

Before commencing work at all on this project, I decided to use the internet to research what other developers and established companies had in operation. I used Google, and found a few that I particularly liked either the features they had used, or the style of their generators. I bookmarked them for easy reference:

![Bookmarks](https://github.com/agtravis/homework-week-1/blob/master/assets/images/bookmarks.PNG)

Next, I did some research on password conventions. In the brief we are told to include special characters, however I wasn't sure if ALL special characters would be allowed, at least not all that are present on a standard English keyboard. When I used Googled *'password valid characters'*, the first link that came up was IBM's guidelines. IBM lists the characters they allow in their passwords, and they also have some further restrictions on allowable first characters. I decided I would incorporate this feature as well in my generator.

[IBM guidelines](https://www.ibm.com/support/knowledgecenter/SSFTN5_8.5.5/com.ibm.wbpm.imuc.doc/topics/rsec_characters.html)

## Practice & Pen & Paper

Now I knew what I wanted to achieve, I decided to at least get the JavaScript code up and running successfully, and then I could adapt it to my needs. First I would need to create a practice environment, so I made a really basic [webpage](https://github.com/agtravis/homework-week-3/blob/master/practice.html) and associated [JavaScript](https://github.com/agtravis/homework-week-3/blob/master/assets/scripts/practice.js) file. I would come back to these files to also test out new features as I discovered or researched them, so the file you see here is not how it began.

This is how my basic HTML webpage looks:

![PracticeHTML](https://github.com/agtravis/homework-week-1/blob/master/assets/images/practiceHTML.PNG)

I set one checkbox to be default checked, and the input field to have a value, for debugging purposes.

The next step was to write the pseudocode. These are left in the form of comments still in my practice.js file, because I would be referring back to them frequently. I will not be explaining the code from this file because, as well as the comments still being present, my final JavaScript associated with the final generator is slightly different, and so I will be explaining that code later on, so suffice it to say that I did not progress to the next step until my javascript code was working 100%. The CSS file, while the link is commented out in this HTML, is the same file between the practice and final HTML pages, because I would use this page to test styling and when it worked the way I wanted in one page, it would be simple to just link to the same file.

## JavaScript (Final)

Initially I had written the bulk of the code as an anonymous function that was triggered by ```addEventListener``` applied to a ```click``` event on my designated generate button. However, after including a *refresh* button (a common feature I had seen in my research), I realized that whether generating or refreshing, fundamentally the exact same thing happens. Therefore, I contained the original code in its own function, and when a user clicks on either the *Generate* or *Refresh* buttons, that function is called.

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

The above code first sets a variable to store the actual slider, and second sets a variable to store the location that I intend to hold the output (how many characters). Lastly, the output element is set to display (via ```innerHTML```) the value the slider is at - this value is hard coded in the HTML as the default, and also minimum amount - 8 characters. At this point, The generator will work but only being ever able to generate 8 characters. In order to make it dynamic, the following anonymous function block is set up:

    slider.oninput = function () {
        output.innerHTML = this.value;
    }

to run every time the user interacts with the slider. This dynamically changes the output element to the users choice, and then my main function accesses this setting with this line:

    var userNum = document.getElementById('slide-length').innerHTML;

when the *Generate* button is clicked.

There were two features of a slider I tried to implement, but could not in the time-frame.
1. Some generators I observed were able to display the length actually on the slider handle. I thought this looked good, but was not essential, so I moved on.
1. Other generators did not have a button at all, or if they included one it was somewhat redundant because the password was generated upon the release of the slider. I had some success with this, but not enough to not be buggy, so again I left it behind.

### Character Selection.

This was actually pretty simple. I have written a series of ```if``` statements. Each one has a condition to see if a targeted element (a check box) is checked. The format is as follows:

    if (document.getElementById('specialChar').checked) {
        finalArray = finalArray.concat(specialArray);
    }

If the box is checked then the empty array has the appropriate set of characters added to it, using ```concat([arrayName])```. For each additional time a box is checked, another array is added to the ```finalArray```.

Using the ```DRY - Don't Repeat Yourself!``` principle, this code is a little repetitive. In order to account for this, what I could do is create a ```for``` loop, and combine all my character array sets into one array containing the arrays. I would also have to put all my check-box elements accessed with ```getElementById``` in another array (which I could do using the DOM). Then the iterator would cycle through the elements inspecting to see if they were checked, and assigning the appropriate array to the element, and ```push```ing that to the ```finalArray``` instead. Or, perhaps, I could use an array of objects where the properties are the ```getElementById``` and the array. Either way, I decided that there is only 4 choices, and not likely to be any more that would necessitate such dynamic code, so I would stick with my simple (and already functioning perfectly) ```if``` statements.

I have (in the HTML) hard coded one of these checkboxes to be checked already, because if none are selected, the password has no characters to be accessed. However, should the user uncheck that default box and forget to check another, I use the following code to evaluate:

    if (finalArray.length === 0) {
        alert('You have not selected any character groups. You must choose at least one group.')
    } else {
        passwordGenerator(finalArray, userNum);
    }

What this says is that if the length of the array is ZERO then no concatenations have happened, and therefore the user has not checked ANY boxes. If this is the case, there is an alert to the user's attention of this, and the function simply ends. This ```if``` statement has an ```else``` accompanying it however, and here I have a function call which will pass two arguments, the ```finalArray``` as selected by the user, and the ```userNum``` variable, as selected by the user with the slider.