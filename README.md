# n8n-nodes-nod

This is an n8n community node. It lets you use the Nod AI-powered approvals app in your n8n workflows.

Nod is an AI-powered approvals application that streamlines workflow approvals and decision-making processes. With this node, you can create workflows, generate QR codes, and manage approvals directly from your n8n automations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Workflow Operations
- **Create**: Create a new workflow with name and description
- **Get All**: Retrieve all existing workflows
- **Generate QR Code**: Generate a QR code for a specific workflow

### Approval Operations
- **Create**: Create a new approval for a workflow with description and optional metadata
- **Update Status**: Update an approval's status (pending, approved, or rejected)

## Credentials

To use this node, you need to authenticate with the Nod API using the **Nod API** credential type. You'll need:

1. **API Base URL**: The base URL of your Nod API instance (e.g., `https://api.your-nod-instance.com`)
2. **API Key**: Your Nod API key for authentication

To set up credentials:
1. In n8n, go to **Credentials** → **Add Credential**
2. Select **Nod API** from the list
3. Enter your API Base URL and API Key
4. Test the connection and save

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node.js version**: >=20.15
- **Tested with**: n8n v1.x

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Nod API Documentation](https://nod.dev/docs)
* [Nod Website](https://nod.dev)
