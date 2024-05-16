import { z } from 'zod';

const textQueryInputSchema = z.object({
  api: z
    .string()
    .url({ message: 'Must be a valid URL' })
    .min(1, { message: 'API endpoint must not be empty' })
    .describe('Flowise Prediction API endpoint to send text data to'),
  apiKey: z
    .string()
    .describe('API key to authenticate with Flowise Prediction API')
    .optional(),
  data: z
    .string()
    .min(1, { message: 'Data must not be empty' })
    .describe('Text or variable to send as question to Flowise'),
  overrideConfig: z
    .string()
    .optional()
    .describe('Override existing flow configuration (JSON string)'),
}).describe('Input schema for sending text data');

export default textQueryInputSchema;
