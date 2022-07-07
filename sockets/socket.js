const{io}=require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands =new Bands();

bands.addBand(new Band('Papoman'));
bands.addBand(new Band('Bad bunny'));
bands.addBand(new Band('Shakira'));
bands.addBand(new Band('Maluma'));

console.log(bands);

//mensaje de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje', payload);
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });

    client.on('emitir-mensaje',(payload)=>{
        client.broadcast.emit('nuevo-mensaje',payload);
    });
    
    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());//Todos los clientes conectados IO
    });

  });