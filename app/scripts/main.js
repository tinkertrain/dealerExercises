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

  // The Key Counter object
  var KeyCounter = function(textarea, button, outputArea) {
      this.defaultValue = 'John,2\nJane,3\nJohn,4\nJane,5';
      this.textArea = textarea;
      this.button = button;
      this.outputArea = outputArea;
  };

  // Method to split lines of the textarea and ocnvert into an array
  KeyCounter.prototype.splitLines = function(str) {
    return str.match(/[^\r\n]+/g);
  };

  // Method to convert the array of strings into an array of objects with properties name and key
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

  // Method to parse an array, find duplicates, sum their count and consolidate
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

  // Method to display the results in the output area
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

  var palUserInput = document.getElementById('userInput');
  var palPositive = document.getElementsByClassName('positive')[0];
  var palNegative = document.getElementsByClassName('negative')[0];
  var palResults = document.getElementsByClassName('exercise__palindrome__results')[0];

  var PalindromeObject = function(userInput) {
    this.userInput = userInput.value;
    this.isPalindrome = false;
  };

  PalindromeObject.prototype.prepareInput = function(str) {
    return str.replace(/[^a-zA-Z]/g, '').toLowerCase();
  };

  PalindromeObject.prototype.processInput = function(str) {
    return str.split('').reverse().join('');
  };

  PalindromeObject.prototype.checkPalindrome = function(str1, str2) {
    return str1 === str2;
  };

  var palindrome = new PalindromeObject(palUserInput);
  var originalInputPrepared;
  var inputProcessed;

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