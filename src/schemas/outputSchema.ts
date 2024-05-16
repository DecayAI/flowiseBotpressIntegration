import { z } from 'zod';

const outputSchema = z.object({
  success: z.boolean().describe('True if the data was sent successfully'),
  response: z.any().nullable().describe('Data received from Flowise after sending data.'),
}).describe('Output schema after sending data, expecting any JSON structure');

export default outputSchema;
