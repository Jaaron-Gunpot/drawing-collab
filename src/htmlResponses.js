const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/html/client.html`);
const error = fs.readFileSync(`${__dirname}/../client/html/404.html`);
// will use webpack if it turns into multiple files
const src = fs.readFileSync(`${__dirname}/../client/js/canvas.js`);

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

const getSrc = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(src);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.notFound = notFound;
module.exports.getSrc = getSrc;
