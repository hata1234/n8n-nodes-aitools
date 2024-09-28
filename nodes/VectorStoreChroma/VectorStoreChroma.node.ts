import {
	INodeProperties,
} from 'n8n-workflow';

import { createVectorStoreNode } from '../shared/createVectorStoreNode';
import { ChromaExtended } from './core'

const sharedFields: INodeProperties[] = [
	{
		displayName: 'Collection Name',
		name: 'collectionName',
		type: 'string',
		default: 'n8n_vectors',
		required: true,
		description: 'The name of the collection to store the vectors in'
	},{
		displayName: 'Chroma Base Url',
		name: 'url',
		type: 'string',
		default: 'http://localhost:8000',
		required: true,
		description: 'The base URL of the Chroma instance'
	}
]

export const VectorStoreChroma = createVectorStoreNode({
	meta: {
		displayName: 'Chroma Vector Store',
		name: 'vectorStoreChroma',
		description: 'Work with your data in Chroma Vector Store',
		icon: 'file:chroma.svg',
		docsUrl: "https://js.langchain.com/v0.2/docs/integrations/vectorstores/chroma/",
		operationModes: ['load', 'insert', 'retrieve', 'update'],
	},
	sharedFields,
	async getVectorStoreClient(context, filter, embeddings, itemIndex) {
		const collectionName = context.getNodeParameter('collectionName', itemIndex, '', {
			extractValue: true,
		}) as string;
		const url = context.getNodeParameter('url', itemIndex, '', {
			extractValue: true,
		}) as string;


		return ChromaExtended.fromExistingCollection(embeddings, {
			collectionName,
			url
		});
	},
	async populateVectorStore(context, embeddings, documents, itemIndex) {
		const collectionName = context.getNodeParameter('collectionName', itemIndex, '', {
			extractValue: true,
		}) as string;
		const url = context.getNodeParameter('url', itemIndex, '', {
			extractValue: true,
		}) as string;

		ChromaExtended.fromDocuments(documents, embeddings, {
			collectionName,
			url
		});
	}

})
