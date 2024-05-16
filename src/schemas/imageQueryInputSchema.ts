import { z } from 'zod';

const imageQueryInputSchema = z.object({
  api: z
    .string()
    .url({ message: 'Must be a valid URL' })
    .min(1, { message: 'API endpoint must not be empty' })
    .describe('Flowise Prediction API endpoint to send image data to'),
  apiKey: z
    .string()
    .describe('API key to authenticate with Flowise Prediction API')
    .optional(),
  data: z
    .string()
    .min(1, { message: 'Data must not be empty' })
    .describe('Text or variable to send as question to Flowise'),
  nameOfTheImage: z
    .string()
    .min(1, { message: 'Name of the image must not be empty' })
    .describe('Name of the image to send to Flowise'),
  image: z
    .string()
    .min(1, { message: 'Image data must not be empty' })
    .describe('Base64 encoded image data to send to Flowise'),
  overrideConfig: z
    .string()
    .optional()
    .describe('Override existing flow configuration (JSON string)'),
}).describe('Input schema for sending image data');

export default imageQueryInputSchema;
