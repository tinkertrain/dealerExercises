/* global describe, it, expect, kc */

(function() {
  'use strict';

  describe('Exercise 1', function() {
    describe('The key counter object', function() {

      it('should have a default value', function() {
        expect(kc.defaultValue).to.equal('John,2\nJane,3\nJohn,4\nJane,5');
      });

      it('should retrieve the textarea from the DOM', function () {
        expect(kc.textArea.tagName).to.equal('TEXTAREA');
      });

      it('should fill the textarea with default value', function () {
        expect(kc.textArea.value).to.equal(kc.defaultValue);
      });

      it('should retrieve the count button from the DOM', function() {
        expect(kc.button.tagName).to.equal('BUTTON');
      });
    });

    describe('The count button', function () {
      var testArray;
      beforeEach(function () {
        kc.button.click();
        testArray = utilitiesKC.isArray(kc.textAreaArray);
      });

      it('should convert the textarea value into an array in which each line is an item of it', function () {
        expect(testArray).to.be.true;
      });

      it('should convert each item of the resulting array into an array of objects with properties key and count', function () {
        expect(kc.textAreaObjs[0].hasOwnProperty('count')).to.be.true;
        expect(kc.textAreaObjs[0].hasOwnProperty('key')).to.be.true;
      });

      it('should convert the count value to an integer', function () {
        assert.isNumber(kc.textAreaObjs[0].count, "Count is an integer");
      });

      it('should parse the objects array and find duplicated keys and sum its count value', function () {
        expect(kc.parsedObj[0].count).to.equal(6);
        expect(kc.parsedObj[1].count).to.equal(8);
      });

      it('should display the results in the output area', function () {
        expect(kc.outputArea.innerHTML).to.equal('<li>The total for John is 6</li><li>The total for Jane is 8</li>');
      });
    });
    describe('The results area', function() {
      beforeEach(function () {
          kc.textArea.value = 'John,2\nJane,3\nJohn,4\nJane,5\nred';
          kc.button.click();
        });

      it('in the displayed results it should detect when a line is invalid', function () {
        expect(kc.outputArea.innerHTML).to.equal('<li>The total for John is 6</li><li>The total for Jane is 8</li><li class="invalid">The total for red is NaN</li>');
      });

    })
  });
})();
