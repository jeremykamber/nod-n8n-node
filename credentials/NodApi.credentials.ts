import { ICredentialType, INodeProperties } from "n8n-workflow";

export class NodApi implements ICredentialType {
	name = 'nodApi';
	displayName = 'Nod API';
	documentationUrl = 'https://nod.dev/docs/n8n-credentials'; // TODO: Update with actual documentation URL
	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://api.your-app.com', // TODO: Update with actual base URL
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
