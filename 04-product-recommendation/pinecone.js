import { Pinecone } from '@pinecone-database/pinecone';
const pinecone = new Pinecone({
  environment: 'gcp-starter',
  apiKey: process.env.PINECONE,
});

const index = pinecone.Index('products');
import { randomUUID } from 'crypto';
import { data, additionalData } from './data.js';

const fitOneHotEncoder = (data, exclude = ['metadata']) => {
  let uniqueValues = [];
  data.forEach((item) => {
    Object.keys(item)
      .filter((key) => !exclude.includes(key))
      .forEach((key) => {
        const valueKey = `${key}_${item[key]}`;
        if (!uniqueValues.includes(valueKey)) {
          uniqueValues.push(valueKey);
        }
      });
  });
  return uniqueValues;
};

const transformWithOneHotEncoder = (data, uniqueValues) => {
  return data.map((item) => {
    let vector = uniqueValues.map((valueKey) => {
      const [key, value] = valueKey.split('_');
      return item.hasOwnProperty(key) && item[key] === value ? 1 : 0;
    });
    return {
      id: randomUUID(),
      values: vector,
      metadata: item.metadata,
    };
  });
};

let combinedData = [...data, ...additionalData];
let uniqueValues = fitOneHotEncoder(combinedData);

console.log('Dimensions for One-Hot Encoding:', uniqueValues);
console.log('Total Number of Dimensions:', uniqueValues.length);

let vectorisedDataset = transformWithOneHotEncoder(data, uniqueValues);
let vectorisedAdditionalData = transformWithOneHotEncoder(
  additionalData,
  uniqueValues
);

console.log(vectorisedAdditionalData);

// const vectorizedDataset = oneHotEncode(data);
// console.log('v', vectorizedDataset);

// const x = oneHotEncode(additionalData);
// console.log(x);

await index.upsert(vectorisedDataset);

// await pinecone.deleteIndex('products');
// await pinecone.createIndex({
//   name: 'products',
//   dimension: 16,
//   metric: 'cosine',
// });
