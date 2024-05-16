This integration enables you to connect your Botpress chatbot with Flowise, a powerful low-code platform for building and deploying conversational AI applications. With the Botpress Flowise integration, you can extend the capabilities of your chatbot by leveraging Flowise's intuitive flow-based interface to design and implement conversational flows.

To set up the integration, you will need to configure a webhook connection between Botpress and Flowise. Once the integration is in place, you can design and implement conversational flows in Flowise that interact with your Botpress chatbot.

## Prerequisites

Before enabling the Botpress Flowise Integration, please ensure that you have:

- A Botpress cloud or self-hosted account.
- Familiarity with Flowise's platform and how to create and manage conversational flows.

## Installation and Configuration

To enable the Flowise integration in Botpress, follow these steps:

- Access your Botpress admin panel.
- Navigate to the "Integrations" section.
- Locate the Flowise integration and select "Enable integration".
- In Flowise, create a new flow connection and copy the API endpoint.
- Paste the API endpoint in the **Api** input field in the Botpress Flowise integration card called **Send Data**.
- Input a JSON string in the **Data** input field. Example: `{ "foo": "bar" }`.
- Test the integration to ensure it's working as expected.

## Usage

With the integration enabled, you can leverage Flowise to design and implement conversational flows that interact with your Botpress chatbot. Some examples of what you can achieve include:

- Creating complex conversational flows with branching logic and conditional responses.
- Integrating with external APIs and services to retrieve data or perform actions.