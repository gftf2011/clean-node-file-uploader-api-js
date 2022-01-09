module.exports = class HttpResponse {
  static created(data) {
    return {
      statusCode: 201,
      body: data,
    };
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: error,
    };
  }

  static serverError(error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};
