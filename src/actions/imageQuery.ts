import axios from 'axios';

interface ImageQueryInput {
  api: string;
  apiKey?: string;
  data: string;
  nameOfTheImage: string;
  image: string;
  overrideConfig?: string;
}

interface ImageQueryOutput {
  success: boolean;
  response: any;
}

const imageQuery = async ({ input, logger }: { input: ImageQueryInput; logger: any; ctx: any }): Promise<ImageQueryOutput> => {
  logger.forBot().info('Sending image data to Flowise');

  const apiEndpoint = input.api;
  const apiKey = input.apiKey;
  let requestData: any;

  try {
    const base64Header = input.image.split(',')[0];
    let mime: string = 'png';
    let name: string = 'decay.png';

    if (base64Header && base64Header.includes(':') && base64Header.includes(';')) {
      const mimeType = base64Header.split(':')[1]?.split(';')[0];
      if (mimeType) {
        mime = mimeType;
        name = input.nameOfTheImage + '.' + mime.split('/')[1];
      }
    }

    logger.forBot().debug('Detected first base64 header:', base64Header);
    logger.forBot().debug('Detected MIME type:', mime);

    requestData = {
      question: input.data,
      uploads: [
        {
          data: input.image,
          type: 'file',
          name: name,
          mime: 'image/' + mime,
        },
      ],
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
    logger.forBot().info(`Successfully sent image data to Flowise, status code: ${status}`);
    logger.forBot().debug('Request data:', JSON.stringify(requestData, null, 2));
    logger.forBot().debug('Response data:', JSON.stringify(response, null, 2));

    return { success: true, response };
  } catch (error) {
    let status = 'Unknown Error';
    let message = 'An unknown error occurred';

    if (axios.isAxiosError(error)) {
      status = error.response ? error.response.status.toString() : 'Network Error';
      message = error.message;
      logger.forBot().error(`Error sending image data to Flowise. Status: ${status}, Message: ${message}`, {
        response: error.response?.data,
      });
      logger.forBot().debug('Request data:', JSON.stringify(requestData, null, 2));
    } else {
      logger.forBot().error(`Error sending image data to Flowise. Message: ${message}`, {
        error,
      });
    }

    return { success: false, response: null };
  }
};

export default imageQuery;
