import { module, test } from 'qunit';
import { setupTest } from 'electron-test/tests/helpers';

module('Unit | Service | model-navigator', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:model-navigator');
    assert.ok(service);
  });
});
