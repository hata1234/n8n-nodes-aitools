import { ILoadOptionsFunctions } from "n8n-workflow";
import { ChromaClient } from 'chromadb'
export async function chromaCollectionSearch(this: ILoadOptionsFunctions) {
	const credentials = await this.getCredentials('chromaApi');

	const client = new ChromaClient({
		path: credentials.baseUrl as string
	});

	const collections = await client.listCollections();
	const results = (collections ?? []).map(collection => ({
		name: collection.name,
		value: collection.name
	}));

	return { results };
}
