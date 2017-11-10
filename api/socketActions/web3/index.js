import { web3 } from '../../lib/web3';
import { twitterPostInstancePromise } from '../../lib/web3';
import {
  ADD_POST,
  UPDATE_POST,
} from '../../../src/posts/ui/postsForm/PostActionTypes';

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
                author: web3.toAscii(args.author),
                content: web3.toAscii(args.content),
              },
            };
            break;
          }
          case UPDATE_POST: {
            action.payload = {
              post: {
                author: web3.toAscii(args.author),
                content: web3.toAscii(args.content),
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
