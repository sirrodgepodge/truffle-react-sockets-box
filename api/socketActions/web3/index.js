import { web3 } from '../../lib/web3';
import { twitterPostInstancePromise } from '../../lib/web3';
import {
  ADD_POST,
  UPDATE_POST,
} from '../../../src/Posts/postActionTypes';

const nullCharacterRegex = /\0/g;

export default socket => {
  twitterPostInstancePromise.then(twitterPostInstance => {
    twitterPostInstance.allEvents((err, result) => {
      if (!err) {
        const { event, args } = result;
        const action = { type: event };
        switch(action.type) {
          case ADD_POST: {
            action.payload = {
              post: {
                author: web3.toAscii(args.author).replace(nullCharacterRegex, ''),
                content: web3.toAscii(args.content).replace(nullCharacterRegex, ''),
              },
            };
            break;
          }
          case UPDATE_POST: {
            action.payload = {
              post: {
                author: web3.toAscii(args.author).replace(nullCharacterRegex, ''),
                content: web3.toAscii(args.content).replace(nullCharacterRegex, ''),
              },
              index: args.index.toNumber(),
            };
            break;
          }
          default:
            return; // unhandled event
        }

        socket.emit('twitter_contract_event', action);
      }
    });
  })
}
