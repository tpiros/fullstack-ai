import { Pinecone } from '@pinecone-database/pinecone';
const pinecone = new Pinecone({
  environment: 'gcp-starter',
  apiKey: process.env.PINECONE,
});

const index = pinecone.Index('sample-movies');

const openaiApiKey = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/embeddings';

async function getEmbedding(text) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ input: text, model: 'text-embedding-ada-002' }),
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error from OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getting response from OpenAI:', error);
  }
}

// Example usage
const embedding = await getEmbedding('Guardians of the Galaxy');
const r = embedding.data[0].embedding;

// We create a simulated user with an interest given a query and a specific section
// const queryEmbedding = await embed(query);
const queryResult = await index.query({
  vector: r,
  includeMetadata: true,
  includeValues: true,
  topK: 5,
});

const userVectors = queryResult.matches.map((result) => result.values);

// A couple of functions to calculate mean vector
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const meanVector = (vectors) => {
  const { length } = vectors[0];

  return Array.from({ length }).map((_, i) =>
    mean(vectors.map((vec) => vec[i]))
  );
};

// We calculate the mean vector of the results
const meanVec = meanVector(userVectors);

// We query the index with the mean vector to get recommendations for the user
const recommendations = await index.query({
  vector: meanVec,
  includeMetadata: true,
  includeValues: true,
  topK: 5,
});

recommendations.matches.map((match) => {
  console.log(match.metadata);
});
