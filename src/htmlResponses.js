const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/html/room.html`);
const canvas = fs.readFileSync(`${__dirname}/../client/html/client.html`);
const error = fs.readFileSync(`${__dirname}/../client/html/404.html`);
const src = fs.readFileSync(`${__dirname}/../client/js/canvas.js`);
const roomsrc = fs.readFileSync(`${__dirname}/../client/js/room.js`);

const roomBackground = fs.readFileSync(`${__dirname}/../client/media/room-background.png`);

const style = fs.readFileSync(`${__dirname}/../client/css/style.css`);

// a generic function to send a file
const getFile = (request, response, file, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(file);
  response.end();
};

// will delete later
const getSrc = (request, response) => { getFile(request, response, src, 'application/javascript'); };
const getRoomSrc = (request, response) => { getFile(request, response, roomsrc, 'application/javascript'); };
const getIndex = (request, response) => { getFile(request, response, index, 'text/html'); };
const getCanvas = (request, response) => { getFile(request, response, canvas, 'text/html'); };
const notFound = (request, response) => { getFile(request, response, error, 'text/html'); };
const getRoomBackground = (request, response) => { getFile(request, response, roomBackground, 'image/png'); };
const getStyle = (request, response) => { getFile(request, response, style, 'text/css'); };

module.exports = {
  getIndex,
  notFound,
  getSrc,
  getCanvas,
  getRoomBackground,
  getStyle,
  getRoomSrc,
};
