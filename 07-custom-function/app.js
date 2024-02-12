import OpenAI from 'openai';
import CurrencyConverter from 'currency-converter-lt';

const openAIInstance = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const inputContent = process.argv[2];

const conversationMessages = [
  {
    role: 'user',
    content: inputContent,
  },
];

const currencyConversionFunction = async ({ data }) => {
  const matches = data.match(/(\d+)\s+(\w+)\s+to\s+(\w+)/i);
  if (!matches) {
    return 'Error: Invalid format. Please use format \'convert 100 "USD" to "EUR"\'.';
  }

  const [, amount, sourceCurrency, targetCurrency] = matches;
  const currencyConverter = new CurrencyConverter({
    from: sourceCurrency,
    to: targetCurrency,
    amount: Number(amount),
  });

  try {
    const conversionResult = await currencyConverter.convert();
    console.log(`Conversion result: ${conversionResult}`);
    return conversionResult;
  } catch (error) {
    return 'Error: Could not perform currency conversion.';
  }
};

const fetchCompletion = async (conversationMessages) => {
  const response = await openAIInstance.chat.completions.create({
    model: 'gpt-3.5-turbo-16k-0613',
    messages: conversationMessages,
    functions: [
      {
        name: 'convert',
        description: 'Convert currencies',
        parameters: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description:
                'Convert from one currency to another (i.e. 100 USD to SGD)',
            },
          },
          required: ['data'],
        },
      },
    ],
    temperature: 0,
  });

  return response;
};

let response;
while (true) {
  response = await fetchCompletion(conversationMessages);
  console.log('response', JSON.stringify(response.choices));

  if (response.choices[0].finish_reason === 'stop') {
    console.log(response.choices[0].message.content);
    break;
  } else if (response.choices[0].finish_reason === 'function_call') {
    const { name: functionName, arguments: functionArguments } =
      response.choices[0].message.function_call;
    const functionToInvoke = currencyConversionFunction;
    const parameters = JSON.parse(functionArguments);

    const result = await functionToInvoke(parameters);

    conversationMessages.push({
      role: 'assistant',
      content: null,
      function_call: {
        name: functionName,
        arguments: functionArguments,
      },
    });

    conversationMessages.push({
      role: 'function',
      name: functionName,
      content: JSON.stringify({ result }),
    });
  }
}
