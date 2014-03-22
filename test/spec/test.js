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

      it('should ', function () {

      });

    });
  });
})();
