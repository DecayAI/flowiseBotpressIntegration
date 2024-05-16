import textQuery from './actions/textQuery';
import imageQuery from './actions/imageQuery';
import * as botpress from '.botpress';

export default new botpress.Integration({
  register: async () => {},
  unregister: async () => {},
  actions: {
    textQuery,
    imageQuery,
  },
  channels: {},
  handler: async () => {},
});
