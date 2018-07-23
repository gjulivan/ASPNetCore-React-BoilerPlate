const dev = process.env.NODE_ENV !== 'production';

const api = {};

if (dev) {
  // Dev url
  api.BaseUrl = '';
} else {
  // PROD url
  api.BaseUrl = '';
}

const BaseUrl = api.BaseUrl;

export { BaseUrl };
