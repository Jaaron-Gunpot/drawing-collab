const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/html/room.html`);
const canvas = fs.readFileSync(`${__dirname}/../client/html/client.html`);
const error = fs.readFileSync(`${__dirname}/../client/html/404.html`);
// will use webpack if it turns into multiple files
const src = fs.readFileSync(`${__dirname}/../client/js/canvas.js`);
const roomsrc = fs.readFileSync(`${__dirname}/../client/js/room.js`);

const roomBackground = fs.readFileSync(`${__dirname}/../client/media/room-background.png`);

const style = fs.readFileSync(`${__dirname}/../client/css/style.css`);

// gives the requested js file in one function
const getJs = (request, response, js) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(js);
  response.end();
};

// gives the requested html file in one function
const getHTML = (request, response, html) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(html);
  response.end();
};

const getImage = (request, response, img) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(img);
  response.end();
};

const getCSS = (request, response, css) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// will delete later
const getSrc = (request, response) => { getJs(request, response, src); };
const getRoomSrc = (request, response) => { getJs(request, response, roomsrc); };
const getIndex = (request, response) => { getHTML(request, response, index); };
const getCanvas = (request, response) => { getHTML(request, response, canvas); };
const notFound = (request, response) => { getHTML(request, response, error); };
const getRoomBackground = (request, response) => { getImage(request, response, roomBackground); };
const getStyle = (request, response) => { getCSS(request, response, style); };

module.exports = {
  getIndex,
  notFound,
  getSrc,
  getCanvas,
  getRoomBackground,
  getStyle,
  getRoomSrc,
};
