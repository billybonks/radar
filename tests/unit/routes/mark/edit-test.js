import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | mark/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:mark/edit');
    assert.ok(route);
  });
});
