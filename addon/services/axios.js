import Service from '@ember/service';
import axios from 'axios';

export default Service.extend({
  baseUrl: '',

  init() {
    this._super(...arguments);

    this.axios = axios.create(this.config());

    this.load(this.axios);

    this.request = this.axios.get;
    this.get = this.axios.get;
    this.delete = this.axios.delete;
    this.head = this.axios.head;
    this.options = this.axios.options;
    this.post = this.axios.post;
    this.put = this.axios.put;
    this.patch = this.axios.patch;
  },

  client() {
    return this.axios;
  },

  headers() {
    return {};
  },

  config() {
    return {
      baseURL: this.baseUrl,
      headers: this.headers()
    };
  },

  load() {
    return true;
  }
});
