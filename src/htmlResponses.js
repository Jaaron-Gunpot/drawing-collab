const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const error = fs.readFileSync(`${__dirname}/../client/404.html`); 

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const notFound = (request, response) =>{
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(error);
    response.end();
};

module.exports.getIndex = getIndex;
module.exports.notFound = notFound;