const { rooms } = require('./sockets.js');

//If there is a room that already exists, give it to them
//If there is no room, create one
const createRoom = (request, response, body) => {
    roomName = body.data.room;
    //if they did'nt give a room name
    if (roomName === undefined) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: 'room name required' }));
        response.end();
    }//if the room name alreday exists(shouldn't happen but just to be safe)
    else if (rooms.includes(roomName)) {
        //I don't know what status code to use
        response.writeHead(409, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: 'room already exists' }));
        response.end();
    } else {//Create the room
        rooms.push(roomName);
        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: 'room created' }));
        response.end();
    }
};

const roomRequest = (request, response, params) => {
    const foundRoom = rooms.find(room => {(room === params.data.room)});
    //if the room doesn't exist, give them an error message
    if(foundRoom){
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: 'room not found' }));
        response.end();
    }else{
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ message: 'room found' }));
        response.end();
    }
};

module.exports.createRoom = createRoom;
module.exports.roomRequest = roomRequest;