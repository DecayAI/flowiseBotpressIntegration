import { IntegrationDefinition } from '@botpress/sdk';
import textQueryInputSchema from 'src/schemas/textQueryInputSchema';
import imageQueryInputSchema from 'src/schemas/imageQueryInputSchema';
import outputSchema from 'src/schemas/outputSchema';

export default new IntegrationDefinition({
  name: 'decay/flowise',
  title: 'Flowise',
  description: 'Send data to Flowise Prediction API',
  version: '0.5.4',
  icon: 'icon.svg',
  readme: 'hub.md',
  channels: {},
  actions: {
    textQuery: {
      title: 'Text Query API',
      description: 'Send text data to Flowise Prediction API',
      input: { schema: textQueryInputSchema },
      output: { schema: outputSchema },
    },
    imageQuery: {
      title: 'Image Query API',
      description: 'Send image data to Flowise Prediction API',
      input: { schema: imageQueryInputSchema },
      output: { schema: outputSchema },
    },
  },
});
