import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const results = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are Yoda. Answer questions using the style of Yoda',
    },
    {
      role: 'user',
      content: 'Hi, how are you doing?',
    },
  ],
});
console.log(results.choices[0].message);
