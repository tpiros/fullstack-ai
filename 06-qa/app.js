import OpenAI from 'openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const [, , question] = process.argv;

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const createStore = (docs) => {
  return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
};

export const docsFromPDF = (file) => {
  const loader = new PDFLoader(`${file}.pdf`);
  // return loader.load();
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: '\n',
      chunkSize: 2500,
      chunkOverlap: 200,
    })
  );
};

const loadStore = async () => {
  const applewatch = await docsFromPDF('watch');
  return createStore([...applewatch]);
};

const query = async () => {
  const store = await loadStore();
  const results = await store.similaritySearch(question, 1);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k-0613',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content:
          'You are my assistant. Your task is to learn the documents sent to you. I will ask questions about it. The documents are about flight reservations on Singapore Airlines. When I ask a question and I say "I", that always refer to me, the one who asks the question.',
      },
      {
        role: 'user',
        content: `Respond to the question below using the given context. If the context is insufficient for an accurate answer, avoid fabricating information; instead, simply state that more context is required.
        Question: ${question}

        Context: ${results.map((r) => r.pageContent).join('\n')}`,
      },
    ],
  });
  console.log(
    `Answer: ${response.choices[0].message.content}\n\nSources: ${results
      .map((r) => r.metadata.source)
      .join(', ')}`
  );
};

query();
