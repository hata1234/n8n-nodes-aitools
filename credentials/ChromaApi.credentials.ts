import { ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class ChromaApi implements ICredentialType {
	name = 'chromaApi';
	displayName = 'Chroma API';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			required: true,
			type: 'string',
			default: 'http://localhost:8000',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl }}',
			url: '/api/v1/collections',
			method: 'GET',
		},
	}
}
