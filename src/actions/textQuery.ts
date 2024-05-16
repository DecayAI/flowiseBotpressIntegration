import axios from 'axios';

interface TextQueryInput {
  api: string;
  apiKey?: string;
  data: string;
  overrideConfig?: string;
}

interface TextQueryOutput {
  success: boolean;
  response: any;
}

const textQuery = async ({ input, logger }: { input: TextQueryInput; logger: any; ctx: any }): Promise<TextQueryOutput> => {
  logger.forBot().info('Sending text data to Flowise');

  const apiEndpoint = input.api;
  const apiKey = input.apiKey;
  let requestData: any;

  try {
    requestData = {
      question: input.data,
    };

    if (input.overrideConfig) {
      const overrideConfig = JSON.parse(input.overrideConfig);
      requestData.overrideConfig = overrideConfig;
      logger.forBot().info('Parsed overrideConfig successfully');
    }
  } catch (error) {
    logger.forBot().error(`Error preparing request data: ${error}`);
    return { success: false, response: null };
  }

  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const { data: response, status } = await axios.post(apiEndpoint, requestData, {
      headers,
      timeout: 120000,
    });
    logger.forBot().info(`Successfully sent text data to Flowise, status code: ${status}`);
    logger.forBot().debug('Request data:', requestData);
    logger.forBot().debug('Response data:', response);

    return { success: true, response };
  } catch (error) {
    let status = 'Unknown Error';
    let message = 'An unknown error occurred';

    if (axios.isAxiosError(error)) {
      status = error.response ? error.response.status.toString() : 'Network Error';
      message = error.message;
      logger.forBot().error(`Error sending text data to Flowise. Status: ${status}, Message: ${message}`, {
        response: error.response?.data,
      });
    } else {
      logger.forBot().error(`Error sending text data to Flowise. Message: ${message}`, {
        error,
      });
    }

    return { success: false, response: null };
  }
};

export default textQuery;
