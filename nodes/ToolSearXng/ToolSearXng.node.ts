import { IExecuteFunctions, INodeType, INodeTypeDescription, NodeConnectionType, SupplyData } from 'n8n-workflow';
import { SearxngSearch } from "@langchain/community/tools/searxng_search";

import { logWrapper } from '../utils/logWrapper';
import { getConnectionHintNoticeField } from '../utils/sharedFields';
export class ToolSearXng implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SearXNG',
		name: 'toolSearXng',
		icon: 'file:SearXNG.svg',
		group: ['transform'],
		version: 1,
		description: 'Search the web with SearXNG',
		defaults: {
			name: 'SearXNG',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Other Tools'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.searxng.org/',
					},
				],
			},
		},
		credentials: [
			{
				name: 'searXNGApi',
				required: false,
			}
		],
		properties: [
			getConnectionHintNoticeField([NodeConnectionType.AiAgent]),{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				default: {},
				placeholder: 'Add Option',
				options: [
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: 'en',
					},
					{
						displayName: 'Locale',
						name: 'locale',
						type: 'string',
						default: 'en',
					},
					{
						displayName: 'Engine',
						name: 'engines',
						type: 'string',
						default: 'google',
					},
					{
						displayName: 'Safe Search',
						name: 'safesearch',
						type: 'options',
						noDataExpression: true,
						options: [
							{
								name: 'None',
								value: 0,
								type: 'number',
							},
							{
								name: 'Moderate',
								value: 1,
								type: 'number',
							},
							{
								name: 'Strict',
								value: 2,
								type: 'number',
							},
						],
						default: 0,
					}
				],
			}
		],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiTool]
	};
	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials('searXNGApi');
		const options = this.getNodeParameter('options', itemIndex) as object;
		return {
			response: logWrapper(new SearxngSearch({
				apiBase: credentials.baseUrl+'',
				params: {
					format: 'json',
					...options,
				},
				headers: {}
			}),this),
		};
	}
}
