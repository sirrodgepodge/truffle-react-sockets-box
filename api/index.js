import http from 'http'; // native http library
import express from 'express';
import SocketIo from 'socket.io';


// instantiate express
const api = express();

// create http server
const server = new http.Server(api);

// attach sockets to http server
const io = new SocketIo(server);
io.path('/ws');

// backstop if route not found
api.use((req, res) => {
  res.status(404).end('NOT FOUND');
});


// launch API server
if (process.env.API_PORT) {
  const serverInstance = api.listen(process.env.API_PORT, err => {
    if (err)
      console.error(err);

    console.info(`----\n==> 🌎  API is running on port ${process.env.API_PORT}`);
    console.info(`==> 💻  Send requests to http://${process.env.API_HOST}:${process.env.API_PORT}`);
  });

  // handle socket events
  require('./socketActions').default(io);
  io.listen(serverInstance);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
