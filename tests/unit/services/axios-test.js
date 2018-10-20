import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import axiosService from 'ember-axios/services/axios';
import { startMirage } from 'dummy/initializers/ember-cli-mirage';

module('Unit | Service | axios', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
  });

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

  test('get method', function(assert) {
    assert.expect(1);

    this.server.get('/test', function() {
      assert.ok(true, 'call get http verb');
      return {};
    });

    this.owner.lookup('service:axios').get('/test');
  });

  test('delete method', function(assert) {
    assert.expect(1);

    this.server.delete('/test', function() {
      assert.ok(true, 'call delete http verb');
      return {};
    });

    this.owner.lookup('service:axios').delete('/test');
  });

  test('head method', function(assert) {
    assert.expect(1);

    this.server.head('/test', function() {
      assert.ok(true, 'call head http verb');
      return {};
    });

    this.owner.lookup('service:axios').head('/test');
  });

  test('post method', function(assert) {
    assert.expect(1);

    this.server.post('/test', function() {
      assert.ok(true, 'call post http verb');
      return {};
    });

    this.owner.lookup('service:axios').post('/test');
  });

  test('options method', function(assert) {
    assert.expect(1);

    this.server.options('/test', function() {
      assert.ok(true, 'call options http verb');
      return {};
    });

    this.owner.lookup('service:axios').options('/test');
  });

  test('put method', function(assert) {
    assert.expect(1);

    this.server.put('/test', function() {
      assert.ok(true, 'call put http verb');
      return {};
    });

    this.owner.lookup('service:axios').put('/test');
  });

  test('patch method', function(assert) {
    assert.expect(1);

    this.server.patch('/test', function() {
      assert.ok(true, 'call patch http verb');
      return {};
    });

    this.owner.lookup('service:axios').patch('/test');
  });
});
