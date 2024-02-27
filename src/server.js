const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponses = require('./htmlResponses.js');
const canvasResponses = require('./canvas.js');
const createSocket = require('./sockets.js').setupSockets;

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlResponses.getIndex,
    '/canvas.js': htmlResponses.getSrc,
    '/sockets.js': htmlResponses.getSocket,
    '/newCanvas': canvasResponses.provideCanvas,
  },
  HEAD: {},
  POST: {
    '/canvas': canvasResponses.updateCanvas,
  },
  notFound: htmlResponses.notFound,
};

const parseBody = (request, response, handler) => {
  // The request will come in in pieces. We will store those pieces in this
  // body array.
  const body = [];

  // The body reassembly process is event driven, much like when we are streaming
  // media like videos, etc. We will set up a few event handlers. This first one
  // is for if there is an error. If there is, write it to the console and send
  // back a 400-Bad Request error to the client.
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  // The second possible event is the "data" event. This gets fired when we
  // get a piece (or "chunk") of the body. Each time we do, we will put it in
  // the array. We will always recieve these chunks in the correct order.
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // The final event is when the request is finished sending and we have recieved
  // all of the information. When the request "ends", we can proceed. Turn the body
  // array into a single entity using Buffer.concat, then turn that into a string.
  // With that string, we can use the querystring library to turn it into an object
  // stored in bodyParams. We can do this because we know that the client sends
  // us data in X-WWW-FORM-URLENCODED format. If it was in JSON we could use JSON.parse.
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = JSON.parse(bodyString);

    // Once we have the bodyParams object, we will call the handler function. We then
    // proceed much like we would with a GET request.
    handler(request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(request.url);
  const params = query.parse(parsedUrl.query);

  // handle post re4quests generally
  if (request.method === 'POST') {
    // if the url is not under post, return a 404
    if (!urlStruct[request.method][parsedUrl.pathname]) {
      return urlStruct.notFound(request, response);
    }
    // I don't know why this return is needed and i am scared to remove it
    return parseBody(request, response, urlStruct[request.method][parsedUrl.pathname]);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response, params);
  }
  return urlStruct.notFound(request, response);
};
const server = http.createServer(onRequest);
createSocket(server);
server.listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});

// requirmenets not met yet
/*
Server API must use and support the following status codes:
○ 200
○ 400
● Server API must support the following methods:
○ GET
○ HEAD (Client does not need to use HEAD, but the server should be able
to accept HEAD requests to all GET endpoints that send back JSON
data).
○ POST
● At least one GET request must support query parameters. A reminder that you
should not add data to your API using GET requests (that is the job of POST).
Instead, your query parameters should be used for things like filtering the results
of a query, etc.
  make the index some kind of form where you search for a specific room, may make the sockets mkore complicated
  could make query parameters possible for project

  //extras
  Add the ability to choose color and size of the brush.
  Add the ability to erase.
  implement css and bulma(maybe)
  use local storage to save the client color and brush size
*/
