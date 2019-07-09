const R = require('ramda');
const fetch = require('isomorphic-fetch');
const logger = require('./logger');

const API_CALL = 'api-call';
const FAILURE_MESSAGE = 'HTTP status code not in range (2xx).';

function callGet(endpoint, params = {}) {
  const headers = {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    Expires: '-1',
    Pragma: 'no-cache',
  };

  if (!R.isEmpty(params)) {
    Object.assign(headers, params);
  }
  const responsePromise = fetch(endpoint,
    {
      headers,
    })
    .then(
      (response) => {
        if (R.prop('ok', response)) {
          return response;
        }
        const contextLogger = logger.getContext('', {
          type: API_CALL,
          statusCode: response.status,
          requestUrl: endpoint,
          requestMethod: 'GET',
        });
        contextLogger.error(FAILURE_MESSAGE);
        throw new RangeError(FAILURE_MESSAGE);
      },
    );
  return responsePromise;
}

function callPost(endpoint, body= {}, params = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (!R.isEmpty(params)) {
    Object.assign(headers, params);
  }
  const stringifiedBody = JSON.stringify(body);
  const responsePromise = fetch(endpoint,
    {
      method: 'POST',
      headers,
      body: stringifiedBody,
    })
    .then((response) => {
      if (R.prop('ok', response)) {
        return response.json();
      }
      const contextLogger = logger.getContext('', {
        type: API_CALL,
        statusCode: response.status,
        requestUrl: endpoint,
        requestBody: stringifiedBody,
        requestMethod: 'POST',
      });
      contextLogger.error(FAILURE_MESSAGE);
      throw new RangeError(FAILURE_MESSAGE);
    });
  return responsePromise;
}

module.exports = { get: callGet, post: callPost };
