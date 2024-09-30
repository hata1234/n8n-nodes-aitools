import {
	INodeProperties,
} from 'n8n-workflow';
import { createVectorStoreNode } from '../shared/createVectorStoreNode';
import { chromaCollectionSearch } from '../shared/methods/listSearch'
import { chromaCollectionRLC } from '../shared/descriptions'
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ChromaClient } from 'chromadb';
import { ChromaExtended } from '../shared/chromaCore';


const sharedFields: INodeProperties[] = [chromaCollectionRLC]

const insertFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Clear Collection',
				name: 'clearCollection',
				type: 'boolean',
				default: false,
			}
		]
	}
]


export const VectorStoreChroma = createVectorStoreNode({
	meta: {
		displayName: 'Chroma Vector Store',
		name: 'vectorStoreChroma',
		description: 'Work with your data in Chroma Vector Store',
		icon: 'file:chroma.svg',
		docsUrl: "https://js.langchain.com/v0.2/docs/integrations/vectorstores/chroma/",
		credentials: [
			{
				name: 'chromaApi',
				required: true,
			}
		],
		operationModes: ['retrieve', 'insert', 'load', 'update'],
	},
	// eslint-disable-next-line
	methods: { listSearch: { chromaCollectionSearch } },
	retrieveFields: [],
	loadFields: [],
	updateFields: [],
	insertFields,
	sharedFields,
	async getVectorStoreClient(context, filter, embeddings, itemIndex) {
		context.logger.info('getVectorStoreClient');
		const collectionName = context.getNodeParameter('chromaCollection', itemIndex, '', {
			extractValue: true,
		}) as string;
		const credentials = await context.getCredentials('chromaApi');
		context.logger.info('getVectorStoreClient: returning');
		return new Chroma(embeddings, {
			url: credentials.baseUrl as string,
			collectionName
		})
	},
	async populateVectorStore(context, embeddings, documents, itemIndex) {
		context.logger.info('populateVectorStore');
		const collectionName = context.getNodeParameter('chromaCollection', itemIndex, '', {
			extractValue: true,
		}) as string;
		const options = context.getNodeParameter('options', itemIndex, {}) as { clearCollection: boolean };

		const credentials = await context.getCredentials('chromaApi');
		const client = new ChromaClient({
			path: credentials.baseUrl as string,
		});
		if (options.clearCollection) {
			try{
				const collections = await client.listCollections()
				let isExist = false
				collections.forEach(collection => {
					if(collection.name === collectionName){
						isExist = true
					}
				})
				if(isExist){
					await client.deleteCollection({ name: collectionName });
				}

				await Chroma.fromDocuments(documents, embeddings, {url: credentials.baseUrl as string, collectionName})
			} catch (error) {
				context.logger.info(`Failed to clear collection ${collectionName}: ${error}`);
			}
		}
		context.logger.info('populateVectorStore: documents')
		// const vectorStore = await ChromaExtended.fromExistingCollection(embeddings, {url: credentials.baseUrl as string, collectionName})
		// if(documents instanceof Array){
		// 	await ChromaExtended.fromDocuments(documents, embeddings, {url: credentials.baseUrl as string, collectionName})
		// }else{
		// 	Object.keys(documents).forEach(key => {
		// 		context.logger.info(key)
		// 		context.logger.info(documents[key])
		// 	})
		// 	await ChromaExtended.fromDocuments([documents], embeddings, {url: credentials.baseUrl as string, collectionName})

		// }
	}
})
