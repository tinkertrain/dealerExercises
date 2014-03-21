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
      beforeEach(function () {
        kc.textArea.value = 'hello';
        kc.button.click();
      });
      it('should retrieve the value of the textarea', function() {
        expect(kc.textArea.value).to.equal('hello');
      });
    });
  });
})();
