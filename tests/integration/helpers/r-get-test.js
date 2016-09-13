/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'r/get',
  'Integration: r/get',
  {
    integration: true
  },
  function() {
    it('renders value', function() {
      this.render(hbs`{{compute (r/get 'value') (hash value="foo")}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');
    });

    it('changes value when dependent key changes', function(){
      this.set('animal', 'cat');
      this.render(hbs`{{compute (r/get animal) (hash cat="Wiskers" dog="Barky")}}`);
      expect(this.$().text()).to.equal('Wiskers');

      this.set('animal', 'dog');
      expect(this.$().text()).to.equal('Barky');
    });

    it('expects a valid property name to be passed in', function(){
      let invalidProps = [
        null, undefined, '', '   ', []
      ];

      invalidProps.forEach((propName) => {
        this.set('invalidPropName', propName);
        expect(() => {
          this.render(hbs`{{compute (r/get invalidPropName) (hash cat="Wiskers")}}`);
        }).to.throw(`Assertion Failed: r/get expects a valid property name, you passed ${propName}`);
      });
    });

    it('expects a target of type object to be passed in', function(){
        expect(() => {
          this.set('invalidObject', 1);
          this.render(hbs`{{compute (r/get 'someKey') invalidObject}}`);
        }).to.throw(`Assertion Failed: cannot call r/get with someKey on not an object`);
    });
  }
);
