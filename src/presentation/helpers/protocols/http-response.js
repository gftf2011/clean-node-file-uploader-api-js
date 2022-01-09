module.exports = class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: error,
    };
  }
};
