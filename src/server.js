const http = require('http');
const url = require('url');
const querystring = require('querystring');
const htmlResponses = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlResponses.getIndex,
  },
  HEAD: {},
  POST: {},
  DELETE: {},
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = querystring.parse(parsedUrl.query);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
