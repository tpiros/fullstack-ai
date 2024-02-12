import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  environment: 'gcp-starter',
  apiKey: process.env.PINECONE,
});

const index = pinecone.Index('products');

// const purchasedProduct = {
//   type: 'Vegetable',
//   taste: 'Mild',
//   texture: 'Crunchy',
//   metadata: { name: 'Red Bell Pepper' },
// };

const purchasedProduct = {
  type: 'Fruit',
  taste: 'Sweet',
  texture: 'Soft',
  metadata: { name: 'Blueberry' },
};

const transformToVector = (product) => {
  const dimensions = [
    'type_Fruit',
    'taste_Sweet',
    'texture_Juicy',
    'type_Vegetable',
    'taste_Bitter',
    'texture_Crunchy',
    'taste_Sour',
    'texture_Soft',
    'taste_Earthy',
    'texture_Fibrous',
    'taste_Tangy',
    'taste_Mild',
    'texture_Creamy',
    'taste_Pungent',
    'taste_Spicy',
    'texture_Smooth',
  ];
  let vector = Array.from({ length: dimensions.length }).fill(0);

  dimensions.forEach((dimension, index) => {
    const [attr, value] = dimension.split('_');
    if (product[attr] && product[attr].toLowerCase() === value.toLowerCase()) {
      vector[index] = 1;
    }
  });

  return vector;
};

const vector = transformToVector(purchasedProduct);
console.log(vector);

try {
  const queryResponse = await index.query({
    vector,
    topK: 3,
    includeValues: true,
    includeMetadata: true,
  });

  console.log('Response: ', queryResponse.matches);
} catch (error) {
  console.error(error);
}
