import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = Cookies.get('XSRF-TOKEN'); // Use Cookies.get to fetch the CSRF token
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore'); // Adjust the endpoint as necessary for your application
}
