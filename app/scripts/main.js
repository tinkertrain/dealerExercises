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
        console.log(index);
        console.log(consolidatedArray);
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


  // Make an instance of the object
  var kc = new KeyCounter(kcTextArea, kcButton);

  // Fill the textarea with the default value
  kc.textArea.value = kc.defaultValue;

  kc.button.addEventListener("click", function( event ) {

      kc.textAreaArray = kc.splitLines(kc.textArea.value);
      kc.textAreaObjs = kc.convertIntoObjs(kc.textAreaArray);
      console.log(kc.textAreaObjs);
      kc.parsedObj = kc.consolidateArray(kc.textAreaObjs);
    }, false);

  // expose the object
  return kc;
})();