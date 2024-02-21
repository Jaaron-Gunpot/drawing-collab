const http = require('http');
const url = require('url');
const querystring = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    'GET':{},
    'HEAD':{},
    'POST':{},
    'DELETE':{},
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const params = querystring.parse(parsedUrl.query);
    
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params);
    } else {
        urlStruct.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port,()=>{
    console.log(`Listening on 127.0.0.1: ${port}`);
});