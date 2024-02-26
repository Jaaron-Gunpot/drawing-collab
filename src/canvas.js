//empry object to hold the most current canvas object
const currentCanvas = {};

//function to update and emit the current canvas object
const updateCanvas = (request, response, body) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(currentCanvas));
    response.end();
    console.log(body);
};

module.exports = { 
        updateCanvas
};