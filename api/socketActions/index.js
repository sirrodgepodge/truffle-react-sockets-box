export default io => {
  io.on('connection', socket => {
    require('./web3').default(socket);
  });
};
