import type { Document } from '@langchain/core/documents';
import type { INodeExecutionData } from 'n8n-workflow';
import { N8nJsonLoader } from '../utils/N8nJsonLoader';
import { N8nBinaryLoader } from '../utils/N8nBinaryLoader';

export async function processDocuments(
	documentInput: N8nJsonLoader | N8nBinaryLoader | Array<Document<Record<string, unknown>>>,
	inputItems: INodeExecutionData[],
) {
	let processedDocuments: Document[];

	if (documentInput instanceof N8nJsonLoader || documentInput instanceof N8nBinaryLoader) {
		processedDocuments = await documentInput.processAll(inputItems);
	} else {
		processedDocuments = documentInput;
	}

	const serializedDocuments = processedDocuments.map(({ metadata, pageContent }) => ({
		json: { metadata, pageContent },
	}));

	return {
		processedDocuments,
		serializedDocuments,
	};
}
export async function processDocument(
	documentInput: N8nJsonLoader | N8nBinaryLoader | Array<Document<Record<string, unknown>>>,
	inputItem: INodeExecutionData,
	itemIndex: number,
) {
	let processedDocuments: Document[] | Document;

	if (documentInput instanceof N8nJsonLoader || documentInput instanceof N8nBinaryLoader) {
		processedDocuments = await documentInput.processItem(inputItem, itemIndex);
	} else {
		processedDocuments = documentInput;
	}
	let serializedDocuments: { json: { metadata: Record<string, unknown>; pageContent: string }; pairedItem: { item: number } }[] = [];
	if(processedDocuments instanceof Array) {
		serializedDocuments = processedDocuments.map(({ metadata, pageContent }) => ({
			json: { metadata, pageContent },
			pairedItem: {
				item: itemIndex,
			},
		}));
	}else{
		serializedDocuments = [
			{
				json: { metadata: {}, pageContent: "" },
				pairedItem: {
					item: itemIndex,
				},
			},
		];
	}

	return {
		processedDocuments,
		serializedDocuments,
	};
}
