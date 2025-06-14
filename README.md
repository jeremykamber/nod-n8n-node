# nod-n8n-node

This repository contains the Nod integration for n8n, enabling seamless interaction with the Nod API. Nod is an AI-powered approvals app designed to streamline workflows and decision-making processes.

## Features

- Create and manage workflows directly from n8n.
- Generate QR codes for workflows.
- Create and update approvals for workflows.
- Supports dynamic input and output configurations.

## Installation

1. Clone this repository into your n8n custom nodes directory.
2. Install dependencies using `npm install`.
3. Restart your n8n instance.

## Usage

1. Add the "Nod" node to your n8n workflow.
2. Configure the credentials using the "Nod API" credential type.
3. Select the desired resource (e.g., Workflow or Approval) and operation.
4. Provide the required parameters and execute the workflow.

## Credentials

The "Nod API" credential type requires:

- **API Base URL**: The base URL of your Nod API instance.
- **API Key**: Your Nod API key for authentication.

## Documentation

For detailed documentation, visit [Nod API Documentation](https://nod.dev/docs/n8n-credentials).

## License

This project is licensed under the MIT License.
