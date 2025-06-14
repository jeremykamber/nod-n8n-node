import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class Nod implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Nod',
		name: 'nod',
		icon: 'file:nod.svg', // TODO: Add the SVG icon
		group: ['apps'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with the Nod approvals API',
		defaults: {
			name: 'Nod',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'nodApi',
				required: true,
			},
		],
		properties: [
			// Resource to operate on
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Approval', value: 'approval' },
					{ name: 'Workflow', value: 'workflow' },
				],
				default: 'workflow',
			},
			// Operations for 'Workflow'
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['workflow'] },
				},
				options: [
					{ name: 'Create', value: 'createWorkflow', action: 'Create a workflow' },
					{ name: 'Get All', value: 'getWorkflows', action: 'Get all workflows' },
					{ name: 'Generate QR Code', value: 'generateQRCode', action: 'Generate a qr code for a workflow' },
				],
				default: 'createWorkflow',
			},
			// Operations for 'Approval'
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['approval'] },
				},
				options: [
					{ name: 'Create', value: 'createApproval', action: 'Create an approval for a workflow' },
					{ name: 'Update Status', value: 'updateApprovalStatus', action: 'Update an approval status' },
				],
				default: 'createApproval',
			},

			// --- Fields for 'Create Workflow' ---
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['createWorkflow'] } },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				displayOptions: { show: { operation: ['createWorkflow'] } },
			},

			// --- Fields for 'Generate QR Code' ---
			{
				displayName: 'Workflow ID',
				name: 'workflowId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['generateQRCode', 'createApproval'] } },
			},

			// --- Fields for 'Create Approval' ---
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['createApproval'] } },
			},
			{
				displayName: 'Metadata (JSON)',
				name: 'metadata',
				type: 'json',
				default: '{}',
				displayOptions: { show: { operation: ['createApproval'] } },
			},

			// --- Fields for 'Update Approval Status' ---
			{
				displayName: 'Approval ID',
				name: 'approvalId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['updateApprovalStatus'] } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				required: true,
				options: [
					{ name: 'Pending', value: 'pending' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'Rejected', value: 'rejected' },
				],
				default: 'pending',
				displayOptions: { show: { operation: ['updateApprovalStatus'] } },
			},
		],
	};

	// Inside the Nod class in Nod.node.ts

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('nodApi');

		for (let i = 0; i < items.length; i++) {
			// We get parameters inside the loop to allow for different values per item
			const resource = this.getNodeParameter('resource', i, '') as string;
			const operation = this.getNodeParameter('operation', i, '') as string;
			const method = operation.toLowerCase().startsWith('get') ? 'GET' : 'POST';

			// --- Fix for 'resource' not being read ---
			// Construct a RESTful URL for a custom Node.js server
			// Example: https://api.your-app.com/workflows or https://api.your-app.com/approvals
			const endpoint = `${credentials.baseUrl}/${resource}`;

			// Prepare the request body based on the operation
			let body = {};
			if (operation === 'createWorkflow') {
				body = {
					name: this.getNodeParameter('name', i, '') as string,
					description: this.getNodeParameter('description', i, '') as string,
				};
			} else if (operation === 'updateApprovalStatus') {
				body = {
					approval_id: this.getNodeParameter('approvalId', i, '') as string,
					status: this.getNodeParameter('status', i, '') as string,
				};
			} // ... add other else-if blocks for other operations with bodies

			try {
				// --- Fix for 'url' missing and 'delete' operand ---
				const options: IHttpRequestOptions = {
					method,
					headers: {
						// Assuming your Node.js server uses an x-api-key header
						'x-api-key': credentials.apiKey as string,
						'Content-Type': 'application/json',
					},
					url: endpoint, // Use 'url', not 'uri'
					json: true,
				};

				// Conditionally add the body for non-GET requests
				if (method !== 'GET') {
					options.body = body;
				}

				const responseData = await this.helpers.httpRequest(options);

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					const executionError = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionError);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
