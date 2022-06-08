const{io}=require('../index');

//mensaje de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

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

  });