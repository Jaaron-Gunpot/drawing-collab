const io = io();

io.on('connect',(socket)=>{
    console.log(`connected socket:${socket}`);
});