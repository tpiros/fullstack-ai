import { Document } from 'langchain/document';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';

import { data as purchasedProducts } from './data.js';

const stringify = (obj) => {
  return Object.entries(obj)
    .filter(([key]) => key !== 'metadata')
    .map(([key, value]) => {
      return `${key}: "${value}"`;
    })
    .join(', ');
};

// creates a new Document which can be used for embeddings
const docs = purchasedProducts.map((purchasedProduct) => {
  const string = stringify(purchasedProduct);
  return new Document({
    pageContent: string,
    metadata: purchasedProduct.metadata,
  });
});

// creates a vectorstore (in memory)
const vectorStore = await MemoryVectorStore.fromDocuments(
  docs,
  new OpenAIEmbeddings()
);

// assume that client purchases this fruit. Based on the data, what other fruits should we recommend?
// this could come from a db query for example

const purchasedProduct = {
  type: 'Vegetable',
  taste: 'Mild',
  texture: 'Crunchy',
  metadata: { name: 'Red Bell Pepper' },
};
// const purchasedProduct = {
//   type: 'Fruit',
//   taste: 'Sweet',
//   texture: 'Soft',
//   metadata: { name: 'Blueberry' },
// };
const purchased = await vectorStore.similaritySearch(
  stringify(purchasedProduct),
  3
);
const result = purchased.map((r) => r.metadata.name);
console.log(`You may be interested in purchasing: ${result.join(', ')}`);
