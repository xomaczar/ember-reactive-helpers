/* jshint expr:true */
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

import registerHelper from '../../helpers/register-helper';

describeComponent(
  'r',
  'Integration: r',
  {
    integration: true
  },
  function() {
    beforeEach(function(){
      registerHelper(this);
    });
    it('renders', function() {
      this.registerHelper('uppercase', function ([str]) {
        return str.toUpperCase();
      });

      this.render(hbs`{{compute (r 'uppercase') 'foo'}}`);
      expect(this.$().text()).to.equal('FOO');
    });
  }
);