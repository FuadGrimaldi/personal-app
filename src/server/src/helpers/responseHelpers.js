const customResponse = (statusCode, message, data) => {
  let statusText;

  switch (statusCode) {
    case 200:
      statusText = "OK";
      break;
    case 201:
      statusText = "Created";
      break;
    case 204:
      statusText = "No Content";
      break;
    case 400:
      statusText = "Bad Request";
      break;
    case 401:
      statusText = "Unauthorized";
      break;
    case 403:
      statusText = "Forbidden";
      break;
    case 404:
      statusText = "Not Found";
      break;
    case 500:
      statusText = "Internal Server Error";
      break;
    case 502:
      statusText = "Bad Gateway";
      break;
    case 503:
      statusText = "Service Unavailable";
      break;
    default:
      statusText = "Unknown Status";
  }

  return {
    meta: {
      code: statusCode,
      status: statusText,
      message: message,
    },
    data: data || null, // Ensure 'data' is always sent, even if null
  };
};

module.exports = {
  customResponse,
};
