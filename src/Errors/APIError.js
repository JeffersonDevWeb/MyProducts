export default class APIError extends Error {
  constructor(response, body) {
    super();

    this.name = 'APIERROR';
    this.response = response;
    this.body = body;
    this.message = (body?.error || `${response.status} - ${response.statusText}`);
  }
}
