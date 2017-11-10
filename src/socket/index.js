import io from 'socket.io-client';

export default function socketsInit(dispatch) {
  const socket = io('', { path: '/ws' });

  socket.on('twitter_contract_event', dispatch);
}
