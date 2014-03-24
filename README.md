# Coding Exercises notes

## General
- I used yeoman to generate the initial boilerplate code. Internally yeoman uses grunt for running tasks and bower to manage dependencies.
- In the repo I include both the source files in the app folder and the built app in the dist folder.
- To run the app with the source files, you need to have bower and grunt installed (they both need nodejs installed), just run 'npm install -g yo' and they both will get installed. Then clone the repo and in the root folder run 'npm install' and 'bower install' to install all dependencies. After just run 'grunt serve' and it will open a window with the app running in a local webserver'.
- Otherwise just open index.html from the 'dist' folder.
- Everything is coded in vanilla Javascript, some things might not work in all browsers.
- I used sass to code the css, I broke down the styles in different folders and files, this is definitely overkill for this exercises, but it's just to show how I usually structure a project.
- I used mocha to test the javascript, all tests are in the 'test' folder.

## Exercise 1 notes

This is the process I thought of to solve the exercise:

1. Grab the text from the textarea and convert it into an array, making each line an item of the array.
2. I then take each of the items of that array and convert them into objects with the properties 'key' and 'count'.
3. After that I parse the array of objects to look for repeated keys and add up their count.
4. At the same time I check for invalid lines and mark them.
5. Finally I display the results in the output area.

CSS note: The exercise has 2 columns that convert into one when the screen size is small using a media query.

## Exercise 2 notes

Process to solve exercise 2:

1. First, add a listener for the keyup event on the text input. It will fire the checker if the input is not empty and the string's length is at least 2 characters.
2. To check the text, first I strip it of any non-alpha characters and convert it to lowercase.
3. I then take this str, convert it to an array in which each item is a letter of the string.
4. Then I reversed the array.
5. After that, the array is rejoined into an string.
6. Then we compare the initial string (stripped) to the reversed string. We set a property on the object ('isPalindrome') to true or false depending on the outcome.
7. I added a watch library to observe that property ('isPalindrome') and display the result accordingly on the fly.