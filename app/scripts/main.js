var utilitiesKC = (function(){
  'use strict';
  return {
    isArray: function(obj) {
      if (obj instanceof Array) {
        return true;
      } else {
        return false;
      }
    }
  };
})();

// Namespace exercise 1: kc
var kc = (function() {
  'use strict';

  // Retrieve elements from the DOM
  var kcTextArea = document.getElementsByTagName('textarea')[0];
  var kcButton = document.getElementsByTagName('button')[0];
  var kcOutput = document.getElementsByClassName('exercise__output')[0];

  /**
   * Creates an instance of KeyCounter.
   *
   * @constructor
   * @this {kc}
   * @param {DOM element} textarea The textarea element that holds the user input.
   * @param {DOM element} button The button that executes the counting.
   * @param {DOM element} outputArea The area that displays the results.
   */
  var KeyCounter = function(textarea, button, outputArea) {
      this.defaultValue = 'John,2\nJane,3\nJohn,4\nJane,5';
      this.textArea = textarea;
      this.button = button;
      this.outputArea = outputArea;
  };

  /**
   * Split lines of the textarea and convert into an array
   *
   * @param {string} str The string to split.
   * @return {array} The string splitted into an array.
   */
  KeyCounter.prototype.splitLines = function(str) {
    return str.match(/[^\r\n]+/g);
  };

  /**
   * Convert the array of strings into an array of objects with properties name and key
   *
   * @param {array} arr The array to convert.
   * @return {array} The array of objects.
   */

  KeyCounter.prototype.convertIntoObjs = function(arr) {
    var tempArr = [];
    var tempObj = {};
    var arrayOfObjs = [];
    arr.forEach(function(value) {
        tempArr = value.split(',');
        tempObj = {
          key: tempArr[0],
          count: parseInt(tempArr[1], 10)
        };
        arrayOfObjs.push(tempObj);
      });
    return arrayOfObjs;
  };

  /**
   * Parse an array, find duplicates, sum their count and consolidate
   *
   * @param {array} arrObjs The array to consolidate.
   * @return {array} The array consolidated.
   */
  KeyCounter.prototype.consolidateArray = function(arrObjs) {
    var consolidatedArray = [];
    var keys = [];
    var tempObj = {};
    var key;

    arrObjs.forEach(function(obj, index) {
      if(index === 0) {
        consolidatedArray.push(
          {
            key: obj.key,
            count: obj.count
          });
        keys.push(obj.key);
      }
      else {
        if(keys.indexOf(obj.key) === -1) {
          consolidatedArray.push({
            key: obj.key,
            count: obj.count
          });
          keys.push(obj.key);
        }
        else {
          consolidatedArray.forEach(function(val) {
            if(val.key === obj.key) {
              val.count += obj.count
;            }
          });
        }
      }
    });
    return consolidatedArray;
  };

  /**
   * Display the results in the output area
   *
   * @param {array} arrObjs The array consolidated.
   */
  KeyCounter.prototype.displayResults = function(arr) {
    var results = [];
    var tempStr;
    var notice = document.getElementsByClassName('notice')[0];
    var errorFound = false;

    kc.outputArea.innerHTML = '';
    arr.forEach(function(item) {
      if(item.count) {
        kc.outputArea.innerHTML += '<li>The total for ' + item.key + ' is ' + item.count + '</li>';
      }
      else {
        notice.classList.remove('hidden');
        kc.outputArea.innerHTML += '<li class="invalid">The total for ' + item.key + ' is ' + item.count + '</li>';
        errorFound = true;
      }
    });
    if(!errorFound) {
      notice.classList.add('hidden');
    }
  };

  // Make an instance of the object
  var kc = new KeyCounter(kcTextArea, kcButton, kcOutput);

  // Fill the textarea with the default value
  kc.textArea.value = kc.defaultValue;

  kc.button.addEventListener('click', function( event ) {
      kc.textAreaArray = kc.splitLines(kc.textArea.value);
      kc.textAreaObjs = kc.convertIntoObjs(kc.textAreaArray);
      kc.parsedObj = kc.consolidateArray(kc.textAreaObjs);
      kc.displayResults(kc.parsedObj);
    }, false);

  // expose the object
  return kc;
})();

var palindrome = (function() {
  'use strict';

  var originalInputPrepared;
  var inputProcessed;

  // Get necessary elements from the DOM
  var palUserInput = document.getElementById('userInput');
  var palPositive = document.getElementsByClassName('positive')[0];
  var palNegative = document.getElementsByClassName('negative')[0];
  var palResults = document.getElementsByClassName('exercise__palindrome__results')[0];


  /**
   * Creates an instance of PalindromeObject.
   *
   * @constructor
   * @this {palindrome}
   * @param {userInput} userInput The text input element that holds the user input.
   */
  var PalindromeObject = function(userInput) {
    this.userInput = userInput.value;
    this.isPalindrome = false;
  };

  /**
   * Prepare the user input, strip non-alpha characters and convert to lowercase
   *
   * @param {string} str The user input.
   * @return {string} The stripped lowercase input.
   */
  PalindromeObject.prototype.prepareInput = function(str) {
    return str.replace(/[^a-zA-Z]/g, '').toLowerCase();
  };

  /**
   * Process the string, convert into an array, reverse and rejoin
   *
   * @param {string} str The user input prepared.
   * @return {string} The string reversed.
   */
  PalindromeObject.prototype.processInput = function(str) {
    return str.split('').reverse().join('');
  };

  /**
   * Check if the prepared string matches the reversed string
   *
   * @param {string} str1 The user input prepared.
   * @param {string} str2 The user input reversed.
   * @return {boolean} True if is the same, false if not.
   */
  PalindromeObject.prototype.checkPalindrome = function(str1, str2) {
    return str1 === str2;
  };

  // Make an instance of PalindromeObject
  var palindrome = new PalindromeObject(palUserInput);

  // Process the text input

  palUserInput.addEventListener('keyup', function(evt) {
    if(palUserInput.value !== '' && palUserInput.value.length > 1) {
      palResults.classList.remove('hidden');
      palindrome.userInput = palUserInput.value;
      originalInputPrepared = palindrome.prepareInput(palindrome.userInput);
      inputProcessed = palindrome.processInput(originalInputPrepared);

      if(palindrome.checkPalindrome(originalInputPrepared, inputProcessed)) {
        palindrome.isPalindrome = true;
      }
      else {
        palNegative.classList.remove('hidden');
        palPositive.classList.add('hidden');
        palindrome.isPalindrome = false;
      }
    }
    else {
      palResults.classList.add('hidden');
    }
  });

  // Watch the input and display results

  watch(palindrome, 'isPalindrome', function() {
    if(palindrome.isPalindrome) {
      palNegative.classList.add('hidden');
      palPositive.classList.remove('hidden');
    }
    else {
      palNegative.classList.remove('hidden');
      palPositive.classList.add('hidden');
    }
  });

  return palindrome;
})();