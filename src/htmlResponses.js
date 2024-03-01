const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/html/room.html`);
const client = fs.readFileSync(`${__dirname}/../client/html/client.html`);
const error = fs.readFileSync(`${__dirname}/../client/html/404.html`);
// will use webpack if it turns into multiple files
const src = fs.readFileSync(`${__dirname}/../client/js/canvas.js`);
const socket = fs.readFileSync(`${__dirname}/../client/js/sockets.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const notFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(error);
  response.end();
};

// gives the requested js file in one function
const getJs = (request, response, js) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(js);
  response.end();
};

// will delete later
const getSocket = (request, response) => { getJs(request, response, socket); };
const getSrc = (request, response) => { getJs(request, response, src); };

module.exports.getIndex = getIndex;
module.exports.notFound = notFound;
module.exports.getSrc = getSrc;
module.exports.getSocket = getSocket;
