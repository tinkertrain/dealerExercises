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

  // The Key Counter object
  var KeyCounter = function(textarea, button) {
      this.defaultValue = 'John,2\nJane,3\nJohn,4\nJane,5';
      this.textArea = textarea;
      this.button = button;
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
          name: tempArr[0],
          key: tempArr[1]
        };
        arrayOfObjs.push(tempObj);
      });
    return arrayOfObjs;
  };


  // Make an instance of the object
  var kc = new KeyCounter(kcTextArea, kcButton);

  // Fill the textarea with the default value
  kc.textArea.value = kc.defaultValue;

  kc.button.addEventListener("click", function( event ) {

      kc.textAreaArray = kc.splitLines(kc.textArea.value);
      kc.textAreaObjs = kc.convertIntoObjs(kc.textAreaArray);

    }, false);

  // expose the object
  return kc;
})();