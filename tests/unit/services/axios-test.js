import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import axiosService from 'ember-axios/services/axios';

module('Unit | Service | axios', function(hooks) {
  setupTest(hooks);

  test('axios methods', function(assert) {
    assert.expect(8);
    const service = this.owner.lookup('service:axios');


    assert.ok(service.request, 'axios.request alias');
    assert.ok(service.get, 'axios.get alias');
    assert.ok(service.delete, 'axios.delete alias');
    assert.ok(service.head, 'axios.head alias');
    assert.ok(service.options, 'axios.options alias');
    assert.ok(service.post, 'axios.post alias');
    assert.ok(service.put, 'axios.put alias');
    assert.ok(service.patch, 'axios.patch alias');
  });

  test('load hook', function(assert) {
    assert.expect(2);
    const service = axiosService.extend({
      load(axios) {
        assert.equal(axios, this.client())
        assert.ok('call load hook');
      }
    });

    new service()
  });

  test('custom base url', function(assert) {
    assert.expect(1);

    const service = axiosService.extend({ baseUrl: '/api/v2' });

    assert.equal(new service().client().defaults.baseURL, '/api/v2', 'base url')
  });

  test('custom headers', function(assert) {
    assert.expect(1);

    const service = axiosService.extend({
      headers() {
        return { axios: 'awesome' };
      }
    });

    assert.equal(
      new service().client().defaults.headers['axios'],
      'awesome',
      'custom headers'
    );
  });

  test('custom config', function(assert) {
    assert.expect(2);
    const service = axiosService.extend({
      config() {
        assert.ok('call custom config');
        return {
          headers: { custom: 'custom' }
        };
      }
    });

    const axios = new service();

    assert.equal(
      axios.client().defaults.headers['custom'],
      'custom',
      'custom headers by custom config'
    );
  });
});
