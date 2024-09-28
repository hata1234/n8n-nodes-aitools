import type { INodeProperties } from 'n8n-workflow';

export const chromaIndexRLC: INodeProperties = {
	displayName: 'Chroma Index',
	name: 'chromaIndex',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'chromaIndexSearch',
			},
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
		},
	],
};
