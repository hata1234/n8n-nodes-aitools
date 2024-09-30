import type { INodeProperties } from 'n8n-workflow';

export const chromaCollectionRLC: INodeProperties = {
	displayName: 'Chroma Collection',
	name: 'chromaCollection',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'chromaCollectionSearch',
			},
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
		},
	],
};
