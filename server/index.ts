import Server from './classes/server';
import fitbitRoutes from './routes/fitbit';
import bodyParser from 'body-parser';

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// Rutas de mi app
server.app.use('/fitbit', fitbitRoutes );

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});
