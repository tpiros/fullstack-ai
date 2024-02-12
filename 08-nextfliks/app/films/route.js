import { Pinecone } from '@pinecone-database/pinecone';

export async function POST(request) {
  const body = await request.json();
  const { title } = body;

  const pinecone = new Pinecone();

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

  const embedding = await getEmbedding(title);
  const r = embedding.data[0].embedding;

  const queryResult = await index.query({
    vector: r,
    includeMetadata: true,
    includeValues: true,
    topK: 5,
  });

  return Response.json(queryResult.matches);
}
