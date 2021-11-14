import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | viz/table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Viz::Table />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Viz::Table>
        template block text
      </Viz::Table>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
