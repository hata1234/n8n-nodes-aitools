import { ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class SearXngApi implements ICredentialType {
	name = 'searXNGApi';
	displayName = 'SearXNG API';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			required: true,
			type: 'string',
			default: 'http://localhost:8080',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl }}',
			url: '/search',
			method: 'GET',
			qs: {
				q: 'test',
			},
		},
	}
}
