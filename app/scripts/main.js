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

console.log(utilitiesKC.isArray([]));

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
  // Make an instance of the object
  var kc = new KeyCounter(kcTextArea, kcButton);

  // Fill the textarea with the default value
  kc.textArea.value = kc.defaultValue;

  kc.button.addEventListener("click", function( event ) {
      var textAreaValue = kc.textArea.value;

      kc.textAreaArray = textAreaValue.match(/[^\r\n]+/g);
    }, false);

  // expose the object
  return kc;
})();